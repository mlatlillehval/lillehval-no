#!/usr/bin/env python3
"""
Render ~20s animation: blank paper -> pencil sketch revealed along a continuous
boustrophedon path with a visible pencil tip -> watercolor color fades in.

Output: public/videos/agent-innboks-akvarell-20s.mp4

Requires: numpy, opencv-python-headless, ffmpeg on PATH.
"""

from __future__ import annotations

import bisect
import math
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "ai-agent-helping-watercolor.png"
OUT = ROOT / "public" / "videos" / "agent-innboks-akvarell-20s.mp4"

W, H = 1920, 1080
FPS = 30
DURATION = 20.0
SKETCH_END = 14.0  # seconds: pencil + sketch build
PAPER_BGR = (236, 244, 248)  # cream (B,G,R)

COLS, ROWS = 40, 21


def load_cv2():
    try:
        import cv2  # noqa: PLC0415

        return cv2
    except ImportError:
        print(
            "Missing dependency. Run: pip install -r scripts/requirements-draw-anim.txt",
            file=sys.stderr,
        )
        raise


def pencil_sketch_bgr(cv2, np, bgr: "object") -> "object":
    gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)
    inv = 255 - gray
    blur = cv2.GaussianBlur(inv, (0, 0), sigmaX=12, sigmaY=12)
    sketch = cv2.divide(gray, 255 - blur, scale=256.0)
    sketch_bgr = cv2.cvtColor(sketch, cv2.COLOR_GRAY2BGR).astype(np.float32)
    paper = np.array(PAPER_BGR, dtype=np.float32).reshape(1, 1, 3)
    return (sketch_bgr * 0.72 + paper * 0.28).clip(0, 255).astype(np.uint8)


def letterbox_bgr(cv2, np, bgr: "object", w: int, h: int, pad_bgr: tuple[int, int, int]) -> "object":
    ih, iw = bgr.shape[:2]
    scale = min(w / iw, h / ih)
    nw, nh = int(iw * scale), int(ih * scale)
    resized = cv2.resize(bgr, (nw, nh), interpolation=cv2.INTER_LANCZOS4)
    canvas = np.empty((h, w, 3), dtype=np.uint8)
    canvas[:, :] = pad_bgr
    x0 = (w - nw) // 2
    y0 = (h - nh) // 2
    canvas[y0 : y0 + nh, x0 : x0 + nw] = resized
    return canvas


def cell_centers_boustrophedon() -> list[tuple[float, float, int, int]]:
    cw = W / COLS
    ch = H / ROWS
    out: list[tuple[float, float, int, int]] = []
    for r in range(ROWS):
        cols = range(COLS) if r % 2 == 0 else range(COLS - 1, -1, -1)
        for c in cols:
            cx = (c + 0.5) * cw
            cy = (r + 0.5) * ch
            out.append((cx, cy, c, r))
    return out


def polyline_cumulative(points: list[tuple[float, float]], np) -> list[float]:
    if len(points) < 2:
        return [0.0] * len(points)
    arr = np.array(points, dtype=np.float64)
    seg = np.sqrt(np.sum(np.diff(arr, axis=0) ** 2, axis=1))
    return [0.0] + np.cumsum(seg).tolist()


def point_at_arc_length(
    points: list[tuple[float, float]],
    cum: list[float],
    s: float,
) -> tuple[float, float, float]:
    """(x, y, angle_rad) along polyline; angle is tangent direction."""
    if len(points) == 0:
        return W / 2, H / 2, 0.0
    if len(points) == 1:
        return points[0][0], points[0][1], 0.0
    s = max(0.0, min(s, cum[-1] * (1 - 1e-6)))
    idx = bisect.bisect_right(cum, s) - 1
    idx = max(0, min(idx, len(points) - 2))
    p0x, p0y = points[idx]
    p1x, p1y = points[idx + 1]
    seg_len = math.hypot(p1x - p0x, p1y - p0y) or 1e-6
    t = (s - cum[idx]) / seg_len
    t = max(0.0, min(1.0, t))
    x = p0x + (p1x - p0x) * t
    y = p0y + (p1y - p0y) * t
    ang = math.atan2(p1y - p0y, p1x - p0x)
    return x, y, ang


def cell_mask(np, c: int, r: int, cw: float, ch: float) -> "object":
    x0 = int(round(c * cw))
    y0 = int(round(r * ch))
    x1 = int(round((c + 1) * cw))
    y1 = int(round((r + 1) * ch))
    m = np.zeros((H, W), dtype=np.uint8)
    m[y0:y1, x0:x1] = 255
    return m


def build_pencil_patch(cv2, np, scale: float = 1.0) -> tuple["object", int, int]:
    """BGRA patch, pencil points in +x direction from patch center."""
    pw, ph = int(150 * scale), int(42 * scale)
    patch = np.zeros((ph, pw, 4), dtype=np.uint8)
    cx0, cy0 = pw / 2, ph / 2
    wood = (78, 152, 212, 255)  # BGRA warm cedar-ish
    ferrule = (195, 190, 190, 255)
    tip = (58, 55, 55, 255)
    L = int(78 * scale)
    hw = max(2, int(9 * scale))
    for x in range(-L, int(14 * scale)):
        for y in range(-hw, hw + 1):
            px = int(cx0 + x)
            py = int(cy0 + y)
            if 0 <= px < pw and 0 <= py < ph:
                if x < -L + int(12 * scale):
                    patch[py, px] = tip
                elif x < -L + int(22 * scale):
                    patch[py, px] = ferrule
                else:
                    patch[py, px] = wood
    return patch, pw, ph


def overlay_rotated_patch(
    cv2,
    np,
    frame_bgr: "object",
    patch_bgra: "object",
    pw: int,
    ph: int,
    cx: float,
    cy: float,
    angle_rad: float,
) -> None:
    M = cv2.getRotationMatrix2D((pw / 2, ph / 2), math.degrees(angle_rad), 1.0)
    rot = cv2.warpAffine(
        patch_bgra,
        M,
        (pw, ph),
        flags=cv2.INTER_LINEAR,
        borderMode=cv2.BORDER_CONSTANT,
        borderValue=(0, 0, 0, 0),
    )
    x1 = int(round(cx - pw / 2))
    y1 = int(round(cy - ph / 2))
    x2 = x1 + pw
    y2 = y1 + ph
    xs0 = max(0, x1)
    ys0 = max(0, y1)
    xs1 = min(W, x2)
    ys1 = min(H, y2)
    if xs0 >= xs1 or ys0 >= ys1:
        return
    rp0 = ys0 - y1
    rp1 = ys1 - y1
    cp0 = xs0 - x1
    cp1 = xs1 - x1
    src = rot[rp0:rp1, cp0:cp1].astype(np.float32)
    dst = frame_bgr[ys0:ys1, xs0:xs1].astype(np.float32)
    a = (src[..., 3:4] / 255.0).clip(0, 1)
    rgb = src[..., :3]
    blended = rgb * a + dst * (1.0 - a)
    frame_bgr[ys0:ys1, xs0:xs1] = blended.clip(0, 255).astype(np.uint8)


def smoothstep(u: float) -> float:
    u = max(0.0, min(1.0, u))
    return u * u * (3.0 - 2.0 * u)


def main() -> None:
    import numpy as np

    cv2 = load_cv2()

    if not SRC.is_file():
        raise SystemExit(f"Missing source image: {SRC}")

    OUT.parent.mkdir(parents=True, exist_ok=True)

    bgr = cv2.imread(str(SRC), cv2.IMREAD_COLOR)
    if bgr is None:
        raise SystemExit(f"Could not read image: {SRC}")

    art_bgr = letterbox_bgr(cv2, np, bgr, W, H, PAPER_BGR)
    sketch_bgr = pencil_sketch_bgr(cv2, np, art_bgr)

    centers = cell_centers_boustrophedon()
    points = [(cx, cy) for cx, cy, _, _ in centers]
    cum = polyline_cumulative(points, np)
    total_len = cum[-1] if cum else 1.0

    cw = W / COLS
    ch = H / ROWS
    cell_masks = [cell_mask(np, c, r, cw, ch) for _, _, c, r in centers]

    pencil_patch, ppw, pph = build_pencil_patch(cv2, np, scale=1.05)

    n_frames = int(round(DURATION * FPS))

    paper = np.array(PAPER_BGR, dtype=np.uint8).reshape(1, 1, 3)
    paper_bg = np.tile(paper, (H, W, 1))
    sketch_f = sketch_bgr.astype(np.float32)
    color_f = art_bgr.astype(np.float32)

    ffmpeg_bin = shutil.which("ffmpeg") or "/opt/homebrew/bin/ffmpeg"
    cmd = [
        ffmpeg_bin,
        "-y",
        "-f",
        "rawvideo",
        "-pix_fmt",
        "rgb24",
        "-s",
        f"{W}x{H}",
        "-r",
        str(FPS),
        "-i",
        "-",
        "-an",
        "-c:v",
        "libx264",
        "-preset",
        "medium",
        "-crf",
        "18",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        str(OUT),
    ]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
    assert proc.stdin is not None

    reveal = np.zeros((H, W), dtype=np.uint8)
    last_k = -1
    sketch_frames = max(2, int(round(SKETCH_END * FPS)))

    try:
        for fi in range(n_frames):
            t = fi / FPS

            if fi < sketch_frames:
                u = smoothstep(fi / (sketch_frames - 1))
                s = u * total_len
                k = bisect.bisect_right(cum, s) - 1
                k = max(0, min(k, len(cell_masks) - 1))
                for j in range(last_k + 1, k + 1):
                    cv2.bitwise_or(reveal, cell_masks[j], dst=reveal)
                last_k = k

                m = (reveal.astype(np.float32) / 255.0)[..., None]
                comp = paper_bg.astype(np.float32) * (1.0 - m) + sketch_f * m
                frame_bgr = comp.clip(0, 255).astype(np.uint8)

                px, py, pang = point_at_arc_length(points, cum, s)
                # Pencil body follows tangent; tip points along travel direction
                overlay_rotated_patch(cv2, np, frame_bgr, pencil_patch, ppw, pph, px, py, pang)
            else:
                u = smoothstep((t - SKETCH_END) / max(1e-6, (DURATION - SKETCH_END)))
                frame_bgr = (sketch_f * (1.0 - u) + color_f * u).clip(0, 255).astype(np.uint8)

            # ffmpeg rawvideo expects RGB
            frame_rgb = cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2RGB)
            proc.stdin.write(frame_rgb.tobytes())

    finally:
        proc.stdin.close()
        err = proc.stderr.read() if proc.stderr else b""
        code = proc.wait(timeout=180)
        if code != 0:
            print(err.decode("utf-8", errors="replace")[-6000:], file=sys.stderr)
            raise SystemExit(f"ffmpeg failed with code {code}")

    print(f"Wrote {OUT} ({n_frames} frames @ {FPS}fps)")


if __name__ == "__main__":
    main()

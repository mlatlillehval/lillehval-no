#!/usr/bin/env python3
"""Composite Marius (left) and Hein (center) into komplementaere-ferdigheter-akvarell.png."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageFilter, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"


def elliptical_mask(size: tuple[int, int], feather: int = 80) -> Image.Image:
    w, h = size
    mask = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(mask)
    margin_x = int(w * 0.06)
    margin_y = int(h * 0.08)
    draw.ellipse(
        [margin_x, margin_y, w - margin_x, h - margin_y],
        fill=255,
    )
    if feather > 0:
        mask = mask.filter(ImageFilter.GaussianBlur(radius=feather))
    return mask


def fit_portrait(
    portrait: Image.Image,
    target_w: int,
    max_h: int,
) -> Image.Image:
    portrait = portrait.convert("RGBA")
    pw, ph = portrait.size
    scale = target_w / pw
    nh = int(ph * scale)
    if nh > max_h:
        scale = max_h / ph
        target_w = int(pw * scale)
        nh = max_h
    return portrait.resize((target_w, nh), Image.Resampling.LANCZOS)


def paste_third(
    base_rgba: Image.Image,
    portrait: Image.Image,
    left: int,
    third_w: int,
    top_ratio: float = 0.08,
) -> Image.Image:
    """Place portrait in horizontal band [left, left+third_w), vertically from top_ratio."""
    w, h = base_rgba.size
    pw, ph = portrait.size
    cx = left + third_w // 2
    x = cx - pw // 2
    y = int(h * top_ratio)
    if y + ph > h:
        y = h - ph - 8

    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    layer.paste(portrait, (x, y), portrait)

    mask = elliptical_mask((pw, ph), feather=28)
    full_mask = Image.new("L", (w, h), 0)
    full_mask.paste(mask, (x, y))
    return Image.composite(layer, base_rgba, full_mask)


def main() -> None:
    base_path = PUBLIC / "komplementaere-ferdigheter-akvarell.png"
    marius_path = PUBLIC / "illustration-marius-akvarell.png"
    hein_path = PUBLIC / "illustration-hein-akvarell.png"
    out_path = PUBLIC / "komplementaere-ferdigheter-team-akvarell.png"

    base = Image.open(base_path).convert("RGBA")
    w, h = base.size
    third_w = w // 3

    marius = fit_portrait(
        Image.open(marius_path),
        target_w=int(third_w * 0.56),
        max_h=int(h * 0.52),
    )
    hein = fit_portrait(
        Image.open(hein_path),
        target_w=int(third_w * 0.56),
        max_h=int(h * 0.52),
    )

    out = paste_third(base, marius, left=0, third_w=third_w, top_ratio=0.125)
    out = paste_third(out, hein, left=third_w, third_w=third_w, top_ratio=0.125)

    out.convert("RGB").save(out_path, "PNG", optimize=True)
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()

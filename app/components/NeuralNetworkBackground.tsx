"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
  /** Indeks i `LOGO_JOURNEY_RGB` — samme palett som reise-nodene i logoen */
  colorIdx: number;
}

type Rgb = { r: number; g: number; b: number };

type TierParams = {
  nodeCount: number;
  maxDist: number;
  speed: number;
};

/** Reisefarger fra «Logo - Lillehval … + reise» (node-punkter + avsluttende sirkel) */
const LOGO_JOURNEY_RGB: readonly Rgb[] = [
  { r: 212, g: 132, b: 10 }, // #D4840A
  { r: 245, g: 158, b: 11 }, // #F59E0B
  { r: 138, g: 173, b: 148 }, // #8AAD94
  { r: 74, g: 122, b: 85 }, // #4A7A55
  { r: 20, g: 83, b: 45 }, // #14532D
  { r: 10, g: 46, b: 26 }, // #0A2E1A
];

function mixRgb(a: Rgb, b: Rgb, t: number): Rgb {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  };
}

/** Desktop — full nett */
const TIER_DESKTOP: TierParams = {
  nodeCount: 96,
  maxDist: 268,
  speed: 0.22,
};

/** Mobil smal skjerm — færre kantpar (O(n²)), kortere rekkevidde, litt roligere fart */
const TIER_MOBILE: TierParams = {
  nodeCount: 44,
  maxDist: 198,
  speed: 0.17,
};

function tierForViewport(isNarrow: boolean): TierParams {
  return isNarrow ? TIER_MOBILE : TIER_DESKTOP;
}

/** Multiply-demper sterkt mot lys bakgrunn — høyere base-alpha kompenserer */
const LINE_ALPHA_PEAK = 0.22;
const NODE_ALPHA_MIN = 0.22;
const NODE_ALPHA_SWING = 0.18;

const MQ_MOBILE = "(max-width: 639px)";
const MQ_REDUCE_MOTION = "(prefers-reduced-motion: reduce)";

export default function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const startRef = useRef<number>(0);

  const prefsRef = useRef({ reducedMotion: false, narrow: false });
  const tierRef = useRef<TierParams>(TIER_DESKTOP);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const mqMobile = window.matchMedia(MQ_MOBILE);
    const mqReduce = window.matchMedia(MQ_REDUCE_MOTION);

    const resizeCanvasOnly = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      for (const n of nodesRef.current) {
        n.x = Math.min(canvas.width, Math.max(0, n.x));
        n.y = Math.min(canvas.height, Math.max(0, n.y));
      }
    };

    const initNodes = () => {
      const tier = tierRef.current;
      nodesRef.current = Array.from({ length: tier.nodeCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * tier.speed,
        vy: (Math.random() - 0.5) * tier.speed,
        r: Math.random() * 2.1 + 1.15,
        phase: Math.random() * Math.PI * 2,
        colorIdx: Math.floor(Math.random() * LOGO_JOURNEY_RGB.length),
      }));
    };

    const syncPrefsFromMedia = () => {
      prefsRef.current = {
        narrow: mqMobile.matches,
        reducedMotion: mqReduce.matches,
      };
      tierRef.current = tierForViewport(prefsRef.current.narrow);
    };

    /** Statisk komposisjon — ingen translate-puls, samme topologi som ved time=0 */
    const drawStatic = () => {
      const tier = tierRef.current;
      const nodes = nodesRef.current;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const globalBreath = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const edgeWave = 1;
          const maxHere = tier.maxDist * globalBreath * edgeWave;

          if (dist < maxHere && dist > 0.5) {
            const falloff = 1 - dist / maxHere;
            const linePulse = 1;
            const alpha = falloff * LINE_ALPHA_PEAK * linePulse;

            const ca = LOGO_JOURNEY_RGB[a.colorIdx];
            const cb = LOGO_JOURNEY_RGB[b.colorIdx];
            const blend = mixRgb(ca, cb, 0.5);

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${blend.r},${blend.g},${blend.b},${alpha})`;
            ctx.lineWidth = 1.05 + 1.15 * falloff * linePulse;
            ctx.stroke();
          }
        }
      }

      const alphaFill = NODE_ALPHA_MIN + NODE_ALPHA_SWING * 0.5;
      for (const n of nodes) {
        const rDraw = n.r;
        const c = LOGO_JOURNEY_RGB[n.colorIdx];
        const glow = mixRgb(c, { r: 255, g: 255, b: 255 }, 0.38);

        ctx.beginPath();
        ctx.arc(n.x, n.y, rDraw, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${alphaFill})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, rDraw * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${glow.r},${glow.g},${glow.b},${alphaFill * 0.22})`;
        ctx.fill();
      }
    };

    const draw = (nowMs: number) => {
      if (prefsRef.current.reducedMotion) {
        drawStatic();
        return;
      }

      if (startRef.current === 0) startRef.current = nowMs;
      const time = (nowMs - startRef.current) / 1000;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const nodes = nodesRef.current;
      const tier = tierRef.current;

      for (const n of nodes) {
        n.vx += Math.sin(time * 0.42 + n.phase) * 0.002;
        n.vy += Math.cos(time * 0.33 + n.phase * 1.3) * 0.0018;
        const sp = Math.hypot(n.vx, n.vy);
        const cap = tier.speed * 2.8;
        if (sp > cap) {
          n.vx = (n.vx / sp) * cap;
          n.vy = (n.vy / sp) * cap;
        }

        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        n.x = Math.max(0, Math.min(canvas.width, n.x));
        n.y = Math.max(0, Math.min(canvas.height, n.y));
      }

      const globalBreath = 0.82 + 0.18 * Math.sin(time * 0.38);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const edgeWave =
            0.78 + 0.22 * Math.sin(time * 0.62 + i * 0.19 + j * 0.17 + a.phase * 0.05);
          const maxHere = tier.maxDist * globalBreath * edgeWave;

          if (dist < maxHere && dist > 0.5) {
            const falloff = 1 - dist / maxHere;
            const linePulse =
              0.55 + 0.45 * Math.sin(time * 1.25 + dist * 0.05 + (i + j) * 0.07);
            const alpha = falloff * LINE_ALPHA_PEAK * linePulse;

            const ca = LOGO_JOURNEY_RGB[a.colorIdx];
            const cb = LOGO_JOURNEY_RGB[b.colorIdx];
            const blend = mixRgb(ca, cb, 0.5);

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${blend.r},${blend.g},${blend.b},${alpha})`;
            ctx.lineWidth = 1.05 + 1.15 * falloff * linePulse;
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const pulse = 0.72 + 0.28 * Math.sin(time * 1.45 + n.phase);
        const rDraw = n.r * pulse;
        const alphaFill =
          NODE_ALPHA_MIN + NODE_ALPHA_SWING * Math.sin(time * 2 + n.phase * 2);

        const c = LOGO_JOURNEY_RGB[n.colorIdx];
        const glow = mixRgb(c, { r: 255, g: 255, b: 255 }, 0.38);

        ctx.beginPath();
        ctx.arc(n.x, n.y, rDraw, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${alphaFill})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, rDraw * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${glow.r},${glow.g},${glow.b},${alphaFill * 0.22})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    const applyPreferences = () => {
      const prevCount = tierRef.current.nodeCount;
      syncPrefsFromMedia();
      const tierCountChanged = prevCount !== tierRef.current.nodeCount;

      cancelAnimationFrame(animRef.current);
      resizeCanvasOnly();

      if (tierCountChanged || nodesRef.current.length !== tierRef.current.nodeCount) {
        initNodes();
      }

      if (prefsRef.current.reducedMotion) {
        drawStatic();
        return;
      }

      startRef.current = 0;
      animRef.current = requestAnimationFrame(draw);
    };

    const onResize = () => {
      resizeCanvasOnly();
      if (prefsRef.current.reducedMotion) {
        drawStatic();
      }
    };

    applyPreferences();

    mqMobile.addEventListener("change", applyPreferences);
    mqReduce.addEventListener("change", applyPreferences);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      mqMobile.removeEventListener("change", applyPreferences);
      mqReduce.removeEventListener("change", applyPreferences);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen mix-blend-multiply"
    />
  );
}

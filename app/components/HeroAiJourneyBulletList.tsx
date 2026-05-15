"use client";

import { useEffect, useState } from "react";

export type HeroBulletSegment = { text: string; highlight?: boolean };

const REVEAL_MS = 15_000;
const HOLD_MS = 7_000;
const STEP_COUNT = 6;
const STEP_MS = REVEAL_MS / STEP_COUNT;

type Props = {
  heading: string;
  bullets: HeroBulletSegment[][];
};

/**
 * Kumulative avdekking: først kun overskrift tydelig, deretter punkt 1 … 1+2 … hele lista
 * over 15 s, alle synlige i 7 s, så loop. Respekterer prefers-reduced-motion.
 */
export default function HeroAiJourneyBulletList({ heading, bullets }: Props) {
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setRevealedCount(STEP_COUNT);
      return;
    }

    let cancelled = false;
    const pending: ReturnType<typeof setTimeout>[] = [];

    const clearPending = () => {
      pending.forEach(clearTimeout);
      pending.length = 0;
    };

    const startCycle = () => {
      clearPending();
      if (cancelled) return;
      setRevealedCount(0);
      for (let i = 1; i <= STEP_COUNT; i++) {
        pending.push(
          setTimeout(() => {
            if (!cancelled) setRevealedCount(i);
          }, STEP_MS * i)
        );
      }
      pending.push(
        setTimeout(() => {
          if (!cancelled) startCycle();
        }, REVEAL_MS + HOLD_MS)
      );
    };

    startCycle();

    return () => {
      cancelled = true;
      clearPending();
    };
  }, []);

  return (
    <>
      <p
        className="m-0 shrink-0 text-xs font-bold uppercase tracking-widest animate-hero-fold hero-fold-delay-3"
        style={{ color: "#15803d" }}
      >
        {heading}
      </p>
      <ul
        className="m-0 flex min-h-0 flex-1 list-none flex-col justify-start gap-2.5 pl-0"
        aria-label="Hvorfor velge oss på AI-reisen"
      >
        {bullets.map((segments, i) => {
          const isClear = i < revealedCount;
          return (
            <li
              key={i}
              className="flex items-start gap-2.5 transition-[filter,opacity] duration-500 ease-out"
              style={{
                filter: isClear ? "blur(0px)" : "blur(4px)",
                opacity: isClear ? 1 : 0.62,
              }}
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full transition-opacity duration-500"
                style={{
                  background: "#15803d",
                  opacity: isClear ? 1 : 0.45,
                }}
                aria-hidden
              />
              <span
                className="text-sm leading-relaxed"
                style={{ color: "rgba(26,51,32,0.75)" }}
              >
                {segments.map((seg, j) =>
                  seg.highlight ? (
                    <span key={j} style={{ color: "#14532d", fontWeight: 700 }}>
                      {seg.text}
                    </span>
                  ) : (
                    <span key={j}>{seg.text}</span>
                  )
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}

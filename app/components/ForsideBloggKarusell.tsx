"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

export type ForsideBloggKort = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  publishedLabel: string;
  readMinutes: number;
};

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

function Chevron({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={direction === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
      />
    </svg>
  );
}

export default function ForsideBloggKarusell({ posts }: { posts: ForsideBloggKort[] }) {
  const [index, setIndex] = useState(0);
  const pointerStart = useRef<number | null>(null);

  const goTo = useCallback((next: number) => {
    const count = posts.length;
    if (count < 2) return;
    setIndex(((next % count) + count) % count);
  }, [posts.length]);

  if (posts.length === 0) return null;

  const featured = posts[index];
  const canCycle = posts.length > 1;

  return (
    <div
      className="mt-3"
      aria-roledescription={canCycle ? "karusell" : undefined}
      aria-label={canCycle ? "Siste blogginnlegg" : undefined}
    >
      <div
        className="relative grid"
        onPointerDown={(event) => {
          if (!canCycle || event.pointerType === "mouse") return;
          pointerStart.current = event.clientX;
        }}
        onPointerUp={(event) => {
          if (pointerStart.current == null) return;
          const delta = event.clientX - pointerStart.current;
          pointerStart.current = null;
          if (Math.abs(delta) < 48) return;
          goTo(index + (delta < 0 ? 1 : -1));
        }}
        onPointerCancel={() => {
          pointerStart.current = null;
        }}
      >
        {posts.map((post, i) => {
          const active = i === index;
          return (
            <article
              key={post.slug}
              className={`col-start-1 row-start-1 motion-reduce:!transition-none ${
                active ? "relative" : "absolute inset-0 overflow-hidden"
              }`}
              aria-hidden={!active}
              inert={active ? undefined : true}
              style={{
                opacity: active ? 1 : 0,
                pointerEvents: active ? "auto" : "none",
                transition: `opacity 300ms ${EASE}`,
              }}
            >
              <p
                className="m-0 max-w-[65ch] text-sm leading-relaxed"
                style={{ color: "rgba(26,51,32,0.75)" }}
              >
                {post.publishedLabel} · ca. {post.readMinutes} min lesing
              </p>
              <div
                className="mt-8 overflow-hidden rounded-2xl"
                style={{
                  background: "rgba(252,253,252,0.97)",
                  border: "1px solid rgba(21,128,61,0.14)",
                  boxShadow: "0 6px 28px rgba(10,46,26,0.07)",
                }}
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    priority={i === 0}
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 560px"
                  />
                </div>
                <div className="px-5 py-6 sm:px-7 sm:py-7">
                  <p
                    className="m-0 text-xs font-semibold uppercase tracking-[0.12em]"
                    style={{ color: "#15803d" }}
                  >
                    AI-bloggen
                  </p>
                  <h3
                    className="mt-3 mb-0 text-xl font-extrabold leading-snug tracking-tight"
                    style={{ color: "#1a3320" }}
                  >
                    {post.title}
                  </h3>
                  <p
                    className="mt-3 mb-0 text-sm leading-relaxed"
                    style={{ color: "rgba(26,51,32,0.75)" }}
                  >
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blogg/${post.slug}`}
                    tabIndex={active ? 0 : -1}
                    className="focus-ring mt-6 inline-flex min-h-11 items-center text-sm font-bold underline-offset-4 hover:underline"
                    style={{ color: "#15803d" }}
                  >
                    Les innlegget
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {canCycle && (
        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            className="focus-ring inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[#15803d] transition-colors duration-150 hover:bg-[rgba(34,139,70,0.08)]"
            aria-label="Forrige innlegg"
          >
            <Chevron direction="prev" />
          </button>

          <div
            className="flex items-center justify-center gap-1"
            role="tablist"
            aria-label="Velg innlegg"
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                event.preventDefault();
                goTo(index + 1);
              }
              if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                event.preventDefault();
                goTo(index - 1);
              }
            }}
          >
            {posts.map((post, i) => {
              const active = i === index;
              return (
                <button
                  key={post.slug}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`Vis innlegg ${i + 1} av ${posts.length}: ${post.title}`}
                  onClick={() => goTo(i)}
                  className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-lg"
                >
                  <span
                    className="block h-2 w-7 origin-center rounded-full motion-reduce:!transition-none"
                    style={{
                      transform: active ? "scaleX(1)" : "scaleX(0.286)",
                      background: active ? "#15803d" : "rgba(21,128,61,0.28)",
                      transition: `transform 200ms ${EASE}, background 200ms ${EASE}`,
                    }}
                  />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className="focus-ring inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[#15803d] transition-colors duration-150 hover:bg-[rgba(34,139,70,0.08)]"
            aria-label="Neste innlegg"
          >
            <Chevron direction="next" />
          </button>
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {featured.title}
      </p>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AI_BLOG_POSTS, type AIBlogPost } from "../data/aiBlogPosts";

export default function AIBlogSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<AIBlogPost | null>(null);

  const scrollBy = useCallback((dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-blog-card]");
    const w = card?.offsetWidth ?? 280;
    const gap = 16;
    el.scrollBy({ left: dir * (w + gap), behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <div id="ai-bloggen" className="mb-16 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span
              className="inline-block mb-2 text-sm font-semibold uppercase tracking-widest"
              style={{ color: "#15803d" }}
            >
              AI-bloggen
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1a3320]">
              Ti perspektiver på AI for norske bedrifter
            </h2>
            <p className="mt-2 text-sm max-w-xl" style={{ color: "rgba(26,51,32,0.55)" }}>
              Korte innlegg du kan lese på noen minutter — trykk på et bilde for hele teksten.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors hover:bg-white/80"
              style={{ borderColor: "rgba(34,139,70,0.35)", color: "#1a3320" }}
              aria-label="Forrige"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors hover:bg-white/80"
              style={{ borderColor: "rgba(34,139,70,0.35)", color: "#1a3320" }}
              aria-label="Neste"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin -mx-1 px-1"
          style={{ scrollbarColor: "rgba(34,139,70,0.4) transparent" }}
        >
          {AI_BLOG_POSTS.map((post) => (
            <button
              key={post.id}
              type="button"
              data-blog-card
              onClick={() => setActive(post)}
              className="green-card flex-shrink-0 w-[240px] sm:w-[260px] rounded-2xl overflow-hidden text-left snap-start transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803d] focus-visible:ring-offset-2"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover object-center"
                  sizes="260px"
                />
              </div>
              <div className="p-4">
                <p className="text-sm font-bold text-[#1a3320] leading-snug line-clamp-3">{post.title}</p>
                <p className="mt-2 text-xs line-clamp-2" style={{ color: "rgba(26,51,32,0.5)" }}>
                  {post.excerpt}
                </p>
                <span className="mt-3 inline-block text-xs font-semibold" style={{ color: "#15803d" }}>
                  Les innlegget →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6"
          style={{ background: "rgba(26, 51, 32, 0.55)" }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-post-title"
          onClick={() => setActive(null)}
        >
          <article
            className="relative max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
            style={{ background: "#f7f4ee" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
              style={{ background: "rgba(255,255,255,0.9)", color: "#1a3320" }}
              aria-label="Lukk"
            >
              ×
            </button>
            <div className="relative w-full aspect-[16/10]">
              <Image
                src={active.image}
                alt={active.title}
                fill
                className="object-cover object-center"
                sizes="(max-width: 512px) 100vw, 512px"
              />
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#15803d" }}>
                AI-bloggen · ca. {active.readMinutes} min lesing
              </p>
              <h3 id="blog-post-title" className="text-xl sm:text-2xl font-extrabold text-[#1a3320] leading-tight">
                {active.title}
              </h3>
              <p className="mt-4 text-sm font-medium" style={{ color: "rgba(26,51,32,0.65)" }}>
                {active.excerpt}
              </p>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#1a3320] opacity-90">
                {active.body.split(/\n\n+/).map((para, i) => (
                  <p key={i}>{para.trim()}</p>
                ))}
              </div>
            </div>
          </article>
        </div>
      )}
    </>
  );
}

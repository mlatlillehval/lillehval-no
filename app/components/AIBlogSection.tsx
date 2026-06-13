"use client";

import Link from "next/link";
import { useRef, useCallback } from "react";
import SectionKicker from "./SectionKicker";
import Image from "next/image";
import { AI_BLOG_POSTS, getReadMinutes } from "../data/aiBlogPosts";

export default function AIBlogSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = useCallback((dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-blog-card]");
    const w = card?.offsetWidth ?? 280;
    const gap = 16;
    el.scrollBy({ left: dir * (w + gap), behavior: "smooth" });
  }, []);

  return (
    <div id="ai-bloggen" className="mb-16 scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <SectionKicker className="!mb-2">AI-bloggen</SectionKicker>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1a3320]">
            Ti perspektiver på AI for norske bedrifter
          </h2>
          <p className="mt-2 text-sm max-w-xl" style={{ color: "rgba(26,51,32,0.55)" }}>
            Korte innlegg du kan lese på noen minutter — hvert innlegg har egen side for deling og søk.
          </p>
          <Link
            href="/blogg"
            className="mt-3 inline-block text-sm font-semibold underline-offset-2 hover:underline"
            style={{ color: "#15803d" }}
          >
            Se alle innlegg →
          </Link>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            className="h-11 w-11 rounded-full border-2 flex items-center justify-center transition-colors hover:bg-white/80 outline-none focus-visible:ring-2 focus-visible:ring-[#15803d] focus-visible:ring-offset-2"
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
            className="h-11 w-11 rounded-full border-2 flex items-center justify-center transition-colors hover:bg-white/80 outline-none focus-visible:ring-2 focus-visible:ring-[#15803d] focus-visible:ring-offset-2"
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
        className="flex gap-4 overflow-x-auto overscroll-x-contain touch-pan-x scroll-pl-4 scroll-pr-4 pb-2 snap-x snap-mandatory scrollbar-thin -mx-1 px-1"
        style={{ scrollbarColor: "rgba(34,139,70,0.4) transparent" }}
      >
        {AI_BLOG_POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blogg/${post.slug}`}
            data-blog-card
            className="green-card flex-shrink-0 w-[240px] sm:w-[260px] rounded-2xl overflow-hidden snap-start transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803d] focus-visible:ring-offset-2"
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
              <p className="text-xs font-semibold mb-1" style={{ color: "#15803d" }}>
                ca. {getReadMinutes(post)} min
              </p>
              <p className="text-sm font-bold text-[#1a3320] leading-snug line-clamp-3">{post.title}</p>
              <p className="mt-2 text-xs line-clamp-2" style={{ color: "rgba(26,51,32,0.5)" }}>
                {post.excerpt}
              </p>
              <span className="mt-3 inline-block text-xs font-semibold" style={{ color: "#15803d" }}>
                Les innlegget →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

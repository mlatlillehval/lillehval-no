"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import BookingModal from "./BookingModal";
import {
  FRONT_PAGE_DEFAULTS,
  type FrontpageCopy,
} from "../data/frontpageCopy";

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  const [copy, setCopy] = useState<FrontpageCopy>(FRONT_PAGE_DEFAULTS);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("/api/frontpage-content");
        const json = (await res.json()) as Partial<FrontpageCopy>;
        setCopy({ ...FRONT_PAGE_DEFAULTS, ...(json as any) });
      } catch {
        // fallback til defaults
      }
    };
    void run();
  }, []);

  const subLines = copy.hero_subheadline.split("\n").map((s) => s.trim());

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: "#f2ede3",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "none",
        }}
      />

      {/* Two-column layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* LEFT — Text */}
        <div className="lg:w-[38%] flex-shrink-0 flex flex-col items-start text-left">
          {/* Eyebrow badge */}
          <span
            className="inline-block mb-6 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase"
            style={{
              background: "rgba(34,139,70,0.1)",
              color: "#15803d",
              border: "1px solid rgba(34,139,70,0.25)",
              backdropFilter: "blur(8px)",
            }}
          >
            {copy.hero_badge_text}
          </span>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight mb-6"
            style={{ color: "#1a3320", textShadow: "0 2px 20px rgba(0,0,0,0.06)" }}
          >
            {copy.hero_headline_top}
            <br />
            <span style={{ color: "#15803d" }}>{copy.hero_headline_highlight}</span>
            <br />
            {copy.hero_headline_bottom}
          </h1>

          {/* Subheadline */}
          <p
            className="text-xl sm:text-2xl font-medium mb-10 max-w-lg"
            style={{ color: "rgba(26,51,32,0.75)" }}
          >
            {subLines.map((line, i) => (
              <span key={`${i}-${line}`}>
                {line}
                {i < subLines.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>

          {/* CTA */}
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-bold shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
            style={{
              background: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)",
              color: "#ffffff",
              boxShadow: "0 4px 24px rgba(21, 128, 61, 0.4)",
            }}
          >
            {copy.hero_cta_text}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

          <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

          {/* Trust line */}
          <p className="mt-5 text-sm" style={{ color: "rgba(26,51,32,0.5)" }}>
            {copy.hero_trust_line}
          </p>
        </div>

        {/* RIGHT — Image */}
        <div className="lg:flex-1 w-full">
          {/* Outer wrapper: relative without overflow-hidden so logo can escape */}
          <div className="relative">
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: "16/9" }}
            >
              <Image
                src="/hero-bedrift-utvikling.jpg"
                alt="Et selskap på sin AI-reise — fra analog til AI-drevet"
                fill
                className="object-cover object-center"
                priority
              />
              {/* Subtle gradient overlay at bottom for depth */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: "linear-gradient(to top, rgba(5,26,13,0.25) 0%, transparent 60%)",
                }}
              />
            </div>

            {/* Whale logo — 1/4 on image, 3/4 outside top-right */}
            <div
              className="absolute pointer-events-none"
              style={{ top: "-140px", right: "-90px", width: "240px", height: "240px", zIndex: 10 }}
            >
              <Image
                src="/logo-whale-hero-transparent.png"
                alt="Lillehval logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{ background: "none" }}
      />
    </section>
  );
}

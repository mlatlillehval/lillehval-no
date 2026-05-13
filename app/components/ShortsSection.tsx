"use client";

import SectionKicker from "./SectionKicker";

type Short = {
  platform: "tiktok" | "instagram" | "youtube";
  title: string;
  caption: string;
  duration: string;
  embedUrl: string | null;
  profileUrl: string;
  accentColor: string;
  bgGradient: string;
};

const SHORTS: Short[] = [
  {
    platform: "tiktok",
    title: "Hva koster det å ikke bruke AI?",
    caption: "Det usynlige tapet ingen snakker om — og hva du kan gjøre nå.",
    duration: "0:58",
    embedUrl: null,
    profileUrl: "https://www.tiktok.com/@lillehval",
    accentColor: "#69C9D0",
    bgGradient: "linear-gradient(160deg, #010101 0%, #1a0a2e 100%)",
  },
  {
    platform: "instagram",
    title: "3 AI-tips du kan bruke i dag",
    caption: "Konkrete verktøy testet av norske bedrifter — ingen koding nødvendig.",
    duration: "0:45",
    embedUrl: null,
    profileUrl: "https://www.instagram.com/lillehvalas",
    accentColor: "#E1306C",
    bgGradient: "linear-gradient(160deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)",
  },
  {
    platform: "youtube",
    title: "AI for norske SMB-er — kom i gang på 30 dager",
    caption: "En praktisk guide til de første skrittene — uten å bruke en formue.",
    duration: "0:52",
    embedUrl: null,
    profileUrl: "https://www.youtube.com/@lillehval",
    accentColor: "#FF0000",
    bgGradient: "linear-gradient(160deg, #1a0000 0%, #2d0000 100%)",
  },
];

const PLATFORM_ICONS = {
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

const PLATFORM_LABELS = {
  tiktok: "TikTok",
  instagram: "Instagram Reels",
  youtube: "YouTube Shorts",
};

function PlayButton() {
  return (
    <div
      className="flex items-center justify-center w-14 h-14 rounded-full transition-transform duration-200 group-hover:scale-110"
      style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "2px solid rgba(255,255,255,0.3)" }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  );
}

export default function ShortsSection() {
  return (
    <div id="shorts" className="mb-16 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <SectionKicker className="!mb-2">Sosiale medier</SectionKicker>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1a3320]">
            Korte videoer — TikTok, Reels og Shorts
          </h2>
          <p className="mt-2 text-sm max-w-xl" style={{ color: "rgba(26,51,32,0.55)" }}>
            AI-innsikt på under ett minutt. Følg oss for ukentlige oppdateringer.
          </p>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {SHORTS.map((short) => (
          <a
            key={short.platform}
            href={short.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
            style={{ border: "1px solid rgba(34,139,70,0.15)" }}
          >
            {/* Video preview area — portrait ratio */}
            <div
              className="relative flex flex-col items-center justify-center"
              style={{ background: short.bgGradient, aspectRatio: "9/16", maxHeight: 340 }}
            >
              {/* Platform watermark */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}>
                <span style={{ color: short.accentColor }}>{PLATFORM_ICONS[short.platform]}</span>
                <span className="text-xs font-bold text-white">{PLATFORM_LABELS[short.platform]}</span>
              </div>
              {/* Duration badge */}
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-xs font-bold text-white" style={{ background: "rgba(0,0,0,0.55)" }}>
                {short.duration}
              </div>
              {/* Play button */}
              <PlayButton />
              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 px-4 py-4" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)" }}>
                <p className="text-white text-sm font-bold leading-snug">
                  {short.title}
                </p>
              </div>
              {/* Vertical orientation indicator */}
              <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ border: `1px solid ${short.accentColor}22` }} />
            </div>

            {/* Card footer */}
            <div className="px-4 py-3 flex items-center justify-between" style={{ background: "rgba(255,255,255,0.85)" }}>
              <p className="text-xs leading-snug flex-1 mr-3" style={{ color: "rgba(26,51,32,0.65)" }}>
                {short.caption}
              </p>
              <div
                className="flex-shrink-0 flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full transition-colors duration-150"
                style={{ background: `${short.accentColor}18`, color: short.accentColor }}
              >
                <span>Se</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Follow row */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {SHORTS.map((short) => (
          <a
            key={short.platform}
            href={short.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
            style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(34,139,70,0.2)", color: "#1a3320" }}
          >
            <span style={{ color: short.accentColor }}>{PLATFORM_ICONS[short.platform]}</span>
            Følg på {PLATFORM_LABELS[short.platform]}
          </a>
        ))}
      </div>
    </div>
  );
}

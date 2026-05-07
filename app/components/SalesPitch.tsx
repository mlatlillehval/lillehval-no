"use client";

import { useEffect, useState } from "react";
import {
  FRONT_PAGE_DEFAULTS,
  type FrontpageCopy,
} from "../data/frontpageCopy";

type SalesPitchProps = {
  /** Serverhentet kopi — matcher første paint med CMS uten «hop» */
  initialCopy?: FrontpageCopy;
};

const points = [
  {
    number: "01",
    heading: "AI-revolusjonen endrer spillereglene",
    text: "ChatGPT, autonome agenter, automatisering av kjerneoppgaver — AI-teknologien modnes i et tempo verden ikke har sett maken til. Bedrifter som handler nå bygger et konkurransefortrinn som vil være vanskelig å ta igjen.",
    accent: "#f59e0b",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    number: "02",
    heading: "Mulighetene er enorme — men vanskelige å navigere",
    text: "Det finnes hundrevis av AI-verktøy, plattformer og løsninger. Noen er gull verdt. Andre er støy. Utfordringen er ikke å finne AI — det er å vite hva som faktisk skaper verdi for akkurat din bedrift.",
    accent: "#8AAD94",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
  {
    number: "03",
    heading: "Vi kombinerer kommersiell erfaring med AI-kunnskap",
    text: "Lillehval er ikke et tech-selskap som selger teknologi. Vi er rådgivere med dyp forretningsforståelse som vet hva som funker i praksis — ikke bare i teorien. Vi har vært der selv.",
    accent: "#4ade80",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    number: "04",
    heading: "Din skreddersydde AI-reise starter her",
    text: "Fra første kartlegging til full utnyttelse — vi følger deg hele veien med en strukturert metodikk tilpasset din bedrift. Ingen generiske løsninger. Bare det som faktisk virker for dere.",
    accent: "#14532D",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h18M3 6h18M3 18h18" />
        <circle cx="18" cy="12" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
] as const;

export default function SalesPitch({ initialCopy = FRONT_PAGE_DEFAULTS }: SalesPitchProps) {
  const [copy, setCopy] = useState<FrontpageCopy>(initialCopy);

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

  return (
    <section className="relative bg-transparent px-6 pb-24 pt-10 sm:pt-14">
      <div
        className="pointer-events-none mx-auto mb-12 max-w-5xl h-px bg-gradient-to-r from-transparent via-[rgba(21,128,61,0.2)] to-transparent sm:mb-14"
        aria-hidden
      />
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{
              background: "rgba(245,158,11,0.1)",
              color: "#f59e0b",
              border: "1px solid rgba(245,158,11,0.2)",
            }}
          >
            {copy.salespitch_kicker}
          </div>
          <h2
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            style={{ color: "#1a3320" }}
          >
            <span style={{ color: "#14532d" }}>{copy.salespitch_title_line1}</span>
            <br />
            <span style={{ color: "#8AAD94" }}>{copy.salespitch_title_line2}</span>
          </h2>
        </div>

        {/* 2×2 kortgrid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
          {points.map((point) => (
            <div
              key={point.number}
              className="relative flex flex-col gap-4 rounded-2xl p-6 lg:p-7 transition-all duration-200 hover:scale-[1.01]"
              style={{
                background: "rgba(252,253,252,0.96)",
                border: "1px solid rgba(34,139,70,0.2)",
                boxShadow: "0 10px 36px rgba(21,128,61,0.06)",
              }}
            >
              {/* Topprad: ikon + nummer */}
              <div className="flex items-start justify-between">
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-xl"
                  style={{
                    background: `${point.accent}18`,
                    color: point.accent,
                    border: `1px solid ${point.accent}30`,
                  }}
                >
                  {point.icon}
                </div>
                <span
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "2rem",
                    fontWeight: 700,
                    fontStyle: "italic",
                    color: "rgba(26,51,32,0.1)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {point.number}
                </span>
              </div>

              {/* Tekst */}
              <div className="flex flex-col gap-2">
                <h3
                  className="text-lg font-extrabold leading-snug"
                  style={{ color: "#1a3320" }}
                >
                  {point.heading}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(26,51,32,0.65)" }}
                >
                  {point.text}
                </p>
              </div>

              {/* Fargelinje nederst */}
              <div
                className="absolute bottom-0 left-6 right-6 h-px rounded-full"
                style={{ background: `linear-gradient(to right, ${point.accent}44, transparent)` }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

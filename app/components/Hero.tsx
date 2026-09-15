"use client";

import { useEffect, useState } from "react";
import BookingModal from "./BookingModal";
import NeuralNetworkBackground from "./NeuralNetworkBackground";
import {
  FRONT_PAGE_DEFAULTS,
  mergeFrontpageDefaultsFromApi,
  type FrontpageCopy,
} from "../data/frontpageCopy";

type HeroHeadline = {
  greenLead: string;
  top: string;
  highlight: string;
  mid: string;
  bottom?: string;
};

function parseHeroHeadlineFromCopy(copy: FrontpageCopy): HeroHeadline {
  let greenLead = copy.hero_headline_green_lead.trim();
  let top = copy.hero_headline_top.trimEnd().replace(/\s+som\s*$/i, "");
  let highlight = copy.hero_headline_highlight.trim();
  if (/^som\s+/i.test(highlight)) {
    highlight = highlight.replace(/^som\s+/i, "").trim();
  }
  const mid = copy.hero_headline_mid.trim();
  const bottom = copy.hero_headline_bottom.trim();

  if (/^AI\s+/i.test(top)) {
    if (!greenLead) greenLead = "AI";
    top = top.replace(/^AI\s+/i, "").trimEnd();
  }

  return {
    greenLead,
    top: top.trim(),
    highlight,
    mid,
    bottom: bottom || undefined,
  };
}

type HeroProps = {
  /** Serverhentet kopi — første paint matcher CMS uten tekst-hopp */
  initialCopy?: FrontpageCopy;
};

export default function Hero({ initialCopy = FRONT_PAGE_DEFAULTS }: HeroProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [copy, setCopy] = useState<FrontpageCopy>(initialCopy);
  const headline = parseHeroHeadlineFromCopy(copy);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("/api/frontpage-content");
        const json: unknown = await res.json();
        setCopy(mergeFrontpageDefaultsFromApi(json));
      } catch {
        // fallback til defaults
      }
    };
    void run();
  }, []);

  return (
    <section
      className="relative z-10 isolate flex flex-col overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #0a2e1a 0%, #061a10 60%, #071e12 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(21,128,61,0.28) 0%, transparent 62%)",
        }}
      />
      <div className="relative z-10 overflow-hidden px-6 pb-16 pt-24 lg:px-12 lg:pb-20 lg:pt-28">
        <NeuralNetworkBackground surface="dark" />
        <div className="relative z-10 mx-auto w-full max-w-3xl">
          <h1
            className="m-0 text-balance text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl xl:text-6xl"
            style={{ color: "#f2ede3" }}
          >
            {headline.greenLead ? (
              <>
                <span style={{ color: "#4ade80" }}>{headline.greenLead}</span>
                {" "}
              </>
            ) : null}
            {headline.top}
            {headline.highlight ? (
              <>
                {" "}
                <span style={{ color: "#4ade80" }}>{headline.highlight}</span>
              </>
            ) : null}
            {headline.mid ? ` ${headline.mid}` : null}
            {headline.bottom ? (
              <>
                <br />
                {headline.bottom}
              </>
            ) : null}
          </h1>
          {copy.hero_subheadline ? (
            <p
              className="mt-6 max-w-[65ch] text-sm leading-relaxed"
              style={{ color: "rgba(242,237,227,0.82)" }}
            >
              {copy.hero_subheadline}
            </p>
          ) : null}
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="focus-ring-light inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-8 py-3.5 text-base font-bold transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: "#f59e0b",
                color: "#052016",
                boxShadow: "0 4px 24px rgba(245,158,11,0.45)",
              }}
            >
              {copy.hero_cta_text}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <p className="m-0 text-sm leading-relaxed" style={{ color: "rgba(242,237,227,0.62)" }}>
              {copy.hero_trust_line}
            </p>
          </div>
        </div>
      </div>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}

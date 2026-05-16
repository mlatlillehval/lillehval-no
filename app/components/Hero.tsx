"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import BookingModal from "./BookingModal";
import {
  FRONT_PAGE_DEFAULTS,
  mergeFrontpageDefaultsFromApi,
  type FrontpageCopy,
} from "../data/frontpageCopy";

const WHALE_SRC = "/lillehval-hval-snudd-v2.svg";
const JOURNEY_PATH_IMG =
  "/logo-manual-v1.1/Logo%20-%20Reise%20alene%20-%20transparent.svg";

type BulletSegment = { text: string; highlight?: boolean };

const HERO_BULLETS_HEADING = "Vi leder deg trygt gjennom AI-reisen";

const HERO_BULLETS: BulletSegment[][] = [
  [
    { text: "AI-potensialet er stort", highlight: true },
    { text: ", men de færreste bedrifter vet hvor de skal begynne eller hva som faktisk er relevant for dem." },
  ],
  [
    { text: "Flere får øynene opp for AI", highlight: true },
    { text: " og ønsker å lære og forstå." },
  ],
  [
    { text: "Å navigere mulighetene krever " },
    { text: "tid og kompetanse", highlight: true },
    { text: " de fleste ikke har til overs i en travel hverdag." },
  ],
  [
    { text: "Med " },
    { text: "over 50 års samlet erfaring", highlight: true },
    { text: " innen forretningsutvikling, produktledelse og teknisk gjennomføring har vi " },
    { text: "kompetansen som trengs", highlight: true },
    { text: "." },
  ],
  [
    { text: "Vi fungerer som en " },
    { text: "praktisk guide", highlight: true },
    { text: " — ikke bare rådgivere, men " },
    { text: "partnere som navigerer landskapet sammen med deg", highlight: true },
    { text: "." },
  ],
  [
    { text: "Vi leverer " },
    { text: "skreddersydde løsninger", highlight: true },
    { text: " tilpasset din bransje, dine prosesser og dine faktiske behov." },
  ],
];

const JOURNEY_NODES = [
  { label: "Usikkerhet",    x: 2.5,  above: true,  color: "#D4840A", delay: "0s" },
  { label: "Erkjennelse",   x: 17.1, above: false, color: "#F59E0B", delay: "0.4s" },
  { label: "Nysgjerrighet", x: 34.7, above: true,  color: "#8AAD94", delay: "0.8s" },
  { label: "Klarhet",       x: 46.6, above: false, color: "#4A7A55", delay: "1.2s" },
  { label: "Mot",           x: 74.5, above: true,  color: "#1d6e3a", delay: "2.0s" },
  { label: "Handling",      x: 96.9, above: false, color: "#14532D", delay: "2.4s" },
] as const;

const HERO_JOURNEY_STORY =
  "Selskapets reise fra usikkerhet til Handling - Lillehval guider deg på veien";

function HeroJourneyLegend({ compact }: { compact?: boolean }) {
  return (
    <div
      style={{
        background: "rgba(6,20,12,0.72)",
        border: "1px solid rgba(138,173,148,0.18)",
        backdropFilter: "blur(10px)",
        borderRadius: "10px",
        padding: compact ? "8px 10px" : "6px 12px",
        display: "flex",
        flexDirection: "column",
        gap: compact ? "8px" : "6px",
      }}
    >
      <span
        className="text-balance"
        style={{
          fontSize: compact ? "10px" : "clamp(8px, 1.8vw, 11px)",
          fontWeight: 800,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(245,158,11,0.85)",
          lineHeight: 1.35,
        }}
      >
        Selskapers AI-reise fra Usikkerhet til Handling
      </span>
      <div
        className={
          compact
            ? "grid grid-cols-2 gap-x-2 gap-y-2"
            : "flex flex-wrap items-center gap-x-2 gap-y-1.5"
        }
      >
        {JOURNEY_NODES.map((node) => (
          <div key={node.label} className="flex items-center gap-1.5 min-w-0">
            <span
              style={{
                width: compact ? "6px" : "5px",
                height: compact ? "6px" : "5px",
                borderRadius: "50%",
                background: node.color,
                flexShrink: 0,
                display: "inline-block",
              }}
            />
            <span
              className="leading-tight"
              style={{
                fontSize: compact ? "11px" : "clamp(8px, 1.8vw, 12px)",
                fontWeight: 600,
                color: "rgba(242,237,227,0.6)",
              }}
            >
              {node.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}


type HeroProps = {
  /** Serverhentet kopi — første paint matcher CMS uten tekst-hopp */
  initialCopy?: FrontpageCopy;
};

export default function Hero({ initialCopy = FRONT_PAGE_DEFAULTS }: HeroProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [copy, setCopy] = useState<FrontpageCopy>(initialCopy);

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

  const {
    heroHeadlineGreenLead,
    heroHeadlineTop,
    heroHeadlineHighlight,
    heroHeadlineMid,
  } = useMemo(() => {
    let greenLead = copy.hero_headline_green_lead.trim();
    let top = copy.hero_headline_top.trimEnd().replace(/\s+som\s*$/i, "");
    let highlight = copy.hero_headline_highlight.trim();
    if (/^som\s+/i.test(highlight)) {
      highlight = highlight.replace(/^som\s+/i, "").trim();
    }
    const mid = copy.hero_headline_mid.trim();

    if (/^AI\s+/i.test(top)) {
      if (!greenLead) greenLead = "AI";
      top = top.replace(/^AI\s+/i, "").trimEnd();
    }

    top = top.trim();

    return {
      heroHeadlineGreenLead: greenLead,
      heroHeadlineTop: top,
      heroHeadlineHighlight: highlight,
      heroHeadlineMid: mid,
    };
  }, [
    copy.hero_headline_green_lead,
    copy.hero_headline_top,
    copy.hero_headline_highlight,
    copy.hero_headline_mid,
  ]);

  return (
    <section
      className="relative flex flex-col overflow-hidden"
      style={{ minHeight: "auto" }}
    >


      {/* ── TEXT CONTENT — to kolonner på desktop, én på mobil ── */}
      <div className="relative z-10 px-6 lg:px-12 pt-24 pb-16 lg:pt-28 lg:pb-24">
        {/* Myke lysflater — gir dybde og «svung» uten å dominere */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-none"
          aria-hidden
        >
          <div
            className="absolute -top-[18%] -left-[8%] h-[min(52vh,480px)] w-[min(72vw,560px)] rounded-full blur-3xl opacity-[0.62]"
            style={{
              background:
                "radial-gradient(circle at 40% 40%, rgba(159,199,170,0.55) 0%, rgba(232,226,212,0.2) 48%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-[8%] -right-[6%] h-[min(38vh,380px)] w-[min(48vw,420px)] rounded-full blur-3xl opacity-[0.42]"
            style={{
              background:
                "radial-gradient(circle at 60% 50%, rgba(245,158,11,0.28) 0%, transparent 62%)",
            }}
          />
          <div
            className="absolute bottom-[-5%] left-[18%] right-[12%] h-[160px] blur-2xl opacity-[0.28]"
            style={{
              background:
                "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(21,128,61,0.22) 0%, transparent 72%)",
            }}
          />
        </div>

        <div className="relative w-full max-w-5xl mx-auto">

          {/* TO kolonner — grid gir garantert lik høyde på desktop */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] xl:grid-cols-[minmax(0,1fr)_24rem] lg:gap-x-16 lg:gap-y-0 lg:items-stretch">

            {/* VENSTRE: Eyebrow + Headline + Paragraph */}
            <div
              className="flex min-h-0 min-w-0 flex-col gap-5 rounded-2xl border border-[rgba(21,128,61,0.14)] bg-[rgba(252,253,252,0.97)] px-5 py-6 text-left shadow-[0_12px_40px_rgba(21,128,61,0.08)] backdrop-blur-sm border-l-[5px] border-l-[#15803d] sm:px-7 sm:py-7"
            >

              {/* Eyebrow */}
              <div className="flex items-center gap-2.5 animate-hero-fold hero-fold-delay-1">
                <span className="animate-rav-pulse w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#f59e0b" }} />
                <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#15803d" }}>
                  {copy.hero_badge_text}
                </span>
              </div>

              {/* Headline */}
              <h1
                className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-[1.08] tracking-tight animate-hero-fold hero-fold-delay-2"
                style={{ color: "#052e16" }}
              >
                {heroHeadlineGreenLead ? (
                  <><span style={{ color: "rgba(159, 199, 170, 1)" }}>{heroHeadlineGreenLead}</span>{" "}</>
                ) : null}
                <span>{heroHeadlineTop}</span>
                {" "}
                <span style={{ color: "rgba(159, 199, 170, 1)" }}>{heroHeadlineHighlight}</span>
                <br />
                {heroHeadlineMid}
                {copy.hero_headline_bottom.trim() ? (
                  <><br />{copy.hero_headline_bottom}</>
                ) : null}
              </h1>

              {/* ── CTA + Trust — festes til bunnen ved like høye kort ── */}
              <div
                className="mt-auto flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl p-6 animate-hero-fold hero-fold-delay-3 transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(245,158,11,0.12)]"
                style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}
              >
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95 text-center flex-shrink-0 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803d]"
                  style={{ background: "#f59e0b", color: "#052016", boxShadow: "0 4px 24px rgba(245,158,11,0.45)", maxWidth: "min(100%, 22rem)", lineHeight: "1.3" }}
                >
                  {copy.hero_cta_text}
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <p className="text-sm m-0 leading-relaxed" style={{ color: "rgba(26,51,32,0.6)" }}>
                  {copy.hero_trust_line}
                </p>
              </div>

            </div>

            {/* HØYRE: Bullets — strekker seg til samme høyde som venstre */}
            <div className="flex min-h-0 min-w-0 flex-col gap-4 rounded-2xl border border-[rgba(21,128,61,0.12)] bg-[rgba(252,253,252,0.96)] px-4 py-5 backdrop-blur-sm shadow-[0_8px_32px_rgba(21,128,61,0.06)] sm:px-5 sm:py-6 h-full">
              <p className="m-0 shrink-0 text-xs font-bold uppercase tracking-widest animate-hero-fold hero-fold-delay-3" style={{ color: "#15803d" }}>
                {HERO_BULLETS_HEADING}
              </p>
              <ul className="hero-bullets-stagger m-0 flex min-h-0 flex-1 list-none flex-col justify-start gap-2.5 pl-0">
                {HERO_BULLETS.map((segments, i) => (
                  <li key={i} className="flex animate-hero-fold items-start gap-2.5">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: "#15803d" }}
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
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* ── HORISONTAL ILLUSTRASJONSBAR ── */}
      <div
        className="relative z-10 w-full flex-shrink-0 min-h-[340px] sm:min-h-0"
        style={{
          height: "clamp(340px, 42vw, 400px)",
          marginTop: "clamp(-28px, -3vw, -16px)",
        }}
      >
        <div
          className="w-full h-full relative overflow-hidden pb-[88px] sm:pb-0"
          style={{
            background: "linear-gradient(160deg, #0a2e1a 0%, #061a10 60%, #071e12 100%)",
            borderRadius: "28px 28px 0 0",
          }}
        >
          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 55% 80%, rgba(21,128,61,0.18) 0%, transparent 70%), radial-gradient(ellipse 30% 60% at 10% 50%, rgba(245,158,11,0.06) 0%, transparent 60%)",
            }}
          />

          {/* Story label — kompakt på mobil, full bredde på desktop */}
          <div
            className="absolute z-20 animate-hero-up left-3 right-3 top-2.5 max-w-[min(42rem,calc(100vw-1.5rem))] text-balance leading-snug sm:left-[max(1rem,calc(50%-32rem))] sm:right-auto sm:top-3.5 sm:max-w-[min(48rem,calc(100vw-3rem))]"
            style={{
              fontSize: "clamp(9px, 2.4vw, 11px)",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(138,173,148,0.45)",
              animationDelay: "0.4s",
            }}
          >
            {HERO_JOURNEY_STORY}
          </div>

          {/* Illustration: hval + reise */}
          <div
            className="absolute flex items-center justify-center gap-2 sm:gap-4 w-[94%] sm:w-[80%] top-[38%] sm:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:-translate-y-[56%]"
            style={{ zIndex: 10 }}
          >
            {/* Hval — liten på mobil, større på desktop */}
            <div style={{ position: "relative", width: "clamp(95px, 14vw, 200px)", flexShrink: 0 }}>
              <div
                className="animate-glow-pulse"
                style={{ position: "absolute", bottom: "-20%", left: "0px", right: "0px", height: "50%", background: "radial-gradient(ellipse 80% 60% at 55% 50%, rgba(21,128,61,0.28) 0%, transparent 70%)", zIndex: 10, pointerEvents: "none" }}
              />
              <div style={{ transform: "scaleX(-1)" }}>
                <Image
                  src={WHALE_SRC}
                  alt="Lillehval hvalen"
                  width={400}
                  height={223}
                  sizes="(max-width: 640px) 95px, min(200px, 14vw)"
                  className="animate-whale-front block w-full relative z-[11]"
                  style={{
                    filter:
                      "drop-shadow(0 16px 32px rgba(21,128,61,0.35)) drop-shadow(0 4px 12px rgba(0,0,0,0.5)) brightness(0.92) saturate(0.8)",
                  }}
                  priority={false}
                />
              </div>
            </div>

            {/* Reisepaden med etikettar */}
            <div
              className="flex-1 sm:flex-none"
              style={{
                width: undefined,
                maxWidth: "clamp(260px, 28vw, 420px)",
                minWidth: 0,
                flexShrink: 0,
                position: "relative",
                paddingTop: "clamp(24px, 4vw, 40px)",
                paddingBottom: "clamp(60px, 8vw, 90px)",
                paddingLeft: "8px",
                paddingRight: "28px",
              }}
            >
              {/* Etikettar: skjult på mobil, vises frå sm og opp */}
              {JOURNEY_NODES.map((node) => (
                <div
                  key={node.label}
                  className="animate-node-float hidden sm:flex"
                  style={{
                    position: "absolute",
                    left: `${node.x}%`,
                    ...(node.above ? { top: "0px" } : { bottom: "38px" }),
                    transform: "translateX(-50%)",
                    zIndex: 20,
                    flexDirection: node.above ? "column" : "column-reverse",
                    alignItems: "center",
                    gap: "2px",
                    animationDelay: node.delay,
                  }}
                >
                  <div
                    style={{
                      background: "rgba(6,20,12,0.88)",
                      border: `1px solid ${node.color}44`,
                      backdropFilter: "blur(8px)",
                      borderRadius: "100px",
                      padding: "4px 10px",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "rgba(242,237,227,0.85)",
                      whiteSpace: "nowrap",
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                      letterSpacing: "0.03em",
                    }}
                  >
                    <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: node.color, flexShrink: 0, display: "inline-block", boxShadow: `0 0 4px ${node.color}99` }} />
                    {node.label}
                  </div>
                  <div style={{ width: "1px", height: "22px", background: `linear-gradient(${node.above ? "to bottom" : "to top"}, ${node.color}88, transparent)`, flexShrink: 0 }} />
                </div>
              ))}
              <Image
                src={JOURNEY_PATH_IMG}
                alt="Reisepaden fra usikkerhet til klarhet"
                width={560}
                height={180}
                sizes="(max-width: 640px) 100vw, min(420px, 28vw)"
                className="animate-journey-in block w-full relative z-[12]"
                style={{
                  filter:
                    "drop-shadow(0 4px 16px rgba(245,158,11,0.2)) brightness(1.15)",
                }}
                loading="lazy"
              />

              {/* AI-implementeringsindikator */}
              <div style={{ position: "absolute", bottom: "0px", left: "2.5%", right: "3.1%", zIndex: 19 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(212,132,10,0.7)", letterSpacing: "0.06em", textTransform: "uppercase" }}>0 % AI</span>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(20,83,45,0.9)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Full implementering</span>
                </div>
                <div style={{ height: "3px", borderRadius: "100px", background: "linear-gradient(to right, #D4840A, #F59E0B 20%, #8AAD94 50%, #4A7A55 75%, #14532D)" }} />
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "3px" }}>
                  <span style={{ fontSize: "10px", color: "rgba(138,173,148,0.5)", letterSpacing: "0.08em" }}>mer AI →</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ocean overlay */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{ height: "30%", background: "linear-gradient(to top, rgba(4,14,8,0.6) 0%, transparent 100%)", zIndex: 15 }}
          />

          {/* Legend — tydelig på mobil (2 kolonner), som på desktop */}
          <div className="absolute z-20 bottom-3 left-3 right-3 max-w-full sm:left-[max(1rem,calc(50%-32rem))] sm:right-auto sm:max-w-[min(52rem,calc(100vw-2rem))]">
            <div className="sm:hidden">
              <HeroJourneyLegend compact />
            </div>
            <div className="hidden sm:block">
              <HeroJourneyLegend />
            </div>
          </div>
        </div>
      </div>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}

import Link from "next/link";
import SectionKicker from "./SectionKicker";
import AIBlogSection from "./AIBlogSection";
import AiAktualitetIntroBoxes from "./AiAktualitetIntroBoxes";
import AiAktualitetInnholdOversikt from "./AiAktualitetInnholdOversikt";
import NewsletterSection from "./NewsletterSection";
import ShortsSection from "./ShortsSection";
import { AI_BUSINESS_USE_CASES } from "../data/aiBusinessUseCases";
import {
  SHOW_AI_AKTUALITET_BLOG,
  SHOW_AI_AKTUALITET_INNHOLD_OVERSIKT,
  SHOW_AI_AKTUALITET_INTRO_BOXES,
  SHOW_AI_AKTUALITET_NEWSLETTER,
  SHOW_AI_AKTUALITET_SHORTS,
} from "../data/contentFlags";
import {
  AI_NEWS_MAX_PER_SOURCE,
  AI_NEWS_SPOTLIGHT_TOTAL,
  formatCurrentNewsMonthLabelOslo,
  getCachedNews,
  NewsItem,
} from "../lib/fetchNews";

const ILL = "holdOppdatertIll";

/** Kalender + «10 treff» + strømmer fra Norge og verden inn i én månedlig liste */
function SisteAiNyheterIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={`${ILL}Flow`} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="55%" stopColor="#6b9b7d" />
          <stop offset="100%" stopColor="#0a2e1a" />
        </linearGradient>
        <linearGradient id={`${ILL}Paper`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.98)" />
          <stop offset="100%" stopColor="rgba(232,242,234,0.92)" />
        </linearGradient>
      </defs>
      {/* Kalenderkort */}
      <rect x="14" y="22" width="102" height="100" rx="12" fill={`url(#${ILL}Paper)`} stroke="#14532d" strokeWidth="1.35" />
      <path d="M34 22v12M66 22v12M94 22v12" stroke="rgba(21,128,61,0.35)" strokeWidth="3" strokeLinecap="round" />
      <rect x="26" y="42" width="78" height="2" rx="1" fill="rgba(21,128,61,0.12)" />
      <text x="65" y="82" textAnchor="middle" fill="#15803d" fontSize="44" fontWeight="800" fontFamily="system-ui, sans-serif" dominantBaseline="middle">
        10
      </text>
      <text
        x="65"
        y="112"
        textAnchor="middle"
        fill="rgba(26,51,32,0.45)"
        fontSize="9"
        fontWeight="600"
        fontFamily="system-ui, sans-serif"
        letterSpacing="0.06em"
        dominantBaseline="middle"
      >
        TREFF
      </text>
      {/* Norge (merke) */}
      <circle cx="146" cy="47" r="16" fill="#1e3a8a" stroke="#0f172a" strokeWidth="1" />
      <text x="146" y="51" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="800" fontFamily="system-ui, sans-serif">
        N
      </text>
      {/* Globus */}
      <circle cx="278" cy="48" r="26" fill="rgba(255,255,255,0.65)" stroke="#14532d" strokeWidth="1.2" />
      <ellipse cx="278" cy="48" rx="10" ry="26" stroke="rgba(21,128,61,0.28)" strokeWidth="1" />
      <path d="M252 48h52" stroke="rgba(21,128,61,0.2)" strokeWidth="0.9" />
      <circle cx="278" cy="48" r="3.5" fill="#f59e0b" opacity="0.9" />
      {/* Sammenløp mot midt */}
      <path
        d="M168 52c24 8 40 28 52 52"
        stroke={`url(#${ILL}Flow)`}
        strokeWidth="2.25"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />
      <path
        d="M252 58c-18 10-32 28-40 48"
        stroke={`url(#${ILL}Flow)`}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.65"
      />
      {/* Månedens liste (én kolonne) */}
      <rect x="188" y="78" width="118" height="48" rx="12" fill="rgba(255,255,255,0.55)" stroke="rgba(21,128,61,0.22)" strokeWidth="1.2" />
      <path d="M204 94h86M204 106h64M204 118h72" stroke="#1a3320" strokeWidth="2" strokeLinecap="round" opacity="0.12" />
      <path d="M204 94h86" stroke={`url(#${ILL}Flow)`} strokeWidth="2.25" strokeLinecap="round" opacity="0.55" />
      <circle cx="200" cy="112" r="5" fill="#15803d" opacity="0.55" />
      <circle cx="292" cy="88" r="3.5" fill="#f59e0b" opacity="0.65" />
    </svg>
  );
}

function formatUpdatedAt(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("nb-NO", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Åpner «${item.title}» hos ${item.source} (ekstern nettside)`}
      className="green-news-card flex flex-col gap-2 p-4 rounded-xl"
    >
      <p className="news-title text-sm font-semibold text-[#1a3320] leading-snug transition-colors">
        {item.title}
      </p>
      <div className="flex items-center justify-between flex-wrap gap-2 mt-auto pt-1">
        <div className="flex items-center gap-2 min-w-0">
          {item.region ? (
            <span
              className="shrink-0 text-[10px] font-extrabold uppercase tracking-wide px-1.5 py-0.5 rounded"
              style={{
                background: item.region === "norway" ? "rgba(30,58,138,0.12)" : "rgba(21,128,61,0.12)",
                color: item.region === "norway" ? "#1e3a8a" : "#15803d",
              }}
            >
              {item.region === "norway" ? "Norge" : "Verden"}
            </span>
          ) : null}
          <span className="text-xs font-medium truncate" style={{ color: "#15803d" }}>{item.source}</span>
        </div>
        <span className="text-xs shrink-0" style={{ color: "rgba(26,51,32,0.4)" }}>{item.pubDate}</span>
      </div>
    </a>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-2 text-center rounded-xl border border-dashed px-4" style={{ borderColor: "rgba(21,128,61,0.2)" }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="rgba(34,139,70,0.4)" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
      <p className="text-sm" style={{ color: "rgba(26,51,32,0.4)" }}>Kunne ikke hente nyheter akkurat nå. Prøv igjen senere.</p>
    </div>
  );
}

export default async function NewsSection() {
  const { items, updatedAt } = await getCachedNews();
  const newsMonthLabel = formatCurrentNewsMonthLabelOslo();

  const showAnyAiAktualitetBlock =
    SHOW_AI_AKTUALITET_INTRO_BOXES ||
    SHOW_AI_AKTUALITET_NEWSLETTER ||
    SHOW_AI_AKTUALITET_SHORTS ||
    SHOW_AI_AKTUALITET_BLOG ||
    SHOW_AI_AKTUALITET_INNHOLD_OVERSIKT;

  return (
    <section id="siste-nyheter" className="py-24 px-6" style={{ background: "#e8e2d4" }}>
      <div className="max-w-7xl mx-auto">
        {/* Page header */}
        <div className="mb-8 text-center">
          <SectionKicker className="!mb-0">AI Aktualitet</SectionKicker>
          {!showAnyAiAktualitetBlock ? (
            <p className="mt-3 mx-auto max-w-lg text-sm leading-relaxed" style={{ color: "rgba(26,51,32,0.55)" }}>
              Her kommer snart flere kanaler og egne saker. Inntil videre finner du ferske AI-nyheter under.
            </p>
          ) : null}
        </div>

        {SHOW_AI_AKTUALITET_INTRO_BOXES ? <AiAktualitetIntroBoxes /> : null}
        {SHOW_AI_AKTUALITET_NEWSLETTER ? <NewsletterSection /> : null}
        {SHOW_AI_AKTUALITET_SHORTS ? <ShortsSection /> : null}
        {SHOW_AI_AKTUALITET_BLOG ? <AIBlogSection /> : null}

        {/* Hold deg oppdatert */}
        <div className="mb-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <SectionKicker className="!mb-2">Hold deg oppdatert</SectionKicker>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1a3320]">
                Siste AI-nyheter
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm shrink-0" style={{ color: "rgba(26,51,32,0.4)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Oppdatert: {formatUpdatedAt(updatedAt)}
            </div>
          </div>

          {/* Månedens 10 nyheter — illustrasjon + tekst + rutenett */}
          <div
            className="rounded-2xl border px-4 py-6 sm:px-8 sm:py-8"
            style={{
              borderColor: "rgba(21,128,61,0.16)",
              background: "linear-gradient(135deg, rgba(255,255,255,0.78) 0%, rgba(237,244,234,0.42) 50%, rgba(255,255,255,0.6) 100%)",
              boxShadow: "0 6px 28px rgba(10,46,26,0.07)",
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-8 mb-8">
              <SisteAiNyheterIllustration className="mx-auto w-full max-w-[17.5rem] h-36 shrink-0 lg:mx-0" />
              <div className="space-y-3 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 justify-between">
                  <p className="text-sm font-extrabold text-[#1a3320]">Månedens utvalg</p>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(34,139,70,0.1)", color: "#15803d" }}>
                    Topp {AI_NEWS_SPOTLIGHT_TOTAL}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(26,51,32,0.58)" }}>
                  Vi fremhever <strong style={{ color: "#1a3320" }}>ti saker totalt</strong> for <strong style={{ color: "#1a3320" }}>{newsMonthLabel}</strong> (norsk tid), med veksling mellom norske og internasjonale kilder der begge har treff. Tema: <strong style={{ color: "#1a3320" }}>AI-strategi, AI-implementering eller AI-drevet prosessautomatisering</strong>, med <strong style={{ color: "#1a3320" }}>maks {AI_NEWS_MAX_PER_SOURCE} per kilde</strong>. Kortene åpnes hos utgiver; betalingsmur kan gjelde. Pluss-markerte treff i RSS filtreres der vi ser det.
                </p>
              </div>
            </div>

            {items.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {items.map((item) => (
                  <NewsCard key={item.link} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Verdi for bedrifter — under Månedens utvalg, fortsatt under Siste AI-nyheter */}
          <div className="space-y-5 pt-8 border-t" style={{ borderColor: "rgba(21,128,61,0.14)" }}>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <SectionKicker className="!mb-2">Verdi for bedrifter</SectionKicker>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#1a3320] leading-tight">
                  Hvordan AI kan hjelpe virksomheten
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0" style={{ background: "rgba(34,139,70,0.1)", color: "#15803d" }}>
                Topp {AI_BUSINESS_USE_CASES.length}
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-3xl" style={{ color: "rgba(26,51,32,0.58)" }}>
              Typiske bruksområder som støtter opp under de samme temaene som nyhetsutvalget — strategi, implementering og prosessautomatisering — når AI kombineres med tydelig eierskap, datakvalitet og menneskelig kvalitetssikring.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {AI_BUSINESS_USE_CASES.map((uc, index) => (
                <div
                  key={uc.title}
                  className="flex gap-3 p-4 rounded-xl border"
                  style={{
                    borderColor: "rgba(21,128,61,0.14)",
                    background: "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(237,244,234,0.35) 100%)",
                    boxShadow: "0 2px 12px rgba(10,46,26,0.04)",
                  }}
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold"
                    style={{ background: "rgba(34,139,70,0.12)", color: "#15803d" }}
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  <div className="min-w-0 space-y-1">
                    <p className="text-sm font-bold text-[#1a3320] leading-snug">{uc.title}</p>
                    <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "rgba(26,51,32,0.55)" }}>
                      {uc.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/ai-tjenester"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-opacity hover:opacity-90 w-full sm:w-auto"
              style={{ background: "#15803d", color: "#f8faf7" }}
            >
              Se hvordan Lillehval kan bistå
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <p className="mt-8 max-w-2xl mx-auto text-center text-xs leading-relaxed" style={{ color: "rgba(26,51,32,0.45)" }}>
          Filtreringen bygger på tittel og ingress fra RSS mot temaene AI-strategi, AI-implementering og AI-drevet prosessautomatisering; kjente pluss-URL-er fjernes der RSS avslører det. Saker uten gyldig publiseringsdato i RSS vises ikke.
        </p>

        {SHOW_AI_AKTUALITET_INNHOLD_OVERSIKT ? <AiAktualitetInnholdOversikt /> : null}
      </div>
    </section>
  );
}

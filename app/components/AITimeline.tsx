import Image from "next/image";
import AiMulighetene from "./AiMulighetene";

type EraStatus = "past" | "now" | "future";

type Era = {
  title: string;
  period: string;
  coreLabel: string;
  coreStyle: "light" | "generative" | "agents";
  description: string;
  tags: string[];
  status: EraStatus;
  imageSrc: string;
  imageAlt: string;
  columnHighlight?: boolean;
};

const darkGreen = "#062e1f";

const eras: Era[] = [
  {
    title: "Regelbasert AI",
    period: "1950–1990-tallet",
    coreLabel: "Ekspertsystemer",
    coreStyle: "light",
    description:
      "AI følger regler mennesker har skrevet («Hvis X, gjør Y»). Begrenset til det programmererne forutså.",
    tags: ["Ekspertsystemer", "Sjakk", "ELIZA", "Deep Blue", "Medisinske diagnoseverktøy", "Skatterådgivning"],
    status: "past",
    imageSrc: "/era-epoke-1-akvarell.png",
    imageAlt: "Akvarell: regelbasert AI og ekspertsystemer",
  },
  {
    title: "Maskinlæring",
    period: "2000–2015",
    coreLabel: "Lærende systemer",
    coreStyle: "light",
    description:
      "AI lærer mønstre fra data uten eksplisitte regler. Mer data gir bedre resultater. Spesialisert per oppgave.",
    tags: ["Anbefalingssystemer", "Spam-filter", "Netflix", "Google Search", "Kredittvurdering", "Bilgjenkjenning"],
    status: "past",
    imageSrc: "/era-epoke-2-akvarell.png",
    imageAlt: "Akvarell: maskinlæring og data",
  },
  {
    title: "Dyp læring",
    period: "2015–2022",
    coreLabel: "Nevrale nettverk",
    coreStyle: "light",
    description:
      "Nevrale nett med mange lag løser oppgaver som bildegjenkjenning og tale med presisjon på menneskelig nivå.",
    tags: ["Ansiktsgjenkjenning", "Google Translate", "AlphaGo", "Siri", "DALL·E 1", "GPT-2"],
    status: "past",
    imageSrc: "/era-epoke-3-akvarell.png",
    imageAlt: "Akvarell: dyp læring og nevrale nett",
  },
  {
    title: "Generativ AI",
    period: "2022–2026",
    coreLabel: "Chat Era → Vibe Coding",
    coreStyle: "generative",
    description:
      "AI forstår og produserer språk, kode og bilder. Verktøy som ChatGPT og Claude lar én person bygge det som før krevde et helt team.",
    tags: ["ChatGPT", "Claude", "Cursor", "Gemini", "Midjourney", "GitHub Copilot"],
    status: "now",
    columnHighlight: true,
    imageSrc: "/era-epoke-4-akvarell.png",
    imageAlt: "Akvarell: generativ AI",
  },
  {
    title: "Autonome agenter",
    period: "2026 →",
    coreLabel: "General Agents Era",
    coreStyle: "agents",
    description:
      "AI planlegger og utfører oppgaver over tid uten konstant tilsyn. Kan browse, skrive kode og koordinere andre agenter.",
    tags: ["OpenAI Agents", "Manus", "Claude", "Devin", "Operator", "AutoGPT"],
    status: "future",
    imageSrc: "/era-epoke-5-akvarell.png",
    imageAlt: "Akvarell: autonome AI-agenter",
  },
];

function timelineSegmentColor(status: EraStatus): string {
  if (status === "now") return "rgba(34,197,94,0.85)";
  if (status === "future") return "rgba(21,128,61,0.75)";
  return "rgba(100,116,139,0.45)";
}

function TimelineLine({
  color,
  rounded,
}: {
  color: string;
  rounded?: "left" | "right";
}) {
  return (
    <div
      className={`h-0.5 flex-1 min-w-[4px] ${rounded === "left" ? "rounded-l-full" : ""} ${rounded === "right" ? "rounded-r-full" : ""}`}
      style={{ background: `linear-gradient(90deg, ${color}, ${color})` }}
      aria-hidden
    />
  );
}

function TimelineNode({ status }: { status: EraStatus }) {
  const bg =
    status === "now" ? "#eab308" : status === "future" ? "#15803d" : "#94a3b8";
  const ring = status === "now" ? "ring-2 ring-amber-200/80" : "ring-2 ring-white";
  return (
    <span
      className={`relative z-[1] inline-flex h-3 w-3 shrink-0 rounded-full ${ring} shadow-sm`}
      style={{ background: bg }}
      aria-hidden
    />
  );
}

/** Horisontal tidslinje: strek + prikk per kolonne (kun xl, linjer møtes mellom boksene) */
function EraTimelineCap({
  index,
  total,
  status,
}: {
  index: number;
  total: number;
  status: EraStatus;
}) {
  const c = timelineSegmentColor(status);

  return (
    <div className="flex w-full min-w-0 items-center gap-0 px-0.5">
      <div className="flex min-w-0 flex-1 items-center">
        {index > 0 ? (
          <TimelineLine color={c} rounded={index === 1 ? "left" : undefined} />
        ) : null}
      </div>
      <div className="flex shrink-0 items-center justify-center px-0.5">
        <TimelineNode status={status} />
      </div>
      <div className="flex min-w-0 flex-1 items-center">
        {index < total - 1 ? (
          <TimelineLine color={c} rounded={index === total - 2 ? "right" : undefined} />
        ) : null}
      </div>
    </div>
  );
}

function CorePill({ era }: { era: Era }) {
  if (era.coreStyle === "generative") {
    return (
      <div
        className="rounded-full px-3 py-2.5 text-center text-xs sm:text-sm font-bold leading-snug border-2"
        style={{
          borderColor: "#15803d",
          color: "#15803d",
          background: "rgba(34, 197, 94, 0.08)",
        }}
      >
        {era.coreLabel}
      </div>
    );
  }
  if (era.coreStyle === "agents") {
    return (
      <div
        className="rounded-full px-3 py-2.5 text-center text-xs sm:text-sm font-bold text-white"
        style={{ background: darkGreen }}
      >
        {era.coreLabel}
      </div>
    );
  }
  return (
    <div
      className="rounded-full px-3 py-2.5 text-center text-xs sm:text-sm font-semibold border"
      style={{
        borderColor: "rgba(26,51,32,0.2)",
        color: "#1a3320",
        background: "rgba(255,255,255,0.7)",
      }}
    >
      {era.coreLabel}
    </div>
  );
}

function EraCard({
  era,
  stepIndex,
  showMobileRail,
}: {
  era: Era;
  stepIndex: number;
  showMobileRail: boolean;
}) {
  return (
    <div
      className={`relative flex h-full min-h-0 flex-row gap-3 sm:gap-4 xl:flex-col xl:gap-0 ${
        showMobileRail ? "xl:pl-0" : ""
      }`}
    >
      {/* Vertikal tidslinje: mobil / tablet */}
      {showMobileRail && (
        <div className="flex shrink-0 flex-col items-center self-stretch pt-1 xl:hidden" aria-hidden>
          <TimelineNode status={era.status} />
          {stepIndex < eras.length - 1 ? (
            <div
              className="mt-1 w-0.5 flex-1 min-h-[28px] rounded-full"
              style={{
                background: "linear-gradient(to bottom, rgba(21,128,61,0.35), rgba(21,128,61,0.12))",
              }}
            />
          ) : null}
        </div>
      )}

      <div
        className={`flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-2xl ${
          era.columnHighlight ? "ring-2 ring-[#15803d] ring-offset-2 ring-offset-white" : ""
        }`}
        style={{
          background: era.columnHighlight ? "rgba(34,197,94,0.06)" : "#ffffff",
          border: era.columnHighlight ? "1px solid rgba(21,128,61,0.25)" : "1px solid rgba(26,51,32,0.08)",
          boxShadow: "0 1px 3px rgba(6,46,31,0.06)",
        }}
      >
        <div className="relative h-28 w-full shrink-0 sm:h-32 overflow-hidden bg-[#eef2ec]">
          <Image
            src={era.imageSrc}
            alt={era.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 18vw"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(6,46,31,0.06) 0%, transparent 45%, rgba(255,255,255,0.15) 100%)",
            }}
          />
        </div>

        <div className="flex flex-1 flex-col min-h-0 gap-4 p-4 sm:p-5">
          <div>
            <h2 className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wide text-[#1a3320] leading-snug">
              {era.title}
            </h2>
            <p className="text-xs font-semibold mt-1" style={{ color: "rgba(26,51,32,0.45)" }}>
              {era.period}
            </p>
          </div>

          <div>
            <CorePill era={era} />
          </div>

          <p
            className="flex-1 text-sm leading-relaxed"
            style={{ color: "rgba(26,51,32,0.72)" }}
          >
            {era.description}
          </p>

          {/* Tags + status — mt-auto + fixed pill height aligns border-t across all cards */}
          <div className="mt-auto flex w-full flex-col gap-3 border-t border-[rgba(6,46,31,0.08)] pt-3">
            <div className="flex h-[8rem] flex-wrap content-start gap-2 overflow-hidden">
              {era.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold"
                  style={{
                    background: "rgba(6,46,31,0.06)",
                    color: "#1a3320",
                    border: "1px solid rgba(26,51,32,0.1)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex min-h-[1.75rem] items-center">
              {era.status === "now" && (
                <>
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ background: "#eab308" }}
                    />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#eab308]" />
                  </span>
                  <span className="ml-2 text-xs font-bold" style={{ color: "#a16207" }}>
                    Vi er her nå
                  </span>
                </>
              )}
              {era.status === "future" && (
                <span className="text-xs font-bold" style={{ color: "#15803d" }}>
                  → Fremtiden skjer nå
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AITimeline() {
  return (
    <section id="ai-forklart" className="bg-white py-16 sm:py-24 px-4 sm:px-6 overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-10 sm:mb-14 max-w-3xl mx-auto">
          <span
            className="inline-block mb-3 text-xs sm:text-sm font-bold uppercase tracking-[0.2em]"
            style={{ color: "#15803d" }}
          >
            AI Forklart
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a3320] leading-tight">
            AI har vært her lenge. Men nå er noe <span style={{ color: "#15803d" }}>annerledes.</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg leading-relaxed" style={{ color: "rgba(26,51,32,0.65)" }}>
            Fra regelbaserte systemer til agenter som handler på egenhånd.
          </p>
        </div>

        {/* Tidslinje over boksene — desktop (xl) */}
        <div
          className="mb-3 hidden xl:grid xl:grid-cols-5 xl:gap-3"
          aria-hidden
        >
          {eras.map((era, i) => (
            <div key={`tl-${era.title}`} className="flex min-h-[2rem] flex-col justify-end pb-1">
              <EraTimelineCap index={i} total={eras.length} status={era.status} />
            </div>
          ))}
        </div>
        <div className="mb-2 hidden xl:grid xl:grid-cols-5 xl:gap-3" aria-hidden>
          {eras.map((era) => (
            <div key={`stem-${era.title}`} className="flex justify-center">
              <div
                className="h-4 w-px rounded-full"
                style={{
                  background: "linear-gradient(to bottom, rgba(21,128,61,0.45), rgba(21,128,61,0.08))",
                }}
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 items-stretch sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-3">
          {eras.map((era, i) => (
            <div key={era.title} className="h-full min-h-0">
              <EraCard era={era} stepIndex={i} showMobileRail />
            </div>
          ))}
        </div>




        <AiMulighetene />
      </div>
    </section>
  );
}

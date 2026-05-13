const STAGES = [
  { short: "Bevissthet", num: 1, caption: "AI er noe vi burde se på.", tone: "muted" as const },
  { short: "Fornektelse", num: 2, caption: "Det er ikke relevant for oss.", tone: "red" as const },
  { short: "Aksept", num: 3, caption: "Ok, kanskje vi bør prøve noe.", tone: "orange" as const },
  { short: "Utforskning", num: 4, caption: "Vi tester litt her og der.", tone: "tan" as const },
  { short: "Handling", num: 5, caption: "Vi setter det i system.", tone: "green" as const },
  { short: "Gevinst", num: 6, caption: "AI er en del av hverdagen.", tone: "greenBright" as const },
];

/** Med Lillehval — grønn linje */
const SERIES_LILLEHVAL = [30, 18, 38, 62, 82, 95];
/** Uten ekstern hjelp — grå stiplet */
const SERIES_UTEN = [28, 12, 18, 32, 48, 62];

const ORANGE_HELP_INDICES = [2, 3, 4];

const forest = "#15803d";
const greyLine = "#94a3b8";

/** CTA-bånd — mørkegrønn bakgrunn, #f59e0b på aksenttekst og knapp */
const ctaBannerBg = "#052016";
const ctaYellow = "#f59e0b";
const ctaButtonText = "#052016";
const legendAccent = "#f5a623";

/** Glatt kurve gjennom punktene (Catmull-Rom → kubisk Bézier). */
function pointsToSmoothPath(points: [number, number][]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0]![0]} ${points[0]![1]}`;
  const d: string[] = [`M ${points[0]![0]} ${points[0]![1]}`];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i > 0 ? points[i - 1]! : points[i]!;
    const p1 = points[i]!;
    const p2 = points[i + 1]!;
    const p3 = i + 2 < points.length ? points[i + 2]! : p2;
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    d.push(`C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2[0]} ${p2[1]}`);
  }
  return d.join(" ");
}

/** Numrert tittel i tekstboks — Aksept amber-500 (samme som CTA-aksent); Utforskning/Handling skoggrønn; Gevinst dyp grønn. */
function stageTitleClass(tone: (typeof STAGES)[number]["tone"]): string {
  switch (tone) {
    case "muted":
      return "text-stone-500";
    case "red":
      return "text-[rgba(180,117,8,1)]";
    case "orange":
      return "text-amber-500";
    case "tan":
      return "text-[rgba(21,128,61,1)]";
    case "green":
      return "text-[rgba(21,128,61,1)]";
    case "greenBright":
      return "text-[#14532d]";
    default:
      return "text-[#1a3320]";
  }
}

export default function AiAdopsjonReise() {
  const w = 640;
  const h = 260;
  const padL = 52;
  const padR = 20;
  const padT = 12;
  const padB = 8;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;

  const xAt = (i: number) => padL + (i / (STAGES.length - 1)) * plotW;
  const yAt = (pct: number) => padT + ((100 - pct) / 100) * plotH;

  const ptsLillehval: [number, number][] = SERIES_LILLEHVAL.map((v, i) => [xAt(i), yAt(v)]);
  const ptsUten: [number, number][] = SERIES_UTEN.map((v, i) => [xAt(i), yAt(v)]);

  const pathLillehval = pointsToSmoothPath(ptsLillehval);
  const pathUten = pointsToSmoothPath(ptsUten);

  const gridLines = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  return (
    <div className="mt-14 sm:mt-16">
      <div className="mx-auto max-w-4xl text-center">
        <span
          className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] sm:text-sm"
          style={{ color: forest }}
        >
          AI Forklart
        </span>
        <h2 className="text-2xl font-extrabold tracking-tight text-[#1a3320] sm:text-3xl md:text-4xl">
          Bedrifters reise mot AI-adopsjon
        </h2>
        <p className="mt-4 text-base leading-relaxed sm:text-lg" style={{ color: "rgba(26,51,32,0.65)" }}>
          De fleste sitter lenge i midten. De som kommer seg videre, vinner.
        </p>
      </div>

      {/* Legend */}
      <div className="mx-auto mt-8 flex max-w-3xl flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-2">
        <div className="flex items-center gap-2">
          <span className="h-0.5 w-8 shrink-0 rounded-full" style={{ background: forest }} aria-hidden />
          <span className="text-sm font-semibold text-[#1a3320]">Med Lillehval</span>
        </div>
        <div className="flex items-center gap-2">
          <svg width={32} height={8} className="shrink-0" aria-hidden>
            <line
              x1={0}
              y1={4}
              x2={32}
              y2={4}
              stroke={greyLine}
              strokeWidth={2}
              strokeDasharray="5 4"
            />
          </svg>
          <span className="text-sm font-semibold text-[#1a3320]">Uten ekstern hjelp</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-flex h-3 w-3 shrink-0 rounded-full ring-2 ring-amber-200/90"
            style={{ background: legendAccent }}
            aria-hidden
          />
          <span className="text-sm font-semibold text-[#1a3320]">Lillehval kan hjelpe her</span>
        </div>
      </div>

      {/* Chart */}
      <div
        className="mx-auto mt-8 max-w-5xl overflow-x-auto rounded-2xl border px-2 py-4 sm:px-4 sm:py-6"
        style={{
          background: "linear-gradient(180deg, rgba(34,197,94,0.06) 0%, rgba(255,255,255,0.9) 100%)",
          borderColor: "rgba(21,128,61,0.12)",
        }}
      >
        <div className="flex min-w-[min(100%,520px)] items-stretch gap-0 sm:min-w-0">
          <div className="flex w-9 shrink-0 items-center justify-center sm:w-10">
            <span className="-rotate-90 whitespace-nowrap text-[9px] font-bold uppercase tracking-wider text-[#64748b] sm:text-[10px]">
              Organisatorisk beredskap
            </span>
          </div>
          <svg
            viewBox={`0 0 ${w} ${h}`}
            className="min-w-0 flex-1"
            role="img"
            aria-label="Linjediagram: organisatorisk beredskap fra bevissthet til gevinst. Grønn kurve viser reise med Lillehval, grå stiplet kurve uten ekstern hjelp."
          >
            <title>
              Med Lillehval stiger beredskapen raskere etter midtfasen enn uten ekstern hjelp.
            </title>

            {gridLines.map((g) => (
              <line
                key={g}
                x1={padL}
                x2={w - padR}
                y1={yAt(g)}
                y2={yAt(g)}
                stroke="rgba(148,163,184,0.35)"
                strokeWidth={g === 0 || g === 100 ? 1 : 0.6}
              />
            ))}

            {gridLines.map((g) => (
              <text
                key={`y-${g}`}
                x={padL - 8}
                y={yAt(g) + 4}
                textAnchor="end"
                fill="#94a3b8"
                fontSize={10}
                fontWeight={500}
              >
                {g}%
              </text>
            ))}

            <path
              fill="none"
              stroke={greyLine}
              strokeWidth={2.25}
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeDasharray="6 5"
              d={pathUten}
            />

            <path
              fill="none"
              stroke={forest}
              strokeWidth={2.75}
              strokeLinejoin="round"
              strokeLinecap="round"
              d={pathLillehval}
            />

            {SERIES_LILLEHVAL.map((v, i) => {
              const help = ORANGE_HELP_INDICES.includes(i);
              return (
                <circle
                  key={`gv-${i}`}
                  cx={xAt(i)}
                  cy={yAt(v)}
                  r={help ? 5.5 : 4}
                  fill={forest}
                  stroke={help ? legendAccent : "#fff"}
                  strokeWidth={help ? 3.25 : 1.5}
                />
              );
            })}

            {SERIES_UTEN.map((v, i) => (
              <circle key={`uv-${i}`} cx={xAt(i)} cy={yAt(v)} r={3.5} fill={greyLine} stroke="#fff" strokeWidth={1} />
            ))}
          </svg>
        </div>

        {/* Akse-etiketter + små tekstbokser under hvert punkt — samme horisontale spor som grafen */}
        <div className="mt-3 flex w-full min-w-0 gap-0 sm:mt-4">
          <div className="w-9 shrink-0 sm:w-10" aria-hidden />
          <div className="grid min-w-0 flex-1 grid-cols-2 items-stretch gap-x-2 gap-y-4 sm:grid-cols-3 sm:gap-x-3 lg:grid-cols-6">
            {STAGES.map((s) => (
              <div
                key={s.short}
                className="flex h-full min-w-0 flex-col items-center text-center"
              >
                <p className="shrink-0 text-[10px] font-bold leading-tight text-[#15803d] sm:text-[11px]">
                  {s.short}
                </p>
                <div
                  className="mt-1.5 flex w-full flex-1 flex-col rounded-lg border px-2 py-2.5 shadow-sm sm:px-2.5 sm:py-3"
                  style={{
                    borderColor: "rgba(21,128,61,0.14)",
                    background: "rgba(255,255,255,0.92)",
                    boxShadow: "0 1px 2px rgba(6,46,31,0.05)",
                  }}
                >
                  <p className={`shrink-0 text-[11px] font-bold leading-snug sm:text-xs ${stageTitleClass(s.tone)}`}>
                    {s.num}. {s.short}
                  </p>
                  <p className="mt-1.5 shrink-0 text-[11px] leading-snug text-neutral-700 sm:text-xs">{s.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA — mørkegrønn bånd, gyllen aksent (som referanse / Retningen fremover) */}
      <div
        className="mx-auto mt-10 flex max-w-5xl flex-col gap-5 rounded-2xl px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-8 sm:py-6"
        style={{ backgroundColor: ctaBannerBg }}
      >
        <p className="min-w-0 flex-1 text-sm leading-relaxed text-white/95 sm:text-base">
          <strong className="font-bold" style={{ color: ctaYellow }}>
            De fleste norske bedrifter sitter fast mellom fornektelse og aksept.
          </strong>{" "}
          <strong className="font-bold" style={{ color: ctaYellow }}>
            Lillehval hjelper deg
          </strong>
          <span className="text-white/95">
            {" "}
            å komme deg videre — raskere og tryggere enn på egenhånd.
          </span>
        </p>
        <a
          href="#kontakt"
          className="inline-flex shrink-0 items-center justify-center gap-1.5 self-start rounded-full bg-[#f59e0b] px-6 py-3 text-sm font-bold text-[#052016] shadow-md transition hover:brightness-[1.03] sm:self-center"
          style={{
            backgroundColor: "rgba(245, 158, 11, 1)",
            color: ctaButtonText,
          }}
        >
          Hvor er din bedrift?
          <span aria-hidden>↗</span>
        </a>
      </div>
    </div>
  );
}

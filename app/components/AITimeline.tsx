const eras = [
  {
    name: "Chat Era",
    years: "2023 – 2024",
    color: "#22c55e",
    bgColor: "rgba(34,197,94,0.08)",
    borderColor: "rgba(34,197,94,0.25)",
    textColor: "#4ade80",
    platform: "ChatGPT",
    platformBg: "linear-gradient(135deg, #15803d 0%, #22c55e 100%)",
    description:
      "AI ble tilgjengelig for alle. For første gang kunne hvem som helst stille et spørsmål og få et intelligent svar. ChatGPT nådde 100 millioner brukere på to måneder — raskere enn noe annet produkt i historien. Verden oppdaget hva AI faktisk kunne gjøre, og konkurransen eksploderte. Google, Meta, Anthropic og andre kastet seg inn i løpet.",
    tools: ["Perplexity", "Claude", "Grok", "Gemini"],
    status: "past",
  },
  {
    name: "Vibe Coding",
    years: "2025 – 2026",
    color: "#d97706",
    bgColor: "rgba(217,119,6,0.08)",
    borderColor: "rgba(217,119,6,0.3)",
    textColor: "#fbbf24",
    platform: "Claude Code",
    platformBg: "linear-gradient(135deg, #92400e 0%, #d97706 100%)",
    description:
      "Utviklere sluttet å skrive kode linje for linje — AI tok over. Verktøy som Cursor og Bolt gjorde det mulig for én person å bygge det som tidligere krevde et helt team. «Vibe coding» ble et begrep: beskriv hva du vil ha, og AI bygger det. Terskelen for å lage programvare falt dramatisk, og en ny generasjon gründere uten teknisk bakgrunn begynte å bygge egne produkter.",
    tools: ["Cursor", "Bolt", "Replit", "Lovable", "Vibecode", "Emergent", "Codex"],
    status: "now",
  },
  {
    name: "General Agents",
    years: "2026 →",
    color: "#4ade80",
    bgColor: "rgba(74,222,128,0.06)",
    borderColor: "rgba(74,222,128,0.2)",
    textColor: "#86efac",
    platform: "???",
    platformBg: "linear-gradient(135deg, #064e3b 0%, #059669 100%)",
    description:
      "AI begynner å handle på egenhånd. Ikke bare svare — men planlegge, ta beslutninger og utføre oppgaver over tid uten at noen holder i hånden. Agenter kan browse nettet, skrive kode, sende e-poster og koordinere andre agenter. Det vi visste om hva AI «ikke kunne» er i ferd med å bli utdatert. Dette er den fasen de fleste bedrifter ennå ikke har tatt inn over seg.",
    tools: ["OpenClaw", "cowork / Claude", "pplx Computer", "Manus", "Open AI Superapp"],
    status: "future",
  },
];

export default function AITimeline() {
  return (
    <section id="ai-utviklingen" className="py-24 px-6 overflow-x-hidden" style={{ background: "#0a2e1a" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "#4ade80" }}>
            Historikk
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            AI-utviklingen i tre epoker
          </h2>
          <p className="mt-3 text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
            Fra chatbot til agent. Fra verktøy til medarbeider.
          </p>
        </div>

        {/* Timeline line + dots */}
        <div className="hidden md:flex items-center justify-between mb-10 relative px-16">
          <div className="absolute left-16 right-16 top-1/2 -translate-y-1/2 h-0.5" style={{ background: "rgba(74,222,128,0.2)" }} />
          {eras.map((era) => (
            <div key={era.name} className="relative z-10 flex flex-col items-center gap-2">
              <div
                className="w-5 h-5 rounded-full shadow-md"
                style={{ background: era.color, border: "3px solid #0a2e1a", boxShadow: `0 0 10px ${era.color}60` }}
              />
              <span className="text-xs font-bold whitespace-nowrap" style={{ color: "rgba(255,255,255,0.45)" }}>{era.years}</span>
            </div>
          ))}
          <div className="absolute right-10 top-1/2 -translate-y-1/2">
            <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
              <path d="M0 6h20M14 1l6 5-6 5" stroke="rgba(74,222,128,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Era cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {eras.map((era) => (
            <div
              key={era.name}
              className="rounded-2xl border p-6 flex flex-col gap-5 transition-all duration-200"
              style={{ background: era.bgColor, borderColor: era.borderColor }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold uppercase tracking-widest" style={{ color: era.textColor }}>
                  {era.name}
                </span>
                <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>{era.years}</span>
              </div>

              <div
                className="w-full py-3 rounded-xl text-center text-white font-extrabold text-lg tracking-wide shadow-sm"
                style={{ background: era.platformBg }}
              >
                {era.platform}
              </div>

              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                {era.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {era.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ background: "rgba(255,255,255,0.07)", color: era.textColor }}
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {era.status === "now" && (
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: era.color }} />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: era.color }} />
                  </span>
                  <span className="text-xs font-bold" style={{ color: era.textColor }}>Vi er her nå</span>
                </div>
              )}
              {era.status === "future" && (
                <span className="text-xs font-bold" style={{ color: era.textColor }}>→ Fremtiden skjer akkurat nå</span>
              )}
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div
          className="mt-12 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ background: "rgba(74,222,128,0.07)", border: "1px solid rgba(74,222,128,0.2)" }}
        >
          <p className="font-medium text-base max-w-lg" style={{ color: "rgba(255,255,255,0.8)" }}>
            <strong className="text-white">Lillehval hjelper deg</strong> å forstå hvilken epoke du befinner deg i — og hva du bør gjøre nå for ikke å bli hengende etter.
          </p>
          <a
            href="#kontakt"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #22c55e, #15803d)" }}
          >
            Ta en prat med oss
          </a>
        </div>
      </div>
    </section>
  );
}

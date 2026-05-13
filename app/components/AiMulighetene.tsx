const shifts = [
  {
    no: "01",
    title: "Fra generisk chatbot til din egen AI",
    before: "Alle brukte den samme generiske ChatGPT — samme svar til alle, ingen tilpasning.",
    after: "Modellen kjenner selskapets språk, maler og prosesser. Én spesialist per oppgave.",
    icon: "🧠",
    accent: "#15803d",
  },
  {
    no: "02",
    title: "Fra tekstboks til noe som faktisk handler",
    before: "AI svarte deg — men alt arbeidet etterpå måtte du gjøre selv, steg for steg.",
    after: "Agenter planlegger, utfører flerstegsoppgaver og leverer strukturerte resultater på egen hånd.",
    icon: "⚡",
    accent: "#b45309",
  },
  {
    no: "03",
    title: "Fra bare tekst til å forstå alt du sender",
    before: "Du måtte skrive alt inn som tekst — tabeller, bilder og tegninger kom ikke med.",
    after: "AI forstår bilder, PDF, regneark og tegninger. Send det slik det er.",
    icon: "👁",
    accent: "#0f766e",
  },
  {
    no: "04",
    title: "Fra isolert verktøy til del av arbeidsflaten",
    before: "AI levde i en egen fane. Data ble kopiert manuelt inn og ut av systemene.",
    after: "Henter og skriver direkte i ERP, arkiv og fagsystemer — ingen manuell kopiering.",
    icon: "🔗",
    accent: "#7c3aed",
  },
  {
    no: "05",
    title: "Fra dyre IT-prosjekter til rask bygging",
    before: "Egne AI-løsninger krevde store budsjetter, lang tid og egne utviklingsteam.",
    after: "Mellomstore selskaper kan bygge og drifte skreddersydde AI-løsninger på uker, ikke år.",
    icon: "🚀",
    accent: "#0284c7",
  },
  {
    no: "06",
    title: "Fra 100x dyrere til tilgjengelig for alle",
    before: "Prisen på å kjøre AI-modeller var prohibitiv for daglig bruk i bedrifter.",
    after: "Kostnadene har falt dramatisk — det som kostet kr 1000 koster nå under kr 10.",
    icon: "📉",
    accent: "#dc2626",
  },
];

const cards = [
  {
    kicker: "AI Assistent",
    kickerColor: "#15803d",
    kickerBorder: "#bbf7d0",
    /** Svak fargeflate for hele kolonnen (header + punkter) */
    columnBg: "linear-gradient(180deg, rgba(220,252,231,0.75) 0%, rgba(240,253,244,0.55) 100%)",
    image: "/analogi-ai-assistent-gps.png",
    imageAlt: "Akvarell: medpassasjer med GPS",
    analogy: "Som en medpassasjer som guider deg — svarer når du spør",
    title: "Assistenten – din +1 som svarer når du spør",
    desc: "Modellen din tilpasset — med fagspråk, maler og instruksjoner slik at den kjenner selskapet og jobber på deres premisser.",
    points: [
      {
        label: "Tilpasning",
        before: "Generisk chatbot — samme svar til alle, ingen tilpasning",
        after: "Kjenner selskapets språk, maler og prosesser",
      },
      {
        label: "Minne og kontekst",
        before: "Kortsiktig hukommelse — glemmer forrige samtale",
        after: "Husker kontekst og kobler på tvers av dokumenter",
      },
      {
        label: "Modalitet",
        before: "Bare tekst",
        after: "Forstår bilder, tegninger, tabeller og PDF",
      },
    ],
  },
  {
    kicker: "AI Agent",
    kickerColor: "#b45309",
    kickerBorder: "#fde68a",
    columnBg: "linear-gradient(180deg, rgba(254,249,195,0.65) 0%, rgba(255,251,235,0.6) 100%)",
    image: "/analogi-ai-agent-sjafor.png",
    imageAlt: "Akvarell: sjåfør bak rattet",
    analogy: "Som en sjåfør — kjører bilen for deg mens du sitter bak",
    title: "Agenten – din +1 som handler på vegne av deg",
    desc: "Assistenten som handler etter mål du har satt — utfører flerstegsoppgaver, tar valg underveis og rapporterer resultater tilbake til deg.",
    points: [
      {
        label: "Autonomi",
        before: "Alt starter og stopper med deg — mye manuelt arbeid",
        after: "Planlegger, handler og leverer flerstegsresultater på egen hånd",
      },
      {
        label: "Output",
        before: "Ustrukturert tekst du bearbeider selv",
        after: "Strukturerte leveranser med tabeller, formattering og beregninger",
      },
      {
        label: "Verktøy",
        before: "Alt foregår i én samtale uten direkte tilgang til data eller fagsystemer",
        after: "Henter fra kilder, bruker godkjente verktøy og oppdaterer der det er avtalt",
      },
    ],
  },
  {
    kicker: "AI Applikasjon",
    kickerColor: "#1d4ed8",
    kickerBorder: "#bfdbfe",
    columnBg: "linear-gradient(180deg, rgba(219,234,254,0.7) 0%, rgba(239,246,255,0.55) 100%)",
    image: "/analogi-ai-applikasjon-bil.png",
    imageAlt: "Akvarell: bilen",
    analogy: "Som selve bilen — verktøyet du bruker for å komme deg dit",
    title: "Applikasjonen – løser oppgaver med et fast grensesnitt",
    desc: "Ferdiglaget løsning bygget inn i arbeidsflyter — modell, data og regler gir et verktøy som kjører i systemene dere allerede bruker.",
    points: [
      {
        label: "Tilgang",
        before: "Dyrt og tregt — krevde store budsjetter og IT-team",
        after: "Mellomstore selskaper kan bygge og drifte egne AI-løsninger raskt",
      },
      {
        label: "Integrasjon",
        before: "Manuell kopiering og begrenset systemtilgang",
        after: "Henter og skriver data direkte i ERP, arkiv og fagsystemer",
      },
      {
        label: "Styring",
        before: "Tolkning og utførelse varierer med hvem som bruker verktøyet",
        after: "Maler, sjekklister og regler i løsningen gir lik praksis og sporbarhet",
      },
    ],
  },
];

export default function AiMulighetene() {
  return (
    <section className="mt-16 sm:mt-20">

      {/* ── Headline ── */}
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1a3320] leading-tight">
          Mulighetene er store — og det har skjedd{" "}
          <span style={{ color: "#15803d" }}>store endringer bare det siste 1–2 årene</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base leading-relaxed" style={{ color: "rgba(26,51,32,0.65)" }}>
          For oss er AI et praktisk forsterkningslag i arbeidsprosesser: ikke magi, men et verktøy som øker fart,
          kvalitet og kapasitet når det brukes riktig. Slik definerer vi AI mot bedrifter:
        </p>
      </div>


      {/* ── Fundament AI-modell: wrapper box around the three product cards ── */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          border: "2px solid #14532d",
          background: "#ffffff",
          boxShadow: "0 4px 24px rgba(5, 46, 22, 0.12), 0 1px 3px rgba(6, 46, 31, 0.08)",
        }}
      >
        {/* Header */}
        <div
          className="px-5 sm:px-7 py-4 border-b"
          style={{
            borderColor: "rgba(255,255,255,0.14)",
            background: "linear-gradient(155deg, #052e16 0%, #0a3d22 38%, #14532d 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center gap-4">
            <img
              src="/analogi-ai-modell-motor.png"
              alt="Akvarell: AI-modell som motor"
              style={{ width: 96, height: 96, objectFit: "contain", flexShrink: 0 }}
            />
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    color: "#ecfdf5",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  Fundament
                </span>
                <span className="font-extrabold text-base sm:text-lg" style={{ color: "#f0fdf4" }}>
                  AI-modell
                </span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "rgba(236,253,245,0.88)" }}>
                Som motoren i bilen — selve programvaren som forstår språk, resonnerer og genererer svar.{" "}
                <strong className="font-semibold" style={{ color: "#ffffff" }}>
                  Claude, GPT-4, Gemini, Mistral og Llama
                </strong>{" "}
                er eksempler. Alt over bygger på én eller flere modeller.
              </p>
            </div>
          </div>
        </div>

        {/* Kortoverskrifter — 3 kolonner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "rgba(26,51,32,0.06)" }}>
          {cards.map((card) => (
            <div key={card.kicker} className="px-5 pt-5 pb-4 flex flex-col gap-3" style={{ background: card.columnBg }}>
              <div className="flex items-center gap-3">
                <img src={card.image} alt={card.imageAlt} style={{ width: 88, height: 88, objectFit: "contain", flexShrink: 0 }} />
                <div>
                  <span
                    className="inline-block text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-1"
                    style={{ color: card.kickerColor, background: `${card.kickerBorder}60`, border: `1px solid ${card.kickerBorder}` }}
                  >
                    {card.kicker}
                  </span>
                  <p className="text-sm leading-snug italic" style={{ color: "rgba(26,51,32,0.4)" }}>{card.analogy}</p>
                </div>
              </div>
              <h3 className="text-base font-extrabold text-[#1a3320] leading-snug">{card.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(26,51,32,0.5)" }}>{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Punktrader — aligned på tvers */}
        {Array.from({ length: Math.max(...cards.map((c) => c.points.length)) }).map((_, rowIdx) => (
          <div
            key={rowIdx}
            className="grid grid-cols-1 md:grid-cols-3 gap-px"
            style={{ background: "rgba(26,51,32,0.06)" }}
          >
            {cards.map((card) => {
              const p = card.points[rowIdx];
              const isLastRow = rowIdx === Math.max(...cards.map((c) => c.points.length)) - 1;
              return (
                <div key={card.kicker} className="px-5 pt-4 flex flex-col gap-2" style={{ background: card.columnBg, paddingBottom: isLastRow ? "20px" : "16px", borderBottom: isLastRow ? "none" : "1px solid rgba(0,0,0,0.04)" }}>
                  {p ? (
                    <>
                      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: card.kickerColor, opacity: 0.65 }}>
                        {p.label}
                      </span>
                      <div className="flex items-start gap-2">
                        <span className="mt-0.5 flex-shrink-0 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                          style={{ background: "rgba(239,68,68,0.07)", color: "rgba(185,28,28,0.65)", border: "1px solid rgba(239,68,68,0.12)" }}>
                          Før
                        </span>
                        <span className="text-sm leading-snug" style={{ color: "rgba(26,51,32,0.45)" }}>{p.before}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="mt-0.5 flex-shrink-0 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                          style={{ background: `${card.kickerBorder}50`, color: card.kickerColor, border: `1px solid ${card.kickerBorder}` }}>
                          Nå
                        </span>
                        <span className="text-sm leading-snug font-medium" style={{ color: "#14532d" }}>{p.after}</span>
                      </div>
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>

    </section>
  );
}

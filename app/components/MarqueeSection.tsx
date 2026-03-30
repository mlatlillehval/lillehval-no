import Image from "next/image";

const cards = [
  {
    image: "/marquee-ill-1.jpg",
    label: "Innsikt & Analyse",
    quote: "«Vi gikk fra å drukne i data til å faktisk forstå hva den forteller oss.»",
    company: "Norsk teknologibedrift",
  },
  {
    image: "/marquee-ill-2.jpg",
    label: "AI-strategi",
    quote: "«For første gang hadde hele teamet et felles språk rundt AI. Det endret alt.»",
    company: "Vekstselskap, Oslo",
  },
  {
    image: "/marquee-ill-3.jpg",
    label: "Lederforankring",
    quote: "«Lillehval hjalp oss å presentere AI på en måte styret faktisk forstod og ville investere i.»",
    company: "Konsernledelse, Bergen",
  },
  {
    image: "/marquee-ill-4.jpg",
    label: "Implementering",
    quote: "«Fra idé til pilot på tre uker. Det hadde ikke skjedd uten ekstern hjelp til å prioritere.»",
    company: "SaaS-selskap, Trondheim",
  },
];

// Duplicate for seamless infinite loop
const allCards = [...cards, ...cards];

export default function MarqueeSection() {
  return (
    <section id="pagaende-prosjekter" style={{ background: "#edf4ea" }} className="py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <span className="inline-block mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "#15803d" }}>
          Pågående prosjekter
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: "#1a3320" }}>
          Hva skjer når selskaper tar AI på alvor
        </h2>
        <p className="mt-3 text-lg max-w-xl" style={{ color: "rgba(26,51,32,0.5)" }}>
          Vi guider norske bedrifter gjennom hele reisen – fra full forvirring til full utnyttelse.
        </p>
      </div>

      {/* Marquee track */}
      <div className="relative">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #051a0d, transparent)" }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #051a0d, transparent)" }}
        />

        <div className="flex animate-marquee" style={{ width: "max-content" }}>
          {allCards.map((card, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-3 rounded-2xl overflow-hidden flex flex-col"
              style={{
                width: "340px",
                background: "#eaf0e6",
                border: "1px solid rgba(34,139,70,0.2)",
              }}
            >
              {/* Image */}
              <div className="relative w-full" style={{ height: "200px" }}>
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  className="object-cover"
                />
                {/* Label badge */}
                <span
                  className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
                  style={{ background: "rgba(0,0,0,0.55)", color: "#15803d", backdropFilter: "blur(6px)", border: "1px solid rgba(74,222,128,0.3)" }}
                >
                  {card.label}
                </span>
              </div>

              {/* Text */}
              <div className="p-5 flex flex-col gap-3">
                <p className="text-sm leading-relaxed italic" style={{ color: "rgba(26,51,32,0.75)" }}>
                  {card.quote}
                </p>
                <p className="text-xs font-semibold" style={{ color: "rgba(26,51,32,0.35)" }}>
                  — {card.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Konkrete daglige use cases */}
      <div className="max-w-6xl mx-auto px-6 mt-20">
        <h3 className="text-xl font-extrabold text-[#1a3320] mb-8">
          3 ting AI kan gjøre for deg — fra dag én
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              number: "01",
              label: "Møter & Rapportering",
              before: "Timer brukt på å skrive referat, oppsummere diskusjoner og distribuere handlingspunkter.",
              after: "AI transkriberer, oppsummerer og sender handlingspunkter automatisk etter hvert møte.",
              impact: "2–4 timer spart per uke",
            },
            {
              number: "02",
              label: "Dokumentanalyse",
              before: "Ansatte blar gjennom hundrevis av sider for å finne riktig informasjon i kontrakter og rapporter.",
              after: "Still spørsmål til dokumentene dine — AI finner svaret på sekunder.",
              impact: "80% raskere informasjonsinnhenting",
            },
            {
              number: "03",
              label: "Kundeservice & Intern hjelp",
              before: "Samme spørsmål besvares manuelt om og om igjen av dyre medarbeidere.",
              after: "En AI-assistent håndterer standardspørsmål 24/7, og eskalerer kun det komplekse.",
              impact: "Opptil 60% færre manuelle henvendelser",
            },
          ].map((uc) => (
            <div
              key={uc.number}
              className="rounded-2xl p-6 flex flex-col gap-4"
              style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(34,139,70,0.2)" }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl font-extrabold" style={{ color: "rgba(74,222,128,0.35)" }}>{uc.number}</span>
                <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#15803d" }}>{uc.label}</span>
              </div>
              <div>
                <p className="text-xs font-semibold mb-1" style={{ color: "rgba(26,51,32,0.35)" }}>FØR</p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(26,51,32,0.55)" }}>{uc.before}</p>
              </div>
              <div>
                <p className="text-xs font-semibold mb-1" style={{ color: "#15803d" }}>MED AI</p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(26,51,32,0.75)" }}>{uc.after}</p>
              </div>
              <div
                className="mt-auto px-3 py-1.5 rounded-full text-xs font-bold text-center"
                style={{ background: "rgba(34,139,70,0.1)", color: "#15803d" }}
              >
                {uc.impact}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

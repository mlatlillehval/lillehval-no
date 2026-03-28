import Image from "next/image";

const cards = [
  {
    image: "/marquee-1.jpg",
    label: "Innsikt & Analyse",
    quote: "«Vi gikk fra å drukne i data til å faktisk forstå hva den forteller oss.»",
    company: "Norsk teknologibedrift",
  },
  {
    image: "/marquee-2.jpg",
    label: "AI-strategi",
    quote: "«For første gang hadde hele teamet et felles språk rundt AI. Det endret alt.»",
    company: "Vekstselskap, Oslo",
  },
  {
    image: "/marquee-3.jpg",
    label: "Lederforankring",
    quote: "«Lillehval hjalp oss å presentere AI på en måte styret faktisk forstod og ville investere i.»",
    company: "Konsernledelse, Bergen",
  },
  {
    image: "/marquee-4.jpg",
    label: "Implementering",
    quote: "«Fra idé til pilot på tre uker. Det hadde ikke skjedd uten ekstern hjelp til å prioritere.»",
    company: "SaaS-selskap, Trondheim",
  },
];

// Duplicate for seamless infinite loop
const allCards = [...cards, ...cards];

export default function MarqueeSection() {
  return (
    <section style={{ background: "#051a0d" }} className="py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <span className="inline-block mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "#4ade80" }}>
          Resultater
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: "#ffffff" }}>
          Hva skjer når selskaper tar AI på alvor
        </h2>
        <p className="mt-3 text-lg max-w-xl" style={{ color: "rgba(255,255,255,0.5)" }}>
          Vi har guidet norske bedrifter gjennom hele reisen — fra forvirring til full utnyttelse.
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
                background: "#0d3520",
                border: "1px solid rgba(74,222,128,0.18)",
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
                  style={{ background: "rgba(0,0,0,0.55)", color: "#4ade80", backdropFilter: "blur(6px)", border: "1px solid rgba(74,222,128,0.3)" }}
                >
                  {card.label}
                </span>
              </div>

              {/* Text */}
              <div className="p-5 flex flex-col gap-3">
                <p className="text-sm leading-relaxed italic" style={{ color: "rgba(255,255,255,0.75)" }}>
                  {card.quote}
                </p>
                <p className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.35)" }}>
                  — {card.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

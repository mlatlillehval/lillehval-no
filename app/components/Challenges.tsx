import Image from "next/image";

const challenges = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    title: "Hva ER AI egentlig?",
    description: "Folk tror det er magisk. Det er egentlig teknikker som løser spesifikke problemer.",
    illustration: "/challenge-1.jpg",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Mulighetene er ENORME",
    description: "ChatGPT, dokumentanalyse, bildekjente, prediksjon, fine-tuning, custom løsninger.",
    illustration: "/challenge-2.jpg",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Det endrer seg hele tiden",
    description: "GPT-4 ble 10x bedre. Fine-tuning ble mulig. Vision-AI ble mainstream.",
    illustration: "/challenge-3.jpg",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: "Det handler om mennesker",
    description: "Teknologi er enkel. Mennesker er komplisert.",
    illustration: "/challenge-4.jpg",
  },
];

export default function Challenges() {
  return (
    <section id="ai-tjenester" className="py-24 px-6" style={{ background: "#eaf0e6" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-block mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "#15803d" }}>
            Hvorfor det er krevende
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1a3320]">
            AI er ikke én ting.
          </h2>
          <p className="mt-3 text-lg max-w-xl mx-auto" style={{ color: "rgba(26,51,32,0.6)" }}>
            Det er et landskap. Her er de fire tingene de fleste bedrifter sliter med å navigere.
          </p>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {challenges.map((card, i) => (
            <div
              key={i}
              className="green-card flex flex-col rounded-2xl p-7 gap-4"
            >
              <div
                className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0"
                style={{ background: "rgba(34,139,70,0.1)", color: "#15803d" }}
              >
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-[#1a3320] leading-snug whitespace-nowrap flex-shrink-0">
                {card.title}
              </h3>
              <p className="leading-relaxed text-base flex-1" style={{ color: "rgba(26,51,32,0.6)" }}>
                {card.description}
              </p>
              <div className="relative w-full rounded-xl overflow-hidden flex-shrink-0" style={{ height: "160px" }}>
                <Image
                  src={card.illustration}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

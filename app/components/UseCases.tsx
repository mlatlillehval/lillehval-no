import Image from "next/image";

const services = [
  {
    area: "AI-strategi",
    tagline: "Fra forvirring til klar retning",
    illustration: "/service-strategi.jpg",
    color: "#22c55e",
    items: [
      "AI-modenhetsvurdering av bedriften",
      "Mulighetsanalyse og gevinstberegning",
      "Prioritert AI-veikart (3–12 måneder)",
      "ROI-estimering og investeringsbeslutning",
      "Lederforankring og styrepresentasjon",
    ],
  },
  {
    area: "AI-implementering",
    tagline: "Løsninger som faktisk virker",
    illustration: "/service-implementering.jpg",
    color: "#15803d",
    items: [
      "Intern AI-assistent og chatbot",
      "Dokumentanalyse og kunnskapsbase",
      "Prosessautomatisering av repetitive oppgaver",
      "Pilotprosjekt fra idé til demo på 3 uker",
      "Integrasjon med eksisterende systemer",
    ],
  },
  {
    area: "AI-opplæring",
    tagline: "Kompetanse som sitter",
    illustration: "/service-opplaering.jpg",
    color: "#16a34a",
    items: [
      "AI-workshop for hele teamet (halvdag)",
      "Lederprogram i ansvarlig AI-bruk",
      "Prompt engineering og verktøykurs",
      "Opplæring i ChatGPT, Copilot og Claude",
      "Løpende faglig oppdatering og nyhetsbrev",
    ],
  },
  {
    area: "AI-optimering",
    tagline: "Bedre hver eneste dag",
    illustration: "/service-optimering.jpg",
    color: "#d97706",
    items: [
      "Evaluering av eksisterende AI-løsninger",
      "Performance- og kvalitetsgjennomgang",
      "Sikkerhet, personvern og compliance",
      "Skaleringsplan og arkitekturrådgivning",
      "Månedlig oppfølging og rapportering",
    ],
  },
];

export default function UseCases() {
  return (
    <section id="ai-tjenester-cases" className="py-24 px-6" style={{ background: "#f2ede3" }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "#15803d" }}>
            Hva vi leverer
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1a3320]">
            Fire tjenesteområder
          </h2>
          <p className="mt-3 text-lg max-w-2xl mx-auto" style={{ color: "rgba(26,51,32,0.6)" }}>
            Fra strategi til optimering — vi følger deg gjennom hele AI-reisen. Vi skreddersyr oss til selskapets behov.
          </p>
        </div>

        {/* Service grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.area}
              className="green-card rounded-2xl overflow-hidden flex flex-col"
            >
              {/* Illustration */}
              <div className="relative w-full" style={{ height: "200px" }}>
                <Image
                  src={service.illustration}
                  alt={service.area}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Overlay gradient */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(5,26,13,0.95) 100%)" }}
                />
                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 p-5">
                  <span
                    className="inline-block mb-1 text-xs font-bold uppercase tracking-widest"
                    style={{ color: service.color }}
                  >
                    {service.area}
                  </span>
                  <p className="text-[#1a3320] font-semibold text-base leading-snug">{service.tagline}</p>
                </div>
              </div>

              {/* Service list */}
              <div className="p-6 flex flex-col gap-2.5">
                {service.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                      style={{ background: `${service.color}22`, color: service.color }}
                    >
                      {i + 1}
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(26,51,32,0.75)" }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

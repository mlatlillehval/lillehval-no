import Image from "next/image";

const team = [
  {
    name: "Marius Langsrud",
    title: "Medgründer & AI-rådgiver",
    image: "/illustration-marius.jpg",
    quote: "«AI er ikke et IT-prosjekt. Det er en lederutfordring — og det starter med å forstå hva du faktisk har å vinne.»",
    tags: ["Strategi", "Forretningsutvikling", "AI-implementering"],
    bio: "Marius har [X] års erfaring fra [bransje/roller]. Han har hjulpet selskaper i [bransjer] med å [resultater]. Fyll inn din bakgrunn her.",
    linkedin: "#",
  },
  {
    name: "Hein Torgersen",
    title: "Medgründer & AI-rådgiver",
    image: "/illustration-hein.jpg",
    quote: "«De fleste selskaper sitter på mer potensial enn de aner. AI er verktøyet som låser det opp — hvis du vet hvor du skal se.»",
    tags: ["Teknologi", "Prosessoptimalisering", "Change Management"],
    bio: "Hein har [X] års erfaring fra [bransje/roller]. Han har ledet [type prosjekter] og skapt [resultater]. Fyll inn Heins bakgrunn her.",
    linkedin: "#",
  },
];

export default function WhyUs() {
  return (
    <section id="hvorfor-oss" className="py-24 px-6" style={{ background: "#051a0d" }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "#4ade80" }}>
            Hvem er vi?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Hvorfor Lillehval?
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
            Vi er ikke et stort konsulentbyråer med generiske PowerPoints. Vi er to rådgivere med dyp erfaring — og huden i spillet.
          </p>
        </div>

        {/* Team cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {team.map((person) => (
            <div
              key={person.name}
              className="rounded-3xl overflow-hidden flex flex-col"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(74,222,128,0.15)" }}
            >
              {/* Photo */}
              <div
                className="relative w-full"
                style={{
                  height: "320px",
                  background: person.name === "Marius Langsrud"
                    ? "radial-gradient(ellipse at 50% 40%, #1a5c35 0%, #0a2e1a 60%, #051a0d 100%)"
                    : "#0d1f14",
                }}
              >
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover object-center"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(5,26,13,0.95) 100%)" }}
                />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-extrabold text-white">{person.name}</h3>
                  <p className="text-sm font-medium" style={{ color: "#4ade80" }}>{person.title}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-4">
                {/* Quote */}
                <p className="text-sm italic leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                  {person.quote}
                </p>

                {/* Bio */}
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {person.bio}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {person.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* LinkedIn */}
                <a
                  href={person.linkedin}
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-colors mt-1"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn-profil
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left"
          style={{ background: "rgba(74,222,128,0.07)", border: "1px solid rgba(74,222,128,0.2)" }}
        >
          <div>
            <h3 className="text-xl font-extrabold text-white mb-1">Klar for å ta neste steg?</h3>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
              30 minutter. Ingen forpliktelser. Vi tar en ærlig prat om hvor dere er og hva som er mulig.
            </p>
          </div>
          <a
            href="#"
            className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)", boxShadow: "0 4px 20px rgba(34,197,94,0.3)" }}
          >
            Book gratis møte
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}

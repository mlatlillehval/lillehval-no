import Image from "next/image";

const phases = [
  { number: 1, phase: "Forstå",    question: "Hva ER AI egentlig for oss?", output: "Understanding Map" },
  { number: 2, phase: "Prioritere", question: "Hva skal vi gjøre først?",    output: "Roadmap" },
  { number: 3, phase: "Test",       question: "Prøve først, så skalere",      output: "Pilot Report" },
  { number: 4, phase: "Scale",      question: "Rulle ut når det funker",      output: "Implementation Report" },
  { number: 5, phase: "Optimer",    question: "Bedre hver dag",               output: "Optimization Reports" },
  { number: 6, phase: "Adapt",      question: "Navigere endringene",          output: "Adaptation Strategy" },
];

export default function Phases() {
  return (
    <section id="ai-metodikk" className="py-24 px-6 overflow-x-auto" style={{ background: "#0a2e1a" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "#4ade80" }}>
            Slik jobber vi
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            AI-reisen i seks faser
          </h2>
          <p className="mt-3 text-lg" style={{ color: "rgba(255,255,255,0.6)" }}>
            En strukturert vei fra forvirring til full utnyttelse.
          </p>
        </div>

        {/* Illustration */}
        <div className="relative w-full rounded-2xl overflow-hidden mb-12" style={{ height: "340px" }}>
          <Image
            src="/phases-illustration.jpg"
            alt="AI-reisen i seks faser — illustrasjon"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Horizontal timeline */}
        <div className="min-w-[720px]">
          <div className="relative grid grid-cols-6 gap-4">
            {/* Connecting line */}
            <div
              className="absolute left-[calc(1/12*100%)] right-[calc(1/12*100%)] h-0.5"
              style={{ top: "24px", background: "rgba(74,222,128,0.25)" }}
            />

            {phases.map((phase) => (
              <div key={phase.number} className="flex flex-col items-center gap-4 h-full">
                {/* Circle */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-base shadow-md"
                    style={{
                      background: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)",
                      color: "#ffffff",
                    }}
                  >
                    {phase.number}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest whitespace-nowrap" style={{ color: "#4ade80" }}>
                    {phase.phase}
                  </span>
                </div>

                {/* Card */}
                <div
                  className="green-card w-full flex-1 rounded-2xl p-5 flex flex-col items-center text-center"
                >
                  <p className="text-sm leading-relaxed flex-1 flex items-center justify-center" style={{ color: "rgba(255,255,255,0.75)" }}>
                    {phase.question}
                  </p>
                  <div
                    className="mt-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    {phase.output}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

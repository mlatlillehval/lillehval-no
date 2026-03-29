import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pågående prosjekter – Lillehval",
  description: "Se hva vi jobber med akkurat nå.",
};

export default function PagaendeProsjekter() {
  return (
    <section
      id="pagaende-prosjekter"
      className="py-24 px-6 min-h-screen"
      style={{ background: "#0a2e1a" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="inline-block mb-3 text-sm font-semibold uppercase tracking-widest"
            style={{ color: "#4ade80" }}
          >
            Hva skjer nå
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Pågående prosjekter
          </h2>
          <p
            className="mt-4 text-lg max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Her vil du snart se hva Lillehval jobber med akkurat nå — anonymiserte case-studier og pågående AI-implementeringer.
          </p>
        </div>

        <div
          className="rounded-2xl p-10 text-center"
          style={{
            background: "rgba(74,222,128,0.05)",
            border: "1px solid rgba(74,222,128,0.2)",
          }}
        >
          <p className="text-white font-semibold text-lg">Kommer snart</p>
          <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            Innholdet er under utarbeiding.
          </p>
        </div>
      </div>
    </section>
  );
}

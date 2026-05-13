import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../components/PageShell";

export const metadata: Metadata = {
  title: "Betaling avbrutt – Lillehval",
  description: "Du avbrøt betalingen.",
};

export default function KjopAvbruttPage() {
  return (
    <PageShell>
      <main className="min-h-[60vh] px-6 py-16" style={{ background: "#f2ede3" }}>
      <div className="max-w-lg mx-auto rounded-2xl border p-8 sm:p-10 bg-white/90 border-[rgba(34,139,70,0.25)]">
        <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "#15803d" }}>
          Ingen belastning
        </p>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1a3320]">Betaling avbrutt</h1>
        <p className="mt-4 text-[rgba(26,51,32,0.7)] leading-relaxed">
          Du avbrøt utsjekken. Ingenting er trukket. Når du er klar, kan du prøve igjen fra
          produktsiden.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href="/ai-tjenester#assistenter"
            className="inline-flex justify-center items-center px-5 py-2.5 rounded-full text-sm font-bold text-white"
            style={{
              background: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)",
              boxShadow: "0 2px 12px rgba(34,197,94,0.3)",
            }}
          >
            Fortsett å handle
          </Link>
          <a
            href="mailto:ml@lillehval.no"
            className="inline-flex justify-center items-center px-5 py-2.5 rounded-full text-sm font-bold border border-[rgba(34,139,70,0.4)] text-[#1a3320]"
          >
            Kontakt oss
          </a>
        </div>
      </div>
    </main>
    </PageShell>
  );
}

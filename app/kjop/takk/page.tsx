import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../../components/PageShell";

export const metadata: Metadata = {
  title: "Takk for kjøpet – Lillehval",
  description: "Vi har mottatt bestillingen din.",
};

type Props = { searchParams: Promise<{ session_id?: string }> };

export default async function KjopTakkPage({ searchParams }: Props) {
  const { session_id: sessionId } = await searchParams;

  return (
    <PageShell>
      <main className="min-h-[60vh] px-6 py-16" style={{ background: "#f2ede3" }}>
      <div className="max-w-lg mx-auto rounded-2xl border p-8 sm:p-10 bg-white/90 border-[rgba(34,139,70,0.25)]">
        <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "#15803d" }}>
          Betaling gjennomført
        </p>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1a3320]">Takk for kjøpet</h1>
        <p className="mt-4 text-[rgba(26,51,32,0.7)] leading-relaxed">
          Vi har registrert ordren. Du får vanligvis leveranse på e-post kort tid etter betaling. Har du
          spørsmål, svarer vi på{" "}
          <a href="mailto:ml@lillehval.no" className="font-semibold text-[#15803d] underline">
            ml@lillehval.no
          </a>
          .
        </p>
        {sessionId ? (
          <p className="mt-4 text-xs text-[rgba(26,51,32,0.45)] break-all">
            Referanse: {sessionId}
          </p>
        ) : null}
        <Link
          href="/ai-tjenester#assistenter"
          className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white"
          style={{
            background: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)",
            boxShadow: "0 2px 12px rgba(34,197,94,0.3)",
          }}
        >
          Tilbake til produkter
        </Link>
      </div>
    </main>
    </PageShell>
  );
}

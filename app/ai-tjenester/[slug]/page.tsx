import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import AssistenterHylleproduktKolonne from "../../components/AssistenterHylleproduktKolonne";
import PageShell from "../../components/PageShell";
import StandardpakkerSeksjon from "../../components/StandardpakkerSeksjon";
import { getTjeneste, tjenester } from "../../data/tjenester";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return tjenester.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = getTjeneste(slug);
  if (!t) return {};
  return {
    title: `${t.title} – Lillehval`,
    description: t.tagline,
  };
}

export default async function TjenestePage({ params }: Props) {
  const { slug } = await params;
  const t = getTjeneste(slug);
  if (!t) notFound();

  return (
    <PageShell>
    <main className="min-h-screen" style={{ background: "#f2ede3" }}>

      {/* ── Hero ── */}
      <section className="py-20 px-6" style={{ background: "#0a2e1a" }}>
        <div className="max-w-4xl mx-auto">
          <Link
            href="/ai-tjenester"
            className="inline-flex items-center gap-2 text-xs font-semibold mb-8 transition hover:opacity-80"
            style={{ color: "rgba(74,222,128,0.7)" }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Tilbake til tjenesteoversikt
          </Link>

          <div className="flex flex-col sm:flex-row items-start gap-8">
            <div className="relative w-28 h-28 shrink-0 rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
              <Image src={t.image} alt={t.imageAlt} fill className="object-contain p-2" sizes="112px" />
            </div>
            <div>
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
                style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.25)" }}
              >
                {t.kicker}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
                {t.title}
              </h1>
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                {t.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Innhold ── */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Beskrivelse — 2 kolonner */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{ background: "#fff", border: "1px solid rgba(26,51,32,0.08)", boxShadow: "0 1px 3px rgba(6,46,31,0.06)" }}
            >
              <h2 className="text-lg font-extrabold mb-4" style={{ color: "#1a3320" }}>Om tjenesten</h2>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(26,51,32,0.75)" }}>
                {t.desc}
              </p>
            </div>

            {/* Leveranse */}
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{ background: "#fff", border: "1px solid rgba(26,51,32,0.08)", boxShadow: "0 1px 3px rgba(6,46,31,0.06)" }}
            >
              <h2 className="text-lg font-extrabold mb-5" style={{ color: "#1a3320" }}>Utvalgte leveranser inkluderer</h2>
              <ul className="flex flex-col gap-3">
                {t.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 flex-shrink-0 text-sm font-bold" style={{ color: "#15803d" }}>✓</span>
                    <span className="text-sm leading-relaxed" style={{ color: "rgba(26,51,32,0.75)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar — 1 kolonne */}
          <div className="flex flex-col gap-6">

            {/* Forventet effekt */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "#fff", border: "1px solid rgba(26,51,32,0.08)", boxShadow: "0 1px 3px rgba(6,46,31,0.06)" }}
            >
              <h2 className="text-sm font-extrabold uppercase tracking-wider mb-4" style={{ color: "#15803d" }}>Forventet effekt</h2>
              <ul className="flex flex-col gap-2.5">
                {t.outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 flex-shrink-0 text-xs font-bold" style={{ color: "#15803d" }}>→</span>
                    <span className="text-sm leading-relaxed" style={{ color: "rgba(26,51,32,0.72)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div
              className="rounded-2xl p-6 flex flex-col gap-4"
              style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)" }}
            >
              <p className="text-sm font-semibold leading-snug" style={{ color: "#92400e" }}>
                {t.slug === "egenutviklet"
                  ? "Vil dere gå gjennom utvalget av hyllevare? Vi setter av 30 min — helt uforpliktende."
                  : "Interessert? Vi setter av 30 min for å se om dette passer dere."}
              </p>
              <a
                href={`mailto:ml@lillehval.no?subject=${encodeURIComponent(`Interesse: ${t.title}`)}&body=${encodeURIComponent(`Hei,\n\nJeg er interessert i å høre mer om ${t.title}.\n\nMed vennlig hilsen,\n`)}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold transition hover:scale-105"
                style={{ background: "#f59e0b", color: "#052016", boxShadow: "0 3px 16px rgba(245,158,11,0.4)" }}
              >
                Ta kontakt
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <p className="text-xs" style={{ color: "rgba(26,51,32,0.4)" }}>Ingen forpliktelser — vi svarer innen én virkedag.</p>
              {t.slug === "egenutviklet" && (
                <div
                  className="mt-3 border-t pt-3"
                  style={{ borderColor: "rgba(146, 64, 14, 0.18)" }}
                >
                  <p className="text-[11px] leading-snug mb-1.5" style={{ color: "rgba(26,51,32,0.52)" }}>
                    Har du egen ferdig app og vil utforske <strong className="font-semibold" style={{ color: "rgba(26,51,32,0.62)" }}>partnerskap om salg</strong> med oss — se forklaring og neste steg.
                  </p>
                  <Link
                    href="/sommervikar#ai-partner"
                    className="text-[11px] font-bold underline-offset-2 transition hover:underline"
                    style={{ color: "#b45309" }}
                  >
                    Sommerjobb & AI-partner →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Hylleprodukt + standardpakker (kun for assistent-siden) ── */}
      {t.slug === "assistent" && (
        <>
          {/* Intro-kort: Din egen +1 */}
          <section className="py-12 px-6 border-t" style={{ borderColor: "rgba(26,51,32,0.08)", background: "#ebe8e0" }}>
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
                {/* Kort 1: Hylleprodukt */}
                <div
                  className="rounded-2xl border p-5 sm:p-6 flex flex-col gap-3"
                  style={{ background: "#eaf0e6", borderColor: "rgba(34,139,70,0.28)" }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold tracking-widest" style={{ color: "#15803d" }}>Kjøp din egen AI - Assistent og agent NÅ!</span>
                    <div className="shrink-0 flex flex-col items-center justify-center rounded-xl px-3 py-2" style={{ background: "#f5f0e8", border: "1.5px solid rgba(10,46,26,0.1)", minWidth: 60 }}>
                      <span className="plus-one-logo font-extrabold leading-none" style={{ fontSize: 32, letterSpacing: "-0.05em", lineHeight: 1 }}>+1</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-extrabold text-[#1a3320]">
                    Din egen <span className="plus-one-logo" style={{ fontSize: "inherit", letterSpacing: "-0.04em" }}>+1</span>
                  </h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(26,51,32,0.68)" }}>
                    Du får full instruksjon og et komplett guidesett for å sette opp din helt egen AI-assistent — din{" "}
                    <span className="plus-one-logo font-bold" style={{ fontSize: "inherit", letterSpacing: "-0.02em" }}>+1</span>{" "}
                    for en mer effektiv hverdag. Ferdig konfigurert med systeminstrukser, skills og bruksveiledning. Betaler én gang — klar til bruk uten konsulenttimer.
                  </p>
                  <Link href="#assistenter" className="text-xs font-bold" style={{ color: "#15803d" }}>Se alle assistenter →</Link>
                </div>

                {/* Kort 2: Prosjektleveranser */}
                <div
                  className="rounded-2xl border p-5 sm:p-6 flex flex-col gap-3"
                  style={{ background: "#f5f1e8", borderColor: "rgba(34,139,70,0.28)" }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#15803d" }}>Prosjektleveranser</span>
                    <div className="flex flex-col items-center justify-center shrink-0 rounded-xl px-2.5 py-1.5" style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(20,83,45,0.12) 100%)", border: "1px solid rgba(245,158,11,0.25)" }}>
                      <span className="plus-one-logo font-extrabold leading-none" style={{ fontSize: 22, letterSpacing: "-0.04em", lineHeight: 1 }}>+1</span>
                      <span className="text-[9px] font-semibold mt-0.5 text-center whitespace-nowrap" style={{ color: "#14532d" }}>inkl. hjelp</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-extrabold text-[#1a3320]">
                    Din egen <span className="plus-one-logo" style={{ fontSize: "inherit", letterSpacing: "-0.04em" }}>+1</span> — inkl. hjelp med oppsett
                  </h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(26,51,32,0.68)" }}>
                    Ti definerte pakker for typiske behov — oppsett av AI-modell, tilkoblinger (MCP), opplæring og dokumentert arbeidsmetodikk. Pris etter omfang; ta kontakt for tilbud.
                  </p>
                  <Link href="#standardpakker" className="text-xs font-bold" style={{ color: "#15803d" }}>Se alle pakker →</Link>
                </div>
              </div>
            </div>
          </section>

          {/* Hylleprodukt — kjøp assistent direkte */}
          <section className="py-12 px-6" style={{ background: "#e5e0d4" }}>
            <div className="max-w-6xl mx-auto">
              <AssistenterHylleproduktKolonne />
            </div>
          </section>

          {/* Standardpakker */}
          <section className="py-12 px-6" style={{ background: "#e5e0d4" }}>
            <div className="max-w-6xl mx-auto">
              <StandardpakkerSeksjon />
            </div>
          </section>
        </>
      )}

      {/* ── Andre tjenester ── */}
      <section className="py-12 px-6 border-t" style={{ borderColor: "rgba(26,51,32,0.08)" }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "rgba(26,51,32,0.4)" }}>
            Andre tjenester
          </p>
          <div className="flex flex-wrap gap-3">
            {tjenester
              .filter((other) => other.slug !== t.slug)
              .map((other) => (
                <Link
                  key={other.slug}
                  href={`/ai-tjenester/${other.slug}`}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition hover:opacity-80"
                  style={{ background: "rgba(26,51,32,0.07)", color: "#1a3320", border: "1px solid rgba(26,51,32,0.1)" }}
                >
                  {other.title}
                </Link>
              ))}
          </div>
        </div>
      </section>

    </main>
    </PageShell>
  );
}

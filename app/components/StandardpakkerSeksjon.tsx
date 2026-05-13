"use client";

import { useState } from "react";
import Image from "next/image";
import SectionKicker from "./SectionKicker";

const standardPackages = [
  { num: 1, title: "E-post og kommunikasjon", summary: "Håndter høyt volum inn- og utgående kommunikasjon mer effektivt uten å miste kvalitet eller personlig tone." },
  { num: 2, title: "Kundeservice", summary: "Besvar repetitive henvendelser og eskaler komplekse saker til riktig person uten forsinkelse." },
  { num: 3, title: "Innholdsproduksjon", summary: "Mer og bedre innhold på kortere tid — fra markedsmateriell til produkttekster og sosiale medier." },
  { num: 4, title: "Salgsprosessen", summary: "Salgs-teamet jobber mer effektivt med bedre forberedelse, kvalifisering og CRM-oppdatering." },
  { num: 5, title: "Rekruttering", summary: "Effektiviser fra stillingsutlysning til intervju og reduser tid på administrative HR-oppgaver." },
  { num: 6, title: "AI-klar nettside", summary: "Moderne, velstrukturert nettside optimalisert for synlighet i AI-drevne søk og bedre konvertering til leads." },
  { num: 7, title: "Rapportering og dataanalyse", summary: "Trekk ut innsikt fra bedriftens data raskt og automatiser rapporter og presentasjoner." },
  { num: 8, title: "Innkjøp og leverandører", summary: "Strukturert anbuds- og tilbudsarbeid, leverandørdialog, kontraktsutkast og enkel evaluering — bedre priser, mindre friksjon og tydelig sporbarhet i innkjøpsløpet." },
  { num: 9, title: "Markedsføring og kampanjer", summary: "Plan, gjennomføring og oppfølging på tvers av kanaler med felles budskap, målgruppetilpasning og målbare resultater." },
  { num: 10, title: "Strategi og forretningsutvikling", summary: "Underlag for beslutninger og vekst — markedsmuligheter, scenarier, forretningsplaner og styringsnotater med konsistent struktur fra idé til vedtak." },
] as const;

const standardPakkerInkluderer = [
  ["AI modell - oppsett", "Valg og konfigurasjon av AI-modell tilpasset pakken, rollene som skal bruke løsningen og deres faktiske arbeidsflyt."],
  ["Tilkoblinger (MCP)", "Relevante integrasjoner til godkjente datakilder og verktøy — sikker tilgang slik teamet får svar i riktig kontekst."],
  ["Systeminstrukser", "Tilpassede roller, regler og oppgavelogikk slik at bruken blir forutsigbar og trygg på tvers av brukere."],
  ["Skills og plugins", "Opplæring i og oppsett av skills og plugins som matcher pakkens formål, slik at dere får full nytte av verktøyet."],
  ["Dokumentert arbeidsmetodikk", "Prosesser, sjekklister og maler dere kan følge videre — mindre friksjon og mer lik kvalitet over tid."],
  ["Knytning til AI-reisen", "Leveransen planlegges og følges opp innenfor metodikken vår (kartlegging, prioritering, pilot og utrulling)."],
] as const;

export default function StandardpakkerSeksjon() {
  const [pakkerOpen, setPakkerOpen] = useState(false);
  const [openPakke, setOpenPakke] = useState<number | null>(null);

  return (
    <div
      id="standardpakker"
      className="scroll-mt-28 rounded-2xl border p-5 sm:p-8 flex flex-col gap-5 min-w-0"
      style={{ background: "#f2ede3", borderColor: "rgba(34,139,70,0.25)" }}
    >
      <header>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <SectionKicker className="!mb-2 text-xs sm:!text-sm">Prosjektleveranser</SectionKicker>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a3320]">
              Din egen <span className="plus-one-logo" style={{ fontSize: "inherit", letterSpacing: "-0.04em" }}>+1</span> — inkl. hjelp med oppsett
            </h2>
          </div>
          <div
            className="flex flex-col items-center justify-center shrink-0 rounded-xl px-2.5 py-1.5"
            style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(20,83,45,0.12) 100%)", border: "1px solid rgba(245,158,11,0.25)" }}
          >
            <span className="plus-one-logo font-extrabold leading-none" style={{ fontSize: 28, letterSpacing: "-0.04em", lineHeight: 1 }}>+1</span>
            <span className="text-[9px] font-semibold mt-0.5 text-center whitespace-nowrap" style={{ color: "#14532d" }}>inkl. hjelp</span>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(26,51,32,0.65)" }}>
          Ti ferdig definerte pakker for typiske utfordringer i mellomstore norske bedrifter. Hver pakke inkluderer valg og oppsett av passende AI-modell med relevante tilkoblinger (MCP), tilpassede systeminstrukser, opplæring i skills og plugins, dokumentert arbeidsmetodikk og definerte prosesser for konsistent bruk.
        </p>
      </header>

      <div className="mt-1 -mx-1 sm:-mx-2 px-4 py-5 rounded-xl border" style={{ background: "rgba(255,255,255,0.65)", borderColor: "rgba(34,139,70,0.2)" }}>
        <p className="text-sm font-bold text-[#1a3320] mb-4">Hver standardpakke inkluderer</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {standardPakkerInkluderer.map(([tittel, sub]) => (
            <div key={tittel} className="flex gap-2.5 items-start">
              <span className="shrink-0 text-sm mt-0.5" style={{ color: "#15803d" }}>✓</span>
              <div>
                <p className="text-sm font-semibold text-[#1a3320] m-0">{tittel}</p>
                <p className="text-xs leading-relaxed mt-0.5 m-0" style={{ color: "rgba(26,51,32,0.6)" }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accordion trigger */}
      <button
        type="button"
        onClick={() => setPakkerOpen((o) => !o)}
        className="w-full text-left rounded-2xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group"
        style={{ background: pakkerOpen ? "#edf4ea" : "rgba(255,255,255,0.85)", border: `2px solid ${pakkerOpen ? "#15803d" : "rgba(34,139,70,0.25)"}`, boxShadow: pakkerOpen ? "0 0 0 3px rgba(21,128,61,0.08)" : undefined }}
      >
        <div className="flex items-center justify-between gap-3 px-5 py-4">
          <div className="flex items-center gap-3 min-w-0">
            {!pakkerOpen && (
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: "#15803d" }} />
                <span className="relative inline-flex rounded-full h-3 w-3" style={{ background: "#15803d" }} />
              </span>
            )}
            {pakkerOpen && <span className="w-3 h-3 rounded-full shrink-0" style={{ background: "#15803d" }} />}
            <div className="min-w-0">
              <p className="text-sm font-extrabold text-[#1a3320] m-0 group-hover:text-[#15803d] transition-colors">Se alle 10 standardpakker</p>
              <p className="text-xs m-0 mt-0.5" style={{ color: "rgba(26,51,32,0.5)" }}>Klikk for å utforske hva som passer din bedrift</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:block text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(21,128,61,0.1)", color: "#15803d" }}>
              {pakkerOpen ? "Lukk" : "Åpne liste"}
            </span>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#15803d" strokeWidth={2.5} className="shrink-0 transition-transform duration-300" style={{ transform: pakkerOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {!pakkerOpen && (
          <div className="px-5 pb-4 flex items-start gap-4">
            <Image src="/consultant-guiding-client-watercolor.png" alt="Rådgiver som guider kunde" width={140} height={140} className="object-cover shrink-0 rounded-xl" style={{ filter: "drop-shadow(0 3px 10px rgba(10,46,26,0.15))" }} />
            <div className="flex flex-wrap gap-1.5">
              {standardPackages.map((p) => (
                <span key={p.num} className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(21,128,61,0.08)", color: "#1a3320", border: "1px solid rgba(21,128,61,0.15)" }}>
                  {p.title}
                </span>
              ))}
            </div>
          </div>
        )}
      </button>

      {/* Accordion list */}
      {pakkerOpen && (
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(34,139,70,0.2)", background: "rgba(255,255,255,0.6)" }}>
          {standardPackages.map((p, idx) => {
            const isOpen = openPakke === p.num;
            return (
              <div key={p.num} style={{ borderTop: idx > 0 ? "1px solid rgba(34,139,70,0.12)" : undefined }}>
                <button type="button" onClick={() => setOpenPakke(isOpen ? null : p.num)} className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-black/[0.02]" aria-expanded={isOpen}>
                  <div className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0" style={{ background: "rgba(21,128,61,0.1)", color: "#15803d" }}>{p.num}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#1a3320] m-0 leading-snug">{p.title}</p>
                    {!isOpen && <p className="text-xs m-0 mt-0.5 truncate" style={{ color: "rgba(26,51,32,0.5)" }}>{p.summary}</p>}
                  </div>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#15803d" strokeWidth={2.5} className="shrink-0 transition-transform duration-200" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1" style={{ borderTop: "1px solid rgba(26,51,32,0.07)", background: "rgba(255,255,255,0.55)" }}>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(26,51,32,0.65)" }}>{p.summary}</p>
                    <a href="mailto:ml@lillehval.no?subject=Pris%20standardpakke%20%E2%80%93%20Lillehval" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-75" style={{ color: "#15803d" }}>
                      Ta kontakt for pris →
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="rounded-xl p-4 sm:p-5 border-2 flex items-center justify-between gap-4" style={{ background: "rgba(34,139,70,0.08)", borderColor: "rgba(34,139,70,0.35)" }}>
        <div className="min-w-0">
          <p className="text-base font-extrabold text-[#1a3320]">Ta kontakt for pris</p>
          <p className="mt-1 text-xs sm:text-sm leading-relaxed" style={{ color: "rgba(26,51,32,0.65)" }}>
            Standardpakkene prises ut fra omfang og behov. Send oss en kort melding, så tar vi en prat og sender et tilpasset tilbud.
          </p>
        </div>
        <a href="mailto:ml@lillehval.no?subject=Pris%20standardpakke%20%E2%80%93%20Lillehval" className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold text-white transition hover:opacity-90" style={{ background: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)", boxShadow: "0 2px 12px rgba(34,197,94,0.3)" }}>
          Kontakt oss
        </a>
      </div>
    </div>
  );
}

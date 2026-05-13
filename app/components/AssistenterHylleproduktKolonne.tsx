"use client";

import { useState } from "react";
import Image from "next/image";
import SectionKicker from "./SectionKicker";
import { CHECKOUT_ASSISTANT_KEY_BY_NUMERIC_ID, CHECKOUT_BUNDLE_ALL_KEY } from "@/lib/checkout-ids";
import { CheckoutPayButton } from "./CheckoutPayButton";

const ACCENT = "#15803d";
const MUTED = "rgba(26,51,32,0.65)";
const MUTED_SOFT = "rgba(26,51,32,0.6)";
const BORDER = "rgba(34,139,70,0.2)";
const BORDER_STRONG = "rgba(34,139,70,0.35)";

const assistenter = [
  {
    id: 1,
    name: "Salgsassistenten",
    priceKr: 4900,
    description:
      "Møteforberedelse, tilbudsskriving, CRM-notatføring og oppfølging — alt selgeren trenger for å bruke mer tid på salg.",
    innhold: [
      "Møteforberedelse og agenda",
      "Tilbudsutkast og presentasjoner",
      "CRM-notat fra møter",
      "Oppfølgings-e-poster",
      "Håndtering av innvendinger",
      "Prospekteringsmeldinger",
    ],
  },
  {
    id: 2,
    name: "Lederassistenten",
    priceKr: 4900,
    description:
      "Agendaer, beslutningsnotater, styrerapporter og ukesoppsummeringer — for ledere som vil bruke tid på ledelse, ikke administrasjon.",
    innhold: [
      "Møteagendaer og referater",
      "Beslutningsnotater",
      "Styrerapporter",
      "Ukesoppsummeringer",
      "Intern kommunikasjon",
      "Medarbeideroppfølging",
    ],
  },
  {
    id: 3,
    name: "Kundeserviceassistenten",
    priceKr: 4900,
    description:
      "Svar på henvendelser, klagebehandling, eskaleringsvurdering og standardsvarsbibliotek — for team som vil svare raskere og bedre.",
    innhold: [
      "Svar på kundehenvendelser",
      "Klage- og reklamasjonsbehandling",
      "Eskaleringsvurdering",
      "Sakslogg og dokumentasjon",
      "Standardsvarsbibliotek",
      "Deeskalering av krevende kunder",
    ],
  },
  {
    id: 4,
    name: "Innholdsassistenten",
    priceKr: 4900,
    description:
      "LinkedIn, nyhetsbrev, nettsidetekster og blogg — produser mer og bedre innhold på kortere tid, i din egen tone of voice.",
    innhold: [
      "LinkedIn-innlegg og artikler",
      "Nyhetsbrev og e-postkampanjer",
      "Nettsidetekster og landingssider",
      "Blogginnlegg og fagartikler",
      "Tilbudstekster",
      "Repurposing av eksisterende innhold",
    ],
  },
  {
    id: 5,
    name: "HR-assistenten",
    priceKr: 4900,
    description:
      "Stillingsannonser, onboarding-planer, medarbeidersamtaler og formelle personalformal — skreddersydd for norsk arbeidsliv.",
    innhold: [
      "Stillingsannonser og intervjuspørsmål",
      "Onboarding-planer",
      "Medarbeidersamtaler",
      "Tilbakemeldinger og advarsler",
      "Intern HR-kommunikasjon",
      "Exit-intervjuer",
    ],
  },
  {
    id: 6,
    name: "Økonomiassistenten",
    priceKr: 4900,
    description:
      "Budsjettkommentarer, avviksanalyser, lederrapporter og fakturaoppfølging — for økonomiansvarlige som vil kommunisere tall tydelig.",
    innhold: [
      "Budsjett- og avvikskommentarer",
      "Månedlige lederrapporter",
      "Styrenotater",
      "Fakturaoppfølging",
      "Prognosekommentarer",
      "Forklare tall til ikke-økonomer",
    ],
  },
  {
    id: 7,
    name: "Prosjektassistenten",
    priceKr: 4900,
    description:
      "Prosjektplaner, statusrapporter, risikovurderinger og møtereferater — for prosjektledere som vil bruke tid på gjennomføring.",
    innhold: [
      "Prosjektplaner og mandater",
      "Ukentlige statusrapporter",
      "Møtereferater med neste steg",
      "Risikovurderinger",
      "Endringslogger",
      "Prosjektavslutning og lessons learned",
    ],
  },
  {
    id: 8,
    name: "Rapporteringsassistenten",
    priceKr: 4900,
    description:
      "Trekk ut innsikt fra Excel, ERP og CRM — og automatiser produksjonen av rapporter og presentasjoner.",
    innhold: [
      "Dataanalyse fra Excel og systemer",
      "AI-genererte innsikter og trender",
      "Månedlige og kvartalsvise rapporter",
      "PowerPoint-disposisjoner",
      "Ledersammendrag",
      "KPI-dashboards og visualisering",
    ],
  },
  {
    id: 9,
    name: "Juridisk assistent",
    priceKr: 4900,
    description:
      "Kontraktgjennomgang, GDPR-sjekklister, leverandørvurderinger og interne policyer — strukturert støtte, ikke juridisk rådgivning.",
    innhold: [
      "Kontraktutkast og sammenligning",
      "GDPR-sjekklister og dokumentasjon",
      "Leverandør- og avtalevurderinger",
      "Interne policyer og retningslinjer",
      "Sammenfatte juridisk språk for ledelse",
      "Forberedelse til advokat eller compliance",
    ],
  },
  {
    id: 10,
    name: "Strategiassistenten",
    priceKr: 4900,
    description:
      "Konkurranseanalyser, SWOT, investeringscaser, OKR og strategipresentasjoner — for ledere som vil tenke klarere og beslutte raskere.",
    innhold: [
      "Konkurranseanalyser og SWOT",
      "Markedsvurderinger",
      "Investeringscaser",
      "OKR-utvikling",
      "Styrepresentasjoner",
      "Prioriteringsanalyser",
    ],
  },
] as const;

const inkludertAlle = [
  ["Systeminstrukser", "Ferdig konfigurert rolle og oppgavelogikk"],
  ["Skills", "Nøkkelord som aktiverer spesifikke funksjoner"],
  ["Artifacts", "Ferdige maldokumenter for de viktigste leveransene"],
  ["Promtbibliotek", "30 ferdige promter klar til å kopiere og bruke"],
  ["Bruksveiledning", "Steg-for-steg guide for å komme i gang"],
  ["Innsigelsesbank", "Ferdige svar på de vanligste utfordringene"],
] as const;

const slikFungerer = [
  [
    "1",
    "Kjøp AI-assistenten/agenten som din +1",
    "Velg assistent og fullfør betaling sikkert med kort (Stripe). Du kan også kjøpe alle ti samlet som pakketilbud.",
  ],
  [
    "2",
    "Skreddersy din agent",
    "Du mottar et interaktivt intervjuskjema med spørsmål om ditt formål og arbeidsoppgaver. Svarene dine bruker vi til å lage en tilpasset og skreddersydd AI-assistent/agent — din +1 i arbeidet.",
  ],
  ["3", "Motta pakken", "Du får tilsendt systeminstrukser, Skills, Artifacts og bruksveiledning."],
  ["4", "Sett opp på 10 min", "Lim inn instruksene i Claude og du er klar til bruk."],
  ["5", "Ta i bruk", "Bruk de 30 ferdiglagde promptene fra dag én."],
] as const;

const BUNDLE_KR = 39_900;

export default function AssistenterHylleproduktKolonne() {
  const [valgtId, setValgtId] = useState<number | null>(null);
  const [hoverId, setHoverId] = useState<number | null>(null);
  const [listOpen, setListOpen] = useState(false);
  const [stepsOpen, setStepsOpen] = useState(false);

  const totalEnkeltvis = assistenter.reduce((s, a) => s + a.priceKr, 0);

  return (
    <div
      id="assistenter"
      className="scroll-mt-28 rounded-2xl border p-5 sm:p-6 flex flex-col gap-0 min-w-0"
      style={{
        background: "#eaf0e6",
        borderColor: "rgba(34,139,70,0.25)",
      }}
    >
      {/* Intro (som produktside-oppsett) */}
      <header className="pb-5 border-b" style={{ borderColor: "rgba(26,51,32,0.12)" }}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <SectionKicker className="!mb-1 text-xs sm:!text-sm">Kjøp din egen AI ASSISTENT og AGENT NÅ!</SectionKicker>
            <div className="mb-2" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a3320] leading-snug">
              Ferdige AI-assistenter. Klar til bruk i dag.
            </h2>
          </div>
          <div
            className="shrink-0 flex flex-col items-center justify-center rounded-xl px-3 py-2 pointer-events-none select-none"
            style={{ background: "#f5f0e8", border: "1.5px solid rgba(10,46,26,0.1)", minWidth: 68 }}
          >
            <span
              className="plus-one-logo font-extrabold leading-none"
              style={{ fontSize: 38, letterSpacing: "-0.05em", lineHeight: 1 }}
            >
              +1
            </span>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: MUTED }}>
          Hver assistent er ferdig konfigurert med systeminstrukser, Skills, Artifacts og et
          promtbibliotek på 30 ferdige promter. Kjøp, sett opp på under ti minutter og ta i bruk
          umiddelbart. Fast pris per assistent; ingen månedlig kostnad. Tilpasninger utover standard
          kan bestilles til timepris.
        </p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
          {[
            ["10", "ferdige assistenter"],
            ["30", "promter per assistent"],
            ["10 min", "til å komme i gang"],
          ].map(([tall, tekst]) => (
            <div key={tekst} className="flex flex-wrap items-baseline gap-1.5">
              <span className="text-xl font-bold tabular-nums" style={{ color: ACCENT }}>
                {tall}
              </span>
              <span className="text-sm" style={{ color: MUTED }}>
                {tekst}
              </span>
            </div>
          ))}
        </div>
      </header>

      {/* Alle assistenter inkluderer */}
      <div
        className="mt-5 -mx-1 sm:-mx-2 px-4 py-5 rounded-xl border"
        style={{
          background: "rgba(255,255,255,0.65)",
          borderColor: BORDER,
        }}
      >
        <p className="text-sm font-bold text-[#1a3320] mb-4">Alle AI-assistenter/agenter inkluderer</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {inkludertAlle.map(([tittel, sub]) => (
            <div key={tittel} className="flex gap-2.5 items-start">
              <span className="shrink-0 text-sm mt-0.5" style={{ color: ACCENT }}>
                ✓
              </span>
              <div>
                <p className="text-sm font-semibold text-[#1a3320] m-0">{tittel}</p>
                <p className="text-xs leading-relaxed mt-0.5 m-0" style={{ color: MUTED_SOFT }}>
                  {sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Velg assistent — accordion */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setListOpen((o) => !o)}
          className="w-full text-left rounded-2xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group"
          style={{
            background: listOpen ? "#edf4ea" : "rgba(255,255,255,0.85)",
            border: `2px solid ${listOpen ? ACCENT : BORDER}`,
            boxShadow: listOpen ? "0 0 0 3px rgba(21,128,61,0.08)" : undefined,
          }}
        >
          {/* Top row */}
          <div className="flex items-center justify-between gap-3 px-5 py-4">
            <div className="flex items-center gap-3 min-w-0">
              {!listOpen && (
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: ACCENT }} />
                  <span className="relative inline-flex rounded-full h-3 w-3" style={{ background: ACCENT }} />
                </span>
              )}
              {listOpen && (
                <span className="w-3 h-3 rounded-full shrink-0" style={{ background: ACCENT }} />
              )}
              <div className="min-w-0">
                <p className="text-sm font-extrabold text-[#1a3320] m-0 group-hover:text-[#15803d] transition-colors">
                  Se vårt utvalg av assistenter/agenter — din{" "}
                  <span className="plus-one-logo" style={{ fontSize: "inherit", letterSpacing: "-0.03em" }}>+1</span>
                </p>
                <p className="text-xs m-0 mt-0.5" style={{ color: MUTED_SOFT }}>
                  Klikk for å finne assistenten som passer din rolle
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span
                className="hidden sm:block text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ background: "rgba(21,128,61,0.1)", color: ACCENT }}
              >
                {listOpen ? "Lukk" : "Åpne liste"}
              </span>
              <span className="hidden sm:block text-xs font-bold tabular-nums" style={{ color: ACCENT }}>
                4 900 kr / assistent
              </span>
              <svg
                width="18" height="18" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={2.5}
                className="shrink-0 transition-transform duration-300"
                style={{ transform: listOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Chips preview — only when closed */}
          {!listOpen && (
            <div className="px-5 pb-4 flex items-start gap-4">
              <Image
                src="/ai-agent-helping-watercolor.png"
                alt="AI-agent hjelper medarbeider"
                width={140}
                height={140}
                className="object-cover shrink-0 pointer-events-none select-none rounded-xl"
                style={{ filter: "drop-shadow(0 3px 10px rgba(10,46,26,0.15))" }}
              />
              <div className="flex flex-wrap gap-1.5">
                {assistenter.map((a) => (
                  <span
                    key={a.id}
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: "rgba(21,128,61,0.08)", color: "#1a3320", border: "1px solid rgba(21,128,61,0.15)" }}
                  >
                    {a.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </button>

        {listOpen && (
          <div
            className="mt-2 rounded-xl overflow-hidden"
            style={{ border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.6)" }}
          >
            {assistenter.map((a, idx) => {
              const valgt = valgtId === a.id;
              const checkoutKey = CHECKOUT_ASSISTANT_KEY_BY_NUMERIC_ID[a.id as keyof typeof CHECKOUT_ASSISTANT_KEY_BY_NUMERIC_ID];
              return (
                <div
                  key={a.id}
                  style={{ borderTop: idx > 0 ? `1px solid ${BORDER}` : undefined }}
                >
                  {/* Row header */}
                  <button
                    type="button"
                    onClick={() => setValgtId(valgt ? null : a.id)}
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-black/[0.02]"
                    aria-expanded={valgt}
                  >
                    <div className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0" style={{ background: "rgba(21,128,61,0.1)", color: ACCENT }}>
                      {a.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[#1a3320] m-0 leading-snug">{a.name}</p>
                      {!valgt && (
                        <p className="text-xs m-0 mt-0.5 truncate" style={{ color: MUTED_SOFT }}>{a.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="text-xs font-bold tabular-nums hidden sm:block" style={{ color: ACCENT }}>
                        {a.priceKr.toLocaleString("nb-NO")} kr
                      </span>
                      <svg
                        width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={2.5}
                        className="transition-transform duration-200"
                        style={{ transform: valgt ? "rotate(180deg)" : "rotate(0deg)" }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Expanded content */}
                  {valgt && (
                    <div className="px-4 pb-4 pt-1" style={{ borderTop: `1px solid rgba(26,51,32,0.07)`, background: "rgba(255,255,255,0.55)" }}>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: MUTED }}>{a.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-4">
                        {a.innhold.map((linje) => (
                          <div key={linje} className="flex gap-2 items-start text-xs" style={{ color: MUTED_SOFT }}>
                            <span className="shrink-0 text-[10px] mt-0.5" style={{ color: ACCENT }}>◆</span>
                            {linje}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between gap-3 pt-3" style={{ borderTop: `1px solid ${BORDER}` }}>
                        <div>
                          <span className="text-base font-bold tabular-nums" style={{ color: ACCENT }}>{a.priceKr.toLocaleString("nb-NO")} kr</span>
                          <span className="text-xs ml-1" style={{ color: MUTED_SOFT }}>eks. mva.</span>
                        </div>
                        <CheckoutPayButton variant="compact" productIds={[checkoutKey]}>
                          Kjøp denne
                        </CheckoutPayButton>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>


      {/* Slik fungerer det — accordion */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setStepsOpen((o) => !o)}
          className="w-full text-left rounded-2xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group"
          style={{
            background: stepsOpen ? "#edf4ea" : "rgba(255,255,255,0.85)",
            border: `2px solid ${stepsOpen ? ACCENT : BORDER}`,
            boxShadow: stepsOpen ? "0 0 0 3px rgba(21,128,61,0.08)" : undefined,
          }}
        >
          {/* Top row */}
          <div className="flex items-center justify-between gap-3 px-5 py-4">
            <div className="flex items-center gap-3 min-w-0">
              {!stepsOpen && (
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: ACCENT }} />
                  <span className="relative inline-flex rounded-full h-3 w-3" style={{ background: ACCENT }} />
                </span>
              )}
              {stepsOpen && (
                <span className="w-3 h-3 rounded-full shrink-0" style={{ background: ACCENT }} />
              )}
              <div className="min-w-0">
                <p className="text-sm font-extrabold text-[#1a3320] m-0 group-hover:text-[#15803d] transition-colors">
                  Slik fungerer det — fra kjøp til klar
                </p>
                <p className="text-xs m-0 mt-0.5" style={{ color: MUTED_SOFT }}>
                  5 enkle steg fra bestilling til din{" "}
                  <span className="plus-one-logo font-bold" style={{ fontSize: "inherit", letterSpacing: "-0.03em" }}>+1</span>
                  {" "}er klar til bruk
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span
                className="hidden sm:block text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ background: "rgba(21,128,61,0.1)", color: ACCENT }}
              >
                {stepsOpen ? "Lukk" : "Åpne steg"}
              </span>
              <svg
                width="18" height="18" fill="none" viewBox="0 0 24 24" stroke={ACCENT} strokeWidth={2.5}
                className="shrink-0 transition-transform duration-300"
                style={{ transform: stepsOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Step chips preview — only when closed */}
          {!stepsOpen && (
            <div className="px-5 pb-4 flex flex-wrap gap-1.5">
              {slikFungerer.map(([nr, tittel]) => (
                <span
                  key={nr}
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ background: "rgba(21,128,61,0.08)", color: "#1a3320", border: "1px solid rgba(21,128,61,0.15)" }}
                >
                  {nr}. {tittel.replace("+1", "").trim()}
                </span>
              ))}
            </div>
          )}
        </button>

        {/* Expanded steps */}
        {stepsOpen && (
          <div
            className="mt-2 rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.7)", border: `1.5px solid ${BORDER}` }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {slikFungerer.map(([nr, tittel, tekst]) => (
                <div key={nr}>
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ background: ACCENT }}
                    >
                      {nr}
                    </div>
                    <p className="text-sm font-bold text-[#1a3320] m-0 leading-snug min-w-0">
                      {tittel.includes("+1") ? (
                        <>
                          {tittel.split("+1")[0]}
                          <span className="plus-one-logo" style={{ fontSize: "inherit", letterSpacing: "-0.03em" }}>+1</span>
                          {tittel.split("+1")[1]}
                        </>
                      ) : tittel}
                    </p>
                  </div>
                  <p
                    className="text-xs sm:text-sm leading-relaxed m-0 pl-10"
                    style={{ color: MUTED_SOFT }}
                  >
                    {tekst.includes("+1") ? (
                      <>
                        {tekst.split("+1")[0]}
                        <span className="plus-one-logo" style={{ fontSize: "inherit", letterSpacing: "-0.03em" }}>+1</span>
                        {tekst.split("+1")[1]}
                      </>
                    ) : tekst}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div
        className="mt-8 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        style={{ background: "rgba(255,255,255,0.55)", border: `1px solid ${BORDER}` }}
      >
        <div>
          <p className="text-sm font-bold text-[#1a3320] m-0 mb-1">
            Spørsmål eller vil tilpasse en assistent?
          </p>
          <p className="text-xs sm:text-sm m-0" style={{ color: MUTED }}>
            Vi hjelper deg med å finne riktig assistent for din bedrift.
          </p>
        </div>
        <a
          href="mailto:ml@lillehval.no?subject=Assistenter%20%E2%80%93%20Lillehval"
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-bold text-white transition hover:opacity-90 shrink-0"
          style={{
            background: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)",
            boxShadow: "0 2px 12px rgba(34,197,94,0.3)",
          }}
        >
          Ta kontakt →
        </a>
      </div>

      <p className="mt-6 text-center text-xs" style={{ color: "rgba(26,51,32,0.45)" }}>
        Alle priser er eks. mva. · Fast pris per assistent; tilpasninger til timepris.
      </p>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionKicker from "./SectionKicker";
import BrandLogo from "./BrandLogo";

/** Konkrete foto per lesing-steg (Unsplash) — tilpasset ukens tema */
type StepImageSet = readonly [string, string, string, string, string];

const US = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=82` as const;

type ReadingJourneyStep = {
  title: string;
  hint: string;
  /** Utdypende tekst om hva dette steget betyr for leseren */
  intro: string;
};

/** Leserreise — tydelig vei fra kontekst til handling */
const READING_JOURNEY: ReadingJourneyStep[] = [
  {
    title: "Sett deg inn",
    hint: "Kontekst fra oss i feltet",
    intro:
      "Her lander vi alltid først: hva vi faktisk hører og ser når vi jobber med norske bedrifter om AI — typiske mønstre, vanlige blindsoner og hva som skiller de som kommer i gang fra de som bare snakker om det. Steget er ment å gi deg et felles språk med resten av utgaven, slik at hovedbudskapet under treffer bedre og du slipper å gjette på bakteppet.",
  },
  {
    title: "Kjernebudskap",
    hint: "Ukens hovedpoeng",
    intro:
      "Dette er selve analysen for uken — det vi mener du bør vite, prioritere eller utfordre hjemme hos deg. Vi prøver å koble påslaget til noe du kjenner fra kalenderen, kundemøter eller køen av saker som venter, ikke bare til teknologi for teknologiens skyld. Sitatet fra feltet under er med for å vise at dette er erfaringer fra virkelige miljøer, ikke teoretiske scenarioer.",
  },
  {
    title: "I praksis",
    hint: "Noe du kan teste allerede i dag",
    intro:
      "Nå flytter vi fra innsikt til handling: et lite grep du kan teste uten store budsjetter eller nye systemer. Poenget er at du skal få en konkret «prøv i morgen»-følelse — og ofte avdekker selve forsøket hva dere mangler av data, roller eller mål. Når du har prøvd, vet du mye mer om hva neste steg bør være internt hos dere.",
  },
  {
    title: "Grave dypere",
    hint: "Ressurs eller verktøy",
    intro:
      "Når du vil fordype deg litt mer, peker vi på én rapport, ett verktøy eller én kanal som har gitt oss mest verdi denne uken. Det er ikke betalt innhold — bare noe vi bruker selv når vi skal oppdatere kunder eller sparre med kollegaer. Du trenger ikke lese alt; ta med deg én idé du kan dele i ledermøtet eller på Slack, så har steget gjort jobben sin.",
  },
  {
    title: "Neste steg",
    hint: "Videre med Lillehval",
    intro:
      "Til slutt samler vi tråden i en tydelig invitasjon: om du vil måle modenhet, booke en uforpliktende prat, eller bare vite hvordan vi jobber. Du velger selv om du vil ta neste steg med oss nå — reaksjonsfeltet lenger nede er bare for tilbakemelding på selve utgaven. Vi setter stor pris på alle som bruker noen minutter på å lese hele veien hit.",
  },
];

/* ─────────────────────────────────────────── types ── */

type Newsletter = {
  week: number;
  issue: number;
  dateRange: string;
  date: string;
  readTime: string;
  /** Konkrete foto per lesing-steg — matcher ukens tema */
  stepImages: StepImageSet;
  tema: string;
  headline: string;
  subline: string;
  intro: { kicker: string; text: string };
  main: { kicker: string; title: string; body: string; highlight: { quote: string; source: string } };
  tip: { title: string; text: string; prompt: string };
  resource: { icon: string; label: string; title: string; desc: string; url: string };
  cta: { title: string; sub: string; button: string; href: string };
};

/* ─────────────────────────────────────────── data ── */

/** Uke 14 — prosess og piloter som strander */
const STEP_IMG_W14: StepImageSet = [
  US("photo-1522071820081-009f0129c71c"),
  US("photo-1460925895917-afdab827c52f"),
  US("photo-1531403009284-440f080d1e12"),
  US("photo-1454165804606-c3d57bc86b40"),
  US("photo-1600880292203-757bb62b4baf"),
];

/** Uke 15 — egne data som konkurransefortrinn */
const STEP_IMG_W15: StepImageSet = [
  US("photo-1551288049-bebda4e38f71"),
  US("photo-1558494949-ef010cbdcc31"),
  US("photo-1517842645767-c956b723114f"),
  US("photo-1531482615713-2afd69097998"),
  US("photo-1456513080510-7bf3a84b82f8"),
];

/** Uke 16 — agenter og automatisering i praksis */
const STEP_IMG_W16: StepImageSet = [
  US("photo-1498050108023-c5249f4df085"),
  US("photo-1517694712204-7dd99e287c7c"),
  US("photo-1512941937669-90a1b58e7e9c"),
  US("photo-1531482615713-2afd69097998"),
  US("photo-1556761175-5973dc0f32e7"),
];

/** Uke 17 — måle effekt og resultater */
const STEP_IMG_W17: StepImageSet = [
  US("photo-1506784980857-3c356831295f"),
  US("photo-1554224154-22bb7adf9d17"),
  US("photo-1450101499163-c8848c66ca85"),
  US("photo-1552664730-d307ca884978"),
  US("photo-1520607162513-77705c0f7d83"),
];

const NEWSLETTERS: Newsletter[] = [
  {
    week: 14, issue: 1,
    dateRange: "31. mars – 6. apr 2026", date: "6. april 2026", readTime: "Ca. 3 min",
    stepImages: STEP_IMG_W14,
    tema: "Hvorfor AI-prosjekter strander",
    headline: "Hvorfor AI-prosjekter strander — og hva som faktisk virker",
    subline: "De fleste starter med teknologien. De som lykkes, starter med prosessen.",
    intro: {
      kicker: "Observasjon",
      text: "De siste månedene har vi snakket med ledere i alt fra byggebransjen til logistikk. Mange har prøvd AI. Noen har satt i gang pilotprosjekter. Ganske få har faktisk <strong>spart tid eller penger</strong> på det ennå.\n\nDet er ikke fordi AI ikke virker. Det er fordi de fleste starter på feil sted.",
    },
    main: {
      kicker: "Ukens tema",
      title: "Start med prosessen, ikke verktøyet",
      body: "Når vi spør bedriftsledere hva de vil bruke AI til, er svaret nesten alltid «effektivisering» eller «automatisering». Det er gode mål — men for vage til å handle på. Det som skiller de som lykkes er at de identifiserer én konkret, repetitiv prosess og forbedrer den før de går videre.",
      highlight: {
        quote: "«Vi brukte tre måneder på å velge AI-plattform. Vi burde brukt én uke på å finne den ene prosessen som tok mest tid, og to måneder på å løse den ordentlig.»",
        source: "— Daglig leder, norsk distribusjonsbedrift",
      },
    },
    tip: {
      title: "Kartlegg din beste AI-kandidat på 10 minutter",
      text: "Spør deg selv: Hvilken oppgave gjør noen i teamet mer enn tre ganger i uken, som følger et fast mønster og ikke krever skjønn? Skriv ned tre kandidater. Den med høyest frekvens og lavest variasjon er der du starter.",
      prompt: "Jeg har [beskriv oppgaven]. Hjelp meg å lage en mal som gjør denne 50 % raskere.",
    },
    resource: {
      icon: "📄", label: "Rapport",
      title: "McKinsey: The state of AI in 2025",
      desc: "God oversikt over hvor norske og europeiske bedrifter faktisk er i AI-adopsjonen — og hvilke funksjoner som gir mest igjen.",
      url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
    },
    cta: { title: "Vil du vite hvor selskapet ditt står?", sub: "Ta AI-testen vår og få en konkret score og tre anbefalinger — gratis, på 5 minutter.", button: "Ta AI-testen →", href: "/ai-beredskap" },
  },
  {
    week: 15, issue: 2,
    dateRange: "7. apr – 13. apr 2026", date: "13. april 2026", readTime: "Ca. 4 min",
    stepImages: STEP_IMG_W15,
    tema: "Dataene dine er gullet ditt",
    headline: "Dataene dine er din sterkeste konkurransefordel — hvis du vet å bruke dem",
    subline: "Alle har tilgang til de samme AI-modellene. Det som skiller deg er dataene.",
    intro: {
      kicker: "Observasjon",
      text: "En av de vanligste spørsmålene vi får: «Vi har prøvd ChatGPT, men vi får ikke svar som er relevante for vår bransje.» Det er en logisk frustrasjon. <strong>Generelle modeller gir generelle svar.</strong>\n\nLøsningen er ikke bedre prompts. Det er å gi modellen kontekst fra dine egne data.",
    },
    main: {
      kicker: "Ukens tema",
      title: "Fra generell AI til din AI",
      body: "Bedrifter som virkelig lykkes med AI bruker ikke bare ChatGPT i nettleseren. De kobler AI mot sine egne data — kundehistorikk, salgstall, interne prosessdokumenter — og skaper en assistent som faktisk kjenner virksomheten. Dette krever ikke en stor IT-avdeling. Det krever riktig arkitektur og riktig partner.",
      highlight: {
        quote: "«Da vi koblet AI mot vår CRM og salgsdatabase, gikk tilbudstiden ned fra 4 timer til 35 minutter. Det endret hele salgsorganisasjonen.»",
        source: "— Salgsdirektør, norsk B2B-selskap",
      },
    },
    tip: {
      title: "Lag din første interne AI-kunnskapsbase",
      text: "Samle de fem vanligste spørsmålene nyansatte eller kunder stiller. Skriv gode svar. Last opp til NotebookLM fra Google (gratis) og still spørsmål — du har nå en primitiv, men fungerende intern AI.",
      prompt: "Basert på dette dokumentet [lim inn tekst], svar på dette spørsmålet på en enkel og presis måte: [spørsmål]",
    },
    resource: {
      icon: "🎥", label: "Verktøy",
      title: "Google NotebookLM — gratis og kraftig",
      desc: "Last opp egne dokumenter og still spørsmål direkte til innholdet. Perfekt for interne policyer, produktdokumentasjon og kunnskapsforvaltning.",
      url: "https://notebooklm.google.com",
    },
    cta: { title: "Klar for å finne ut hvor dere kan starte?", sub: "Book 30 minutter med oss — gratis og uten forpliktelser. Vi ser på én konkret mulighet for din bedrift.", button: "Book et møte →", href: "/" },
  },
  {
    week: 16, issue: 3,
    dateRange: "14. apr – 20. apr 2026", date: "20. april 2026", readTime: "Ca. 3 min",
    stepImages: STEP_IMG_W16,
    tema: "AI-agenter er her — nå",
    headline: "AI-agenter er ikke fremtid — de er tilgjengelig i dag, for norske bedrifter",
    subline: "Fra enkle chatbots til agenter som handler, planlegger og leverer resultater.",
    intro: {
      kicker: "Observasjon",
      text: "For ett år siden var «AI-agenter» et buzzord for tech-entusiaster. I dag bruker vi dem aktivt i kundeprosjekter — til å oppdatere CRM, lage rapporter og sende oppfølgings-e-poster automatisk. <strong>Terskelen er dramatisk lavere enn de fleste tror.</strong>\n\nSpørsmålet er ikke lenger om dette er mulig. Det er hvem som gjør det først.",
    },
    main: {
      kicker: "Ukens tema",
      title: "Hva er egentlig en AI-agent — og hva kan den gjøre for deg?",
      body: "En AI-agent er et program som kan utføre flerstegsoppgaver selvstendig: hente data, ta beslutninger og handle — uten at du trenger å veilede hvert steg. Tenk på det som å ansette en ekstremt rask, aldri-trøtt assistent som alltid følger prosedyrene dine nøyaktig.",
      highlight: {
        quote: "«Agenten vår behandler nå 80 % av innkommende kundehenvendelser uten menneskelig innblanding. De resterende 20 % er eskalert til riktig person med full kontekst ferdig samlet.»",
        source: "— Operations Manager, norsk e-handelsselskap",
      },
    },
    tip: {
      title: "Test en agent i dag — gratis",
      text: "Gå til make.com (gratis plan) og lag en enkel automatisering: Når en ny e-post ankommer med emneord «tilbud», opprettes automatisk en oppgave i Notion eller Asana. Det tar 20 minutter og er din første agent.",
      prompt: "Jeg vil automatisere [beskriv oppgave]. Hvilke gratis verktøy kan koble [system A] med [system B] uten koding?",
    },
    resource: {
      icon: "⚙️", label: "Verktøy",
      title: "Make.com — visuell automatisering uten koding",
      desc: "Koble sammen hundrevis av apper og lag flytdiagrammer som kjører automatisk. Perfekt for å bygge din første AI-drevne arbeidsflyt.",
      url: "https://make.com",
    },
    cta: { title: "Vil du se hva en agent kan gjøre for din bedrift?", sub: "Vi setter opp en demo skreddersydd for din bransje — uten at du trenger å ha teknisk bakgrunn.", button: "Book 30 minutter gratis →", href: "/" },
  },
  {
    week: 17, issue: 4,
    dateRange: "21. apr – 27. apr 2026", date: "27. april 2026", readTime: "Ca. 3 min",
    stepImages: STEP_IMG_W17,
    tema: "Mål resultater — ikke aktivitet",
    headline: "Bedrifter som lykkes med AI måler resultater, ikke aktivitet",
    subline: "Antall ansatte som «bruker AI» er ikke et nyttig mål. Her er hva du bør måle.",
    intro: {
      kicker: "Observasjon",
      text: "«Vi har lært opp 40 ansatte i AI.» Det høres bra ut. Men hva betyr det egentlig? Har noe blitt raskere? Billigere? Bedre? Vi ser stadig bedrifter som investerer i AI-opplæring og -verktøy, <strong>men måler ingenting</strong>.\n\nUten klare måleparametere vet du ikke hva som virker — og du kan heller ikke skalere det.",
    },
    main: {
      kicker: "Ukens tema",
      title: "Tre måleparametere som faktisk betyr noe",
      body: "Vi anbefaler alltid tre enkle KPI-er når vi starter et AI-initiativ: (1) Tid spart per oppgave per uke. (2) Feilrate før og etter AI. (3) Antall beslutninger tatt raskere. Disse er enkle å måle, knyttet til faktisk verdi og gir deg noe å forbedre.",
      highlight: {
        quote: "«Vi gikk fra å bruke 6 timer på månedlig rapportering til 45 minutter. Det er et tall vi kan ta med til styret — ikke en følelse av at 'AI hjelper litt'.»",
        source: "— CFO, norsk produksjonsbedrift",
      },
    },
    tip: {
      title: "Sett opp ditt første AI-målepunkt i dag",
      text: "Velg én prosess du allerede bruker AI til. Mål nøyaktig hvor lang tid den tok manuelt (siste 3 ganger) og hvor lang tid med AI. Dokumenter dette i et enkelt regneark. Det er din baseline — og starten på en business case.",
      prompt: "Hjelp meg å lage en enkel KPI-tabell for å måle effekten av AI på [beskriv prosess] i min bedrift.",
    },
    resource: {
      icon: "📊", label: "Rammeverk",
      title: "AI ROI Calculator — fra BCG",
      desc: "Et gratis rammeverk fra Boston Consulting Group for å beregne potensiell avkastning på AI-investeringer. Tilpasset ulike bransjer.",
      url: "https://www.bcg.com/capabilities/artificial-intelligence",
    },
    cta: { title: "Klar til å finne ut hva AI faktisk kan gi din bedrift?", sub: "Ta AI-testen vår og få en personlig rapport med konkrete tiltak — gratis på 5 minutter.", button: "Ta AI-testen →", href: "/ai-beredskap" },
  },
];


/* ─────────────────────────────────────────── sub-components ── */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="relative z-10 w-full text-left rounded-xl px-4 py-3 transition-all duration-200 group"
      style={{ background: "rgba(138,173,148,0.1)", border: `1px solid ${copied ? "rgba(245,158,11,0.5)" : "rgba(138,173,148,0.2)"}` }}
    >
      <p className="text-xs leading-relaxed pr-20" style={{ color: "#b8d4bf", fontFamily: "monospace" }}>
        {text}
      </p>
      <span
        className="absolute top-2.5 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-200"
        style={{ background: copied ? "rgba(245,158,11,0.25)" : "rgba(138,173,148,0.15)", color: copied ? "#f59e0b" : "rgba(138,173,148,0.7)" }}
      >
        {copied ? (
          <>
            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Kopiert!
          </>
        ) : (
          <>
            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Kopier
          </>
        )}
      </span>
    </button>
  );
}

function ReactionBar() {
  const positive = [
    { emoji: "👍", label: "Nyttig" },
    { emoji: "🔥", label: "Must-read" },
    { emoji: "💡", label: "Lærerikt" },
    { emoji: "🙌", label: "Inspirerende" },
  ];
  const negative = [
    { emoji: "😐", label: "Meh" },
    { emoji: "🤯", label: "For mye" },
    { emoji: "👎", label: "Ikke nyttig" },
  ];
  const [picked, setPicked] = useState<string | null>(null);

  const isNeg = picked ? negative.some((r) => r.emoji === picked) : false;

  const ReactionBtn = ({ r }: { r: { emoji: string; label: string } }) => {
    const isActive = picked === r.emoji;
    const neg = negative.some((x) => x.emoji === r.emoji);
    return (
      <button
        key={r.emoji}
        type="button"
        onClick={() => setPicked(isActive ? null : r.emoji)}
        className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-center transition-all duration-200 hover:scale-110"
        style={{
          background: isActive
            ? neg ? "rgba(220,38,38,0.08)" : "rgba(21,128,61,0.12)"
            : "rgba(26,51,32,0.05)",
          border: `1px solid ${isActive
            ? neg ? "rgba(220,38,38,0.25)" : "rgba(21,128,61,0.3)"
            : "rgba(26,51,32,0.1)"}`,
          transform: isActive ? "scale(1.1)" : undefined,
        }}
      >
        <span className="text-xl leading-none">{r.emoji}</span>
        <span className="text-xs font-medium" style={{
          color: isActive
            ? neg ? "#dc2626" : "#15803d"
            : "rgba(26,51,32,0.5)"
        }}>
          {r.label}
        </span>
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <p className="text-xs font-semibold tracking-wider uppercase" style={{ color: "rgba(26,51,32,0.4)" }}>
        Hva syntes du om denne utgaven?
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {positive.map((r) => <ReactionBtn key={r.emoji} r={r} />)}
        <div className="w-px mx-1 self-stretch" style={{ background: "rgba(26,51,32,0.1)" }} />
        {negative.map((r) => <ReactionBtn key={r.emoji} r={r} />)}
      </div>
      {picked && (
        <p className="text-xs font-semibold" style={{ color: isNeg ? "#dc2626" : "#15803d" }}>
          {isNeg ? "Takk — vi tar det med oss og forbedrer oss! 💪" : "Takk for tilbakemeldingen! 🙏"}
        </p>
      )}
    </div>
  );
}

function ShareButton({ week }: { week: number }) {
  const [shared, setShared] = useState(false);
  const share = () => {
    const url = `${typeof window !== "undefined" ? window.location.origin : ""}/siste-nyheter#nyhetsbrev`;
    navigator.clipboard.writeText(url).then(() => {
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    });
  };
  return (
    <button
      type="button"
      onClick={share}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
      style={{
        background: shared ? "rgba(21,128,61,0.15)" : "rgba(138,173,148,0.1)",
        border: "1px solid rgba(138,173,148,0.25)",
        color: shared ? "#15803d" : "rgba(138,173,148,0.8)",
      }}
    >
      {shared ? (
        <><svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Lenke kopiert!</>
      ) : (
        <><svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>Del utgave #{week}</>
      )}
    </button>
  );
}

function stepPhotoAlt(stepIndex: number, nl: Newsletter) {
  return `${READING_JOURNEY[stepIndex].title} — ${nl.tema}`;
}

function NewsletterStepPhoto({
  imageSrc,
  imageAlt,
  surface = "light",
  className = "",
}: {
  imageSrc: string;
  imageAlt: string;
  surface?: "light" | "dark";
  className?: string;
}) {
  const dark = surface === "dark";
  return (
    <div
      className={`group relative h-[180px] max-h-[180px] w-full shrink-0 overflow-hidden rounded-2xl border sm:h-[264px] sm:max-h-[264px] sm:w-[40%] sm:min-w-[9rem] sm:max-w-[19rem] sm:flex-none sm:self-start ${className}`}
      style={{
        borderColor: dark ? "rgba(255,255,255,0.12)" : "rgba(21,128,61,0.14)",
        boxShadow: dark
          ? "inset 0 0 0 1px rgba(255,255,255,0.06), 0 10px 32px rgba(0,0,0,0.25)"
          : "inset 0 0 0 1px rgba(255,255,255,0.35), 0 10px 32px rgba(10,46,26,0.1)",
      }}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 640px) 100vw, 320px"
        className={`object-cover object-center transition-transform duration-700 ease-out ${dark ? "opacity-95" : "opacity-100"} group-hover:scale-[1.03]`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 ${dark ? "bg-gradient-to-t from-black/45 via-black/10 to-transparent" : "bg-gradient-to-t from-[#1a3320]/15 via-transparent to-transparent"} opacity-90`}
      />
    </div>
  );
}

function NewsletterStepEyebrow({ stepIndex }: { stepIndex: number }) {
  const j = READING_JOURNEY[stepIndex];
  const dark = stepIndex === 2;
  return (
    <div className="space-y-2">
      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: dark ? "#fbbf24" : "#15803d" }}>
        {j.title}
      </p>
      <p
        className="text-[11px] font-semibold uppercase tracking-wide leading-snug"
        style={{ color: dark ? "rgba(253,230,138,0.88)" : "rgba(26,51,32,0.42)" }}
      >
        {j.hint}
      </p>
      <p className="text-sm leading-relaxed" style={{ color: dark ? "rgba(236,253,245,0.88)" : "rgba(26,51,32,0.65)" }}>
        {j.intro}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────── card ── */

function NewsletterCard({ nl }: { nl: Newsletter }) {
  const [step, setStep] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const TOTAL = 5;

  const goTo = useCallback((s: number) => {
    setStep(s);
    setTimeout(() => cardRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 50);
  }, []);

  const next = () => step < TOTAL - 1 && goTo(step + 1);
  const prev = () => step > 0 && goTo(step - 1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div
      ref={cardRef}
      className="rounded-2xl overflow-hidden"
      style={{ boxShadow: "0 4px 32px rgba(10,46,26,0.14)", border: "1px solid rgba(34,139,70,0.15)" }}
    >
      {/* ── HEADER ── */}
      <div className="relative overflow-hidden px-6 sm:px-8 pt-7 pb-0" style={{ background: "#0a2e1a" }}>
        <div className="absolute pointer-events-none" style={{ top: -80, right: -80, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)" }} />

        <div className="relative z-10 flex items-center justify-between mb-4">
          <BrandLogo kind="wordmarkWithJourney" surface="dark" alt="Lillehval" width={280} height={50} className="h-6 w-auto" />
          <div className="flex items-center gap-2">
            <ShareButton week={nl.issue} />
            <span className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full" style={{ color: "#f59e0b", border: "1px solid rgba(245,158,11,0.35)" }}>
              Utgave #{nl.issue}
            </span>
          </div>
        </div>

        <div className="relative z-10 mb-4">
          <p className="text-xs font-semibold tracking-widest uppercase mb-1.5" style={{ color: "#f59e0b" }}>{nl.tema}</p>
          <h3 className="font-bold leading-snug mb-2" style={{ fontSize: "clamp(15px,2.2vw,19px)", color: "#ffffff", letterSpacing: "-0.02em" }}>
            {nl.headline}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "#8aad94" }}>{nl.subline}</p>
        </div>

        {/* Leservei — kundereise (linje bak steg-kuler) */}
        <div className="relative z-10 isolate border-t pt-4 pb-4" style={{ borderColor: "rgba(138,173,148,0.2)" }}>
          <p
            className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.16em] sm:text-left sm:tracking-[0.18em]"
            style={{ color: "rgba(138,173,148,0.65)" }}
          >
            Din leserekkefølge · trykk på et steg
          </p>
          <nav
            className="overflow-x-auto pb-1 -mx-1 px-1 sm:overflow-visible"
            aria-label="Leserekkefølge for denne utgaven"
            style={{ scrollbarColor: "rgba(138,173,148,0.35) transparent" }}
          >
            <div className="relative mx-auto min-w-[28rem] max-w-full px-0.5 sm:min-w-0">
              <div
                className="pointer-events-none absolute left-[7%] right-[7%] top-[15px] z-0 h-[2px] rounded-full sm:top-[16px]"
                style={{
                  background: "linear-gradient(90deg, #f59e0b 0%, #eab308 12%, #8aad94 40%, #14532d 70%, #0a2e1a 100%)",
                }}
                aria-hidden
              />
              <ol className="relative z-10 m-0 flex list-none justify-between gap-0 p-0">
                {READING_JOURNEY.map((j, i) => {
                  const active = i === step;
                  const past = i < step;
                  return (
                    <li key={j.title} className="flex min-w-0 flex-[1_1_0] flex-col items-center px-0.5">
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        aria-current={active ? "step" : undefined}
                        aria-label={`${j.title}: ${j.hint}. Steg ${i + 1} av 5.`}
                        className="group flex w-full max-w-[5.5rem] flex-col items-center gap-1 rounded-lg py-0.5 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a2e1a] sm:max-w-none sm:gap-1.5"
                      >
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-extrabold shadow-sm transition-colors duration-200 sm:h-9 sm:w-9"
                          style={{
                            borderColor: active ? "#f59e0b" : past ? "#8aad94" : "rgba(138,173,148,0.45)",
                            background: active ? "#ffffff" : "#0a2e1a",
                            color: active ? "#0a2e1a" : past ? "#ecfdf5" : "rgba(236,253,245,0.92)",
                            boxShadow: "0 0 0 2px #0a2e1a",
                          }}
                        >
                          {i + 1}
                        </span>
                        <span
                          className="text-center text-[9px] font-bold uppercase leading-tight tracking-wide text-balance sm:text-[10px]"
                          style={{ color: active ? "#fbbf24" : "rgba(236,253,245,0.9)" }}
                        >
                          {j.title}
                        </span>
                        <span
                          className="hidden text-center text-[9px] leading-tight text-balance lg:block lg:line-clamp-2"
                          style={{ color: "rgba(138,173,148,0.62)" }}
                        >
                          {j.hint}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </nav>
          <div
            className="mt-3 flex flex-col items-center justify-between gap-1 border-t pt-3 sm:flex-row sm:items-center"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <p className="text-center text-xs sm:text-left" style={{ color: "rgba(138,173,148,0.55)" }}>
              <span className="font-semibold" style={{ color: "#f59e0b" }}>
                {READING_JOURNEY[step].title}
              </span>
              <span className="hidden sm:inline"> · </span>
              <span className="block sm:inline" style={{ color: "rgba(138,173,148,0.5)" }}>
                Steg {step + 1} av {TOTAL}
              </span>
            </p>
            <p className="text-xs tabular-nums" style={{ color: "rgba(138,173,148,0.5)" }}>
              {nl.date} · {nl.readTime}
            </p>
          </div>
        </div>
      </div>

      {/* ── AMBER STRIPE ── */}
      <div className="h-[3px]" style={{ background: `linear-gradient(to right, #f59e0b ${((step + 1) / TOTAL) * 100}%, rgba(138,173,148,0.2) ${((step + 1) / TOTAL) * 100}%)`, transition: "all 0.4s ease" }} />

      {/* ── SECTION CONTENT ── */}
      <div className="px-6 sm:px-8 py-7 min-h-[320px] flex flex-col" style={{ background: "#f2ede3" }}>

        {/* STEP 0 — Observasjon */}
        {step === 0 && (
          <div className="flex flex-1 flex-col gap-5 sm:flex-row sm:items-stretch sm:gap-6">
            <NewsletterStepPhoto
              imageSrc={nl.stepImages[0]}
              imageAlt={stepPhotoAlt(0, nl)}
            />
            <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4">
              <NewsletterStepEyebrow stepIndex={0} />
              <p
                className="text-sm leading-[1.85]"
                style={{ color: "#1a3320" }}
                dangerouslySetInnerHTML={{ __html: nl.intro.text.replace(/\n\n/g, "<br /><br />") }}
              />
            </div>
          </div>
        )}

        {/* STEP 1 — Tema */}
        {step === 1 && (
          <div className="flex flex-1 flex-col gap-5 sm:flex-row sm:items-stretch sm:gap-6">
            <NewsletterStepPhoto
              imageSrc={nl.stepImages[1]}
              imageAlt={stepPhotoAlt(1, nl)}
            />
            <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4">
              <NewsletterStepEyebrow stepIndex={1} />
              <h4 className="font-bold leading-snug" style={{ fontSize: 17, color: "#0a2e1a", letterSpacing: "-0.01em" }}>{nl.main.title}</h4>
              <p className="text-sm leading-relaxed" style={{ color: "#1a3320" }}>{nl.main.body}</p>
              <div
                className="rounded-r-xl pl-4 pr-5 py-4 mt-auto transition-all duration-200 hover:shadow-md cursor-default"
                style={{ background: "#edf4ea", borderLeft: "3px solid #15803d" }}
              >
                <p className="text-sm leading-relaxed italic" style={{ color: "#1a3320" }}>{nl.main.highlight.quote}</p>
                <span className="block mt-2 text-xs font-semibold not-italic tracking-wide" style={{ color: "#4a7a55" }}>{nl.main.highlight.source}</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 — Tips */}
        {step === 2 && (
          <div
            className="-mx-6 flex flex-1 flex-col overflow-hidden rounded-2xl sm:-mx-8 sm:flex-row"
            style={{ background: "#0a2e1a" }}
          >
            <NewsletterStepPhoto
              imageSrc={nl.stepImages[2]}
              imageAlt={stepPhotoAlt(2, nl)}
              surface="dark"
              className="rounded-b-none rounded-t-2xl border-white/10 sm:rounded-b-2xl sm:rounded-l-2xl sm:rounded-r-none sm:rounded-t-2xl sm:rounded-br-none sm:rounded-tr-none"
            />
            <div className="relative flex min-h-0 min-w-0 flex-1 flex-col gap-4 px-6 py-6 sm:px-7 sm:py-7">
              <div className="absolute pointer-events-none" style={{ top: -50, left: -50, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)" }} />
              <div className="absolute pointer-events-none" style={{ bottom: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(21,128,61,0.15) 0%, transparent 70%)" }} />
              <div className="relative z-10">
                <NewsletterStepEyebrow stepIndex={2} />
              </div>
              <h4 className="relative z-10 font-bold leading-snug" style={{ fontSize: 16, color: "#ffffff" }}>{nl.tip.title}</h4>
              <p className="relative z-10 text-sm leading-relaxed" style={{ color: "#8aad94" }}>{nl.tip.text}</p>
              <div className="relative z-10 mt-auto flex flex-col gap-1">
                <p className="mb-1 text-xs font-semibold" style={{ color: "rgba(138,173,148,0.6)" }}>ChatGPT-prompt — klikk for å kopiere:</p>
                <CopyButton text={nl.tip.prompt} />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 — Ressurs */}
        {step === 3 && (
          <div className="flex flex-1 flex-col gap-5 sm:flex-row sm:items-stretch sm:gap-6">
            <NewsletterStepPhoto
              imageSrc={nl.stepImages[3]}
              imageAlt={stepPhotoAlt(3, nl)}
            />
            <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4">
              <NewsletterStepEyebrow stepIndex={3} />
              <a
                href={nl.resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-4 items-start rounded-xl p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg group"
                style={{ background: "rgba(255,255,255,0.75)", border: "1px solid #c8d9c0" }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl" style={{ background: "#edf4ea" }}>
                  {nl.resource.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="mb-1 text-xs font-semibold tracking-widest uppercase" style={{ color: "#4a7a55" }}>{nl.resource.label}</p>
                  <p className="mb-1 text-sm font-bold leading-snug" style={{ color: "#0a2e1a" }}>{nl.resource.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(26,51,32,0.7)" }}>{nl.resource.desc}</p>
                  <p className="mt-2 flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2" style={{ color: "#15803d" }}>
                    Åpne ressurs
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </p>
                </div>
              </a>
            </div>
          </div>
        )}

        {/* STEP 4 — CTA */}
        {step === 4 && (
          <div className="flex flex-1 flex-col gap-5 sm:flex-row sm:items-stretch sm:gap-6">
            <NewsletterStepPhoto
              imageSrc={nl.stepImages[4]}
              imageAlt={stepPhotoAlt(4, nl)}
            />
            <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-5">
              <NewsletterStepEyebrow stepIndex={4} />
              <div>
                <h4 className="mb-2 font-bold leading-snug" style={{ fontSize: 17, color: "#0a2e1a" }}>{nl.cta.title}</h4>
                <p className="mb-5 text-sm leading-relaxed" style={{ color: "rgba(26,51,32,0.7)" }}>{nl.cta.sub}</p>
                <Link
                  href={nl.cta.href}
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{ background: "#f59e0b", color: "#052016", boxShadow: "0 4px 20px rgba(245,158,11,0.4)" }}
                >
                  {nl.cta.button}
                </Link>
              </div>
              <div style={{ borderTop: "1px solid #c8d9c0" }}>
                <ReactionBar />
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-4" style={{ borderTop: "1px solid rgba(200,217,192,0.6)" }}>
          <button
            type="button"
            onClick={prev}
            disabled={step === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 disabled:opacity-30"
            style={{ background: "rgba(26,51,32,0.07)", color: "#1a3320" }}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Forrige
          </button>

          {/* Dot nav */}
          <div className="flex gap-2">
            {Array.from({ length: TOTAL }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className="transition-all duration-200"
                style={{
                  width: i === step ? 20 : 8,
                  height: 8,
                  borderRadius: 999,
                  background: i === step ? "#15803d" : i < step ? "rgba(21,128,61,0.4)" : "rgba(26,51,32,0.15)",
                }}
                aria-label={`Gå til ${READING_JOURNEY[i].title}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            disabled={step === TOTAL - 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 disabled:opacity-30"
            style={{ background: step === TOTAL - 1 ? "rgba(26,51,32,0.07)" : "#15803d", color: step === TOTAL - 1 ? "#1a3320" : "#fff" }}
          >
            Neste
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="px-6 sm:px-8 py-6" style={{ background: "#0a2e1a" }}>
        <div className="mb-3">
          <BrandLogo kind="wordmarkWithJourney" surface="dark" alt="Lillehval" width={240} height={42} className="h-5 w-auto" />
        </div>
        <p className="text-xs leading-relaxed mb-4" style={{ color: "#8aad94" }}>AI-rådgivning for norske bedrifter. Fra usikkerhet til handling.</p>
        <div className="flex flex-wrap gap-4 mb-4">
          {[
            { label: "Vår nettside", href: "/" },
            { label: "AI-tjenester", href: "/ai-tjenester" },
            { label: "AI-testen", href: "/ai-beredskap" },
            { label: "Om oss", href: "/hvorfor-oss" },
            { label: "Sommerjobb & AI-partner", href: "/sommervikar" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="text-xs font-semibold transition-colors duration-150 hover:text-amber-400" style={{ color: "#8aad94" }}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="mb-3" style={{ height: 1, background: "rgba(138,173,148,0.2)" }} />
        <p className="text-xs leading-relaxed" style={{ color: "rgba(138,173,148,0.45)" }}>
          © 2026 Lillehval AS ·{" "}
          <a href="mailto:post@lillehval.no" className="underline underline-offset-2" style={{ color: "rgba(138,173,148,0.45)" }}>post@lillehval.no</a>
          {" "}·{" "}
          <a href="#" className="underline underline-offset-2" style={{ color: "rgba(138,173,148,0.45)" }}>Meld deg av</a>
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── section ── */

export default function NewsletterSection() {
  const [openWeek, setOpenWeek] = useState<number>(17);

  return (
    <div id="nyhetsbrev" className="mb-16 scroll-mt-24">
      <div className="mb-6">
        <SectionKicker className="!mb-2">Nyhetsbrev</SectionKicker>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1a3320]">
          Ukentlig AI-oppdatering fra Lillehval
        </h2>
        <p className="mt-2 text-sm max-w-2xl leading-relaxed" style={{ color: "rgba(26,51,32,0.55)" }}>
          Hver uke får du fem tydelige steg — fra kontekst i feltet til noe du kan prøve selv, en anbefalt ressurs og et forslag til neste steg med oss. Du kan hoppe fritt mellom stegene, og på brede skjermer viser vi et konkret foto ved siden av teksten som speiler ukens tema og steget du er i. Bruk Forrige og Neste under utgaven om du vil gå i rolig tempo.
        </p>
      </div>

      {/* Week tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {[...NEWSLETTERS].reverse().map((nl) => (
          <button
            key={nl.week}
            type="button"
            onClick={() => setOpenWeek(nl.week)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
            style={
              openWeek === nl.week
                ? { background: "#0a2e1a", color: "#f2ede3", boxShadow: "0 2px 12px rgba(10,46,26,0.25)" }
                : { background: "rgba(255,255,255,0.6)", color: "#1a3320", border: "1px solid rgba(34,139,70,0.2)" }
            }
          >
            Uke {nl.week}
            {nl.week === 17 && (
              <span className="text-xs font-bold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(245,158,11,0.2)", color: "#b45309" }}>
                Siste
              </span>
            )}
          </button>
        ))}
      </div>

      {NEWSLETTERS.filter((nl) => nl.week === openWeek).map((nl) => (
        <NewsletterCard key={nl.week} nl={nl} />
      ))}
    </div>
  );
}

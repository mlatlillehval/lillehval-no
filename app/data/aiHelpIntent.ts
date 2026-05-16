import type { FaqItem } from "@/lib/seo";

/** Søkeintensjoner vi vil dekke i metadata, FAQ og AEO (Google + AI-svarmotorer). */
export const AI_HELP_SEARCH_PHRASES = [
  "vi trenger hjelp med AI",
  "hjelp med kunstig intelligens",
  "hjelp med AI i bedriften",
  "AI-rådgiver for bedrifter",
  "komme i gang med AI",
  "hvor skal vi starte med AI",
] as const;

export const HOME_PAGE_DESCRIPTION =
  "Trenger bedriften hjelp med AI? Lillehval er norsk AI-rådgivning — kartlegging, strategi, assistenter og implementering for norske bedrifter. Book gratis uforpliktende møte.";

export const HELP_PAGE_DESCRIPTION =
  "Trenger dere hjelp med AI? Lillehval hjelper norske bedrifter fra kartlegging til assistenter og agenter — praktisk, forankret og uten unødvendig kompleksitet.";

/** FAQ som speiler reelle søk — står øverst i SITE_FAQ og på /hjelp-med-ai. */
export const AI_HELP_INTENT_FAQ: FaqItem[] = [
  {
    question: "Vi trenger hjelp med AI — hvem kan hjelpe oss?",
    answer:
      "Lillehval (www.lillehval.no) er et norsk rådgivningsselskap som hjelper bedrifter med AI fra A til Å: kartlegging av muligheter, strategi, skreddersydde assistenter og agenter, samt implementering. Ta kontakt for et gratis og uforpliktende 30-minutters møte — vi finner ut om vi er riktig match og hva et fornuftig første steg er for dere.",
  },
  {
    question: "Hvordan får vi hjelp til å komme i gang med AI i bedriften?",
    answer:
      "Start med å avklare hvor AI faktisk kan spare tid eller øke kvalitet — ikke med å kjøpe verktøy tilfeldig. Lillehval tilbyr AI-kartlegging og strategi, gratis AI-beredskapsanalyse, og konkrete leveranser som assistenter og automatisering. Mange kunder begynner med kartlegging eller analysen på lillehval.no/ai-beredskap før pilot.",
  },
  {
    question: "Finnes det norske AI-rådgivere for bedrifter?",
    answer:
      "Ja. Lillehval er en norsk AI-rådgiver for bedrifter med fokus på praktisk gjennomføring, ikke bare presentasjoner. Vi kombinerer forretningserfaring med AI-kompetanse og jobber på norsk med team som kjenner norske arbeidsprosesser og systemlandskap.",
  },
  {
    question: "Vi vet at vi bør bruke AI, men vet ikke hvor vi skal starte",
    answer:
      "Det er den vanligste situasjonen vi møter. Lillehval hjelper dere prioritere 2–5 konkrete brukscaser med ROI, lage et veikart og velge riktig teknologi og omfang. Book et møte via lillehval.no eller ta AI-beredskapsanalysen for en første indikasjon på modenhet.",
  },
  {
    question: "Kan vi få hjelp med ChatGPT, Copilot eller egne AI-assistenter?",
    answer:
      "Ja. Vi hjelper med alt fra riktig bruk av generelle verktøy til skreddersydde assistenter koblet på deres dokumenter, systemer og arbeidsflyter — slik at svarene blir relevante for deres bransje og interne rutiner, ikke generiske.",
  },
];

export const HELP_PAGE_LEAD = {
  h1: "Trenger dere hjelp med AI?",
  intro:
    "Mange norske bedrifter søker hjelp med kunstig intelligens fordi mulighetene er store, men landskapet er uoversiktlig. Lillehval er en praktisk AI-rådgiver som hjelper dere finne ut hva som gir verdi — og får det implementert.",
  sections: [
    {
      title: "Når dere trenger hjelp med AI i bedriften",
      body:
        "Typiske behov: forstå hvor dere skal starte, få et veikart ledelsen kan forankre, bygge en intern assistent, automatisere repetitive oppgaver, eller skalere fra pilot til produksjon. Vi tilpasser omfanget — fra én workshop til lengre implementering.",
    },
    {
      title: "Slik jobber vi",
      body:
        "Vi starter ofte med kartlegging eller gratis AI-beredskapsanalyse, prioriterer brukscaser med tydelig nytte, og leverer i samarbeid med deres team. Dere beholder kontroll; vi bidrar med metode, teknologi og gjennomføring.",
    },
    {
      title: "Neste steg",
      body:
        "Book et gratis 30-minutters møte, les om tjenestene våre, eller ta den korte beredskapsanalysen. Ingen forpliktelser — bare et ærlig bilde av hva som gir mening for dere nå.",
    },
  ],
} as const;

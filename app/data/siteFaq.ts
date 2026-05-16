import type { FaqItem } from "@/lib/seo";
import { AI_HELP_INTENT_FAQ } from "./aiHelpIntent";

/** Sentral FAQ — søkeintensjoner først, deretter generelle spørsmål. */
export const SITE_FAQ: FaqItem[] = [
  ...AI_HELP_INTENT_FAQ,
  {
    question: "Hva er Lillehval?",
    answer:
      "Lillehval er et norsk rådgivningsselskap som hjelper bedrifter med AI — fra forståelse og kartlegging til implementering av assistenter, agenter og automatisering. Vi jobber praktisk tett med kundens team, ikke bare med slideware.",
  },
  {
    question: "Hvem passer Lillehval for?",
    answer:
      "Typisk norske mellomstore bedrifter og vekstselskaper som vil komme i gang med AI, men mangler tid eller intern kompetanse til å prioritere og gjennomføre. Ledelse, produkt, drift og fagmiljøer som trenger et tydelig veikart og noen som kan levere.",
  },
  {
    question: "Hvor bør vi starte med AI i bedriften?",
    answer:
      "Start med kartlegging: hvilke prosesser, data og systemer dere har, og hvor AI kan gi målbar verdi. Vi anbefaler ofte AI-kartlegging og strategi før større investeringer, slik at pilot og utrulling bygger på reelle brukscaser — ikke generelle buzzord.",
  },
  {
    question: "Hva er forskjellen på en chatbot og en AI-agent?",
    answer:
      "En chatbot svarer på spørsmål innenfor det den er trent eller koblet på. En agent kan dele opp et mål i steg, bruke verktøy og systemer dere allerede har (f.eks. e-post, CRM, dokumenter), og rapportere tilbake — med menneskelig godkjenning der det trengs.",
  },
  {
    question: "Trenger vi egen IT-avdeling for å jobbe med Lillehval?",
    answer:
      "Nei, men god dialog med IT eller leverandører er en fordel. Vi tilpasser omfang til deres modenhet: fra opplæring og enkle assistenter til integrasjoner og prosessautomatisering. Mange starter smått og bygger videre.",
  },
  {
    question: "Hva leverer dere konkret?",
    answer:
      "Blant annet AI-kartlegging og strategi, skreddersydde AI-assistenter, implementering og integrasjon, opplæring, prosessautomatisering og optimalisering. Se oversikten under AI-tjenester på lillehval.no for detaljer per tilbud.",
  },
  {
    question: "Hva koster det?",
    answer:
      "Pris avhenger av omfang — fra en modenhetsanalyse og kartlegging til lengre implementeringsløp. Ta kontakt for en uforpliktende prat; vi skisserer ofte et første steg med tydelig leveranse før større forpliktelser.",
  },
];

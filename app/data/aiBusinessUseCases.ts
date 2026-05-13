export type AiBusinessUseCase = {
  title: string;
  description: string;
};

/** Ti konkrete bruksområder — forsalg / inspirasjon tilpasset bedrifter (strategi, implementering, automatisering). */
export const AI_BUSINESS_USE_CASES: AiBusinessUseCase[] = [
  {
    title: "Kundeservice og førstelinje",
    description:
      "AI triagerer henvendelser, foreslår svar ut fra kunnskapsbase og eskalerer bare avvik — kortere ventetid og mer konsistent kvalitet.",
  },
  {
    title: "Intern søk og kunnskapsdeling (RAG)",
    description:
      "Ansatte får svar med sitater fra dokumenter, prosedyrer og intranett — mindre tid brukt på å lete, færre «tacit knowledge»-tap.",
  },
  {
    title: "Saks- og dokumentflyt",
    description:
      "Klassifisering, sammendrag og neste steg i saker (HR, kvalitet, leverandør) — færre manuelle overleveringer og tydeligere beslutningsgrunnlag.",
  },
  {
    title: "Salgs- og tilbudsstøtte",
    description:
      "Utkast til tilbud, tekniske Q&A mot produktdata og oppfølgingsforslag — raskere respons uten å erstatte faglig kvalitetssikring.",
  },
  {
    title: "Finans, faktura og avstemming",
    description:
      "Matching av faktura mot ordre/kontrakt, avviksflagg og forklaringer — mindre manuelt rutinearbeid og bedre sporbarhet.",
  },
  {
    title: "HR og onboarding",
    description:
      "Sjekklister, kontraktsutkast, opplæringsplaner og FAQ for nyansatte — mer skalerbar introduksjon med menneskelig godkjenning der det trengs.",
  },
  {
    title: "IT-drift og brukerstøtte",
    description:
      "Ticket-kategorisering, kjente feilmønstre og forslag til løsning — frigjør kapasitet til komplekse hendelser og forbedring av plattform.",
  },
  {
    title: "Kvalitet og compliance-QA",
    description:
      "Kontroll mot krav, sjekklister og policy — assistanse ved revisjon og endringsløp, ikke erstatning for juridisk eller regulatorisk ansvar.",
  },
  {
    title: "Møter, beslutninger og status",
    description:
      "Oppsummering, action items og risiko fra møtereferat — bedre oppfølging mellom ledd uten manuell «minnediktat».",
  },
  {
    title: "Prosesskartlegging og forbedring",
    description:
      "Identifisere flaskehalser, dupliserte steg og automatiseringstreff — grunnlag for prioritering i AI- og digitaliseringsstrategi.",
  },
];

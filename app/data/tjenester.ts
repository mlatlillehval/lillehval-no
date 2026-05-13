export type Tjeneste = {
  slug: string;
  title: string;
  kicker: string;
  kickerColor: string;
  tagline: string;
  desc: string;
  image: string;
  imageAlt: string;
  includes: string[];
  outcomes: string[];
};

export const tjenester: Tjeneste[] = [
  {
    slug: "kartlegging",
    title: "AI-kartlegging og strategi",
    kicker: "Startpunktet",
    kickerColor: "#15803d",
    tagline: "Forstå nøyaktig hva AI kan gjøre for din bedrift — og hvor du bør starte.",
    desc: "Vi kartlegger prosessene deres, vurderer AI-modenhet og identifiserer de brukscasene som gir raskest og størst verdi. Resultatet er et konkret veikart — ikke generelle råd, men en prioritert plan tilpasset din virksomhet.",
    image: "/service-kartlegging-akvarell.png",
    imageAlt: "Akvarell: kompass og kart for AI-strategi",
    includes: [
      "AI-modenhetsvurdering",
      "Prioritert shortlist (2–5 case)",
      "ROI-estimat per bruksområde",
      "AI-veikart (6–18 mnd)",
    ],
    outcomes: [
      "Vite nøyaktig hva AI gir verdi",
      "Klar prioriteringsliste til neste steg",
      "Internt eierskap og forankring",
      "Klar til ekstern implementering",
    ],
  },
  {
    slug: "assistent",
    title: "AI-assistent",
    kicker: "Din egen +1",
    kickerColor: "#15803d",
    tagline: "En skreddersydd AI-assistent som kjenner selskapet og jobber på dine premisser.",
    desc: "Vi setter opp en assistent tilpasset én rolle eller ett team — med systeminstrukser, tilkoblinger til relevante datakilder og opplæring skreddersydd til hverdagen. Resultatet er en AI som faktisk kjenner virksomheten og leverer konsistent kvalitet.",
    image: "/analogi-ai-assistent-gps.png",
    imageAlt: "Akvarell: medpassasjer med GPS",
    includes: [
      "AI modell - oppsett og systeminstrukser",
      "Tilkoblinger til datakilder (MCP)",
      "Skills, plugins og arbeidsflyt",
      "Opplæring og bruksveiledning",
    ],
    outcomes: [
      "+1 til hvert teammedlem",
      "Konsistent kvalitet på tvers",
      "Klar på 1–3 uker",
      "Ingen teknisk bakgrunn nødvendig",
    ],
  },
  {
    slug: "agenter",
    title: "AI-agenter",
    kicker: "Automasjon",
    kickerColor: "#b45309",
    tagline: "AI som planlegger og gjennomfører flerstegsoppgaver uten konstant tilsyn.",
    desc: "Vi designer og implementerer AI-agenter som bruker verktøy, koordinerer seg imellom og fullfører oppgaver på egenhånd. Fra tilbudsgenerering til rapportering — agentene tar seg av prosessen mens teamet ditt fokuserer på det som krever mennesker.",
    image: "/analogi-ai-agent-sjafor.png",
    imageAlt: "Akvarell: sjåfør bak rattet",
    includes: [
      "Agent-design og oppgaveflyt",
      "Integrasjon mot systemer og data",
      "Agentkoordinering og orkestrering",
      "Driftsoppsett og vedlikehold",
    ],
    outcomes: [
      "Autonome prosesser uten tilsyn",
      "Kortere behandlingstid",
      "Skaler uten mer bemanning",
      "Driftsikker, orkestrert flyt",
    ],
  },
  {
    slug: "applikasjon",
    title: "AI-applikasjon",
    kicker: "Skreddersydd produkt",
    kickerColor: "#1d4ed8",
    tagline: "AI bygget direkte inn i produktet eller systemet dere allerede bruker.",
    desc: "Vi integrerer AI-funksjonalitet direkte i eksisterende produkt eller arbeidsflyt — full kontroll over data, grensesnitt og brukeropplevelse. Ingen ekstern plattformavhengighet, kun en løsning som passer akkurat dere.",
    image: "/analogi-ai-applikasjon-bil.png",
    imageAlt: "Akvarell: bilen",
    includes: [
      "Systemdesign og arkitektur",
      "Utvikling og API-integrasjon",
      "Sikkerhet og tilgangsstyring",
      "Testing og lansering",
    ],
    outcomes: [
      "AI i kjernen av produktet",
      "Skreddersydd UX",
      "Lavere leverandøravhengighet",
    ],
  },
  {
    slug: "egenutviklet",
    title: "AI-applikasjon (egenutviklet)",
    kicker: "Fullstack AI",
    kickerColor: "#92400e",
    tagline: "Bygg en komplett AI-løsning fra bunnen — fra arkitektur til ferdig produkt i drift.",
    desc: "For virksomheter som ønsker full kontroll over sin egen AI-plattform. Vi tar hånd om alt fra datamodellering og modellvalg til produksjonssetting og videreutvikling — med en arkitektur som er bygget for å skalere.",
    image: "/analogi-ai-modell-motor.png",
    imageAlt: "Akvarell: AI-modell som motor",
    includes: [
      "Fullstack utvikling og AI-kjerne",
      "Datasett, finjustering og konfigurasjon",
      "Sikkerhet, policy og compliance",
      "Lansering og videreutvikling",
    ],
    outcomes: [
      "Komplett, skalerbart AI-produkt",
      "Full kontroll over data og kode",
      "Skreddersydd til eksakte behov",
    ],
  },
  {
    slug: "opplaering",
    title: "AI-opplæring og erfaring",
    kicker: "Kompetansebygging",
    kickerColor: "#15803d",
    tagline: "Bygg intern AI-kompetanse som holder — praktisk, skreddersydd og over tid.",
    desc: "Vi holder workshops, kurs og løpende veiledning tilpasset teamets nivå og hverdag. Målet er at ansatte faktisk bruker AI — ikke bare vet at det finnes. Fra grunnleggende forståelse til avansert prompt engineering og metodikk.",
    image: "/service-opplaering-akvarell.png",
    imageAlt: "Akvarell: team i opplæring rundt laptop",
    includes: [
      "Skreddersydde workshops og kurs",
      "Gjennomgang av verktøy og metodikk",
      "Prompt engineering og beste praksis",
      "Løpende veiledning og erfaringsdeling",
    ],
    outcomes: [
      "Tryggere og mer selvstendig team",
      "Høyere nyttegrense i AI-verktøy",
      "Spre kompetanse internt og jevnt",
      "Lavere terskel for å teste og forbedre",
    ],
  },
];

export function getTjeneste(slug: string): Tjeneste | undefined {
  return tjenester.find((t) => t.slug === slug);
}

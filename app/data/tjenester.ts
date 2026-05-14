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
    desc:
      "Vi kartlegger prosessene deres og vurderer AI-modenhet. Målrettet kartlegging betyr at arbeidet forankres i reelle arbeidsflyter — intervjuer, dokumentgjennomgang og avklaring av data og systemer — slik at vi identifiserer brukscasene som gir raskest og størst verdi, med tydelig prioritering og ROI-estimat per team. Resultatet er et konkret veikart dere kan handle etter, ikke generelle råd. Omfang og innhold tilpasses behovene og ønskene til dem som tar kontakt.",
    image: "/service-kartlegging-akvarell.png",
    imageAlt: "Akvarell: kompass og kart for AI-strategi",
    includes: [
      "AI-modenhetsvurdering",
      "Prioritert shortlist (2–5 case)",
      "ROI-estimat per bruksområde",
      "AI-veikart (6–18 mnd)",
    ],
    outcomes: [
      "Vite nøyaktig hva og hvor AI gir verdi",
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
      "Rask implementering",
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
      "Lansering og videreutvikling i eget tempo",
    ],
  },
  {
    slug: "egenutviklet",
    title: "Ferdige AI-applikasjoner",
    kicker: "Hyllevare",
    kickerColor: "#92400e",
    tagline:
      "Ferdigutviklede AI-applikasjoner fra Lillehval som hyllevare — kjøp direkte, forutsigbar pris og rask vei til bruk i eget miljø.",
    desc:
      "Vi tilbyr et utvalg av egne, ferdigutviklede AI-applikasjoner dere kan kjøpe som ferdige produkter: dokumentert funksjonalitet, kjent omfang og kortere vei til verdi enn å starte fra null. Vi bistår med integrasjon mot systemene deres, sikkerhet, tilgangsstyring og opplæring slik at teamet kommer trygt i gang. Tillegg og tilpasninger kan avtales der det trengs — utgangspunktet er hyllevare dere kan ta i bruk raskt.",
    image: "/analogi-ai-modell-motor.png",
    imageAlt: "Akvarell: ferdige AI-produkter",
    includes: [
      "Utvalg ferdige AI-applikasjoner til direktekjøp",
      "Lisens og prismodell per produkt",
      "Integrasjon, sikkerhet og brukerdokumentasjon",
      "Oppstart, opplæring og avtalt support",
    ],
    outcomes: [
      "Kortere vei fra kjøp til produktiv bruk",
      "Forutsigbar kost og dokumentert funksjonalitet",
      "Trygg integrasjon og drift med vår bistand",
      "Oppdateringer og videre hjelp etter avtale",
    ],
  },
  {
    slug: "opplaering",
    title: "AI-opplæring og erfaring",
    kicker: "Kompetansebygging",
    kickerColor: "#15803d",
    tagline: "Bygg intern AI-kompetanse som holder — praktisk, skreddersydd og over tid.",
    desc: "Vi holder workshops, kurs, innlegg for de ansatte og løpende veiledning tilpasset teamets nivå og hverdag. Målet er at ansatte faktisk bruker AI — ikke bare vet at det finnes. Fra grunnleggende forståelse til avansert prompt engineering og metodikk.",
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

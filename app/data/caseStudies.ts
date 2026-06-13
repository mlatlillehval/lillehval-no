export type CaseStudy = {
  id: string;
  slug: string;
  tittel: string;
  kunde: string;
  bransje: string;
  beskrivelse: string;
  utfordring: string;
  tilnærming: string;
  status: "Aktiv" | "Dialog" | "Ferdig";
  vis_paa_nettside: boolean;
  opprettet: string;
  image: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "static-1",
    slug: "ai-beslutningsstotte-eiendom",
    tittel: "AI-basert beslutningsstøtte i eiendom",
    kunde: "Meglerselskap, Vestfold",
    bransje: "Eiendom",
    beskrivelse:
      "Samarbeid om en intern arbeidsflate som samler relevant markedsdata og historikk — slik at teamet slipper gjentakende manuelt grunnarbeid og får raskere, mer sammenlignbart overblikk før viktige avklaringer.",
    utfordring:
      "Meglerne brukte mye tid på å lete i ulike kilder og dokumenter før kundemøter og prisvurderinger. Informasjonen var spredt, og det var vanskelig å sammenligne historikk på tvers av oppdrag.",
    tilnærming:
      "Vi kartlegger datakilder, arbeidsflyt og hvilke beslutninger som tas oftest. Målet er en samlet arbeidsflate med AI-støtte som henter relevant kontekst — uten å erstatte meglerens faglige skjønn.",
    status: "Dialog",
    vis_paa_nettside: true,
    opprettet: "2026-04-10",
    image: "/marquee-ill-1.jpg",
  },
  {
    id: "static-2",
    slug: "ai-automatisering-entreprenor",
    tittel: "AI-automatisering av interne prosesser",
    kunde: "Entreprenørselskap, byggebransjen",
    bransje: "Bygg og anlegg",
    beskrivelse:
      "Kartlegger og automatiserer tidstyver i tilbuds-, rapport- og kommunikasjonsprosesser ved hjelp av AI-agenter — med mål om 30 % tidsbesparelse på administrative oppgaver.",
    utfordring:
      "Administrative oppgaver rundt tilbud, rapportering og oppfølging tok uproporsjonalt mye tid fra fagfolk som helst ville vært ute i prosjekt.",
    tilnærming:
      "Vi identifiserer repeterende oppgaver, setter målbare KPI-er og bygger AI-agenter med tydelig menneskelig kontroll. Piloten fokuserer på tilbuds- og rapportflyt før bredere utrulling.",
    status: "Aktiv",
    vis_paa_nettside: true,
    opprettet: "2026-04-15",
    image: "/marquee-ill-4.jpg",
  },
  {
    id: "static-3",
    slug: "ai-strategi-industri",
    tittel: "AI-strategi og implementeringsplan",
    kunde: "Industriselskap, Vestfold",
    bransje: "Industri",
    beskrivelse:
      "Dialog og strategiarbeid rundt AI-innføring — fra modenhetsvurdering og prioritering av use cases til konkret veikart for implementering i produksjon og logistikk.",
    utfordring:
      "Ledelsen så potensialet i AI, men manglet et felles bilde av hvor de skulle starte og hvilke investeringer som ga mening i produksjon og logistikk.",
    tilnærming:
      "Modenhetsvurdering, intervjuer med nøkkelroller og prioritering av 2–5 konkrete use cases med ROI-estimat. Resultatet blir et veikart ledelsen kan handle etter.",
    status: "Dialog",
    vis_paa_nettside: true,
    opprettet: "2026-04-20",
    image: "/marquee-ill-2.jpg",
  },
  {
    id: "static-4",
    slug: "ai-innlegg-bedrift",
    tittel: "Innlegg om AI: hva er det og hvordan hjelper det bedrifter i dag?",
    kunde: "Selskap, Vestfold",
    bransje: "Tverrgående",
    beskrivelse:
      "Vi er i dialog om å holde et innlegg for selskapets ansatte — en tilgjengelig og praktisk gjennomgang av hva AI faktisk er, hva som har endret seg de siste to årene, og hvilke muligheter det åpner for bedriften.",
    utfordring:
      "Ansatte og ledelse hadde ulike forventninger til AI — fra hype til skepsis — uten et felles språk for å diskutere hva som er realistisk i deres hverdag.",
    tilnærming:
      "Skreddersydd innlegg med eksempler fra kundens bransje, tydelig skille mellom hype og praksis, og rom for spørsmål. Målet er felles forståelse, ikke salg av verktøy.",
    status: "Aktiv",
    vis_paa_nettside: true,
    opprettet: "2026-05-01",
    image: "/marquee-ill-3.jpg",
  },
  {
    id: "static-5",
    slug: "effektivisering-spedisjon-oslo",
    tittel: "Effektiviseringsarbeid i spedisjon og logistikk",
    kunde: "Spedisjonsfirma, Oslo",
    bransje: "Spedisjon og logistikk",
    beskrivelse:
      "Vi er i dialog om et effektiviseringsløp — kartlegging av manuelle prosesser, kundedialog og intern flyt, med mål om konkrete tidsbesparelser uten å endre det som allerede fungerer.",
    utfordring:
      "Høyt volum i kundedialog og intern koordinering skapte flaskehalser. Teamet ville effektivisere uten å risikere kvaliteten i spedisjonsoppfølgingen.",
    tilnærming:
      "Kartlegging av prosesser fra henvendelse til leveranse, identifisering av manuelle tidstyver og forslag til AI-støtte der det gir målbar gevinst — med lav risiko som utgangspunkt.",
    status: "Dialog",
    vis_paa_nettside: true,
    opprettet: "2026-06-10",
    image: "/analogi-ai-agent-sjafor.png",
  },
  {
    id: "static-6",
    slug: "innboks-bygg-anlegg",
    tittel: "Innboks, tilbud og kundedialog i bygg og anlegg",
    kunde: "Bygg- og anleggsfirma, Tønsberg",
    bransje: "Bygg og anlegg",
    beskrivelse:
      "Dialog om inbox management og effektivisering av tilbudsarbeid og kundedialog — mindre manuell triaging i postkassen, raskere oppfølging og tydeligere sporbarhet fra henvendelse til leveranse.",
    utfordring:
      "E-post og henvendelser fra kunder og underleverandører ble manuelt sortert og videresendt. Tilbudsarbeid og oppfølging tok lang tid, og det var uklart hvem som eide hvilken tråd.",
    tilnærming:
      "Vi kartlegger innboksflyt, tilbudsmaler og kundedialog — og vurderer AI-støtte for triaging, utkast og oppfølging med menneskelig godkjenning før utsendelse.",
    status: "Dialog",
    vis_paa_nettside: true,
    opprettet: "2026-06-12",
    image: "/service-prosessautomasjon-akvarell.png",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

export function getVisibleCaseStudies(): CaseStudy[] {
  return CASE_STUDIES.filter((c) => c.vis_paa_nettside);
}

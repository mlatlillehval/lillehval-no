export type AIBlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  image: string;
  publishedAt: string;
  /** Valgfri override — ellers beregnes fra excerpt + body. */
  readMinutes?: number;
  gallery?: { src: string; alt: string }[];
};

/** Ca. 180 ord/min for korte fagtekster på norsk. */
export function getReadMinutes(post: Pick<AIBlogPost, "excerpt" | "body" | "readMinutes">): number {
  if (post.readMinutes != null) return post.readMinutes;
  const words = `${post.excerpt} ${post.body}`.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}

export const AI_BLOG_POSTS: AIBlogPost[] = [
  {
    id: "12",
    slug: "fra-gjentatte-sporsmal-til-selvlarende-system",
    title: "Fra gjentatte spørsmål til et system som lærer",
    excerpt:
      "Mange bedrifter sitter på riktig kunnskap — i manualer og datablader — uten at den er tilgjengelig i øyeblikket noen trenger den. Slik bygde vi et system som gjør saksbehandlere raskere, uten å sende ett eneste svar alene.",
    image: "/blogg/selvlarende-system/marius-pult.jpg",
    publishedAt: "2026-09-15",
    body: `Vi jobber for tiden med en kunde som selger tekniske produkter til krevende kunder, og som mottar mange tekniske spørsmål i innboksen hver dag. Saksbehandlerne som svarer bruker en stor del av arbeidsdagen sin på det samme: spørsmålene krever oppslag i manualer, datablader og annen dokumentasjon som ligger spredt i et arkiv de kjenner godt, men som tar tid å lete i.

Det er ikke et uvanlig problem. Veldig mange bedrifter sitter på akkurat denne typen kunnskap: den finnes, den er riktig, men den er ikke lett tilgjengelig i øyeblikket noen trenger den. Spørsmålet vi stilte oss var ikke «hvordan automatiserer vi svarene», men «hvordan bygger vi noe som gjør de samme to menneskene raskere, uten at vi noen gang risikerer at et feil tall går til en kunde».

## Slik løste vi det

Systemet vi har bygget går gjennom innboksen flere ganger daglig. Det finner nye henvendelser, kategoriserer dem, og lager et utkast til svar for de tekniske spørsmålene. Så langt er ikke det spesielt originalt. Det som faktisk gjør forskjellen er hva saksbehandleren møter når hun åpner køen: ikke bare et forslag til svar, men en kildetabell. Hvilket dokument er opplysningen hentet fra, hvilken seksjon, og det ordrette sitatet. Hun kan se at svaret stemmer uten å åpne dokumentet selv, justere det som trengs, og godkjenne.

Systemet sender aldri noe selv. Det oppretter et rent utkast i e-postklienten, med kun kundeteksten, og et menneske trykker send. For en bedrift der presise svar betyr noe, var det ikke et vanskelig valg. Tilliten til løsningen avhenger av at den aldri tar den siste beslutningen alene.

## Den delen som gjør det verdt det over tid

Det som gjør dette til mer enn et smart filter, er at systemet lærer. Hver natt samles de svarene som faktisk ble sendt inn, anonymisert for kundeinformasjon. Hver uke går systemet gjennom det som har kommet inn, luker ut det som var for kort eller uklart til å være nyttig, og bygger en stadig bedre kunnskapsbase av de spørsmålstypene som faktisk går igjen. Neste gang et lignende spørsmål kommer inn, er svarforslaget bedre enn uken før.

Ingenting av dette er magi. Det er noen enkle, faste rutiner bygget på ett prinsipp vi ikke fraviker: systemet skal aldri gjette. Er det usikker på om et dokument dekker spørsmålet, sier det det rett ut i stedet for å fylle inn noe som høres riktig ut. Det høres kanskje selvsagt ut, men det er akkurat den typen designvalg som avgjør om en AI-løsning faktisk blir brukt av folk som har god grunn til å være skeptiske, eller om den blir liggende ubrukt etter to uker.

## Hvorfor vi bygger det sånn

Vi kunne ha levert noe raskere ved å la systemet sende svar direkte, eller ved å stole på at en generell språkmodell «vet nok» om produktene uten kildehenvisning. Vi gjør ikke det. Ikke fordi det er tryggere på papiret, men fordi det er den eneste måten et system som dette faktisk blir en del av arbeidsdagen på, i stedet for et prosjekt som demonstreres én gang og så samler støv.

Det er dette vi mener når vi sier at vi ikke leverer hyllevare. Vi setter oss inn i hvordan saksbehandlerne faktisk jobber, finner ut hvor tidsbruken egentlig ligger, og bygger derfra.

Jobber dere med tilsvarende utfordringer, spesialisert kunnskap som må ut raskt og riktig, men uten at noen kan love hundre prosent automatikk? Ta en prat med oss.`,
  },
  {
    id: "11",
    slug: "introduksjonskurs-claude-start-vestfold",
    title: "Introduksjonskurs i Claude hos Start i Vestfold",
    excerpt:
      "Denne uken var vi hos Start i Vestfold og holdt introduksjonskurs i Claude — med over 30 nysgjerrige deltakere.",
    image: "/kurs-start-vestfold/marius-kurs.jpg",
    publishedAt: "2026-09-12",
    gallery: [
      {
        src: "/kurs-start-vestfold/marius-rollup.jpg",
        alt: "Marius Langsrud holder introduksjonskurs i Claude for Start i Vestfold.",
      },
      {
        src: "/kurs-start-vestfold/marius-skjerm.jpg",
        alt: "Marius viser Claude på storskjerm under kurset.",
      },
      {
        src: "/kurs-start-vestfold/hein-kurs.jpg",
        alt: "Hein Torgersen holder innlegg om Claude hos Start i Vestfold.",
      },
    ],
    body: `Denne uken var vi i Lillehval hos Start i Vestfold og holdt introduksjonskurs i Claude. Med over 30 kursdeltakere på plass fikk vi gode diskusjoner med nysgjerrige studenter, ansatte og pensjonister som ønsker å kickstarte sin bruk av AI.

Takk for nysgjerrighet, alle spørsmålene og diskusjonene. Vi tror og håper vi fikk vist noen av de enorme mulighetene Claude kan gi bedrifter.`,
  },
  {
    id: "1",
    slug: "hvorfor-2026-ai-mellomstore-bedrifter",
    title: "Hvorfor 2026 er året mellomstore bedrifter må ta AI på alvor",
    excerpt:
      "Tempoet i verktøyutvikling, regulatorikk og kundens forventninger gjør at «vente og se» blir dyrere enn å eksperimentere kontrollert.",
    image: "/blog-ai-01.png",
    publishedAt: "2026-01-12",
    body: `Språkmodeller, agenter og integrasjoner modnes raskere enn de fleste årsplaner. For norske mellomstore bedrifter betyr det at konkurrentene – og kundene – allerede tester grenser dere kanskje ikke har kartlagt.

Det handler ikke om å «kjøpe AI», men om å forstå hvor i verdikjeden maskiner kan frigjøre tid, redusere feil og gi bedre beslutningsgrunnlag. De som venter til «alt er modent», risikerer å møte markedet med utdaterte prosesser.

Start smått: ett tydelig problem, tydelige mål, og måling fra dag én. Slik bygger dere erfaring uten å satse hele driften på én leverandør eller én hype-kurve.`,
  },
  {
    id: "2",
    slug: "fra-chatgpt-til-egne-agenter-smb",
    title: "Fra ChatGPT til egne agenter – hva betyr det egentlig for SMB?",
    excerpt:
      "Chat var starten. Agenter som planlegger, kaller verktøy og følger opp oppgaver endrer hvordan vi tenker prosjekt og ansvar.",
    image: "/blog-ai-02.png",
    publishedAt: "2026-02-03",
    body: `En chatbot svarer på spørsmål. En agent kan dekomponere et mål, bruke systemer dere allerede har, og rapportere tilbake – med menneskelig kontroll der det trengs.

For SMB er gevinsten ofte i grensesnittet mellom avdelinger: fra tilbud til ordre, fra avvik til korrigerende tiltak, fra møtereferat til oppfølgingspunkter. Teknologien finnes; utfordringen er dataflyt, tilganger og kultur.

Vi anbefaler å kartlegge tre prosesser der dere i dag «drukner i manuelt arbeid», og vurdere om en agent med trygge rammer kan ta første steg – ikke siste signatur.`,
  },
  {
    id: "3",
    slug: "gdpr-personvern-ai-norge",
    title: "GDPR, personvern og AI – det norske rammeverket i praksis",
    excerpt:
      "Norske bedrifter må kombinere innovasjon med lovlig behandling. Her er hovedpunktene ledergruppen bør kjenne til.",
    image: "/blog-ai-03.png",
    publishedAt: "2026-02-18",
    body: `Behandlingsgrunnlag, formålsbegrensning og dokumentasjon gjelder som før – men AI gjør det lettere å behandle mer data raskere. Det øker behovet for retningslinjer: hva kan sendes til eksterne modeller, hva skal forbli internt, og hvordan loggfører dere beslutninger?

Velg leverandører med EU-dataplassering der det trengs, og vær tydelige i databehandleravtaler. Opplæring av ansatte i «ingen sensitive personopplysninger i åpne chat-vinduer» er minst like viktig som valg av plattform.

En pragmatisk tilnærming: personvernerklæring + intern guide + tekniske begrensninger (f.eks. kun anonymiserte eksempler i prompt).`,
  },
  {
    id: "4",
    slug: "fem-tegn-klar-for-ai-pilot",
    title: "Fem tegn på at bedriften er klar for en AI-pilot",
    excerpt:
      "Ikke alle er modne samtidig. Disse signalene tyder på at dere kan få effekt uten å sprenge organisasjonen.",
    image: "/blog-ai-04.png",
    publishedAt: "2026-03-05",
    body: `1) Dere har minst ett system med strukturert data (ERP, CRM, sakssystem). 2) Ledelsen tåler at piloten kan «feile frem» i kontrollerte rammer. 3) Dere har en eier av piloten – ikke «alle og ingen». 4) Dere kan måle før/etter (tid, kvalitet, volum). 5) IT eller en digitalt sterk medarbeider kan følge opp tilganger og sikkerhet.

Mangler dere flere punkter, er ikke konklusjonen «aldri AI», men «forbered grunnmur først» – ofte 4–8 uker med rydding og avklaring.`,
  },
  {
    id: "5",
    slug: "dokumentflyt-rag-ledelsen",
    title: "Dokumentflyt og RAG – forklart for ledelsen uten teknisk sjargong",
    excerpt:
      "«Hent svar fra våre egne dokumenter» er kjerneideen. Slik kan det gi konkret nytte i hverdagen.",
    image: "/blog-ai-05.png",
    publishedAt: "2026-03-22",
    body: `RAG (retrieval-augmented generation) betyr at modellen først henter relevante utdrag fra deres kontrakter, prosedyrer eller kunnskapsbase, og deretter formulerer svar med fotfeste i kilden.

Det reduserer hallusinasjoner sammenlignet med «bare spør ChatGPT», og gjør det mulig å si: «ifølge vår leverandøravtale side 4 …». For juridisk, HMS og kvalitet er det ofte et naturlig første steg.

Kritiske suksessfaktorer: oppdaterte dokumenter, versjonskontroll og tydelig ansvar for hvem som godkjenner svar som brukes utad.`,
  },
  {
    id: "6",
    slug: "kundeservice-ai-menneskelig",
    title: "Kundeservice med AI – uten å miste det menneskelige",
    excerpt:
      "Automatisering av førstelinje kan øke hastighet og konsistens hvis tone og eskalering er gjennomtenkt.",
    image: "/blog-ai-06.png",
    publishedAt: "2026-04-08",
    body: `Kunder forventer raske svar døgnet rundt. AI kan klargjøre saksoppsummeringer, foreslå svarutkast og kategorisere henvendelser – mens mennesker tar de krevende og empatiske samtalene.

Nøkkelen er grensesnitt: når skal saken løftes til menneske? Hvilke tema (f.eks. kontraktstvister) skal aldri automatiseres? Og hvordan trener dere modellen på deres faktiske tone-of-voice?

Mål gjerne på første kontaktløsning og NPS før/etter, ikke bare «færre saker i kø».`,
  },
  {
    id: "7",
    slug: "kostnader-vs-gevinst-ai",
    title: "Kostnader vs. gevinst – slik prioriterer dere AI-investeringer",
    excerpt:
      "En enkel matrise: innsats, risiko og forventet verdi. Unngå prosjekter som er teknisk morsomme men forretningsmessig uklare.",
    image: "/blog-ai-07.png",
    publishedAt: "2026-04-24",
    body: `Start med problem som koster timer hver uke og som mange deler av organisasjonen kjenner på. Der er både motivasjon og data ofte til stede.

Sett en øvre ramme for pilot (tid + penger) og en beslutningsdato: skaler, juster eller avslutt. Uten det blir «pilot» et permanent eksperiment.

Husk indirekte kostnader: opplæring, endringsledelse og vedlikehold av integrasjoner. De skal inn i business caset på linje med lisenser.`,
  },
  {
    id: "8",
    slug: "kompetansebygging-ai-team",
    title: "Kompetansebygging – slik får hele teamet med på AI-reisen",
    excerpt:
      "Teknologi uten læring skaper frustrasjon. Her er en modell som fungerer i norske team.",
    image: "/blog-ai-08.png",
    publishedAt: "2026-05-10",
    body: `Del inn i tre nivåer: grunnleggende trygg bruk (personvern, prompting, verktøypolicy), rollebaserte workshops (salg, drift, økonomi), og «power users» som hjelper kollegaer og dokumenterer gode mønstre.

Gjør det obligatorisk for ledelsen å delta i minst én felles økt – det signaliserer prioritet.

Feir små gevinster offentlig: «denne uken sparte vi X timer på rapportering». Det bygger kultur raskere enn nye policydokumenter alene.`,
  },
  {
    id: "9",
    slug: "prognoser-hallusinasjoner-sprakmodeller",
    title: "Prognoser, anbefalinger og hallusinasjoner – kvalitet i språkmodeller",
    excerpt:
      "Modeller er overbevisende selv når de tar feil. Slik bygger dere kontrollmekanismer inn i arbeidsflyt.",
    image: "/blog-ai-09.png",
    publishedAt: "2026-05-28",
    body: `Krev kildehenvisning der det er mulig, menneskelig godkjenning for beslutninger med økonomisk eller juridisk risiko, og testsett med kjente riktige svar før dere ruller ut bredt.

For numeriske spørsmål: bruk verktøy som faktisk regner eller henter fra database – ikke «la språkmodellen gjette på Excel».

Jo høyere risiko, jo strengere «human-in-the-loop». Det er et designvalg, ikke en begrensning.`,
  },
  {
    id: "10",
    slug: "fra-pilot-til-skalering",
    title: "Fra pilot til skalerbar løsning – hva som skiller vinnerne",
    excerpt:
      "Piloten var vellykket. Likevel stopper mange her. Slik tar dere neste steg uten å miste momentum.",
    image: "/blog-ai-10.png",
    publishedAt: "2026-06-08",
    body: `Dokumenter arkitektur, datakilder og ansvarslinjer mens dere husker det – ikke «etterpå». Planlegg drift: hvem overvåker kvalitet, hvem oppdaterer integrasjoner, og hva er SLA mot forretningen?

Standardiser mønstre som fungerte i piloten; unngå ti ulike «skreddersydde» løsninger som ingen kan vedlikeholde.

Skalering er ofte 80 % organisasjon og 20 % teknologi – Lillehval hjelper med begge deler, med fokus på varig verdi fremfor slides.`,
  },
];

export function getBlogPostBySlug(slug: string): AIBlogPost | undefined {
  return AI_BLOG_POSTS.find((post) => post.slug === slug);
}

export function getAllBlogPosts(): AIBlogPost[] {
  return [...AI_BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

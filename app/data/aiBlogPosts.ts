export type AIBlogPost = {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  image: string;
  readMinutes: number;
};

export const AI_BLOG_POSTS: AIBlogPost[] = [
  {
    id: "1",
    title: "Hvorfor 2026 er året mellomstore bedrifter må ta AI på alvor",
    excerpt:
      "Tempoet i verktøyutvikling, regulatorikk og kundens forventninger gjør at «vente og se» blir dyrere enn å eksperimentere kontrollert.",
    image: "/blog-ai-01.png",
    readMinutes: 4,
    body: `Språkmodeller, agenter og integrasjoner modnes raskere enn de fleste årsplaner. For norske mellomstore bedrifter betyr det at konkurrentene – og kundene – allerede tester grenser dere kanskje ikke har kartlagt.

Det handler ikke om å «kjøpe AI», men om å forstå hvor i verdikjeden maskiner kan frigjøre tid, redusere feil og gi bedre beslutningsgrunnlag. De som venter til «alt er modent», risikerer å møte markedet med utdaterte prosesser.

Start smått: ett tydelig problem, tydelige mål, og måling fra dag én. Slik bygger dere erfaring uten å satse hele driften på én leverandør eller én hype-kurve.`,
  },
  {
    id: "2",
    title: "Fra ChatGPT til egne agenter – hva betyr det egentlig for SMB?",
    excerpt:
      "Chat var starten. Agenter som planlegger, kaller verktøy og følger opp oppgaver endrer hvordan vi tenker prosjekt og ansvar.",
    image: "/blog-ai-02.png",
    readMinutes: 5,
    body: `En chatbot svarer på spørsmål. En agent kan dekomponere et mål, bruke systemer dere allerede har, og rapportere tilbake – med menneskelig kontroll der det trengs.

For SMB er gevinsten ofte i grensesnittet mellom avdelinger: fra tilbud til ordre, fra avvik til korrigerende tiltak, fra møtereferat til oppfølgingspunkter. Teknologien finnes; utfordringen er dataflyt, tilganger og kultur.

Vi anbefaler å kartlegge tre prosesser der dere i dag «drukner i manuelt arbeid», og vurdere om en agent med trygge rammer kan ta første steg – ikke siste signatur.`,
  },
  {
    id: "3",
    title: "GDPR, personvern og AI – det norske rammeverket i praksis",
    excerpt:
      "Norske bedrifter må kombinere innovasjon med lovlig behandling. Her er hovedpunktene ledergruppen bør kjenne til.",
    image: "/blog-ai-03.png",
    readMinutes: 6,
    body: `Behandlingsgrunnlag, formålsbegrensning og dokumentasjon gjelder som før – men AI gjør det lettere å behandle mer data raskere. Det øker behovet for retningslinjer: hva kan sendes til eksterne modeller, hva skal forbli internt, og hvordan loggfører dere beslutninger?

Velg leverandører med EU-dataplassering der det trengs, og vær tydelige i databehandleravtaler. Opplæring av ansatte i «ingen sensitive personopplysninger i åpne chat-vinduer» er minst like viktig som valg av plattform.

En pragmatisk tilnærming: personvernerklæring + intern guide + tekniske begrensninger (f.eks. kun anonymiserte eksempler i prompt).`,
  },
  {
    id: "4",
    title: "Fem tegn på at bedriften er klar for en AI-pilot",
    excerpt:
      "Ikke alle er modne samtidig. Disse signalene tyder på at dere kan få effekt uten å sprenge organisasjonen.",
    image: "/blog-ai-04.png",
    readMinutes: 3,
    body: `1) Dere har minst ett system med strukturert data (ERP, CRM, sakssystem). 2) Ledelsen tåler at piloten kan «feile frem» i kontrollerte rammer. 3) Dere har en eier av piloten – ikke «alle og ingen». 4) Dere kan måle før/etter (tid, kvalitet, volum). 5) IT eller en digitalt sterk medarbeider kan følge opp tilganger og sikkerhet.

Mangler dere flere punkter, er ikke konklusjonen «aldri AI», men «forbered grunnmur først» – ofte 4–8 uker med rydding og avklaring.`,
  },
  {
    id: "5",
    title: "Dokumentflyt og RAG – forklart for ledelsen uten teknisk sjargong",
    excerpt:
      "«Hent svar fra våre egne dokumenter» er kjerneideen. Slik kan det gi konkret nytte i hverdagen.",
    image: "/blog-ai-05.png",
    readMinutes: 4,
    body: `RAG (retrieval-augmented generation) betyr at modellen først henter relevante utdrag fra deres kontrakter, prosedyrer eller kunnskapsbase, og deretter formulerer svar med fotfeste i kilden.

Det reduserer hallusinasjoner sammenlignet med «bare spør ChatGPT», og gjør det mulig å si: «ifølge vår leverandøravtale side 4 …». For juridisk, HMS og kvalitet er det ofte et naturlig første steg.

Kritiske suksessfaktorer: oppdaterte dokumenter, versjonskontroll og tydelig ansvar for hvem som godkjenner svar som brukes utad.`,
  },
  {
    id: "6",
    title: "Kundeservice med AI – uten å miste det menneskelige",
    excerpt:
      "Automatisering av førstelinje kan øke hastighet og konsistens hvis tone og eskalering er gjennomtenkt.",
    image: "/blog-ai-06.png",
    readMinutes: 4,
    body: `Kunder forventer raske svar døgnet rundt. AI kan klargjøre saksoppsummeringer, foreslå svarutkast og kategorisere henvendelser – mens mennesker tar de krevende og empatiske samtalene.

Nøkkelen er grensesnitt: når skal saken løftes til menneske? Hvilke tema (f.eks. kontraktstvister) skal aldri automatiseres? Og hvordan trener dere modellen på deres faktiske tone-of-voice?

Mål gjerne på første kontaktløsning og NPS før/etter, ikke bare «færre saker i kø».`,
  },
  {
    id: "7",
    title: "Kostnader vs. gevinst – slik prioriterer dere AI-investeringer",
    excerpt:
      "En enkel matrise: innsats, risiko og forventet verdi. Unngå prosjekter som er teknisk morsomme men forretningsmessig uklare.",
    image: "/blog-ai-07.png",
    readMinutes: 5,
    body: `Start med problem som koster timer hver uke og som mange deler av organisasjonen kjenner på. Der er både motivasjon og data ofte til stede.

Sett en øvre ramme for pilot (tid + penger) og en beslutningsdato: skaler, juster eller avslutt. Uten det blir «pilot» et permanent eksperiment.

Husk indirekte kostnader: opplæring, endringsledelse og vedlikehold av integrasjoner. De skal inn i business caset på linje med lisenser.`,
  },
  {
    id: "8",
    title: "Kompetansebygging – slik får hele teamet med på AI-reisen",
    excerpt:
      "Teknologi uten læring skaper frustrasjon. Her er en modell som fungerer i norske team.",
    image: "/blog-ai-08.png",
    readMinutes: 4,
    body: `Del inn i tre nivåer: grunnleggende trygg bruk (personvern, prompting, verktøypolicy), rollebaserte workshops (salg, drift, økonomi), og «power users» som hjelper kollegaer og dokumenterer gode mønstre.

Gjør det obligatorisk for ledelsen å delta i minst én felles økt – det signaliserer prioritet.

Feir små gevinster offentlig: «denne uken sparte vi X timer på rapportering». Det bygger kultur raskere enn nye policydokumenter alene.`,
  },
  {
    id: "9",
    title: "Prognoser, anbefalinger og hallusinasjoner – kvalitet i språkmodeller",
    excerpt:
      "Modeller er overbevisende selv når de tar feil. Slik bygger dere kontrollmekanismer inn i arbeidsflyt.",
    image: "/blog-ai-09.png",
    readMinutes: 5,
    body: `Krev kildehenvisning der det er mulig, menneskelig godkjenning for beslutninger med økonomisk eller juridisk risiko, og testsett med kjente riktige svar før dere ruller ut bredt.

For numeriske spørsmål: bruk verktøy som faktisk regner eller henter fra database – ikke «la språkmodellen gjette på Excel».

Jo høyere risiko, jo strengere «human-in-the-loop». Det er et designvalg, ikke en begrensning.`,
  },
  {
    id: "10",
    title: "Fra pilot til skalerbar løsning – hva som skiller vinnerne",
    excerpt:
      "Piloten var vellykket. Likevel stopper mange her. Slik tar dere neste steg uten å miste momentum.",
    image: "/blog-ai-10.png",
    readMinutes: 5,
    body: `Dokumenter arkitektur, datakilder og ansvarslinjer mens dere husker det – ikke «etterpå». Planlegg drift: hvem overvåker kvalitet, hvem oppdaterer integrasjoner, og hva er SLA mot forretningen?

Standardiser mønstre som fungerte i piloten; unngå ti ulike «skreddersydde» løsninger som ingen kan vedlikeholde.

Skalering er ofte 80 % organisasjon og 20 % teknologi – Lillehval hjelper med begge deler, med fokus på varig verdi fremfor slides.`,
  },
];

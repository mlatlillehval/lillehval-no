/** Episode 1 — lagre MP4 som public/videos/lillehval-talkshow-ep1.mp4 eller sett NEXT_PUBLIC_TALKSHOW_EP1_YOUTUBE_ID */

export const TALKSHOW_EPISODE_1 = {
  slug: "fra-chatgpt-til-agenter",
  title: "Fra ChatGPT til agenter: hva norske ledere bør vite",
  durationMin: 15,
  recorded: "2026",
  host: "Ingvild",
  guests: ["Hein Torgersen", "Marius Langsrud"],
  topicLead:
    "De fleste kjenner til chatboter — men AI beveger seg raskt mot systemer som planlegger, handler og følger opp på egen hånd. Hva betyr det for mellomstore bedrifter i Norge, og hvor bør man starte uten å kjøpe «feil» løsning?",
  /** Korte punkter per del — lest opp gir ca. 12–16 min avhengig av tempo */
  script: [
    {
      approxMin: "0:00–1:30",
      title: "Åpning — vert",
      lines: [
        {
          who: "Ingvild",
          text:
            "Velkommen til Lillehval. Jeg heter Ingvild, og i dag snakker vi om noe som angir mange ledere akkurat nå: vi har blitt vant til ChatGPT og liknende verktøy — men bransjen snakker stadig mer om agenter og autonomi. Hva er egentlig forskjellen i praksis, og hva bør norske bedrifter prioritere i året som kommer? Med meg har jeg Hein Torgersen og Marius Langsrud fra Lillehval. Hein — kort: hva mener vi med «agenter» her, uten hype?",
        },
      ],
    },
    {
      approxMin: "1:30–5:00",
      title: "Hein — fra verktøy til arbeidsflyt",
      lines: [
        {
          who: "Hein",
          text:
            "ChatGPT er ofte én samtale om gangen: du skriver, modellen svarer. En agent er ment å jobbe mot et mål over flere steg — den kan bruke verktøy, hente data og delegere deloppgaver. I enterprise-sammenheng er det ofte dette som er vanskeligst: ikke modellen i seg selv, men tilgang til systemer, roller og kvalitet på data. Mange bedrifter har mer å hente på å rydde i prosesser og tilganger før de «kjøper en agent».",
        },
        {
          who: "Ingvild",
          text: "Så dere anbefaler ikke å hoppe rett på agent-plattformer?",
        },
        {
          who: "Hein",
          text:
            "Ikke uten å vite hvilket problem dere løser. Start med én konkret flyt — for eksempel saksbehandling eller tilbudsprosess — mål effekt, og bygg kontrollert. Da lærer dere også hva som faktisk kan automatiseres.",
        },
      ],
    },
    {
      approxMin: "5:00–9:00",
      title: "Marius — ledelse, risiko og gevinst",
      lines: [
        {
          who: "Ingvild",
          text: "Marius — når vi snakker om agenter og mer autonomi: hva er det ledere ofte undervurderer?",
        },
        {
          who: "Marius",
          text:
            "At det er en styrings- og ansvarsøvelse, ikke bare en IT-anskaffelse. Dere må vite hva som er akseptabel kvalitet, hva som ikke kan deles med eksterne modeller, og hvem som godkjenner handlinger som påvirker kunder eller økonomi. Samtidig er gevinsten ofte nettopp der det er mye manuelt arbeid i dag — ikke i å erstatte folk, men i å fjerne friksjon.",
        },
        {
          who: "Ingvild",
          text: "Kan du gi ett eksempel som er realistisk for en vanlig bedrift?",
        },
        {
          who: "Marius",
          text:
            "En assistent som klargjør underlag før møte — trekker ut beslutningspunkter fra e-poster og vedlegg, uten å sende sensitiv data ut av godkjente kanaler. Poenget er kontrollert assistanse, ikke «alt i én svart boks».",
        },
      ],
    },
    {
      approxMin: "9:00–12:30",
      title: "Panel — tre grep før dere investerer mer",
      lines: [
        {
          who: "Ingvild",
          text:
            "La oss lande dette: hvis dere skulle gitt tre konkrete grep til en leder som lurer på om de er «for sent ute» — Hein først, så Marius.",
        },
        {
          who: "Hein",
          text:
            "Ett: kartlegg hvor tiden går i ledergruppa og i saksbehandling. To: definer én pilot med tydelig suksesskriterium. Tre: sørg for at data og tilganger er dokumentert — ellers stopper alt uansett modell.",
        },
        {
          who: "Marius",
          text:
            "Jeg vil legge til: vær eksplisitt på hva som er «menneske alltid», «menneske godkjenner» og «kan automatiseres». Uten det blir både ChatGPT og agenter uforutsigbare i drift.",
        },
      ],
    },
    {
      approxMin: "12:30–15:00",
      title: "Avslutning",
      lines: [
        {
          who: "Ingvild",
          text:
            "Takk, Hein og Marius. Kort oppsummert: forskjellen mellom kjente chatverktøy og agenter handler om målrettede flerstegsoppgaver — men suksess avhenger av prosess, data og styring. Vil du vite hvor moden dere er, kan dere ta kontakt med Lillehval. Ha en fin dag!",
        },
      ],
    },
  ],
} as const;

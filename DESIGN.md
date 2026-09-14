---
name: Lillehval
description: Sjøkartets varme papir og losgrønne presisjon — norsk AI-rådgivning som gjør ukjent farvann navigerbart.
colors:
  kartpapir: "#f2ede3"
  kartpapir-dyp: "#e8e2d4"
  losgronn: "#15803d"
  skogsgronn: "#14532d"
  dypvann: "#0a2e1a"
  nattblekk: "#052e16"
  blekk: "#1a3320"
  blekk-dempet: "rgba(26,51,32,0.75)"
  blekk-svak: "rgba(26,51,32,0.5)"
  fyrlykt-rav: "#f59e0b"
  rav-dyp: "#d97706"
  rav-blekk: "#052016"
  sjogronn-take: "#8aad94"
  tidevann-gronn: "#22c55e"
  skumgronn: "#4ade80"
  skumlys: "#e1f5ee"
  kortflate: "rgba(255,255,255,0.7)"
  kortflate-hover: "rgba(255,255,255,0.95)"
  gronn-tint: "rgba(21,128,61,0.1)"
  gronn-ramme: "rgba(34,139,70,0.2)"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  body-lead:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "0.2em"
  kicker:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.2em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  band: "28px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  section: "96px"
  section-tight: "64px"
components:
  button-primary:
    backgroundColor: "{colors.fyrlykt-rav}"
    textColor: "{colors.rav-blekk}"
    typography: "{typography.body-lead}"
    rounded: "{rounded.pill}"
    padding: "16px 32px"
  button-primary-compact:
    backgroundColor: "{colors.fyrlykt-rav}"
    textColor: "{colors.rav-blekk}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  button-dark:
    backgroundColor: "{colors.dypvann}"
    textColor: "{colors.skumlys}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.blekk-dempet}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.blekk}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "8px 14px"
  nav-link-hover:
    backgroundColor: "rgba(34,139,70,0.08)"
    textColor: "{colors.losgronn}"
    rounded: "{rounded.sm}"
    padding: "8px 14px"
  card:
    backgroundColor: "{colors.kortflate}"
    textColor: "{colors.blekk}"
    rounded: "{rounded.md}"
    padding: "16px"
  card-hover:
    backgroundColor: "{colors.kortflate-hover}"
    textColor: "{colors.blekk}"
    rounded: "{rounded.md}"
    padding: "16px"
  card-feature:
    backgroundColor: "rgba(252,253,252,0.97)"
    textColor: "{colors.blekk}"
    rounded: "{rounded.lg}"
    padding: "24px 28px"
  input:
    backgroundColor: "#ffffff"
    textColor: "{colors.blekk}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  badge:
    backgroundColor: "{colors.gronn-tint}"
    textColor: "{colors.losgronn}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  modal-panel:
    backgroundColor: "#ffffff"
    textColor: "{colors.blekk}"
    rounded: "{rounded.xl}"
    padding: "24px"
    width: "512px"
---

# Design System: Lillehval

## Overview

**Creative North Star: "Sjøkartet"**

Et sjøkart gjør ukjent farvann navigerbart uten å påstå at havet er lite. Det er hele Lillehval-systemet i én setning. Flatene er varmt kartpapir (`#f2ede3`, `#e8e2d4`) — ikke hvitt, ikke mørkt, men papiret du bretter ut på bordet. Grønnfargene er blekket som tegner strukturen: kurslinjer, dybdemarkeringer, inndelinger. Og ravgult er fyrlykten — den lyser sjeldent, men når den lyser, er det fordi noe faktisk skal skje.

Systemet er rolig og lavmælt, varmt og menneskelig, trygt og solid, presist og ryddig, og optimistisk uten å være hektisk. Kompetanse vises gjennom ryddighet, ikke gjennom volum. Det bærende uttrykket er håndmalte akvareller og hvalen som svømmer langs reisepaden fra usikkerhet til handling — en forklaringsmodell, ikke pynt. Et mørkt havbånd (`linear-gradient(160deg, #0a2e1a, #061a10 60%, #071e12)`) ligger under papirflaten på forsiden og gir systemet dybde: papiret over, dypet under.

Systemet avviser fem retninger eksplisitt: AI-klisjeer (neonblått, kretskort, robothender, glødende hjerner), mørk SaaS-estetikk med lilla gradienter og glow, konsulenthus-stockfoto, hype-språk med store tall og kunstig hastverk, og steril tech-minimalisme uten varme.

**Key Characteristics:**
- Varmt papir som grunnflate — aldri rent hvitt som sideflate, aldri mørk modus
- Grønt bærer struktur og identitet; ravgult bærer utelukkende handling
- Flat i ro, skygge kun som svar på interaksjon
- Pillform (`9999px`) er reservert for handlinger; innhold bruker 12/16/24 px
- Håndmalt akvarell som eneste illustrasjonsspråk
- Kompakt brødtekst (14 px) med romslig luft mellom seksjoner (96 px)

## Colors

Paletten er et kart: varmt papir i bunn, grønt blekk til struktur, én ravgul fyrlykt til handling.

### Primary
- **Losgrønn** (#15803d): Merkevarens bærende grønn. Lenker, kickers, ikoner, rammer, aktive tilstander og alle grønne aksenter. Den er systemets stemme og skal kjennes igjen på hver side.
- **Dypvann** (#0a2e1a): Mørk grønn til sekundære pilleknapper, det mørke havbåndet og tunge flater som skal bære lys tekst.
- **Skogsgrønn** (#14532d): Fremhevet tekst inne i brødtekst, og det mørkeste steget i grønne gradienter.

### Secondary
- **Fyrlykt-rav** (#f59e0b): Systemets eneste handlingsfarge. Alle primære CTA-er, den pulserende prikken i hero-eyebrow, og markører for «her skjer det noe». Paret med **Rav-blekk** (#052016) som tekstfarge, aldri med hvitt.
- **Rav-dyp** (#d97706): Kun som andre stopp i ravgule gradienter.

### Tertiary
- **Sjøgrønn tåke** (#8aad94): Dempet salvie til bakgrunnsillustrasjoner, den animerte logogradienten og lavkontrast-etiketter på mørk flate.
- **Skumgrønn** (#4ade80) og **Tidevann-grønn** (#22c55e): Lyse grønntoner som kun opptrer på mørk bakgrunn eller i grønne gradienter (`linear-gradient(135deg, #22c55e 0%, #15803d 100%)`).

### Neutral
- **Kartpapir** (#f2ede3): Sidens grunnflate, satt som `--background`. Hero, seksjoner, innholdsflater.
- **Kartpapir-dyp** (#e8e2d4): Navigasjon, footer og CTA-bånd — en halvtone dypere, slik at rammeverket skiller seg fra innholdet uten en strek.
- **Blekk** (#1a3320): All hovedtekst, satt som `--foreground`. Aldri ren svart.
- **Blekk dempet** (rgba(26,51,32,0.75)) og **Blekk svak** (rgba(26,51,32,0.5)): Brødtekst av andre rang, meta og trust-linjer.
- **Kortflate** (rgba(255,255,255,0.7) → rgba(255,255,255,0.95) ved hover): Halvtransparent hvitt som løfter kort fra papiret uten skygge.

### Named Rules

**Fyrlyktregelen.** Ravgult betyr handling og ingenting annet. Én ravgul flate per synsfelt, maksimalt. Brukes den til dekor, understreking eller stemning, mister den evnen til å vise hvor brukeren skal trykke — og da er hele fargelogikken borte.

**Papirregelen.** Sideflater er varmt papir, aldri rent hvitt. Rent hvitt er forbeholdt kort, modaler og skjemafelt som skal ligge *over* papiret. Systemet har ingen mørk modus, og det mørke havbåndet er en illustrasjonsflate — ikke en temavariant.

**Én-palett-regelen.** `AIReadinessAnalysis.tsx` kjører i dag sin egen grønnpalett (`#1D9E75`, `#0F6E56`, `#085041`, `#E1F5EE`) som ikke finnes noe annet sted i systemet. Dette er dokumentert drift, ikke en godkjent variant: nytt arbeid skal aldri bruke disse verdiene, og komponenten bør konvergere mot losgrønn/dypvann ved neste anledning.

## Typography

**Display Font:** Geist (med `ui-sans-serif, system-ui, sans-serif` som fallback)
**Body Font:** Geist — samme familie gjennom hele systemet
**Label/Mono Font:** Geist Mono er lastet via `--font-geist-mono`, men ikke i bruk noe sted

**Character:** Én geometrisk sans gjennom alt, drevet på vektkontrast i stedet for familiekontrast. Overskrifter er tunge (800) og tettet inn (-0.025em); brødtekst er lett og luftig. Det gir en ryddig, nesten teknisk ro som kler rådgivning uten å bli kald.

### Hierarchy
- **Display** (800, `clamp(2.25rem, 5vw, 3.75rem)`, 1.08): Kun hero-H1 på forsiden. Roterer mellom fem varianter hvert 6. sekund, med grønne fremhevinger inne i setningen.
- **Headline** (800, `clamp(1.5rem, 2.5vw, 1.875rem)`, 1.2): Seksjonstitler og side-H1 utenfor forsiden.
- **Title** (800, 1.25rem, 1.3): Kort-titler, modal-titler, accordion-overskrifter.
- **Body Lead** (500, 1rem, 1.625): Intro-avsnitt og CTA-tekst.
- **Body** (400–500, 0.875rem, 1.625): Systemets standard brødtekst. Punktlister, kortinnhold, skjemafelt og all vanlig prosa.
- **Label** (700, 0.625rem, uppercase, 0.2em): Eyebrows, mikro-etiketter og badges.
- **Kicker** (600, 0.875rem, uppercase, 0.2em, understreket med `border-bottom: 2px` i 25 % opasitet): `SectionKicker` — systemets standardmåte å introdusere en seksjon.

### Named Rules

**Fjorten-punkt-regelen.** Brødtekst er 14 px, ikke 16. Det er et bevisst etablert nivå gjennom hele siden, og ny tekst skal følge det i stedet for å innføre en andre brødtekststørrelse. 16 px er forbeholdt intro-avsnitt og CTA-tekst.

**Sperreregelen.** Store bokstaver opptrer aldri uten sperring. Uppercase-etiketter kjører 0.2em (eller minimum 0.1em i trange kontekster). Usperret uppercase ser ut som en feil i dette systemet.

## Layout

Innholdet ligger sentrert i en beholder på maksimalt 1280 px (`max-w-7xl`) for navigasjon og brede seksjoner, 896 px (`max-w-4xl`) for tekstseksjoner, og 768 px (`max-w-3xl`) for lesetunge sider. Horisontal luft er 24 px (`px-6`), som øker til 48 px (`lg:px-12`) i hero. Alle ytterkanter respekterer `env(safe-area-inset-*)` — navigasjon, footer, CTA-bånd og modaler er bygget for enheter med hakk og hjemindikator.

Vertikal rytme er 96 px mellom store seksjoner (`py-24`) og 64 px i tettere seksjoner (`py-16`). Navigasjonen er fast med høyde 64 px, og `PageShell` kompenserer med `pt-[calc(4rem+env(safe-area-inset-top,0px))]` — enhver ny side skal gå gjennom `PageShell` i stedet for å sette sin egen topp-padding.

Brytpunktene i faktisk bruk er `sm` (640 px), `md` (768 px) og `lg` (1024 px), pluss to vilkårlige (`min-[380px]`, `min-[480px]`) for tette rutenett. `xl` (1280 px) brukes kun i hero. Desktop-navigasjonen vises fra `lg` og opp; under det er det hamburgermeny. Hero går fra én kolonne til et todelt rutenett (`lg:grid-cols-[minmax(0,1fr)_20rem]`) der kolonnene strekkes til lik høyde, slik at CTA-en fester seg til bunnen av venstre kort.

**Skjelettregelen.** Sideramme (navigasjon, footer, CTA-bånd) er kartpapir-dyp; innhold er kartpapir. Skillet bæres av den halvtonen pluss en 2 px grønn kantlinje i 20–35 % opasitet — ikke av skygge eller hard strek.

## Elevation & Depth

Systemet er **flatt i ro**. Dybde skapes med tonelag: halvtransparente hvite kort (`rgba(255,255,255,0.7)`) over varmt papir, en halvtone mørkere papir på rammeverket, og tynne grønne rammer i 12–25 % opasitet. Skygger er en respons på interaksjon, ikke en egenskap ved flaten. Når de opptrer, er de grønn- eller ravtonet og aldri nøytralt grå — skyggen er farget av flaten den faller fra.

Unntaket er flytende lag: modaler bruker `shadow-2xl` med mørk, uskarp bakgrunn (`rgba(15,23,42,0.7)` med `blur(6px)` for booking, `rgba(8,80,65,0.45)` uten blur for beredskapsanalysen), og navigasjonen får `backdrop-filter: blur(12px)` først etter at siden er skrollet mer enn 10 px.

### Shadow Vocabulary
- **Handlingsglød rav** (`box-shadow: 0 4px 24px rgba(245,158,11,0.45)`): Primære CTA-er i hvile. Den ene skyggen som *er* permanent, fordi den gjør fyrlykten til en fyrlykt. Kompakt variant: `0 2px 16px rgba(245,158,11,0.45)`.
- **Handlingsglød dyp** (`box-shadow: 0 2px 12px rgba(10,46,26,0.35)`): Mørke pilleknapper i hvile.
- **Kortløft** (`box-shadow: 0 4px 20px rgba(34,139,70,0.1)`): `.green-card` ved hover.
- **Kolonneløft** (`box-shadow: 0 12px 36px rgba(21,128,61,0.12)`): Tjenestespekter-kolonner ved hover, kombinert med `-translate-y-0.5`.
- **Panelhvile** (`box-shadow: 0 6px 28px rgba(10,46,26,0.07)`): Store innholdspaneler som trenger et nesten umerkelig løft.
- **Hero-kort** (`box-shadow: 0 12px 40px rgba(21,128,61,0.08)`): Hero-kortene, med `backdrop-blur-sm`.

### Named Rules

**Flat-i-ro-regelen.** En flate har ingen skygge før brukeren berører den. Eneste unntak er ravgule og mørke handlingsknapper, som bærer sin glød permanent fordi den er en del av hva de betyr.

**Farget-skygge-regelen.** Skygger arver flatens farge. `rgba(21,128,61,…)` under grønne flater, `rgba(245,158,11,…)` under ravgule, `rgba(10,46,26,…)` under mørke. En nøytralt grå skygge ser fremmed ut i dette systemet.

## Shapes

Formspråket er myke, avrundede rektangler i en tydelig skala: 8 px (`rounded-lg`) for kompakte kontroller som navigasjonslenker og etiketter, 12 px (`rounded-xl`) for standard kort og skjemafelt, 16 px (`rounded-2xl`) for seksjonspaneler og hero-kortene, og 24 px (`rounded-3xl`) for den største modalen. Hero-illustrasjonsbåndet bruker 28 px, men bare på toppkantene (`28px 28px 0 0`), slik at det mørke havet ser ut som en flate som fortsetter nedover.

Rammer er tynne og grønntonede: 1 px i 12–25 % opasitet for kort, 2 px i 20–35 % for rammeverk og aktive tilstander. Hero-kortet til venstre bruker en 5 px losgrønn venstrekant som et signal om at dette er hovedbudskapet. Prikker og indikatorer er sirkulære (`border-radius: 50%`), og aktive karusell-indikatorer utvider seg fra 8 px til 28 px bredde i stedet for å skifte farge alene.

**Pille-til-handling-regelen.** Full pillform (`9999px`) er forbeholdt handlinger og små statusmerker. Et innholdskort skal aldri være pilleformet, og en knapp som skal oppfattes som primær skal aldri være 12 px. Formen forteller hva som er trykkbart før fargen rekker å gjøre det.

## Components

### Buttons
- **Shape:** Full pille (`9999px`) for alle primære og sekundære handlinger. Kompakte flatkontroller bruker 8 px, og skjemanære knapper i lange flyter bruker 12 px.
- **Primary (rav):** Bakgrunn `#f59e0b`, tekst `#052016`, padding 16 px × 32 px i seksjoner og 10 px × 20 px i navigasjonen, `font-weight: 700`, permanent glød `0 4px 24px rgba(245,158,11,0.45)`. Aldri uppercase, aldri sperret.
- **Secondary (dypvann):** Bakgrunn `#0a2e1a`, tekst `#e1f5ee`, 2 px ramme i `rgba(225,245,238,0.35)`, glød `0 2px 12px rgba(10,46,26,0.35)`.
- **Gradient (grønn):** `linear-gradient(135deg, #22c55e 0%, #15803d 100%)` med hvit tekst. Brukes inne i modaler og skjemaflyter, ikke som seksjons-CTA.
- **Ghost:** Transparent med 1 px nøytral ramme og dempet tekst. Kun som «tilbake» ved siden av en primærknapp.
- **Hover / Active:** `scale(1.05)` ved hover og `scale(0.95)` ved trykk, `transition-duration: 200ms`. Store flater bruker den dempede varianten `scale(1.02)` / `scale(0.98)`. Ingen fargeskift ved hover på ravgul — bevegelsen er tilbakemeldingen.
- **Disabled:** `opacity: 0.4` og `cursor: not-allowed`. Ingen egen disabled-farge.

### Chips
- **Style:** Pilleform, bakgrunn `rgba(21,128,61,0.1)`, tekst `#15803d`, padding 4 px × 10 px, 12 px skrift i vekt 600. Varianter bytter kun tint og tekstfarge — geometrien er konstant.
- **State:** Valgt tilstand markeres med 2 px losgrønn ramme og tint bakgrunn, ikke med fylt farge.

### Cards / Containers
- **Corner Style:** 12 px for standardkort, 16 px for seksjonspaneler.
- **Background:** `rgba(255,255,255,0.7)` over papir, som går til `rgba(255,255,255,0.95)` ved hover. Innholdstunge kort bruker `rgba(252,253,252,0.97)` med `backdrop-blur-sm`.
- **Shadow Strategy:** Ingen i hvile. Se Elevation & Depth.
- **Border:** 1 px `rgba(34,139,70,0.2)`, som går til `rgba(34,139,70,0.4)` ved hover. Rammen — ikke skyggen — er det som svarer først.
- **Internal Padding:** 16 px standard, 24–32 px for seksjonspaneler.

### Inputs / Fields
- **Style:** Hvit bakgrunn, 1 px nøytral ramme, 12 px radius, padding 12 px × 16 px, 14 px skrift.
- **Focus:** 2 px grønn ring (`#22c55e`) med transparent kantlinje.
- **Error:** Meldingstekst i `#dc2626`, 14 px vekt 500, med `role="alert"`.
- **Disabled:** Ikke etablert for felt; kun for knapper.

### Navigation
- Fast topplinje på 64 px i `#e8e2d4`, med 2 px grønn underkant i 35 % opasitet. Etter 10 px skroll går bakgrunnen til `rgba(235,229,214,0.97)` med `blur(12px)`.
- Lenker er 14 px vekt 500 i `#1a3320`, 8 px radius, padding 8 px × 14 px. Ved hover: tekst `#15803d` og bakgrunn `rgba(34,139,70,0.08)`, over 150 ms.
- Desktop fra `lg` og opp; under det en 44 × 44 px hamburgerknapp med synlig fokusring og full `aria-expanded`/`aria-controls`-oppmerking.
- **Aktiv side er i dag ikke markert** i navigasjonen. Det er en kjent mangel, ikke et designvalg.

### Signature Component: Reisebåndet
Forsidens mørke illustrasjonsbånd er systemets kjennemerke: en hval som svømmer rolig med klokka mens reisepaden fra «Usikkerhet» til «Handling» ligger under, med seks fargekodede knutepunkter som går fra rav (`#D4840A`) gjennom salvie (`#8AAD94`) til dyp skogsgrønn (`#14532D`). Fargeprogresjonen *er* budskapet: fra usikkerhet til handling. Under ligger en indikatorlinje fra «0 % AI» til «Full implementering». Alle bevegelsene har `prefers-reduced-motion`-fallback som slår dem helt av.

### Named Rules

**Fokusringregelen.** Hver interaktiv flate har en synlig fokusring: `outline: 2px solid #15803d` med `outline-offset: 2px`. Mønsteret er etablert på hamburgeren, hero-karusellens indikatorer og tjenestespekter-lenkene, men mangler i dag på de fleste primære CTA-er. Ny kode skal alltid ha den, og eksisterende knapper skal få den når de likevel berøres.

**Førtifire-regelen.** Alt som skal trykkes er minst 44 × 44 px. Dette gjelder også ikonknapper i modaler og navigasjon.

## Do's and Don'ts

### Do:
- **Do** bruk varmt kartpapir (`#f2ede3`) som sideflate og kartpapir-dyp (`#e8e2d4`) for rammeverket. Halvtonen er hvordan systemet skiller ramme fra innhold.
- **Do** reserver ravgult (`#f59e0b`) til handling, med `#052016` som tekstfarge. Maksimalt én ravgul flate per synsfelt.
- **Do** gi nye flater tynn grønn ramme i stedet for skygge, og la skyggen komme først ved hover.
- **Do** farg skyggen etter flaten: grønn under grønt, rav under rav, dypvann under mørkt.
- **Do** hold brødtekst på 14 px med `line-height: 1.625`, og sperr all uppercase med minst 0.1em.
- **Do** bruk pilleform for handlinger og 12/16/24 px for innhold.
- **Do** gi alle nye interaktive elementer `outline: 2px solid #15803d` med 2 px offset, og minst 44 × 44 px klikkflate.
- **Do** legg `prefers-reduced-motion`-fallback på hver ny animasjon, slik resten av systemet gjør.
- **Do** send nye sider gjennom `PageShell`, slik at den faste navigasjonens 64 px og safe-area håndteres likt.
- **Do** bruk akvarell-illustrasjonene og bil-/reise-analogien når noe skal forklares visuelt.

### Don't:
- **Don't** bruk AI-klisjeer: neonblått, kretskort, robothender, glødende hjerner, binærkode eller nevrale nett som dekor.
- **Don't** gå mot mørk SaaS-estetikk med lilla gradienter, glow-effekter eller mørk modus. Det mørke havbåndet er en illustrasjonsflate, ikke et tema.
- **Don't** bruk konsulent-stockfoto av folk i dress rundt et whiteboard.
- **Don't** skriv hype: store tall, «10x», utropstegn eller kunstig hastverk. Tonen er «tydelig og trygg», og CTA-er er inviterende, aldri pressende.
- **Don't** lag steril tech-minimalisme. Varmen i papiret og akvarellene er ikke til forhandling.
- **Don't** bruk rent hvitt (`#ffffff`) som sideflate — det hører til kort, modaler og felt som ligger over papiret.
- **Don't** bruk `#1D9E75`, `#0F6E56`, `#085041` eller `#E1F5EE` som nye designbeslutninger. De finnes bare i `AIReadinessAnalysis.tsx` og er dokumentert drift.
- **Don't** innfør en andre brødtekststørrelse ved siden av 14 px, eller en nøytralt grå skygge.
- **Don't** gi et innholdskort pilleform, eller en primærknapp 12 px radius — formen er hvordan systemet skiller trykkbart fra lesbart.
- **Don't** sett egen topp-padding på en ny side for å komme under navigasjonen.

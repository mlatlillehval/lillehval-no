# Lillehval Designmanual

Denne manualen beskriver den visuelle retningen på nettsiden og skal brukes som felles referanse for design, innhold og videre utvikling.

## 1) Designprinsipp

- Tydelig og trygg: kommuniser kompetanse uten overdrivelser.
- Menneskelig: varme flater, vennlig språk, og konkrete budskap.
- Handlingsorientert: hver seksjon skal hjelpe brukeren videre til neste steg.
- Konsekvent: samme visuelle logikk på tvers av sider og komponenter.

## 2) Fargepalett

### Primærfarger

- Primær grønn: `#15803d`
- Mørk grønn: `#14532d`
- Dyp grønn (CTA mørk): `#0a2e1a`

### Bakgrunner

- Hero bakgrunn: `#f2ede3`
- Seksjonsbakgrunn (prosjekter): `#edf4ea`

### Tekstfarger

- Hovedtekst: `#1a3320`
- Dempet tekst: `rgba(26,51,32,0.75)` og `rgba(26,51,32,0.5)`
- Lys tekst på mørk/overlay: `#ffffff`

### Aksenter og effekter

- Primær gradient (CTA): `linear-gradient(135deg, #22c55e 0%, #15803d 100%)`
- Mørk overlay på bildebadges: `rgba(0,0,0,0.55)`

## 3) Typografi

- Overskrift (hero): stor, tydelig, tung (`font-extrabold`, opptil `text-6xl`).
- Seksjonstitler: `text-3xl` til `text-4xl`, `font-extrabold`.
- Brødtekst: `text-base`, `font-medium`, `leading-relaxed`.
- Meta/kicker/badge: `text-xs` eller `text-sm`, uppercase ved behov.

## 4) Spacing og layout

### Containere

- Maksbredde: `max-w-7xl`
- Horisontal padding: `px-6` (desktop `lg:px-12`)

### Vertikal rytme

- Seksjonsluft: ofte `py-20` til `py-24`
- Elementgrupper: bruk `gap-3`, `gap-5`, `gap-12` etter innholdstype

### Hero-spesifikt

- Venstrekolonne på store skjermer: `lg:w-[38%]` og `lg:h-[740px]`
- Subheadline, CTA og trust-line grupperes slik at CTA ligger lavt i kolonnen på desktop.

## 5) Komponentregler

### Knapper

- Primær CTA:
  - Bakgrunn: grønn gradient
  - Tekst: hvit
  - Form: `rounded-full`
  - Interaksjon: `hover:scale-105`, tydelig skygge
- Sekundær CTA:
  - Mørk grønn bakgrunn
  - Lys tekst
  - Diskret border

### Badges og labels

- Små badges: avrundet pill, uppercase, tett tracking.
- Overlay-badges på bilder skal bruke hvit tekst for kontrast.

### Kort

- Runde hjørner (`rounded-2xl` eller `rounded-3xl`)
- Lett border i grønn tone
- Myk bakgrunn med moderat kontrast

### Lister

- Bruk grønne bullets der det styrker leseflyt: `marker:text-[#15803d]`
- Hold punkttekster korte og handlingsorienterte.

## 6) Bilder og illustrasjoner

- Prioriter ekte, troverdige motiver med mennesker/arbeidssituasjoner.
- Legg mørk gradient over bilder der tekst ligger oppå.
- Unngå støyende bilder som konkurrerer med CTA.

## 7) Bevegelse og interaksjon

- Overganger: korte og myke (`duration-150` til `duration-300`)
- Hover: små bevegelser, ikke dramatisk animasjon
- Marquee: jevn, rolig bevegelse som ikke tar fokus fra budskap

## 8) Innhold og tone-of-voice

- Skriv konkret og enkelt.
- Unngå buzzwords uten forklaring.
- Vis verdi med klare utfall: mindre rot, bedre flyt, tydelige neste steg.
- CTA-tekster skal være inviterende, ikke pressende.

## 9) Tilgjengelighet (minimumskrav)

- Sikre kontrast mellom tekst og bakgrunn.
- Bruk tydelige focus-states på interaktive elementer.
- Knapper/lenker skal ha gode klikkflater (minimum ca. 44px høyde).
- Ikke bruk kun farge for å formidle mening.

## 10) QA-sjekkliste før publisering

- Farger følger token-listen i denne manualen.
- CTA-knapper ser like ut på tvers av sider.
- Teksthierarki er tydelig (H1, H2, brødtekst).
- Overlay-tekst på bilder er lesbar på mobil og desktop.
- Seksjoner har jevn spacing og bryter ikke layout på store skjermer.
- Navigasjon/logo sender alltid til riktig sted.

## 11) Endringsregel

Ved nye komponenter eller redesign skal denne manualen oppdateres samtidig, slik at designvalg blir dokumentert og delbare.


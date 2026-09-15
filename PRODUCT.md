# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primærbruker er **daglig leder eller eier i en liten til mellomstor norsk bedrift (ca. 10–100 ansatte)**. Vedkommende har ingen AI-avdeling, ingen dedikert IT-funksjon å delegere til, og begrenset tid. Situasjonen er som regel at de har skjønt at AI angår dem, men ikke hvor de skal begynne — de leter etter noen som kan gjøre valget håndterbart uten å gjøre dem avhengige.

De ankommer oftest med Lillehval-navnet allerede i hodet: anbefaling, møte, innlegg eller et tidligere oppdrag. Nettsiden er derfor sjelden førstegangsoppdagelse; den er stedet de sjekker om inntrykket holder.

## Product Purpose

Lillehval AS er norsk AI-rådgivning for bedrifter, og dekker hele veien fra kartlegging til drift: AI-kartlegging og strategi, skreddersydde AI-assistenter, AI-agenter som utfører flerstegsoppgaver, AI-applikasjoner bygget inn i kundens eget system, ferdigutviklede AI-applikasjoner som hyllevare, samt opplæring og kompetansebygging.

Nettsidens jobb er **å bygge troverdighet slik at folk som allerede har hørt om Lillehval tar kontakt på eget initiativ**. Det er den bekreftede primære suksessdefinisjonen. Møtebooking, AI-beredskapsanalysen og direktekjøp finnes som reelle veier videre, men de er utfall av tillit — ikke mål siden skal presse mot.

## Positioning

Lillehval gjennomfører, ikke bare anbefaler. Rådgivningen ender i implementerte assistenter, agenter og applikasjoner, levert på norsk sammen med kundens eget team og med kundens systemlandskap og arbeidsprosesser som utgangspunkt. Kunden beholder kontrollen; Lillehval bidrar med metode, teknologi og gjennomføring.

Posisjonen en nabokonkurrent ikke kan kopiere sant: kombinasjonen av norsk forretningserfaring, faktisk byggekapasitet og vilje til å si hva som *ikke* er verdt å gjøre.

## Operating Context

- Arbeidet skjer on-site hos kunden og digitalt i hele Norge. Kontorplass hos Friends, Storgata 30, Tønsberg. `COMPANY_AREA_SERVED` er «Norge».
- Vanlig inngang er et gratis, uforpliktende møte, håndtert av `/api/moetebooking` og `BookingModal`.
- `/ai-beredskap` gir en selvbetjent modenhetsindikasjon og fungerer som mykere inngang enn et møte.
- `/kjop` med Stripe checkout (`/api/checkout`, sider for `takk` og `avbrutt`) selger ferdige AI-applikasjoner direkte.
- `/siste-nyheter` og `/blogg` holder siden levende, delvis via RSS (`rss-parser`, `/api/revalidate-news`).
- `/sommervikar` brukes til rekruttering ved behov.
- Forsidens hero- og salgspitch-tekst kan redigeres av Lillehval selv gjennom admin, uten kodeendring.

## Capabilities and Constraints

- Next.js 16 (App Router) med React 19, Tailwind CSS 4, TypeScript. Driftes på Vercel.
- To domener: `www.lillehval.no` og `www.lillehval.ai`. `NEXT_PUBLIC_SITE_URL` er kanonisk base for metadata, sitemap og Stripe-retur.
- Supabase står for auth og for tabellen `frontpage_content`. Verdier der **overstyrer** standardtekstene i `app/data/frontpageCopy.ts`, så en kodeendring av forsidetekst får ikke effekt hvis en databaseverdi finnes. Uten Supabase-nøkler faller forsiden trygt tilbake på standardtekst.
- `/admin` er beskyttet av middleware: krever innlogget session og e-post oppført i `ADMIN_EMAILS`.
- Resend sender e-post; Vercel Analytics er aktivt.
- SEO og AEO er et bevisst, utbygd arbeidsområde: `lib/seo.ts`, JSON-LD via `JsonLd`, FAQ-struktur i `app/data/aiHelpIntent.ts`, egne søkeintensjoner rundt «hjelp med AI», samt `sitemap.ts` og `robots.ts`. Endringer på forside og case-sider må ikke svekke dette.
- Innhold kan skrus av uten sletting via `app/data/contentFlags.ts`. Per nå er intro-bokser, nyhetsbrev og shorts avslått, mens blogg og innholdsoversikt er på.
- Språket er norsk gjennomgående. Ingen flerspråklig versjon er etablert.

## Brand Commitments

- Navn: Lillehval AS. Tagline i bruk: «Norsk AI-rådgivning for bedrifter».
- `DESIGN_MANUAL.md` er den eksisterende, bindende visuelle referansen: grønn palett (`#15803d`, `#14532d`, `#0a2e1a`), varm beige hero-bakgrunn (`#f2ede3`), tung ekstrafet typografi i overskrifter, pill-formede CTA-er, myke kort.
- Et gjennomgående **akvarell-illustrasjonsunivers** bygget på bil-analogien: assistenten som medpassasjer med GPS, agenten som sjåfør, applikasjonen som bilen, modellen som motoren. Dette er en etablert forklaringsmodell, ikke dekor.
- Tone of voice: konkret og enkelt, ingen buzzwords uten forklaring, CTA-er inviterende og aldri pressende. Manualen sier eksplisitt «tydelig og trygg — kommuniser kompetanse uten overdrivelser».
- Egne merkevareressurser ligger i `brand-assets/` og `public/`.

## Evidence on Hand

- **Seks case-studier i `app/data/caseStudies.ts` er ekte oppdrag, men kundene må forbli anonyme.** Ingen kundenavn, logoer eller gjenkjennelige detaljer kan legges til uten ny godkjenning. Anonymiteten er en forpliktelse, ikke en midlertidig mangel.
- Navngitt team med reelle kontaktdata: Marius Langsrud (`ml@lillehval.no`) og Hein Torgersen (`ht@lillehval.no`), med telefon og LinkedIn i `app/data/siteContact.ts`.
- Team-portretter på «Om oss» har bevisst blur på noen personer; to nylige commits handler spesifikt om å bevare den.
- Reelt eget innhold: blogginnlegg, RSS-drevne AI-nyheter, en talkshow-episode, samt akvarell-illustrasjonene.
- Åpen beslutning: hvilke målte resultater eller ROI-tall fra faktiske oppdrag som kan publiseres er **ikke** avklart. ROI-estimat omtales i dag som en leveranse i kartleggingen, ikke som dokumentert resultat. Ingen tall, prosenter, tidsbesparelser eller kundesitater skal finnes opp eller antas publiserbare før dette er bekreftet.

## Product Principles

1. **Troverdighet er konverteringen.** Siden skal bekrefte et inntrykk noen allerede har, ikke overtale en fremmed. Hardt salg og press underminerer selve oppgaven.
2. **Møt «vi vet ikke hvor vi skal starte».** Det er den vanligste tilstanden hos primærbrukeren; alt innhold skal senke terskelen for neste steg i stedet for å demonstrere kompleksitet.
3. **Konkret slår imponerende.** Utfall, omfang og faktisk arbeid fremfor AI-vokabular. Et forbehold uttalt ærlig bygger mer tillit enn en påstand.
4. **Vis arbeidet uten å avsløre kunden.** Anonymt betyr ikke vagt — casene må være spesifikke om problem, metode og håndverk.
5. **Respekter SMB-lederens tid.** Én beslutning per skjerm, tydelig hierarki, ingenting som krever at leseren bygger sammenhengen selv.

## Accessibility & Inclusion

Minimumskravene er allerede etablert i `DESIGN_MANUAL.md` og gjelder videre: tilstrekkelig tekstkontrast, tydelige focus-states, klikkflater på minst ca. 44 px, og aldri farge alene som meningsbærer. Overlay-tekst på bilder må være lesbar på både mobil og desktop. Ingen ytterligere standard (f.eks. formell WCAG-sertifisering) er bekreftet som krav.

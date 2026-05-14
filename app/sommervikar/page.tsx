import Image from "next/image";
import Link from "next/link";
import PageShell from "../components/PageShell";
import type { Metadata } from "next";
import { MARIUS_EMAIL } from "../data/siteContact";

export const metadata: Metadata = {
  title: "Sommerjobb & AI-partner – Lillehval",
  description:
    "Samarbeid om å selge ferdigutviklet AI-applikasjon — avtale med Lillehval, salg og demo i kundemøter, vinn–vinn. Sommervikar for deg som allerede lever i AI-sporet.",
};

export default function SommervikarPage() {
  return (
    <PageShell>
      <main className="pb-20" style={{ background: "#e8e2d4", color: "#1a3320" }}>
        <div className="mx-auto max-w-6xl px-6 pt-10 sm:pt-14">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#15803d" }}
          >
            Sommer · åpent søk
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-4">
            Sommervikar og salg av ferdig AI-applikasjon sammen med oss
          </h1>
          <p className="text-lg leading-relaxed opacity-90 mb-10">
            Vi leter etter deg som allerede bruker mye tid i AI-sporet utenom skolen — og som vil inn i{" "}
            <strong className="font-semibold opacity-100">ekte leveranser</strong> samtidig som du får rom til å
            designe din egen sommerjobb rundt det du brenner for. Har du derimot en{" "}
            <strong className="font-semibold opacity-100">ferdig AI-applikasjon</strong>, kan vi diskutere avtale og
            salg der begge parter vinner. Under finner du begge sporene — ta kontakt på det som treffer deg.
          </p>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 lg:items-stretch mb-10">
            <section
              className="rounded-2xl border-2 flex flex-col min-h-0 overflow-hidden"
              style={{
                borderColor: "rgba(34, 139, 70, 0.35)",
                background: "rgba(255,255,255,0.55)",
              }}
            >
              <div className="relative aspect-[5/3] w-full shrink-0 bg-white/40">
                <Image
                  src="/sommerjobb-ai-akvarell.png"
                  alt="Akvarell: sommer, kreativitet og AI-utvikling"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1 min-h-0">
              <h2 className="text-xl font-bold mb-2" style={{ color: "#0a2e1a" }}>
                Sommervikar — for deg som allerede er i AI-sporet
              </h2>
              <p className="text-sm font-semibold mb-4" style={{ color: "#15803d" }}>
                Dette er ikke «intro til KI». Dette er for deg som er skikkelig interessert.
              </p>
              <p className="leading-relaxed mb-4">
                Vi søker kandidater som <strong className="font-semibold">allerede holder på med AI</strong> — som
                eksperimenterer, bygger, leser og tester på fritiden, langt utover det skolen krever. Du kjenner
                verktøyene, språkene og tempoet i miljøet, og du vil bruke sommeren på å gå dypere sammen med folk som
                lever av det samme.
              </p>
              <p className="leading-relaxed mb-4">
                Hos oss får du jobbe med <strong className="font-semibold">reelle prosjekter</strong> hos kunder —
                men vi vil også sette av tid sammen med deg til å utforske muligheter og{" "}
                <strong className="font-semibold">forme din egen sommerjobb</strong> med tydelig AI-fokus: bygge
                applikasjoner, orkestrere agenter, koble API-er og dataflyt, sette noe i produksjon — eller f.eks. få
                en konkret marketingplan ut i live kanaler. Kort sagt: sommeren skal både gi deg erfaring i linja{" "}
                <em>og</em> rom til å drive egne idéer framover med vår sparring.
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-6 leading-relaxed">
                <li>Du kan vise til noe du har gjort: repo, demo, Notion-/Figma-løp, agentoppsett, skoleprosjekter som gikk ekstra langt — vi vil se hvordan du tenker.</li>
                <li>Vi matcher deg med oppdrag som tåler at du kan mye; resten av uka kan handle om det du og vi blir enige om er mest spennende å løfte.</li>
                <li>Oppstart og varighet avtales; arbeidssted der vi er, med mulighet for noe hybrid der det gir mening.</li>
              </ul>
              <div className="mt-auto pt-2">
                <p className="text-sm font-semibold mb-2" style={{ color: "#0a2e1a" }}>
                  Klar? Vis oss hvem du er
                </p>
                <p className="leading-relaxed m-0">
                  Send kort søknad med CV og{" "}
                  <strong className="font-semibold">lenker til det du er stolt av</strong> (GitHub, demo, video, artikler
                  — hva som helst som forteller historien din) til{" "}
                  <a href={`mailto:${MARIUS_EMAIL}?subject=Sommervikar%20Lillehval%20%28AI%29`} className="underline font-semibold">
                    {MARIUS_EMAIL}
                  </a>
                  . Skriv også noen setninger om hva du vil bygge eller orkestrere i sommer hvis du får frie tøyler.
                </p>
              </div>
              </div>
            </section>

            <section
              id="ai-partner"
              className="rounded-2xl border-2 flex flex-col min-h-0 overflow-hidden scroll-mt-24"
              style={{
                borderColor: "rgba(245, 158, 11, 0.45)",
                background: "rgba(255,255,255,0.65)",
              }}
            >
              <div className="relative aspect-[5/3] w-full shrink-0 bg-white/40">
                <Image
                  src="/ai-partner-salg-akvarell.png"
                  alt="Akvarell: partnerskap og salg av AI-løsning til bedrifter"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1 min-h-0">
              <h2 className="text-xl font-bold mb-3" style={{ color: "#0a2e1a" }}>
                Samarbeid: ferdig AI-applikasjon vi kan selge sammen
              </h2>
              <p className="leading-relaxed mb-4">
                Her snakker vi om en <strong className="font-semibold">ferdigutviklet AI-applikasjon</strong> — noe
                som faktisk fungerer, kan demonstreres og tas inn hos kunder — ikke bare en idé på tegnebrett. Vi
                inngår en{" "}
                <strong className="font-semibold">tydelig avtale med deg som eier eller bygger løsningen</strong>, der roller, inntekter og ansvar er avklart. Målet er en modell der både du og Lillehval tjener på at
                produktet kommer ut og selges: <strong className="font-semibold">vinn–vinn</strong> for begge parter.
              </p>
              <p className="leading-relaxed mb-4">
                Vi besøker mange selskaper fremover. Da kan vi — i tråd med avtalen vi lager sammen —{" "}
                <strong className="font-semibold">presentere og selge applikasjonen din</strong> til relevante
                beslutningstakere: du slipper å bære hele salgs- og møteløpet alene, og vi får sterke løsninger å ta med
                inn i dialoger der kunden allerede har behov. Alt av demo, pris, lisens og hva som kan deles avklares
                skriftlig før vi går ut med noe.
              </p>
              <p className="leading-relaxed mb-6 lg:mb-0 lg:flex-1">
                Første steg er en ærlig prat om produktet, markedet og hva som er realistisk neste steg — inkludert
                risiko, IP og forventninger på begge sider. Har du en ferdig AI-app du mener fortjener å bli solgt i
                bredere kanaler, ta kontakt.
              </p>
              <div className="mt-auto pt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={`mailto:${MARIUS_EMAIL}?subject=Foresp%C3%B8rsel%20om%20m%C3%B8te%20%28id%C3%A9%20%2F%20samarbeid%29`}
                  className="inline-flex justify-center items-center px-5 py-3 rounded-full text-sm font-bold transition-transform hover:scale-[1.02]"
                  style={{
                    background: "#f59e0b",
                    color: "#052016",
                    boxShadow: "0 2px 16px rgba(245, 158, 11, 0.35)",
                  }}
                >
                  Book samtale per e-post
                </a>
                <a
                  href={`mailto:${MARIUS_EMAIL}?subject=Ferdig%20AI-applikasjon%20%2F%20samarbeid%20om%20salg`}
                  className="inline-flex justify-center items-center px-5 py-3 rounded-full text-sm font-bold border-2 transition-transform hover:scale-[1.02]"
                  style={{
                    borderColor: "rgba(10, 46, 26, 0.35)",
                    color: "#0a2e1a",
                    background: "rgba(255,255,255,0.9)",
                  }}
                >
                  Send e-post om ferdig app
                </a>
              </div>
              </div>
            </section>
          </div>

          <p className="text-sm opacity-75">
            <Link href="/" className="underline underline-offset-2">
              Tilbake til forsiden
            </Link>
            {" · "}
            <Link href="/hvorfor-oss" className="underline underline-offset-2">
              Om oss
            </Link>
          </p>
        </div>
      </main>
    </PageShell>
  );
}

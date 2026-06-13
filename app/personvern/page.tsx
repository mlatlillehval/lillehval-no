import Link from "next/link";
import PageShell from "../components/PageShell";
import SectionKicker from "../components/SectionKicker";
import { COMPANY_NAME, MARIUS_EMAIL } from "../data/siteContact";
import { createPageMetadata, OG_IMAGES } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/personvern",
  title: "Personvern",
  description:
    "Personvernerklæring for Lillehval AS — hvordan vi behandler kontaktdata, møtebooking og bruk av nettsiden.",
  ogImage: OG_IMAGES.personvern,
});

export default function PersonvernPage() {
  return (
    <PageShell>
      <main className="py-16 px-6" style={{ background: "#f2ede3" }}>
        <article className="max-w-3xl mx-auto prose-policy">
          <div className="text-center mb-12">
            <SectionKicker>Personvern</SectionKicker>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1a3320]">
              Personvernerklæring
            </h1>
            <p className="mt-4 text-sm" style={{ color: "rgba(26,51,32,0.55)" }}>
              Sist oppdatert: juni 2026
            </p>
          </div>

          <div className="space-y-8 text-sm leading-relaxed text-[#1a3320]">
            <section>
              <h2 className="text-lg font-extrabold mb-2">1. Behandlingsansvarlig</h2>
              <p style={{ color: "rgba(26,51,32,0.8)" }}>
                {COMPANY_NAME} («Lillehval») er behandlingsansvarlig for personopplysninger som samles inn via
                nettsiden lillehval.no og i forbindelse med kundedialog og møtebooking.
              </p>
              <p className="mt-2" style={{ color: "rgba(26,51,32,0.8)" }}>
                Kontakt:{" "}
                <a href={`mailto:${MARIUS_EMAIL}`} className="font-semibold hover:underline" style={{ color: "#15803d" }}>
                  {MARIUS_EMAIL}
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold mb-2">2. Hvilke opplysninger vi behandler</h2>
              <ul className="list-disc pl-5 space-y-1" style={{ color: "rgba(26,51,32,0.8)" }}>
                <li>Navn, e-post og telefon når du booker møte eller tar kontakt</li>
                <li>Firmanavn og kort beskrivelse av behov, dersom du oppgir det</li>
                <li>Teknisk bruksdata via analyseverktøy (f.eks. sidevisninger, anonymisert trafikk)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-extrabold mb-2">3. Formål og rettslig grunnlag</h2>
              <p style={{ color: "rgba(26,51,32,0.8)" }}>
                Vi bruker opplysningene til å svare på henvendelser, gjennomføre møter, følge opp kundedialog og
                forbedre nettsiden. Behandlingen skjer på grunnlag av berettiget interesse og/eller avtaleforhold
                når du aktivt tar kontakt med oss.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold mb-2">4. Lagring og sletting</h2>
              <p style={{ color: "rgba(26,51,32,0.8)" }}>
                Henvendelser og møtebookinger lagres så lenge det er nødvendig for oppfølging og dokumentasjon av
                kundeforhold. Du kan be om sletting når opplysningene ikke lenger er nødvendige for formålet.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold mb-2">5. Deling med tredjeparter</h2>
              <p style={{ color: "rgba(26,51,32,0.8)" }}>
                Vi deler ikke personopplysninger med tredjeparter utover det som er nødvendig for drift av nettsiden
                (f.eks. hosting, e-post og booking). Leverandører behandler data på våre vegne og i tråd med
                databehandleravtaler der det kreves.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold mb-2">6. Dine rettigheter</h2>
              <p style={{ color: "rgba(26,51,32,0.8)" }}>
                Du har rett til innsyn, retting, sletting, begrensning av behandling og å protestere mot behandling
                etter gjeldende personvernlovgivning. Ta kontakt på e-post ovenfor. Du kan også klage til
                Datatilsynet.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-extrabold mb-2">7. Informasjonskapsler og analyse</h2>
              <p style={{ color: "rgba(26,51,32,0.8)" }}>
                Nettsiden kan bruke anonymisert analyse for å forstå bruk (f.eks. Vercel Analytics). Vi bruker ikke
                informasjonskapsler til målrettet annonsering.
              </p>
            </section>
          </div>

          <p className="mt-12 text-center text-sm">
            <Link href="/kontakt" className="font-semibold hover:underline" style={{ color: "#15803d" }}>
              Kontakt oss
            </Link>
            {" · "}
            <Link href="/" className="font-semibold hover:underline" style={{ color: "#15803d" }}>
              Til forsiden
            </Link>
          </p>
        </article>
      </main>
    </PageShell>
  );
}

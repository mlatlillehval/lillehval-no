import Link from "next/link";
import KontaktBookCta from "../components/KontaktBookCta";
import PageShell from "../components/PageShell";
import SectionKicker from "../components/SectionKicker";
import { FOUNDERS } from "../data/founders";
import {
  COMPANY_AREA_SERVED,
  COMPANY_NAME,
  COMPANY_TAGLINE,
  HEIN_PHONE_DISPLAY,
  MARIUS_EMAIL,
  MARIUS_PHONE_DISPLAY,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
} from "../data/siteContact";
import { createPageMetadata, OG_IMAGES } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/kontakt",
  title: "Kontakt",
  description:
    "Ta kontakt med Lillehval for hjelp med AI — telefon, e-post og gratis uforpliktende møte. Norsk AI-rådgivning for bedrifter i hele Norge.",
  ogImage: OG_IMAGES.kontakt,
});

export default function KontaktPage() {
  return (
    <PageShell>
      <main className="py-16 px-6" style={{ background: "#f2ede3" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <SectionKicker>Kontakt</SectionKicker>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1a3320]">
              Snakk med oss om AI
            </h1>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "rgba(26,51,32,0.75)" }}>
              Vi svarer raskt på henvendelser fra norske bedrifter som vurderer AI — fra første kartlegging til
              implementering.
            </p>
          </div>

          <div
            className="rounded-2xl p-6 sm:p-8 mb-8"
            style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(21,128,61,0.18)" }}
          >
            <h2 className="text-lg font-extrabold text-[#1a3320] mb-4">{COMPANY_NAME}</h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="font-semibold text-[rgba(26,51,32,0.55)]">Tjenesteområde</dt>
                <dd className="text-[#1a3320]">{COMPANY_AREA_SERVED}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[rgba(26,51,32,0.55)]">Hovedtelefon</dt>
                <dd>
                  <a
                    href={`tel:${SITE_PHONE_TEL}`}
                    className="font-semibold underline-offset-2 hover:underline"
                    style={{ color: "#15803d" }}
                  >
                    {SITE_PHONE_DISPLAY}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[rgba(26,51,32,0.55)]">E-post</dt>
                <dd>
                  <a
                    href={`mailto:${MARIUS_EMAIL}`}
                    className="font-semibold underline-offset-2 hover:underline break-all"
                    style={{ color: "#15803d" }}
                  >
                    {MARIUS_EMAIL}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[rgba(26,51,32,0.55)]">Om oss</dt>
                <dd className="text-[#1a3320]">{COMPANY_TAGLINE}</dd>
              </div>
            </dl>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {FOUNDERS.map((person) => (
              <div
                key={person.id}
                className="rounded-2xl p-5"
                style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(21,128,61,0.15)" }}
              >
                <h2 className="font-extrabold text-[#1a3320]">{person.name}</h2>
                <p className="text-sm mt-1" style={{ color: "#15803d" }}>
                  {person.jobTitle}
                </p>
                <p className="mt-3 text-sm">
                  <a
                    href={`tel:${person.telephone}`}
                    className="font-semibold hover:underline"
                    style={{ color: "#14532d" }}
                  >
                    {person.id === "marius" ? MARIUS_PHONE_DISPLAY : HEIN_PHONE_DISPLAY}
                  </a>
                </p>
                <p className="mt-1 text-sm">
                  <a href={`mailto:${person.email}`} className="font-semibold hover:underline break-all" style={{ color: "#14532d" }}>
                    {person.email}
                  </a>
                </p>
                <p className="mt-3">
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold hover:underline"
                    style={{ color: "#15803d" }}
                  >
                    LinkedIn →
                  </a>
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm mb-4" style={{ color: "rgba(26,51,32,0.65)" }}>
              Vil du heller booke direkte? 30 minutter, uforpliktende.
            </p>
            <KontaktBookCta />
            <p className="mt-6 text-sm">
              <Link href="/hjelp-med-ai" className="font-semibold hover:underline" style={{ color: "#15803d" }}>
                Les mer om hjelp med AI
              </Link>
              {" · "}
              <Link href="/ofte-stilte-sporsmal" className="font-semibold hover:underline" style={{ color: "#15803d" }}>
                Ofte stilte spørsmål
              </Link>
            </p>
          </div>
        </div>
      </main>
    </PageShell>
  );
}

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
            className="mb-8 rounded-2xl p-6 sm:p-8"
            style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(21,128,61,0.18)" }}
          >
            <div className="grid items-stretch gap-6 md:grid-cols-[minmax(0,1fr)_minmax(13.5rem,16rem)] md:gap-8">
              <div>
                <h2 className="mb-4 text-lg font-extrabold text-[#1a3320]">{COMPANY_NAME}</h2>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="font-semibold text-[rgba(26,51,32,0.55)]">Tjenesteområde</dt>
                    <dd className="text-[#1a3320]">{COMPANY_AREA_SERVED}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[rgba(26,51,32,0.55)]">Kontorplass</dt>
                    <dd className="text-[#1a3320]">
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Storgata+30,+3126+Tønsberg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-ring rounded-sm font-semibold underline-offset-2 hover:underline"
                        style={{ color: "#15803d" }}
                      >
                        Friends, Storgata 30, Tønsberg
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[rgba(26,51,32,0.55)]">Hovedtelefon</dt>
                    <dd>
                      <a
                        href={`tel:${SITE_PHONE_TEL}`}
                        className="focus-ring rounded-sm font-semibold underline-offset-2 hover:underline"
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
                        className="focus-ring rounded-sm font-semibold underline-offset-2 hover:underline break-all"
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

              <figure
                className="m-0 flex min-h-[12.5rem] flex-col overflow-hidden rounded-xl md:min-h-0"
                style={{ border: "1px solid rgba(21,128,61,0.18)" }}
              >
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Storgata+30,+3126+Tønsberg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring relative block h-[12.5rem] overflow-hidden md:h-full md:min-h-[13.75rem]"
                >
                  <img
                    src="/maps/storgata-30-tonsberg.png"
                    alt="Kartutsnitt av Friends i Storgata 30, Tønsberg"
                    width={256}
                    height={256}
                    className="h-full w-full object-cover"
                  />
                  <span
                    className="pointer-events-none absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-full"
                    aria-hidden
                  >
                    <svg width="28" height="36" viewBox="0 0 28 36" fill="none">
                      <path
                        d="M14 35s11-12.2 11-21.2C25 7.2 20.1 2 14 2S3 7.2 3 13.8C3 22.8 14 35 14 35z"
                        fill="#f59e0b"
                      />
                      <circle cx="14" cy="13.5" r="4.25" fill="#052016" />
                    </svg>
                  </span>
                </a>
                <figcaption
                  className="flex items-center justify-between gap-3 border-t px-3 py-2.5"
                  style={{ borderColor: "rgba(21,128,61,0.12)", background: "rgba(255,255,255,0.9)" }}
                >
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Storgata+30,+3126+Tønsberg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex min-h-11 items-center rounded-sm text-xs font-semibold"
                    style={{ color: "#15803d" }}
                  >
                    Åpne i kart
                  </a>
                  <span className="text-[10px]" style={{ color: "rgba(26,51,32,0.45)" }}>
                    © OpenStreetMap
                  </span>
                </figcaption>
              </figure>
            </div>
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
              Vil du heller booke direkte? Gratis og uforpliktende.
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

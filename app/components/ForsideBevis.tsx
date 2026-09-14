import Image from "next/image";
import Link from "next/link";
import { getCaseStudyBySlug } from "../data/caseStudies";
import { FOUNDERS } from "../data/founders";

const FEATURED_SLUG = "ai-automatisering-entreprenor";

export default function ForsideBevis() {
  const featured = getCaseStudyBySlug(FEATURED_SLUG);

  if (!featured) {
    return null;
  }

  return (
    <section
      className="relative z-10 px-6 py-16 sm:py-20 lg:px-12"
      aria-labelledby="forside-bevis-heading"
    >
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.9fr)] lg:items-start lg:gap-x-16">
        <div className="min-w-0">
          <h2
            id="forside-bevis-heading"
            className="m-0 text-2xl font-extrabold tracking-tight sm:text-3xl"
            style={{ color: "#1a3320" }}
          >
            Et oppdrag vi står i nå
          </h2>
          <p
            className="mt-3 max-w-[65ch] text-sm leading-relaxed"
            style={{ color: "rgba(26,51,32,0.75)" }}
          >
            Kundene er anonyme. Arbeidet er det ikke.
          </p>

          <article
            className="mt-8 rounded-2xl px-5 py-6 sm:px-7 sm:py-7"
            style={{
              background: "rgba(252,253,252,0.97)",
              border: "1px solid rgba(21,128,61,0.14)",
              boxShadow: "0 6px 28px rgba(10,46,26,0.07)",
            }}
          >
            <p
              className="m-0 text-xs font-semibold uppercase tracking-[0.12em]"
              style={{ color: "#15803d" }}
            >
              {featured.bransje}
              <span style={{ color: "rgba(26,51,32,0.4)" }}> · </span>
              {featured.kunde}
            </p>
            <h3
              className="mt-3 mb-0 text-xl font-extrabold leading-snug tracking-tight"
              style={{ color: "#1a3320" }}
            >
              {featured.tittel}
            </h3>
            <dl className="mt-5 m-0 flex flex-col gap-4">
              <div>
                <dt
                  className="m-0 text-xs font-bold uppercase tracking-[0.14em]"
                  style={{ color: "#14532d" }}
                >
                  Situasjonen
                </dt>
                <dd
                  className="mt-1.5 mb-0 text-sm leading-relaxed"
                  style={{ color: "rgba(26,51,32,0.75)" }}
                >
                  {featured.utfordring}
                </dd>
              </div>
              <div>
                <dt
                  className="m-0 text-xs font-bold uppercase tracking-[0.14em]"
                  style={{ color: "#14532d" }}
                >
                  Hva vi gjør
                </dt>
                <dd
                  className="mt-1.5 mb-0 text-sm leading-relaxed"
                  style={{ color: "rgba(26,51,32,0.75)" }}
                >
                  Vi identifiserer de repeterende oppgavene og bygger AI-agenter
                  med tydelig menneskelig kontroll. Piloten er tilbuds- og
                  rapportflyt — før noe rulles bredere.
                </dd>
              </div>
            </dl>
            <Link
              href={`/case/${featured.slug}`}
              className="focus-ring mt-6 inline-flex min-h-11 items-center text-sm font-bold underline-offset-4 hover:underline"
              style={{ color: "#15803d" }}
            >
              Les hele oppdraget
            </Link>
          </article>
        </div>

        <div className="min-w-0">
          <h3
            className="m-0 text-xl font-extrabold tracking-tight"
            style={{ color: "#1a3320" }}
          >
            De du møter
          </h3>
          <p
            className="mt-3 text-sm leading-relaxed"
            style={{ color: "rgba(26,51,32,0.75)" }}
          >
            To partnere. Ingen AI-avdeling mellom dere og oss.
          </p>

          <ul className="mt-8 m-0 flex list-none flex-col gap-5 p-0">
            {FOUNDERS.map((person) => (
              <li key={person.id}>
                <Link
                  href="/hvorfor-oss"
                  className="focus-ring flex min-h-11 items-center gap-4 rounded-2xl p-3 no-underline transition-colors hover:bg-[rgba(21,128,61,0.06)]"
                >
                  <Image
                    src={person.image}
                    alt=""
                    width={72}
                    height={72}
                    className="h-[72px] w-[72px] shrink-0 rounded-full object-cover"
                    style={{ border: "1px solid rgba(21,128,61,0.2)" }}
                  />
                  <span className="min-w-0">
                    <span
                      className="block text-base font-extrabold leading-snug"
                      style={{ color: "#1a3320" }}
                    >
                      {person.name}
                    </span>
                    <span
                      className="mt-0.5 block text-sm leading-snug"
                      style={{ color: "rgba(26,51,32,0.75)" }}
                    >
                      {person.jobTitle}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

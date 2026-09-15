import Link from "next/link";
import JsonLd from "./JsonLd";
import KontaktBookCta from "./KontaktBookCta";
import PageShell from "./PageShell";
import SiteFaqSection from "./SiteFaqSection";
import type { AeoCategoryPage } from "../data/aeoIntent";
import {
  breadcrumbsJsonLd,
  categoryServiceJsonLd,
  categoryWebPageJsonLd,
  faqPageJsonLd,
} from "@/lib/seo";

type Props = {
  page: AeoCategoryPage;
};

export default function AeoCategoryView({ page }: Props) {
  return (
    <PageShell>
      <JsonLd
        data={[
          categoryWebPageJsonLd({
            path: page.path,
            name: page.h1,
            description: page.description,
          }),
          categoryServiceJsonLd({
            name: page.kicker,
            description: page.description,
            path: page.path,
          }),
          faqPageJsonLd(page.faqs),
          breadcrumbsJsonLd([
            { name: "Forside", path: "/" },
            { name: page.kicker, path: page.path },
          ]),
        ]}
      />
      <main style={{ background: "#f2ede3" }}>
        <article className="px-6 pt-16 pb-8 max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#15803d" }}>
            {page.kicker}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1a3320] mb-4">{page.h1}</h1>
          <p className="text-lg leading-relaxed text-[rgba(26,51,32,0.88)] mb-10">{page.intro}</p>

          {page.sections.map((section) => (
            <section key={section.title} className="mb-8">
              <h2 className="text-xl font-bold text-[#1a3320] mb-2">{section.title}</h2>
              <p className="text-base leading-relaxed text-[rgba(26,51,32,0.85)]">{section.body}</p>
            </section>
          ))}

          <div
            className="rounded-2xl p-6 sm:p-8 mt-10"
            style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)" }}
          >
            <p className="text-lg font-bold text-[#1a3320] mb-2">Book et gratis møte</p>
            <p className="text-sm leading-relaxed text-[rgba(26,51,32,0.8)] mb-4">
              Gratis og uforpliktende. Lillehval sier ærlig om vi er riktig partner — og hva et fornuftig
              første steg er.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <KontaktBookCta />
              <Link
                href={page.relatedHref}
                className="focus-ring inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold border"
                style={{ borderColor: "rgba(21,128,61,0.35)", color: "#14532d" }}
              >
                {page.relatedLabel}
              </Link>
              <Link
                href="/hjelp-med-ai"
                className="focus-ring inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold border"
                style={{ borderColor: "rgba(21,128,61,0.35)", color: "#14532d" }}
              >
                Hjelp med AI
              </Link>
            </div>
          </div>
        </article>

        <SiteFaqSection
          faqs={page.faqs}
          heading={`Spørsmål om ${page.kicker}`}
          headingLevel="h2"
          intro="Direkte svar på spørsmål norske bedrifter stiller når de leter etter råd og gjennomføring."
        />
      </main>
    </PageShell>
  );
}

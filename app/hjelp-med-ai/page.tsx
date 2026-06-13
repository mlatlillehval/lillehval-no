import Link from "next/link";
import JsonLd from "../components/JsonLd";
import PageShell from "../components/PageShell";
import SiteFaqSection from "../components/SiteFaqSection";
import { AI_HELP_INTENT_FAQ, HELP_PAGE_DESCRIPTION, HELP_PAGE_LEAD } from "../data/aiHelpIntent";
import { SITE_FAQ } from "../data/siteFaq";
import {
  breadcrumbsJsonLd,
  createPageMetadata,
  faqPageJsonLd,
  helpWithAiWebPageJsonLd,
  OG_IMAGES,
} from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/hjelp-med-ai",
  title: "Hjelp med AI for bedrifter",
  description: HELP_PAGE_DESCRIPTION,
  ogImage: OG_IMAGES.hjelpMedAi,
});

export default function HjelpMedAiPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          helpWithAiWebPageJsonLd(),
          faqPageJsonLd(AI_HELP_INTENT_FAQ),
          breadcrumbsJsonLd([
            { name: "Forside", path: "/" },
            { name: "Hjelp med AI", path: "/hjelp-med-ai" },
          ]),
        ]}
      />
      <main style={{ background: "#f2ede3" }}>
        <article className="px-6 pt-16 pb-8 max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#15803d" }}>
            Norsk AI-rådgivning
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1a3320] mb-4">
            {HELP_PAGE_LEAD.h1}
          </h1>
          <p className="text-lg leading-relaxed text-[rgba(26,51,32,0.88)] mb-10">{HELP_PAGE_LEAD.intro}</p>

          {HELP_PAGE_LEAD.sections.map((section) => (
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
              30 minutter, uforpliktende. Vi kartlegger behovet deres og sier ærlig om Lillehval er riktig
              partner — og hva et fornuftig første steg er.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-bold"
                style={{ background: "#f59e0b", color: "#052016" }}
              >
                Til forsiden (book møte)
              </Link>
              <Link
                href="/ai-tjenester"
                className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold border"
                style={{ borderColor: "rgba(21,128,61,0.35)", color: "#14532d" }}
              >
                AI-tjenester
              </Link>
            </div>
          </div>
        </article>

        <SiteFaqSection
          faqs={SITE_FAQ}
          heading="Spørsmål om hjelp med AI"
          headingLevel="h2"
          intro="Svar for bedrifter som søker AI-rådgivning, komme-i-gang-hjelp og praktisk implementering i Norge."
        />
      </main>
    </PageShell>
  );
}

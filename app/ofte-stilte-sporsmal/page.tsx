import JsonLd from "../components/JsonLd";
import PageShell from "../components/PageShell";
import SiteFaqSection from "../components/SiteFaqSection";
import { SITE_FAQ } from "../data/siteFaq";
import { createPageMetadata, faqPageJsonLd, OG_IMAGES } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/ofte-stilte-sporsmal",
  title: "Ofte stilte spørsmål",
  description:
    "Vi trenger hjelp med AI? Svar om norsk AI-rådgivning, komme i gang, chatbot vs agent, pris og hva Lillehval leverer.",
  ogImage: OG_IMAGES.faq,
});

export default function OfteStilteSporsmalPage() {
  return (
    <PageShell>
      <JsonLd data={faqPageJsonLd(SITE_FAQ)} />
      <main style={{ background: "#f2ede3" }}>
        <SiteFaqSection faqs={SITE_FAQ} />
      </main>
    </PageShell>
  );
}

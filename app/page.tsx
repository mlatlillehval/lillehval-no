import AiHelpIntentBlock from "./components/AiHelpIntentBlock";
import ForsideBevis from "./components/ForsideBevis";
import HeroJourneyBand from "./components/HeroJourneyBand";
import JsonLd from "./components/JsonLd";
import Hero from "./components/Hero";
import PageShell from "./components/PageShell";
import { AI_HELP_INTENT_FAQ, HOME_PAGE_DESCRIPTION } from "./data/aiHelpIntent";
import { getFrontpageCopy } from "./data/getFrontpageCopy";
import { createPageMetadata, faqPageJsonLd } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/",
  absoluteTitle: "Lillehval – Hjelp med AI for norske bedrifter",
  description: HOME_PAGE_DESCRIPTION,
});

export const dynamic = "force-dynamic";

export default async function Home() {
  const initialCopy = await getFrontpageCopy();

  return (
    <PageShell>
      <JsonLd data={faqPageJsonLd(AI_HELP_INTENT_FAQ)} />
      <main>
        <Hero initialCopy={initialCopy} />
        <ForsideBevis />
        <HeroJourneyBand />
        <AiHelpIntentBlock />
      </main>
    </PageShell>
  );
}

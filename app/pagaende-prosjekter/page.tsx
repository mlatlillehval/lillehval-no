import PageShell from "../components/PageShell";
import PagaendeProsjekterListe from "../components/PagaendeProsjekterListe";
import { createPageMetadata, OG_IMAGES } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/pagaende-prosjekter",
  title: "Prosjekter",
  description:
    "Se pågående prosjekter og hva Lillehval jobber med — case og AI-implementeringer.",
  ogImage: OG_IMAGES.pagaendeProsjekter,
});

export default function PagaendeProsjekterPage() {
  return (
    <PageShell>
      <main>
        <PagaendeProsjekterListe />
      </main>
    </PageShell>
  );
}

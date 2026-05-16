import NewsSection from "../components/NewsSection";
import PageShell from "../components/PageShell";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/siste-nyheter",
  title: "Siste AI-nyheter",
  description:
    "Kuraterte nyheter om AI-strategi, AI-implementering og AI-drevet prosessautomatisering fra Norge og verden.",
});

export const revalidate = 3600;

export default function SisteNyheter() {
  return (
    <PageShell>
      <main>
        <NewsSection />
      </main>
    </PageShell>
  );
}

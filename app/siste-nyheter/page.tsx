import NewsSection from "../components/NewsSection";
import PageShell from "../components/PageShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Siste AI-nyheter – Lillehval",
  description: "Kuraterte nyheter om AI-strategi, AI-implementering og AI-drevet prosessautomatisering fra Norge og verden.",
};

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

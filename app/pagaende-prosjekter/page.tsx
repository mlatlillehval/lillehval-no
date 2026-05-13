import PageShell from "../components/PageShell";
import PagaendeProsjekterListe from "../components/PagaendeProsjekterListe";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prosjekter – Lillehval",
  description:
    "Se pågående prosjekter og hva Lillehval jobber med — case og AI-implementeringer.",
};

export default function PagaendeProsjekterPage() {
  return (
    <PageShell>
      <main>
        <PagaendeProsjekterListe />
      </main>
    </PageShell>
  );
}

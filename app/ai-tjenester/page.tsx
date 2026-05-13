import PageShell from "../components/PageShell";
import ProdukterOgTjenester from "../components/ProdukterOgTjenester";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produkter og tjenester – Lillehval",
  description:
    "Lillehval Assistenter, ti standardpakker og AI-reisen — fra kartlegging til pilot, utrulling og forbedring.",
};

export default function ProdukterOgTjenesterPage() {
  return (
    <PageShell>
      <main>
        <ProdukterOgTjenester />
      </main>
    </PageShell>
  );
}

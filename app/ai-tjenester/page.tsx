import PageShell from "../components/PageShell";
import ProdukterOgTjenester from "../components/ProdukterOgTjenester";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/ai-tjenester",
  title: "Produkter og tjenester",
  description:
    "Lillehval Assistenter, ti standardpakker og AI-reisen — fra kartlegging til pilot, utrulling og forbedring.",
});

export default function ProdukterOgTjenesterPage() {
  return (
    <PageShell>
      <main>
        <ProdukterOgTjenester />
      </main>
    </PageShell>
  );
}

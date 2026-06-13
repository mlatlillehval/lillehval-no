import AIReadinessAnalysis from "../components/AIReadinessAnalysis";
import PageShell from "../components/PageShell";
import { createPageMetadata, OG_IMAGES } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/ai-beredskap",
  title: "AI-beredskap",
  description:
    "Test hvor AI-klar bedriften er — gratis analyse for norske mellomstore bedrifter.",
  ogImage: OG_IMAGES.aiBeredskap,
});

export default function AIBeredskapPage() {
  return (
    <PageShell>
      <AIReadinessAnalysis />
    </PageShell>
  );
}

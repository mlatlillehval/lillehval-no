import AIReadinessAnalysis from "../components/AIReadinessAnalysis";
import PageShell from "../components/PageShell";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/ai-beredskap",
  title: "AI-beredskap",
  description:
    "Test hvor AI-klar bedriften er — gratis analyse for norske mellomstore bedrifter.",
});

export default function AIBeredskapPage() {
  return (
    <PageShell>
      <AIReadinessAnalysis />
    </PageShell>
  );
}

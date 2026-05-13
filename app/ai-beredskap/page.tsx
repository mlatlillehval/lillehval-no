import type { Metadata } from "next";
import AIReadinessAnalysis from "../components/AIReadinessAnalysis";
import PageShell from "../components/PageShell";

export const metadata: Metadata = {
  title: "AI-beredskap | Lillehval",
  description:
    "Test hvor AI-klar bedriften er — gratis analyse for norske mellomstore bedrifter.",
};

export default function AIBeredskapPage() {
  return (
    <PageShell>
      <AIReadinessAnalysis />
    </PageShell>
  );
}

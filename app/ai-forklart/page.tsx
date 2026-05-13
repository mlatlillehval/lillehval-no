import AITimeline from "../components/AITimeline";
import PageShell from "../components/PageShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Forklart – Lillehval",
  description:
    "Fra regelbasert AI til autonome agenter. Fem epoker som forklarer hvor vi har vært — og hvor vi er på vei.",
};

export default function AiForklartPage() {
  return (
    <PageShell>
      <main>
        <AITimeline />
      </main>
    </PageShell>
  );
}

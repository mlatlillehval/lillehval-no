import AITimeline from "../components/AITimeline";
import PageShell from "../components/PageShell";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/ai-forklart",
  title: "AI forklart",
  description:
    "Fra regelbasert AI til autonome agenter. Fem epoker som forklarer hvor vi har vært — og hvor vi er på vei.",
});

export default function AiForklartPage() {
  return (
    <PageShell>
      <main>
        <AITimeline />
      </main>
    </PageShell>
  );
}

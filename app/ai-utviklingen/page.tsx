import AITimeline from "../components/AITimeline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-utviklingen – Lillehval",
  description: "AI-utviklingen i tre epoker. Fra chatbot til agent.",
};

export default function AIUtviklingen() {
  return (
    <main>
      <AITimeline />
    </main>
  );
}

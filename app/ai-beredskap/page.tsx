import type { Metadata } from "next";
import AIReadinessAnalysis from "../components/AIReadinessAnalysis";

export const metadata: Metadata = {
  title: "AI-beredskap | Lillehval",
  description:
    "Test hvor AI-klar bedriften er — gratis analyse for norske mellomstore bedrifter.",
};

export default function AIBeredskapPage() {
  return <AIReadinessAnalysis />;
}

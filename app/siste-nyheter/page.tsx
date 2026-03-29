import NewsSection from "../components/NewsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Siste AI-nyheter – Lillehval",
  description: "Dagens AI-nyheter fra Norge og verden.",
};

export default function SisteNyheter() {
  return (
    <main>
      <NewsSection />
    </main>
  );
}

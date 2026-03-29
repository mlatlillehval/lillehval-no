import WhyUs from "../components/WhyUs";
import MarqueeSection from "../components/MarqueeSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hvorfor Lillehval? – Lillehval",
  description: "Møt teamet bak Lillehval og se hva vi har levert.",
};

export default function HvorforOss() {
  return (
    <main>
      <WhyUs />
      <MarqueeSection />
    </main>
  );
}

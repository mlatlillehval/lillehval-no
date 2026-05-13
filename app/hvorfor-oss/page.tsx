import WhyUs from "../components/WhyUs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hvorfor Lillehval? – Lillehval",
  description: "Møt teamet bak Lillehval og se hva vi har levert.",
};

/** Navbar offset (matches pt-16 in PageShell); content sits as sibling before CtaBand. */
export default function HvorforOss() {
  return (
    <>
      <div className="relative z-10 h-16 shrink-0" aria-hidden />
      <WhyUs />
    </>
  );
}

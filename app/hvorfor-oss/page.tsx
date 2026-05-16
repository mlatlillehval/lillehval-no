import WhyUs from "../components/WhyUs";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/hvorfor-oss",
  title: "Hvorfor Lillehval?",
  description: "Møt teamet bak Lillehval og se hva vi har levert.",
});

/** Navbar offset (matcher PageShell: 4rem + safe-area-top). */
export default function HvorforOss() {
  return (
    <>
      <div className="relative z-10 h-[calc(4rem+env(safe-area-inset-top,0px))] shrink-0" aria-hidden />
      <WhyUs />
    </>
  );
}

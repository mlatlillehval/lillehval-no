import WhyUs from "../components/WhyUs";
import JsonLd from "../components/JsonLd";
import { createPageMetadata, foundersPersonJsonLd, OG_IMAGES } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/hvorfor-oss",
  title: "Hvorfor Lillehval?",
  description:
    "Møt gründerne bak Lillehval, teamet og filosofien — norsk AI-rådgivning med fokus på praktisk gjennomføring.",
  ogImage: OG_IMAGES.hvorforOss,
});

/** Navbar offset (matcher PageShell: 4rem + safe-area-top). */
export default function HvorforOss() {
  return (
    <>
      <JsonLd data={foundersPersonJsonLd()} />
      <div className="relative z-10 h-[calc(4rem+env(safe-area-inset-top,0px))] shrink-0" aria-hidden />
      <main>
        <WhyUs />
      </main>
    </>
  );
}

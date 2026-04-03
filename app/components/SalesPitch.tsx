 "use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  FRONT_PAGE_DEFAULTS,
  type FrontpageCopy,
} from "../data/frontpageCopy";

const points = [
  {
    number: "01",
    heading: "AI-revolusjonen endrer spillereglene",
    text: "ChatGPT, autonome agenter, automatisering av kjerneoppgaver — AI-teknologien modnes i et tempo verden ikke har sett maken til. Bedrifter som handler nå bygger et konkurransefortrinn som vil være vanskelig å ta igjen.",
    image: "/pitch-1-revolution.png",
    imageAlt: "Raketter som representerer AI-revolusjonen",
    imageLeft: false,
  },
  {
    number: "02",
    heading: "Mulighetene er enorme — men vanskelige å navigere",
    text: "Det finnes hundrevis av AI-verktøy, plattformer og løsninger. Noen er gull verdt. Andre er støy. Utfordringen er ikke å finne AI — det er å vite hva som faktisk skaper verdi for akkurat din bedrift.",
    image: "/pitch-2-navigate.png",
    imageAlt: "Kompass med mange veier og muligheter",
    imageLeft: true,
  },
  {
    number: "03",
    heading: "Vi kombinerer kommersiell erfaring med AI-kunnskap",
    text: "Lillehval er ikke et tech-selskap som selger teknologi. Vi er rådgivere med dyp forretningsforståelse som vet hva som funker i praksis — ikke bare i teorien. Vi har vært der selv.",
    image: "/pitch-3-expertise.png",
    imageAlt: "To konsulenter som samarbeider",
    imageLeft: false,
  },
  {
    number: "04",
    heading: "Din skreddersydde AI-reise starter her",
    text: "Fra første kartlegging til full utnyttelse — vi følger deg hele veien med en strukturert metodikk tilpasset din bedrift. Ingen generiske løsninger. Bare det som faktisk virker for dere.",
    image: "/pitch-4-journey.png",
    imageAlt: "En vei gjennom et landskap mot horisonten",
    imageLeft: true,
  },
];

export default function SalesPitch() {
  const [copy, setCopy] = useState<FrontpageCopy>(FRONT_PAGE_DEFAULTS);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("/api/frontpage-content");
        const json = (await res.json()) as Partial<FrontpageCopy>;
        setCopy({ ...FRONT_PAGE_DEFAULTS, ...(json as any) });
      } catch {
        // fallback til defaults
      }
    };
    void run();
  }, []);

  return (
    <section className="py-24 px-6" style={{ background: "#f2ede3" }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <span
            className="inline-block mb-3 text-sm font-semibold uppercase tracking-widest"
            style={{ color: "#15803d" }}
          >
            {copy.salespitch_kicker}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: "#1a3320" }}>
            {copy.salespitch_title_line1}
            <br />
            {copy.salespitch_title_line2}
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(34,139,70,0.3) 10%, rgba(34,139,70,0.3) 90%, transparent)" }}
          />

          <div className="flex flex-col gap-24">
            {points.map((point, i) => (
              <div key={i} className="relative flex flex-col md:flex-row items-center gap-10 md:gap-0">

                {/* Number dot on timeline */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-10 h-10 rounded-full font-extrabold text-sm z-10"
                  style={{
                    background: "#f2ede3",
                    border: "2px solid rgba(34,139,70,0.4)",
                    color: "#15803d",
                  }}
                >
                  {point.number}
                </div>

                {/* Image side */}
                <div className={`w-full md:w-[45%] ${point.imageLeft ? "md:order-1 md:pr-16" : "md:order-3 md:pl-16"}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-md" style={{ aspectRatio: "4/3" }}>
                    <Image
                      src={point.image}
                      alt={point.imageAlt}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                </div>

                {/* Spacer for center dot */}
                <div className="hidden md:block md:w-[10%] md:order-2" />

                {/* Text side */}
                <div className={`w-full md:w-[45%] ${point.imageLeft ? "md:order-3 md:pl-16" : "md:order-1 md:pr-16"}`}>
                  {/* Mobile number */}
                  <span
                    className="inline-block mb-3 text-xs font-bold uppercase tracking-widest md:hidden"
                    style={{ color: "#15803d" }}
                  >
                    {point.number}
                  </span>
                  <h3
                    className="text-xl sm:text-2xl font-extrabold mb-4 leading-snug"
                    style={{ color: "#1a3320" }}
                  >
                    {point.heading}
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "rgba(26,51,32,0.65)" }}
                  >
                    {point.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

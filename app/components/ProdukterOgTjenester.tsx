"use client";

import SectionKicker from "./SectionKicker";
import TjenestespekterOversikt from "./TjenestespekterOversikt";

export default function ProdukterOgTjenester() {
  return (
    <div className="pb-24">
      <section
        className="py-14 px-6 sm:py-16"
        style={{ background: "#f2ede3" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <SectionKicker className="!mb-2">Tjenestetilbud</SectionKicker>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1a3320]">
            Produkter og tjenester
          </h1>
        </div>
      </section>

      <TjenestespekterOversikt />
    </div>
  );
}

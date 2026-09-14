"use client";

import { useEffect, useState } from "react";
import {
  FRONT_PAGE_DEFAULTS,
  mergeFrontpageDefaultsFromApi,
  type FrontpageCopy,
} from "../data/frontpageCopy";

type SalesPitchProps = {
  /** Serverhentet kopi — matcher første paint med CMS uten «hop» */
  initialCopy?: FrontpageCopy;
};

const points = [
  {
    number: "1",
    heading: "Kartlegging",
    text: "Vi går gjennom prosessene, folkene og systemene dere allerede har. Resultatet er 2–5 konkrete bruksområder og et veikart dere kan handle etter — ikke et generelt råd om å «ta i bruk AI».",
  },
  {
    number: "2",
    heading: "Bygging",
    text: "Vi setter opp det som skal brukes i hverdagen: en assistent, en agent eller en applikasjon koblet til deres data. Dere er med i arbeidet. Vi leverer ikke en presentasjon og forsvinner.",
  },
  {
    number: "3",
    heading: "Drift",
    text: "Løsningen skal holde etter oppstart. Vi blir med på opplæring, justering og vedlikehold så teamet faktisk bruker det — og så det kan endres når hverdagen endrer seg.",
  },
  {
    number: "4",
    heading: "Dere beholder kontrollen",
    text: "Dere eier prioriteringene, dataene og beslutningene. Lillehval bidrar med metode, teknologi og gjennomføring. Hvis noe ikke er verdt å gjøre, sier vi det.",
  },
] as const;

export default function SalesPitch({ initialCopy = FRONT_PAGE_DEFAULTS }: SalesPitchProps) {
  const [copy, setCopy] = useState<FrontpageCopy>(initialCopy);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("/api/frontpage-content");
        const json: unknown = await res.json();
        setCopy(mergeFrontpageDefaultsFromApi(json));
      } catch {
        // fallback til defaults
      }
    };
    void run();
  }, []);

  return (
    <section className="relative bg-transparent px-6 pb-24 pt-10 sm:pt-14">
      <div
        className="pointer-events-none mx-auto mb-12 max-w-5xl h-px bg-gradient-to-r from-transparent via-[rgba(21,128,61,0.2)] to-transparent sm:mb-14"
        aria-hidden
      />
      <div className="max-w-5xl mx-auto">

        <div className="mb-12 text-center sm:mb-16">
          <h2
            className="text-3xl font-extrabold tracking-tight sm:text-4xl"
            style={{ color: "#1a3320" }}
          >
            <span style={{ color: "#14532d" }}>{copy.salespitch_title_line1}</span>
            <br />
            <span style={{ color: "rgba(26,51,32,0.72)" }}>{copy.salespitch_title_line2}</span>
          </h2>
        </div>

        <ol className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:gap-5">
          {points.map((point) => (
            <li
              key={point.number}
              className="flex flex-col gap-3 rounded-2xl p-6 lg:p-7"
              style={{
                background: "rgba(252,253,252,0.96)",
                border: "1px solid rgba(34,139,70,0.2)",
              }}
            >
              <p
                className="m-0 text-xs font-bold uppercase tracking-[0.16em]"
                style={{ color: "#15803d" }}
              >
                Steg {point.number}
              </p>
              <h3
                className="m-0 text-lg font-extrabold leading-snug"
                style={{ color: "#1a3320" }}
              >
                {point.heading}
              </h3>
              <p
                className="m-0 text-sm leading-relaxed"
                style={{ color: "rgba(26,51,32,0.75)" }}
              >
                {point.text}
              </p>
            </li>
          ))}
        </ol>

      </div>
    </section>
  );
}

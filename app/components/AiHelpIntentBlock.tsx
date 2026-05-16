import Link from "next/link";
import { HELP_PAGE_LEAD } from "../data/aiHelpIntent";

/** Server-rendret svarblokk for søk som «vi trenger hjelp med AI» — synlig for Google og AI-crawlere. */
export default function AiHelpIntentBlock() {
  return (
    <section
      className="relative z-10 px-6 py-14 sm:py-16"
      style={{ background: "#edf4ea", borderTop: "1px solid rgba(34, 139, 70, 0.12)" }}
      aria-labelledby="ai-help-intent-heading"
    >
      <div className="max-w-3xl mx-auto text-center sm:text-left">
        <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#15803d" }}>
          Hjelp med AI for bedrifter
        </p>
        <h2
          id="ai-help-intent-heading"
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1a3320] mb-4"
        >
          {HELP_PAGE_LEAD.h1}
        </h2>
        <p className="text-base leading-relaxed text-[rgba(26,51,32,0.85)] mb-6">
          {HELP_PAGE_LEAD.intro} Vi hjelper norske bedrifter som trenger hjelp med kunstig intelligens — fra
          kartlegging og strategi til assistenter, agenter og implementering.
        </p>
        <ul className="flex flex-wrap gap-3 justify-center sm:justify-start">
          <li>
            <Link
              href="/hjelp-med-ai"
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition hover:opacity-90"
              style={{ background: "#15803d", color: "#fff" }}
            >
              Les mer om hjelp med AI
            </Link>
          </li>
          <li>
            <Link
              href="/ai-tjenester"
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold border transition hover:opacity-90"
              style={{ borderColor: "rgba(21,128,61,0.35)", color: "#14532d" }}
            >
              Se AI-tjenester
            </Link>
          </li>
          <li>
            <Link
              href="/ai-beredskap"
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold underline-offset-2 hover:underline"
              style={{ color: "#15803d" }}
            >
              Gratis AI-beredskap
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

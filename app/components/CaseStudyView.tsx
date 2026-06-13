import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "../data/caseStudies";

const STATUS_LABEL: Record<CaseStudy["status"], string> = {
  Aktiv: "Pågående",
  Dialog: "I dialog",
  Ferdig: "Fullført",
};

type CaseStudyViewProps = {
  caseStudy: CaseStudy;
};

export default function CaseStudyView({ caseStudy }: CaseStudyViewProps) {
  return (
    <article className="max-w-3xl mx-auto">
      <p className="mb-6">
        <Link
          href="/pagaende-prosjekter"
          className="text-sm font-semibold underline-offset-2 hover:underline"
          style={{ color: "#15803d" }}
        >
          ← Alle prosjekter
        </Link>
      </p>

      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-8">
        <Image
          src={caseStudy.image}
          alt={caseStudy.tittel}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
        <span
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
          style={{ background: "rgba(10,46,26,0.85)", color: "#fbbf24" }}
        >
          {STATUS_LABEL[caseStudy.status]}
        </span>
      </div>

      <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#15803d" }}>
        Anonymisert case · {caseStudy.bransje} · {caseStudy.kunde}
      </p>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a3320] leading-tight">{caseStudy.tittel}</h1>
      <p className="mt-4 text-base leading-relaxed" style={{ color: "rgba(26,51,32,0.75)" }}>
        {caseStudy.beskrivelse}
      </p>

      <div className="mt-10 grid gap-6">
        <section
          className="rounded-2xl p-6"
          style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(21,128,61,0.15)" }}
        >
          <h2 className="text-lg font-extrabold text-[#1a3320] mb-2">Utfordring</h2>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(26,51,32,0.8)" }}>
            {caseStudy.utfordring}
          </p>
        </section>
        <section
          className="rounded-2xl p-6"
          style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(21,128,61,0.15)" }}
        >
          <h2 className="text-lg font-extrabold text-[#1a3320] mb-2">Tilnærming</h2>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(26,51,32,0.8)" }}>
            {caseStudy.tilnærming}
          </p>
        </section>
      </div>

      <p
        className="mt-8 text-xs leading-relaxed rounded-xl px-4 py-3"
        style={{ background: "rgba(10,46,26,0.06)", color: "rgba(26,51,32,0.55)" }}
      >
        Av hensyn til kundenes konfidensialitet er denne casen anonymisert. Navn, bransjedetaljer og spesifikk
        teknologi kan være generalisert. Ta kontakt for referanser.
      </p>

      <div
        className="mt-10 rounded-2xl p-6"
        style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)" }}
      >
        <p className="font-bold text-[#1a3320] mb-2">Lignende utfordring i din bedrift?</p>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(26,51,32,0.75)" }}>
          Vi hjelper norske bedrifter med kartlegging, pilot og implementering — fra første samtale til drift.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/hjelp-med-ai"
            className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-bold"
            style={{ background: "#f59e0b", color: "#052016" }}
          >
            Hjelp med AI
          </Link>
          <Link
            href="/kontakt"
            className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold border"
            style={{ borderColor: "rgba(21,128,61,0.35)", color: "#14532d" }}
          >
            Kontakt oss
          </Link>
        </div>
      </div>
    </article>
  );
}

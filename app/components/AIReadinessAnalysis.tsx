"use client";

import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import type { Json } from "@/types/supabase";
import Link from "next/link";
import { MARIUS_EMAIL } from "@/app/data/siteContact";

/** Settes i prod: `NEXT_PUBLIC_CALENDLY_URL` (full https-URL). Mangler den, brukes mailto til Marius. */
function getBookSamtaleHref(): string {
  const raw = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim();
  if (raw && /^https?:\/\//i.test(raw)) return raw;
  return `mailto:${MARIUS_EMAIL}?subject=${encodeURIComponent("30 min gratis samtale (etter AI-beredskap)")}`;
}

const PRIMARY = "#1D9E75";
const PRIMARY_HOVER = "#0F6E56";
const LIGHT_BG = "#E1F5EE";
const DARK_TEXT = "#085041";

type Step = "landing" | "flow";

const Q1_OPTIONS = [
  "Bygg & anlegg",
  "Industri / produksjon",
  "Handel / distribusjon",
  "Tjenesteyting / rådgivning",
  "Eiendom / facility management",
  "Helse / omsorg",
  "Transport / logistikk",
  "Finans / forsikring",
  "Bemanning / HR",
  "Energi / kraft / maritim",
  "Offentlig / non-profit",
  "Annet",
] as const;

const Q6_OPTIONS = [
  { id: "dokument", label: "Dokumenthåndtering og rapportering" },
  { id: "kundeservice", label: "Kundeservice og kommunikasjon" },
  { id: "tilbud", label: "Tilbud / kontrakter / fakturering" },
  { id: "planlegging", label: "Planlegging og ressursstyring" },
  { id: "innkjop", label: "Innkjøp og leverandørhåndtering" },
  { id: "kvalitet", label: "Kvalitetssikring og avviksbehandling" },
] as const;

const PACKAGES: Record<
  string,
  { tag: string; name: string; sentence: string }
> = {
  dokument: {
    tag: "Dokument",
    name: "AI-drevet dokumenthåndtering",
    sentence:
      "Kutter manuell tid på søk, sammenligning og uthenting — ofte den raskeste gevinsten når data ligger spredt.",
  },
  kundeservice: {
    tag: "Kunde",
    name: "Kundeservice-automatisering",
    sentence:
      "Frigjør kapasitet på repeterende henvendelser og sikrer raskere, mer konsistente svar til kunder og partnere.",
  },
  tilbud: {
    tag: "Salg",
    name: "Tilbuds- og kontraktsgenerering",
    sentence:
      "Korter ned salgssyklus ved å standardisere utkast og sjekklister — dere bruker tiden på tilpasning, ikke blankt papir.",
  },
  rapportering: {
    tag: "Innsikt",
    name: "Rapportering og ledelsesinformasjon",
    sentence:
      "Gir ledelsen ferskere tall uten manuell sammenstilling — ideelt når dere vil styre mer på fakta.",
  },
  planlegging: {
    tag: "Drift",
    name: "Ressurs- og kapasitetsplanlegging",
    sentence:
      "Reduserer flaskehalser og overbooking ved bedre synlighet — ofte stor effekt i prosjekt- og tjenestevirksomhet.",
  },
  innkjop: {
    tag: "Innkjøp",
    name: "Innkjøps- og leverandørautomatisering",
    sentence:
      "Strømlinjeformer bestillinger, avstemming og oppfølging — direkte koblet til kost og leveringssikkerhet.",
  },
  kvalitet: {
    tag: "Kvalitet",
    name: "Kvalitetssikring og avviksbehandling",
    sentence:
      "Fanger avvik tidligere og sikrer sporbarhet — færre feil og mindre tid på etterarbeid.",
  },
};

const GOAL_BOOST: Record<string, string[]> = {
  kostnad: ["dokument", "innkjop", "rapportering"],
  salg: ["kundeservice", "tilbud"],
  kvalitet: ["kvalitet", "rapportering"],
  konkurranse: ["tilbud", "kundeservice", "rapportering"],
};

const Q8_GOAL_OPTIONS = [
  { id: "kostnad", label: "Redusere kostnader og spare tid" },
  { id: "salg", label: "Øke salgsinntekter" },
  { id: "kvalitet", label: "Bedre kvalitet og færre feil" },
  { id: "konkurranse", label: "Skaffe konkurransefortrinn" },
  { id: "effektivitet", label: "Øke effektiviteten — fra manuelt til automatisert" },
  { id: "hastighet", label: "Øke hastigheten — fra treg til rask" },
  { id: "oversikt", label: "Få bedre oversikt — fra spredt til samlet informasjon" },
] as const;

/** Tidshorisont (steg 10) — poeng 0–3 som før; flere tekster kan ha samme poeng. */
const Q9_TIME_OPTIONS = [
  { id: "innen_3m", score: 3, label: "Vi vil se noe innen 3 måneder" },
  { id: "uker_par_mnd", score: 3, label: "Umiddelbare resultater — fra uker til et par måneder" },
  { id: "mnd_6_12", score: 2, label: "6–12 måneder er greit" },
  { id: "pilot_skalering", score: 2, label: "Pilot først, deretter skalering i neste fase" },
  { id: "ar_1_2", score: 1, label: "Vi investerer langsiktig – 1–2 år" },
  { id: "ar_2_5", score: 1, label: "2–5 år er realistisk for oss" },
  { id: "vet_ikke", score: 0, label: "Vi vet ikke – trenger råd" },
  { id: "avhenger_eksternt", score: 0, label: "Avhenger av budsjett, leverandør eller godkjenninger" },
] as const;

/** Barrierer (steg 11) — flervalg + valgfri kommentar. */
const Q10_BARRIER_OPTIONS = [
  { id: "usikkerhet_maal", label: "Usikkerhet om hva AI faktisk kan gjøre for oss" },
  { id: "sikkerhet_gdpr", label: "Sikkerhet og GDPR-bekymringer" },
  { id: "manko_kompetanse", label: "Manglende intern kompetanse" },
  { id: "ressurs_prioritet", label: "Ressurser og prioritering" },
  { id: "budsjett_roi", label: "Budsjett eller uklar forretningscase (ROI)" },
  { id: "kultur_endring", label: "Organisasjonskultur eller endringsmotstand" },
  { id: "data_integrasjon", label: "Datatilgang, kvalitet eller integrasjoner" },
  { id: "mandat_eierskap", label: "Manglende tydelig mandat eller eierskap" },
  { id: "compliance_juridisk", label: "Juridiske rammer utover GDPR / compliance" },
  { id: "vendor_strategi", label: "Avhengighet av leverandør eller plattformstrategi" },
] as const;

function computeScore(q4: number, q5: number, q7: number, q9: number): number {
  const s = 20 + q4 * 8 + q5 * 8 + q7 * 8 + q9 * 8;
  return Math.max(15, Math.min(100, Math.round(s)));
}

function scoreBand(score: number): { label: string; description: string } {
  if (score <= 34) {
    return {
      label: "Tidlig fase",
      description:
        "Dere er i en naturlig startfase: mye potensial, men få formaliserte grep ennå. Neste steg er å kartlegge hvor AI gir mest effekt uten å overkomplisere — vi hjelper dere prioritere og ta de første trygge stegene.",
    };
  }
  if (score <= 54) {
    return {
      label: "Utforsker",
      description:
        "Dere har begynt å utforske eller har spredt bruk av verktøy. Verdien kommer når eksperimenter knyttes til mål, data og ansvar — vi kan strukturere dette til en tydelig plan og piloter som tåler ledelsesoppfølging.",
    };
  }
  if (score <= 74) {
    return {
      label: "På vei",
      description:
        "Dere har kommet et godt stykke: data, kapasitet eller bruk av AI peker i riktig retning. Nå handler det ofte om å skalere det som fungerer, sikre kvalitet og styring — og å unngå at «skyttegravene» mellom avdelinger bremser tempoet.",
    };
  }
  return {
    label: "Moden",
    description:
      "Dere står sterk rustet til å hente ut betydelig verdi fra AI-investeringer. Fokus bør ligge på porteføljestyring, risiko (sikkerhet, etikk, leverandørvalg) og kontinuerlig forbedring — vi fungerer som strategisk sparringspartner og «siste kilometer»-ressurs.",
  };
}

type PackageRow = { tag: string; name: string; sentence: string };

function pickPackages(q6Ids: string[], q8Ids: string[]): PackageRow[] {
  const ordered: string[] = [];
  for (const id of q6Ids) {
    if (PACKAGES[id] && !ordered.includes(id)) ordered.push(id);
  }
  for (const goalId of q8Ids) {
    const boost = GOAL_BOOST[goalId] ?? [];
    for (const id of boost) {
      if (PACKAGES[id] && !ordered.includes(id)) ordered.push(id);
    }
  }
  const fallback = ["dokument", "rapportering", "kundeservice"];
  for (const id of fallback) {
    if (ordered.length >= 3) break;
    if (PACKAGES[id] && !ordered.includes(id)) ordered.push(id);
  }
  return ordered.slice(0, 3).map((id) => PACKAGES[id]);
}

export default function AIReadinessAnalysis() {
  const [phase, setPhase] = useState<Step>("landing");
  const [stepIndex, setStepIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [q1, setQ1] = useState<string | null>(null);
  const [q1AnnetText, setQ1AnnetText] = useState("");
  const [q3AnnetText, setQ3AnnetText] = useState("");
  const [q2, setQ2] = useState<string | null>(null);
  const [q3, setQ3] = useState<string | null>(null);
  const [q4, setQ4] = useState<number | null>(null);
  /** Eget svar datakvalitet (steg 5) — gjensidig utelukkende med q4-knapper; poeng 2 ved kun fritekst. */
  const [q4Custom, setQ4Custom] = useState("");
  const [q5, setQ5] = useState<number | null>(null);
  /** Eget svar AI-bruk (steg 6) — samme mønster som q4. */
  const [q5Custom, setQ5Custom] = useState("");
  const [q6, setQ6] = useState<string[]>([]);
  /** Fritekst-prosesser (steg 7 / spørsmål om manuell tid) — lagres som q6_egne. */
  const [q6Custom, setQ6Custom] = useState<string[]>([]);
  const [q7, setQ7] = useState<number | null>(null);
  /** Eget svar på kapasitetsspørsmålet (steg 8) — gjensidig utelukkende med q7-knapper; poeng settes da til 2. */
  const [q7Custom, setQ7Custom] = useState("");
  const [q8, setQ8] = useState<string[]>([]);
  /** Eget mål (steg 9) — gjensidig utelukkende med flervalg over; brukes når ingen ferdigdefinerte passer. */
  const [q8Custom, setQ8Custom] = useState("");
  const [q9Id, setQ9Id] = useState<string | null>(null);
  /** Egen tidshorisont — gjensidig utelukkende med forhåndsvalg; poeng 2 ved kun fritekst. */
  const [q9Custom, setQ9Custom] = useState("");
  const [q10, setQ10] = useState<string[]>([]);
  /** Valgfri utdyping til barrierer (steg 11). */
  const [q10Comment, setQ10Comment] = useState("");
  const [q11, setQ11] = useState("");

  /** Valgfritt kontakt på resultatsiden — sendes til ai_beredskap.navn / epost */
  const [resultContactNavn, setResultContactNavn] = useState("");
  const [resultContactEpost, setResultContactEpost] = useState("");

  const flowIdRef = useRef("");
  const resultContactRef = useRef({ navn: "", epost: "" });
  const aiSaveStartedRef = useRef(false);
  const aiSavePayloadRef = useRef<{
    total_score: number;
    score_kategori: string;
    bedrift: string | null;
    navn: string | null;
    epost: string | null;
    svar: Json;
  } | null>(null);

  useEffect(() => {
    resultContactRef.current = {
      navn: resultContactNavn,
      epost: resultContactEpost,
    };
  }, [resultContactNavn, resultContactEpost]);

  const totalFlowSteps = 12;
  const progressPct =
    phase === "flow"
      ? showResults
        ? 100
        : Math.round(((stepIndex + 1) / totalFlowSteps) * 100)
      : 0;

  const q4ForScore = useMemo(() => {
    if (q4 !== null) return q4;
    if (q4Custom.trim().length > 0) return 2;
    return null;
  }, [q4, q4Custom]);

  const q5ForScore = useMemo(() => {
    if (q5 !== null) return q5;
    if (q5Custom.trim().length > 0) return 2;
    return null;
  }, [q5, q5Custom]);

  const q7ForScore = useMemo(() => {
    if (q7 !== null) return q7;
    if (q7Custom.trim().length > 0) return 2;
    return null;
  }, [q7, q7Custom]);

  const q9ForScore = useMemo(() => {
    if (q9Custom.trim().length > 0) return 2;
    if (q9Id !== null) {
      const row = Q9_TIME_OPTIONS.find((o) => o.id === q9Id);
      return row !== undefined ? row.score : null;
    }
    return null;
  }, [q9Id, q9Custom]);

  const score = useMemo(() => {
    if (q4ForScore === null || q5ForScore === null || q7ForScore === null || q9ForScore === null) return null;
    return computeScore(q4ForScore, q5ForScore, q7ForScore, q9ForScore);
  }, [q4ForScore, q5ForScore, q7ForScore, q9ForScore]);

  const band = score !== null ? scoreBand(score) : null;
  const recommended = useMemo(() => pickPackages(q6, q8), [q6, q8]);

  const resetFlow = useCallback(() => {
    setStepIndex(0);
    setCompanyName("");
    setQ1(null);
    setQ2(null);
    setQ3(null);
    setQ4(null);
    setQ4Custom("");
    setQ5(null);
    setQ5Custom("");
    setQ6([]);
    setQ6Custom([]);
    setQ7(null);
    setQ7Custom("");
    setQ8([]);
    setQ8Custom("");
    setQ9Id(null);
    setQ9Custom("");
    setQ10([]);
    setQ10Comment("");
    setQ11("");
    setResultContactNavn("");
    setResultContactEpost("");
  }, []);

  const flushSaveAiBeredskap = useCallback(() => {
    const payload = aiSavePayloadRef.current;
    if (!payload || aiSaveStartedRef.current) return;

    const lockKey = `lillehval-ai-beredskap-${flowIdRef.current}`;
    try {
      if (typeof sessionStorage !== "undefined" && sessionStorage.getItem(lockKey)) {
        return;
      }
    } catch {
      /* privat modus */
    }

    aiSaveStartedRef.current = true;
    const { navn, epost } = resultContactRef.current;

    void fetch("/api/ai-beredskap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        total_score: payload.total_score,
        score_kategori: payload.score_kategori,
        bedrift: payload.bedrift,
        navn: navn.trim() || null,
        epost: epost.trim() || null,
        svar: payload.svar,
      }),
    })
      .then((res) => {
        if (res.ok) {
          try {
            if (typeof sessionStorage !== "undefined") {
              sessionStorage.setItem(lockKey, "1");
            }
          } catch {
            /* */
          }
        } else {
          aiSaveStartedRef.current = false;
        }
      })
      .catch(() => {
        aiSaveStartedRef.current = false;
      });
  }, []);

  const openFlow = () => {
    resetFlow();
    flowIdRef.current =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`;
    aiSavePayloadRef.current = null;
    aiSaveStartedRef.current = false;
    setShowResults(false);
    setPhase("flow");
    setStepIndex(0);
  };

  const closeFlow = () => {
    if (showResults) flushSaveAiBeredskap();
    setShowResults(false);
    setPhase("landing");
    resetFlow();
  };

  const canProceed = (): boolean => {
    switch (stepIndex) {
      case 0:
        return true;
      case 1:
        return q1 !== null && (q1 !== "Annet" || q1AnnetText.trim().length > 0);
      case 2:
        return q2 !== null;
      case 3:
        return q3 !== null && (q3 !== "Annet" || q3AnnetText.trim().length > 0);
      case 4:
        return q4 !== null || q4Custom.trim().length > 0;
      case 5:
        return q5 !== null || q5Custom.trim().length > 0;
      case 6: {
        const hasPreset = q6.length > 0;
        const hasCustom = q6Custom.some((s) => s.trim().length > 0);
        return hasPreset || hasCustom;
      }
      case 7:
        return q7 !== null || q7Custom.trim().length > 0;
      case 8: {
        const hasGoals = q8.length > 0;
        const hasCustom = q8Custom.trim().length > 0;
        return hasGoals || hasCustom;
      }
      case 9:
        return q9Id !== null || q9Custom.trim().length > 0;
      case 10: {
        const hasBarriers = q10.length > 0;
        const hasComment = q10Comment.trim().length > 0;
        return hasBarriers || hasComment;
      }
      case 11:
        return true;
      default:
        return false;
    }
  };

  const goNext = () => {
    if (!canProceed()) return;
    if (stepIndex === 11) {
      if (q4ForScore === null || q5ForScore === null || q7ForScore === null || q9ForScore === null) return;
      const s = computeScore(q4ForScore, q5ForScore, q7ForScore, q9ForScore);
      const b = scoreBand(s);
      const rec = pickPackages(q6, q8);
      const q10Kommentar = q10Comment.trim() || null;
      const q10Etiketter = q10.map(
        (id) => Q10_BARRIER_OPTIONS.find((o) => o.id === id)?.label ?? id
      );
      const q6Egne = q6Custom.map((s) => s.trim()).filter((s) => s.length > 0);
      const q4Egen = q4Custom.trim() || null;
      const q5Egen = q5Custom.trim() || null;
      const q7Egen = q7Custom.trim() || null;
      const q8Egen = q8Custom.trim() || null;
      const q9Egen = q9Custom.trim() || null;
      const q9Numeric =
        q9Egen !== null
          ? null
          : q9Id !== null
            ? (Q9_TIME_OPTIONS.find((o) => o.id === q9Id)?.score ?? null)
            : null;
      aiSavePayloadRef.current = {
        total_score: s,
        score_kategori: b.label,
        bedrift: companyName.trim() || null,
        navn: null,
        epost: null,
        svar: {
          q1,
          q2,
          q3,
          q4: q4Egen ? null : q4,
          q4_egen: q4Egen,
          q5: q5Egen ? null : q5,
          q5_egen: q5Egen,
          q6: [...q6],
          q6_egne: q6Egne,
          q7: q7Egen ? null : q7,
          q7_egen: q7Egen,
          q8: [...q8],
          q8_egen: q8Egen,
          q9: q9Numeric,
          q9_preset: q9Egen ? null : q9Id,
          q9_egen: q9Egen,
          q10: [...q10],
          q10_etiketter: q10Etiketter,
          q10_kommentar: q10Kommentar,
          q11,
          band_label: b.label,
          band_description: b.description,
          anbefalte_pakker: rec.map((p) => ({ tag: p.tag, name: p.name })),
        },
      };
      setResultContactNavn("");
      setResultContactEpost("");
      setShowResults(true);
      return;
    }
    setStepIndex((s) => s + 1);
  };

  useEffect(() => {
    if (!showResults) return;
    const t = setTimeout(() => flushSaveAiBeredskap(), 2800);
    return () => clearTimeout(t);
  }, [showResults, flushSaveAiBeredskap]);

  const goBack = () => {
    if (showResults) {
      flushSaveAiBeredskap();
      setShowResults(false);
      return;
    }
    if (stepIndex === 0) {
      closeFlow();
      return;
    }
    setStepIndex((s) => s - 1);
  };

  const toggleQ6 = (id: string) => {
    setQ6((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleQ8 = (id: string) => {
    setQ8Custom("");
    setQ8((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleQ10 = (id: string) => {
    setQ10((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const scoredOption = (
    value: number,
    label: string,
    selected: number | null,
    onSelect: (n: number) => void
  ) => (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className="w-full text-left rounded-xl border-2 px-4 py-3 text-sm transition-all duration-200 hover:shadow-md"
      style={{
        borderColor: selected === value ? PRIMARY : "rgba(8, 80, 65, 0.15)",
        background: selected === value ? "rgba(29, 158, 117, 0.12)" : "#fff",
        color: DARK_TEXT,
      }}
    >
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen" style={{ background: LIGHT_BG, color: DARK_TEXT }}>
      {/* Landing */}
      <section className="px-6 pt-28 pb-20 max-w-3xl mx-auto text-center">
        <p
          className="text-sm font-semibold uppercase tracking-widest mb-4"
          style={{ color: PRIMARY }}
        >
          Gratis verktøy
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-5">
          Hvor AI-klar er bedriften deres?
        </h1>
        <p className="text-lg leading-relaxed mb-10 opacity-90 max-w-xl mx-auto">
          Elleve korte spørsmål gir dere en indikasjon på modenhet, mulige flaskehalser og hvor dere kan
          hente raskest effekt — uten forpliktelser.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm mb-12 opacity-80">
          <span>✓ Tar ca. 5 minutter</span>
          <span>✓ Kun i nettleseren</span>
          <span>✓ Tilpasset norske SMB</span>
        </div>
        <button
          type="button"
          onClick={openFlow}
          className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: PRIMARY, boxShadow: "0 8px 24px rgba(29,158,117,0.35)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = PRIMARY_HOVER;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = PRIMARY;
          }}
        >
          Start AI-beredskapsanalysen
        </button>
        <p className="mt-8 text-sm opacity-70">
          <Link href="/" className="underline underline-offset-2 hover:opacity-100">
            Tilbake til forsiden
          </Link>
        </p>
      </section>

      {/* Modal flow */}
      {phase === "flow" && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] pt-[max(1rem,env(safe-area-inset-top,0px))] pb-[max(1rem,env(safe-area-inset-bottom,0px))]"
          style={{ background: "rgba(8, 80, 65, 0.45)" }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="readiness-dialog-title"
        >
          <div
            className={`relative w-full max-h-[min(90vh,calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-1.5rem))] overflow-hidden flex flex-col rounded-2xl shadow-2xl transition-all duration-300 ${showResults ? "max-w-xl" : "max-w-lg"}`}
            style={{ background: "#fff" }}
          >
            {/* Progress */}
            <div className="px-5 pt-4 pb-2 border-b border-black/5">
              <div className="flex justify-between items-center text-xs font-semibold mb-2" style={{ color: DARK_TEXT }}>
                <span>
                  {showResults
                    ? "Resultat"
                    : `Steg ${stepIndex + 1} av ${totalFlowSteps}`}
                </span>
                <span>{progressPct}%</span>
              </div>
              <div className="h-2 rounded-full bg-black/10 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${progressPct}%`,
                    background: PRIMARY,
                  }}
                />
              </div>
            </div>

            <div className="overflow-y-auto flex-1 min-h-0 px-5 py-6">
              {showResults && score !== null && band ? (
                <ResultsPanel
                  score={score}
                  band={band}
                  companyName={companyName}
                  q11={q11}
                  packages={recommended}
                  contactNavn={resultContactNavn}
                  contactEpost={resultContactEpost}
                  onContactNavnChange={setResultContactNavn}
                  onContactEpostChange={setResultContactEpost}
                  onClose={closeFlow}
                />
              ) : (
                <>
              <h2 id="readiness-dialog-title" className="text-xl font-extrabold mb-4" style={{ color: DARK_TEXT }}>
                {stepIndex === 0 && "Før vi starter"}
                {stepIndex === 1 && "Hvilken bransje er bedriften i?"}
                {stepIndex === 2 && "Hvor mange ansatte har bedriften?"}
                {stepIndex === 3 && "Hva er din rolle i bedriften?"}
                {stepIndex === 4 && "Hvordan vil du beskrive datakvaliteten i bedriften?"}
                {stepIndex === 5 && "Bruker dere AI eller automatisering i dag?"}
                {stepIndex === 6 && "Hvilke prosesser tar mest manuell tid?"}
                {stepIndex === 7 && "Har dere intern kapasitet til å drifte nye digitale løsninger?"}
                {stepIndex === 8 && "Hva er det viktigste målet med en AI-investering for dere?"}
                {stepIndex === 9 && "Hva er realistisk tidshorisont for å se første resultater?"}
                {stepIndex === 10 && "Hva er den største barrieren hos dere?"}
                {stepIndex === 11 && "Noe mer vi bør vite?"}
              </h2>

              <div className="space-y-3 transition-opacity duration-300 ease-out">
                {stepIndex === 0 && (
                  <>
                    <label className="block text-sm font-semibold mb-2">Bedriftsnavn</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="F.eks. Lillehval AS"
                      className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none focus:ring-2"
                      style={{ borderColor: "rgba(8,80,65,0.2)", color: DARK_TEXT }}
                    />
                  </>
                )}

                {stepIndex === 1 && (
                  <div className="grid gap-2 max-h-[min(50vh,45dvh,320px)] overflow-y-auto overscroll-y-contain pr-1">
                    {Q1_OPTIONS.map((opt) =>
                      opt === "Annet" ? (
                        <input
                          key={opt}
                          type="text"
                          value={q1AnnetText}
                          onFocus={() => setQ1("Annet")}
                          onChange={(e) => {
                            setQ1("Annet");
                            setQ1AnnetText(e.target.value);
                          }}
                          placeholder="Annet - Skriv inn egen bransje her"
                          className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none transition-all"
                          style={{
                            borderColor: q1 === "Annet" ? PRIMARY : "rgba(8, 80, 65, 0.15)",
                            background: q1 === "Annet" ? "rgba(29, 158, 117, 0.1)" : LIGHT_BG,
                            color: DARK_TEXT,
                          }}
                        />
                      ) : (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setQ1(opt)}
                          className="text-left rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all"
                          style={{
                            borderColor: q1 === opt ? PRIMARY : "rgba(8, 80, 65, 0.15)",
                            background: q1 === opt ? "rgba(29, 158, 117, 0.1)" : LIGHT_BG,
                            color: DARK_TEXT,
                          }}
                        >
                          {opt}
                        </button>
                      )
                    )}
                  </div>
                )}

                {stepIndex === 2 &&
                  ["1", "2–9", "10–50", "50–200", "200–500", "Over 500"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setQ2(opt)}
                      className="w-full text-left rounded-xl border-2 px-4 py-3 text-sm font-medium"
                      style={{
                        borderColor: q2 === opt ? PRIMARY : "rgba(8, 80, 65, 0.15)",
                        background: q2 === opt ? "rgba(29, 158, 117, 0.1)" : LIGHT_BG,
                        color: DARK_TEXT,
                      }}
                    >
                      {opt}
                    </button>
                  ))}

                {stepIndex === 3 &&
                  [
                    "Daglig leder / eier",
                    "CFO / økonomisjef",
                    "IT- / digitaliseringsansvarlig",
                    "Avdelingsleder",
                    "Annet",
                  ].map((opt) =>
                    opt === "Annet" ? (
                      <input
                        key={opt}
                        type="text"
                        value={q3AnnetText}
                        onFocus={() => setQ3("Annet")}
                        onChange={(e) => {
                          setQ3("Annet");
                          setQ3AnnetText(e.target.value);
                        }}
                        placeholder="Annet - Skriv inn din rolle her"
                        className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none transition-all mb-2"
                        style={{
                          borderColor: q3 === "Annet" ? PRIMARY : "rgba(8, 80, 65, 0.15)",
                          background: q3 === "Annet" ? "rgba(29, 158, 117, 0.1)" : LIGHT_BG,
                          color: DARK_TEXT,
                        }}
                      />
                    ) : (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setQ3(opt)}
                        className="w-full text-left rounded-xl border-2 px-4 py-3 text-sm font-medium mb-2"
                        style={{
                          borderColor: q3 === opt ? PRIMARY : "rgba(8, 80, 65, 0.15)",
                          background: q3 === opt ? "rgba(29, 158, 117, 0.1)" : LIGHT_BG,
                          color: DARK_TEXT,
                        }}
                      >
                        {opt}
                      </button>
                    )
                  )}

                {stepIndex === 4 && (
                  <div className="space-y-2">
                    {scoredOption(0, "Vi samler lite data og har ingen felles systemer", q4, (n) => {
                      setQ4(n);
                      setQ4Custom("");
                    })}
                    {scoredOption(
                      1,
                      "Vi har data i ERP/CRM, men det er spredt og lite brukt",
                      q4,
                      (n) => {
                        setQ4(n);
                        setQ4Custom("");
                      }
                    )}
                    {scoredOption(
                      2,
                      "Data er samlet og tilgjengelig, men vi analyserer sjelden",
                      q4,
                      (n) => {
                        setQ4(n);
                        setQ4Custom("");
                      }
                    )}
                    {scoredOption(
                      3,
                      "Vi tar aktivt beslutninger basert på data og har god datadisiplin",
                      q4,
                      (n) => {
                        setQ4(n);
                        setQ4Custom("");
                      }
                    )}

                    <div className="pt-3 mt-2 border-t border-black/10 space-y-2">
                      <label htmlFor="q4-egen" className="block text-xs font-semibold" style={{ color: DARK_TEXT }}>
                        Eller beskriv kort med egne ord
                      </label>
                      <input
                        id="q4-egen"
                        type="text"
                        value={q4Custom}
                        onChange={(e) => {
                          const v = e.target.value;
                          setQ4Custom(v);
                          if (v.trim().length > 0) setQ4(null);
                        }}
                        placeholder="Beskriv datakvaliteten …"
                        className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-600/30"
                        style={{
                          borderColor:
                            q4 === null && q4Custom.trim().length > 0
                              ? PRIMARY
                              : "rgba(8, 80, 65, 0.2)",
                          background: "#fff",
                          color: DARK_TEXT,
                        }}
                      />
                      <p className="text-xs opacity-70 m-0">
                        Skriver du her, fjernes valget over — og motsatt.
                      </p>
                    </div>
                  </div>
                )}

                {stepIndex === 5 && (
                  <div className="space-y-2">
                    {scoredOption(0, "Nei, ingen AI eller automatisering brukes", q5, (n) => {
                      setQ5(n);
                      setQ5Custom("");
                    })}
                    {scoredOption(
                      1,
                      "Noen enkeltpersoner eksperimenterer på egen hånd",
                      q5,
                      (n) => {
                        setQ5(n);
                        setQ5Custom("");
                      }
                    )}
                    {scoredOption(
                      2,
                      "Én eller flere avdelinger bruker AI-verktøy med varierende resultater",
                      q5,
                      (n) => {
                        setQ5(n);
                        setQ5Custom("");
                      }
                    )}
                    {scoredOption(
                      3,
                      "Vi har implementert AI i konkrete prosesser med målbare resultater",
                      q5,
                      (n) => {
                        setQ5(n);
                        setQ5Custom("");
                      }
                    )}

                    <div className="pt-3 mt-2 border-t border-black/10 space-y-2">
                      <label htmlFor="q5-egen" className="block text-xs font-semibold" style={{ color: DARK_TEXT }}>
                        Eller beskriv kort med egne ord
                      </label>
                      <input
                        id="q5-egen"
                        type="text"
                        value={q5Custom}
                        onChange={(e) => {
                          const v = e.target.value;
                          setQ5Custom(v);
                          if (v.trim().length > 0) setQ5(null);
                        }}
                        placeholder="Beskriv dagens bruk av AI / automatisering …"
                        className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-600/30"
                        style={{
                          borderColor:
                            q5 === null && q5Custom.trim().length > 0
                              ? PRIMARY
                              : "rgba(8, 80, 65, 0.2)",
                          background: "#fff",
                          color: DARK_TEXT,
                        }}
                      />
                      <p className="text-xs opacity-70 m-0">
                        Skriver du her, fjernes valget over — og motsatt.
                      </p>
                    </div>
                  </div>
                )}

                {stepIndex === 6 && (
                  <div className="space-y-2">
                    <p className="text-xs opacity-70 mb-2">
                      Velg én eller flere fra listen, og/eller legg til egne prosesser nederst.
                    </p>
                    {Q6_OPTIONS.map(({ id, label }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleQ6(id)}
                        className="w-full text-left rounded-xl border-2 px-4 py-3 text-sm"
                        style={{
                          borderColor: q6.includes(id) ? PRIMARY : "rgba(8, 80, 65, 0.15)",
                          background: q6.includes(id) ? "rgba(29, 158, 117, 0.1)" : LIGHT_BG,
                          color: DARK_TEXT,
                        }}
                      >
                        {q6.includes(id) ? "✓ " : ""}
                        {label}
                      </button>
                    ))}

                    <div className="space-y-2 pt-3 mt-2 border-t border-black/10">
                      <p className="text-xs font-semibold" style={{ color: DARK_TEXT }}>
                        Egne prosesser (valgfritt)
                      </p>
                      {q6Custom.map((line, i) => (
                        <div key={i} className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={line}
                            onChange={(e) =>
                              setQ6Custom((prev) =>
                                prev.map((x, j) => (j === i ? e.target.value : x))
                              )
                            }
                            placeholder="Beskriv prosessen …"
                            className="flex-1 min-w-0 rounded-xl border-2 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-600/30"
                            style={{
                              borderColor: "rgba(8, 80, 65, 0.2)",
                              color: DARK_TEXT,
                            }}
                            aria-label={`Egen prosess ${i + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setQ6Custom((prev) => prev.filter((_, j) => j !== i))
                            }
                            className="shrink-0 px-3 py-2 text-xs font-semibold rounded-xl border-2 transition-colors hover:bg-black/5"
                            style={{ borderColor: "rgba(8, 80, 65, 0.2)", color: DARK_TEXT }}
                          >
                            Fjern
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => setQ6Custom((prev) => [...prev, ""])}
                        className="w-full py-2.5 rounded-xl text-sm font-semibold border-2 border-dashed transition-colors hover:bg-black/[0.04]"
                        style={{ borderColor: "rgba(29, 158, 117, 0.45)", color: PRIMARY }}
                      >
                        + Legg til egen linje
                      </button>
                    </div>
                  </div>
                )}

                {stepIndex === 7 && (
                  <div className="space-y-2">
                    {scoredOption(0, "Nei, vi har ingen teknisk ressurs internt", q7, (n) => {
                      setQ7(n);
                      setQ7Custom("");
                    })}
                    {scoredOption(1, "Vi har én person med delansvar for IT", q7, (n) => {
                      setQ7(n);
                      setQ7Custom("");
                    })}
                    {scoredOption(2, "Vi har en IT-avdeling", q7, (n) => {
                      setQ7(n);
                      setQ7Custom("");
                    })}
                    {scoredOption(3, "Vi har dedikert digitaliserings- eller innovasjonsansvarlig", q7, (n) => {
                      setQ7(n);
                      setQ7Custom("");
                    })}

                    <div className="pt-3 mt-2 border-t border-black/10 space-y-2">
                      <label
                        htmlFor="q7-egen"
                        className="block text-xs font-semibold"
                        style={{ color: DARK_TEXT }}
                      >
                        Eller beskriv kort med egne ord
                      </label>
                      <input
                        id="q7-egen"
                        type="text"
                        value={q7Custom}
                        onChange={(e) => {
                          const v = e.target.value;
                          setQ7Custom(v);
                          if (v.trim().length > 0) setQ7(null);
                        }}
                        placeholder="F.eks. ekstern partner, blandet modell …"
                        className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-600/30"
                        style={{
                          borderColor:
                            q7 === null && q7Custom.trim().length > 0
                              ? PRIMARY
                              : "rgba(8, 80, 65, 0.2)",
                          background: "#fff",
                          color: DARK_TEXT,
                        }}
                      />
                      <p className="text-xs opacity-70 m-0">
                        Skriver du her, fjernes valget over — og motsatt.
                      </p>
                    </div>
                  </div>
                )}

                {stepIndex === 8 && (
                  <div className="space-y-2">
                    <p className="text-xs opacity-70 mb-2">
                      Velg ett eller flere mål, eller fyll inn nederst hvis ingen av alternativene passer.
                    </p>
                    {Q8_GOAL_OPTIONS.map(({ id, label }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleQ8(id)}
                        className="w-full text-left rounded-xl border-2 px-4 py-3 text-sm font-medium mb-2"
                        style={{
                          borderColor: q8.includes(id) ? PRIMARY : "rgba(8, 80, 65, 0.15)",
                          background: q8.includes(id) ? "rgba(29, 158, 117, 0.1)" : LIGHT_BG,
                          color: DARK_TEXT,
                        }}
                      >
                        {q8.includes(id) ? "✓ " : ""}
                        {label}
                      </button>
                    ))}

                    <div className="pt-3 mt-2 border-t border-black/10 space-y-2">
                      <label
                        htmlFor="q8-egen"
                        className="block text-xs font-semibold"
                        style={{ color: DARK_TEXT }}
                      >
                        Ingen av alternativene passer — skriv kort her
                      </label>
                      <input
                        id="q8-egen"
                        type="text"
                        value={q8Custom}
                        onChange={(e) => {
                          const v = e.target.value;
                          setQ8Custom(v);
                          if (v.trim().length > 0) setQ8([]);
                        }}
                        placeholder="Beskriv målet med AI-investeringen …"
                        className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-600/30"
                        style={{
                          borderColor:
                            q8.length === 0 && q8Custom.trim().length > 0
                              ? PRIMARY
                              : "rgba(8, 80, 65, 0.2)",
                          background: "#fff",
                          color: DARK_TEXT,
                        }}
                      />
                      <p className="text-xs opacity-70 m-0">
                        Skriver du her, fjernes valgene over — og motsatt.
                      </p>
                    </div>
                  </div>
                )}

                {stepIndex === 9 && (
                  <div className="space-y-2 max-h-[min(52vh,45dvh,320px)] overflow-y-auto overscroll-y-contain pr-1">
                    <p className="text-xs opacity-70 mb-2">
                      Velg det som passer best, eller skriv egen tidshorisont nederst.
                    </p>
                    {Q9_TIME_OPTIONS.map(({ id, label }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          setQ9Custom("");
                          setQ9Id(id);
                        }}
                        className="w-full text-left rounded-xl border-2 px-4 py-3 text-sm transition-all duration-200 hover:shadow-md mb-2"
                        style={{
                          borderColor:
                            q9Id === id && q9Custom.trim().length === 0
                              ? PRIMARY
                              : "rgba(8, 80, 65, 0.15)",
                          background:
                            q9Id === id && q9Custom.trim().length === 0
                              ? "rgba(29, 158, 117, 0.12)"
                              : "#fff",
                          color: DARK_TEXT,
                        }}
                      >
                        <span className="font-medium">{label}</span>
                      </button>
                    ))}

                    <div className="pt-3 mt-2 border-t border-black/10 space-y-2">
                      <label
                        htmlFor="q9-egen"
                        className="block text-xs font-semibold"
                        style={{ color: DARK_TEXT }}
                      >
                        Egen tidshorisont
                      </label>
                      <input
                        id="q9-egen"
                        type="text"
                        value={q9Custom}
                        onChange={(e) => {
                          const v = e.target.value;
                          setQ9Custom(v);
                          if (v.trim().length > 0) setQ9Id(null);
                        }}
                        placeholder="F.eks. «Første leveranse Q3», «Etter ERP-bytte» …"
                        className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-600/30"
                        style={{
                          borderColor:
                            q9Custom.trim().length > 0 ? PRIMARY : "rgba(8, 80, 65, 0.2)",
                          background: "#fff",
                          color: DARK_TEXT,
                        }}
                      />
                      <p className="text-xs opacity-70 m-0">
                        Skriver du her, fjernes valget over — og motsatt.
                      </p>
                    </div>
                  </div>
                )}

                {stepIndex === 10 && (
                  <div className="space-y-2 max-h-[min(52vh,45dvh,320px)] overflow-y-auto overscroll-y-contain pr-1">
                    <p className="text-xs opacity-70 mb-2">
                      Velg ett eller flere som gjelder. Du kan utdype i kommentarfeltet nederst.
                    </p>
                    {Q10_BARRIER_OPTIONS.map(({ id, label }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleQ10(id)}
                        className="w-full text-left rounded-xl border-2 px-4 py-3 text-sm font-medium mb-2"
                        style={{
                          borderColor: q10.includes(id) ? PRIMARY : "rgba(8, 80, 65, 0.15)",
                          background: q10.includes(id) ? "rgba(29, 158, 117, 0.1)" : LIGHT_BG,
                          color: DARK_TEXT,
                        }}
                      >
                        {q10.includes(id) ? "✓ " : ""}
                        {label}
                      </button>
                    ))}

                    <div className="pt-3 mt-2 border-t border-black/10 space-y-2 shrink-0">
                      <label
                        htmlFor="q10-kommentar"
                        className="block text-xs font-semibold"
                        style={{ color: DARK_TEXT }}
                      >
                        Kommentar (valgfritt)
                      </label>
                      <input
                        id="q10-kommentar"
                        type="text"
                        value={q10Comment}
                        onChange={(e) => setQ10Comment(e.target.value)}
                        placeholder="Utdyp kort — f.eks. hva som bremser dere i praksis …"
                        className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-600/30"
                        style={{
                          borderColor:
                            q10Comment.trim().length > 0
                              ? PRIMARY
                              : "rgba(8, 80, 65, 0.2)",
                          background: "#fff",
                          color: DARK_TEXT,
                        }}
                      />
                    </div>
                  </div>
                )}

                {stepIndex === 11 && (
                  <>
                    <p className="text-sm opacity-80 mb-3">
                      Valgfritt — systemer, tidligere erfaringer, ambisjonsnivå. Alt er nyttig for oss.
                    </p>
                    <textarea
                      value={q11}
                      onChange={(e) => setQ11(e.target.value)}
                      rows={4}
                      placeholder="Systemer dere bruker, tidligere erfaringer med digitalisering, ambisjonsnivå – alt er nyttig for oss."
                      className="w-full rounded-xl border-2 px-4 py-3 text-sm resize-none outline-none"
                      style={{ borderColor: "rgba(8,80,65,0.2)", color: DARK_TEXT }}
                    />
                  </>
                )}
              </div>
                </>
              )}
            </div>

            {/* Footer nav */}
            <div className="flex gap-3 px-5 py-4 border-t border-black/5 shrink-0">
              <button
                type="button"
                onClick={goBack}
                className="px-4 py-3 rounded-xl text-sm font-semibold border-2"
                style={{ borderColor: "rgba(8,80,65,0.2)", color: DARK_TEXT }}
              >
                {showResults ? "Tilbake til spørsmål" : "Tilbake"}
              </button>
              {!showResults && (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canProceed()}
                  className="flex-1 py-3 rounded-xl text-sm font-bold text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  style={{ background: canProceed() ? PRIMARY : "#ccc" }}
                  onMouseEnter={(e) => {
                    if (canProceed())
                      (e.currentTarget as HTMLButtonElement).style.background = PRIMARY_HOVER;
                  }}
                  onMouseLeave={(e) => {
                    if (canProceed())
                      (e.currentTarget as HTMLButtonElement).style.background = PRIMARY;
                  }}
                >
                  {stepIndex === 11 ? "Se resultat" : "Neste"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ResultsPanel({
  score,
  band,
  companyName,
  q11,
  packages,
  contactNavn,
  contactEpost,
  onContactNavnChange,
  onContactEpostChange,
  onClose,
}: {
  score: number;
  band: { label: string; description: string };
  companyName: string;
  q11: string;
  packages: PackageRow[];
  contactNavn: string;
  contactEpost: string;
  onContactNavnChange: (v: string) => void;
  onContactEpostChange: (v: string) => void;
  onClose: () => void;
}) {
  const bookSamtaleHref = useMemo(() => getBookSamtaleHref(), []);
  const isExternalCalendar = bookSamtaleHref.startsWith("http");

  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="space-y-6 pb-2">
      <div className="flex flex-col items-center">
        <div className="relative w-36 h-36">
          <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="rgba(8,80,65,0.1)"
              strokeWidth="10"
            />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke={PRIMARY}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold" style={{ color: DARK_TEXT }}>
              {score}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: PRIMARY }}>
              {band.label}
            </span>
          </div>
        </div>
        {companyName && (
          <p className="text-sm mt-2 opacity-70">{companyName}</p>
        )}
      </div>

      <p className="text-sm leading-relaxed" style={{ color: DARK_TEXT }}>
        {band.description}
      </p>

      <div>
        <h3 className="text-sm font-extrabold uppercase tracking-wide mb-3" style={{ color: DARK_TEXT }}>
          Anbefalte fokusområder
        </h3>
        <ul className="space-y-3">
          {packages.map((p) => (
            <li
              key={p.name}
              className="rounded-xl border p-4 text-sm"
              style={{ borderColor: "rgba(8,80,65,0.15)", background: LIGHT_BG }}
            >
              <span
                className="inline-block text-xs font-bold px-2 py-0.5 rounded mb-2"
                style={{ background: PRIMARY, color: "#fff" }}
              >
                {p.tag}
              </span>
              <div className="font-bold" style={{ color: DARK_TEXT }}>
                {p.name}
              </div>
              <p className="mt-1 opacity-85">{p.sentence}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-extrabold uppercase tracking-wide mb-3" style={{ color: DARK_TEXT }}>
          Hvordan vi kan hjelpe
        </h3>
        <div className="grid gap-3">
          <div className="rounded-xl border p-4 text-sm" style={{ borderColor: "rgba(8,80,65,0.15)" }}>
            <div className="font-bold" style={{ color: DARK_TEXT }}>Bra — Innsiktsanalyse</div>
            <p className="text-xs mt-1 opacity-80">Workshop + rapport med anbefalinger.</p>
          </div>
          <div
            className="rounded-xl border-2 p-4 text-sm relative"
            style={{ borderColor: PRIMARY, background: "rgba(29,158,117,0.08)" }}
          >
            <span className="absolute -top-2 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: PRIMARY }}>
              Anbefalt
            </span>
            <div className="font-bold" style={{ color: DARK_TEXT }}>Bedre — Pilotimplementering</div>
            <p className="text-xs mt-1 opacity-80">Konkret pilot med mål og oppfølging — ofte beste neste steg.</p>
          </div>
          <div className="rounded-xl border p-4 text-sm" style={{ borderColor: "rgba(8,80,65,0.15)" }}>
            <div className="font-bold" style={{ color: DARK_TEXT }}>Best — Full partner</div>
            <p className="text-xs mt-1 opacity-80">Løpende rådgivning og gjennomføring over tid.</p>
          </div>
        </div>
      </div>

      {q11.trim() && (
        <div
          className="rounded-xl p-4 text-sm italic"
          style={{ background: "rgba(8,80,65,0.06)", color: DARK_TEXT }}
        >
          <span className="not-italic font-semibold block mb-1 opacity-70">Dere skrev:</span>
          {q11}
        </div>
      )}

      <div
        className="rounded-xl border-2 p-4 space-y-3"
        style={{ borderColor: "rgba(8,80,65,0.2)", background: LIGHT_BG }}
      >
        <h3 className="text-sm font-extrabold uppercase tracking-wide" style={{ color: DARK_TEXT }}>
          Vil du at vi kontakter deg?
        </h3>
        <p className="text-xs opacity-80 leading-relaxed">
          Helt valgfritt. Navn og e-post lagres sammen med analysen slik at vi kan følge opp — dere kan også bare booke et møte under uten å fylle ut noe her.
        </p>
        <div>
          <label className="block text-xs font-semibold mb-1 opacity-80" htmlFor="ai-result-navn">
            Navn (valgfritt)
          </label>
          <input
            id="ai-result-navn"
            type="text"
            autoComplete="name"
            value={contactNavn}
            onChange={(e) => onContactNavnChange(e.target.value)}
            placeholder="For- og etternavn"
            className="w-full rounded-xl border-2 px-3 py-2.5 text-sm outline-none focus:ring-2"
            style={{ borderColor: "rgba(8,80,65,0.2)", color: DARK_TEXT }}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1 opacity-80" htmlFor="ai-result-epost">
            E-post (valgfritt)
          </label>
          <input
            id="ai-result-epost"
            type="email"
            autoComplete="email"
            value={contactEpost}
            onChange={(e) => onContactEpostChange(e.target.value)}
            placeholder="ola@bedrift.no"
            className="w-full rounded-xl border-2 px-3 py-2.5 text-sm outline-none focus:ring-2"
            style={{ borderColor: "rgba(8,80,65,0.2)", color: DARK_TEXT }}
          />
        </div>
      </div>

      <a
        href={bookSamtaleHref}
        {...(isExternalCalendar
          ? { target: "_blank" as const, rel: "noopener noreferrer" }
          : {})}
        className="flex w-full items-center justify-center gap-2 py-4 rounded-xl font-bold text-white text-center"
        style={{ background: PRIMARY }}
      >
        Book en gratis 30-minutters samtale →
      </a>
      <button
        type="button"
        onClick={onClose}
        className="w-full py-2 text-sm underline opacity-70"
        style={{ color: DARK_TEXT }}
      >
        Lukk
      </button>
    </div>
  );
}

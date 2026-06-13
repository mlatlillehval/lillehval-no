"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SectionKicker from "./SectionKicker";
import { createBrowserClient } from "@supabase/ssr";

type ProjectRow = {
  id: string;
  tittel: string;
  kunde: string | null;
  beskrivelse: string | null;
  status: string | null;
  vis_paa_nettside: boolean | null;
  opprettet: string | null;
  image?: string;
};

const STATIC_PROJECTS: ProjectRow[] = [
  {
    id: "static-1",
    tittel: "AI-basert beslutningsstøtte i eiendom",
    kunde: "Meglerselskap, Vestfold",
    beskrivelse:
      "Samarbeid om en intern arbeidsflate som samler relevant markedsdata og historikk — slik at teamet slipper gjentakende manuelt grunnarbeid og får raskere, mer sammenlignbart overblikk før viktige avklaringer.",
    status: "Dialog",
    vis_paa_nettside: true,
    opprettet: "2026-04-10",
    image: "/marquee-ill-1.jpg",
  },
  {
    id: "static-2",
    tittel: "AI-automatisering av interne prosesser",
    kunde: "Entreprenørselskap, byggebransjen",
    beskrivelse: "Kartlegger og automatiserer tidstyver i tilbuds-, rapport- og kommunikasjonsprosesser ved hjelp av AI-agenter — med mål om 30 % tidsbesparelse på administrative oppgaver.",
    status: "Aktiv",
    vis_paa_nettside: true,
    opprettet: "2026-04-15",
    image: "/marquee-ill-4.jpg",
  },
  {
    id: "static-3",
    tittel: "AI-strategi og implementeringsplan",
    kunde: "Industriselskap, Vestfold",
    beskrivelse: "Dialog og strategiarbeid rundt AI-innføring — fra modenhetsvurdering og prioritering av use cases til konkret veikart for implementering i produksjon og logistikk.",
    status: "Dialog",
    vis_paa_nettside: true,
    opprettet: "2026-04-20",
    image: "/marquee-ill-2.jpg",
  },
  {
    id: "static-4",
    tittel: "Innlegg om AI: hva er det og hvordan hjelper det bedrifter i dag?",
    kunde: "Selskap, Vestfold",
    beskrivelse: "Vi er i dialog om å holde et innlegg for selskapets ansatte — en tilgjengelig og praktisk gjennomgang av hva AI faktisk er, hva som har endret seg de siste to årene, og hvilke muligheter det åpner for bedriften.",
    status: "Aktiv",
    vis_paa_nettside: true,
    opprettet: "2026-05-01",
    image: "/marquee-ill-3.jpg",
  },
  {
    id: "static-5",
    tittel: "Effektiviseringsarbeid i spedisjon og logistikk",
    kunde: "Spedisjonsfirma, Oslo",
    beskrivelse:
      "Vi er i dialog om et effektiviseringsløp — kartlegging av manuelle prosesser, kundedialog og intern flyt, med mål om konkrete tidsbesparelser uten å endre det som allerede fungerer.",
    status: "Dialog",
    vis_paa_nettside: true,
    opprettet: "2026-06-10",
    image: "/marquee-1.jpg",
  },
  {
    id: "static-6",
    tittel: "Innboks, tilbud og kundedialog i bygg og anlegg",
    kunde: "Bygg- og anleggsfirma, Tønsberg",
    beskrivelse:
      "Dialog om inbox management og effektivisering av tilbudsarbeid og kundedialog — mindre manuell triaging i postkassen, raskere oppfølging og tydeligere sporbarhet fra henvendelse til leveranse.",
    status: "Dialog",
    vis_paa_nettside: true,
    opprettet: "2026-06-12",
    image: "/marquee-2.jpg",
  },
];

const STATUS_STYLE: Record<string, { bg: string; color: string; dot: string }> = {
  Aktiv:   { bg: "rgba(21,128,61,0.18)",  color: "#4ade80", dot: "#22c55e" },
  Dialog:  { bg: "rgba(245,158,11,0.15)", color: "#fbbf24", dot: "#f59e0b" },
  Ferdig:  { bg: "rgba(138,173,148,0.15)", color: "#8aad94", dot: "#8aad94" },
};

/** Lavere tall = tidligere i listen. Aktiv først, deretter Dialog, deretter øvrige. */
const STATUS_SORT_RANK: Record<string, number> = {
  Aktiv: 0,
  Dialog: 1,
};

function sortAktiveProjects(a: ProjectRow, b: ProjectRow): number {
  const ra = STATUS_SORT_RANK[a.status ?? ""] ?? 50;
  const rb = STATUS_SORT_RANK[b.status ?? ""] ?? 50;
  if (ra !== rb) return ra - rb;
  const ta = a.opprettet ? new Date(a.opprettet).getTime() : 0;
  const tb = b.opprettet ? new Date(b.opprettet).getTime() : 0;
  return tb - ta;
}

const BRANSJE_ICONS: Record<string, string> = {
  "byggebransjen": "🏗",
  "bygg- og anlegg": "🏗",
  "eiendom":       "🏢",
  "industri":      "⚙️",
  "logistikk":     "🚛",
  "spedisjon":     "🚛",
  "finans":        "📊",
};

function getBransjeIcon(kunde: string): string {
  const k = kunde.toLowerCase();
  for (const [key, icon] of Object.entries(BRANSJE_ICONS)) {
    if (k.includes(key)) return icon;
  }
  return "🤝";
}

export default function PagaendeProsjekterListe() {
  const [projects, setProjects] = useState<ProjectRow[]>(STATIC_PROJECTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!url || !anon) {
        setLoading(false);
        return;
      }

      const supabase = createBrowserClient(url, anon);
      const { data, error } = await supabase
        .from("prosjekter")
        .select("id,tittel,kunde,beskrivelse,status,vis_paa_nettside,opprettet")
        .eq("vis_paa_nettside", true)
        .order("opprettet", { ascending: false })
        .limit(20);

      if (!error && data && data.length > 0) {
        const remote = data as ProjectRow[];
        const remoteIds = new Set(remote.map((p) => p.id));
        setProjects([
          ...remote,
          ...STATIC_PROJECTS.filter((p) => !remoteIds.has(p.id)),
        ]);
      }
      setLoading(false);
    };

    void fetchProjects();
  }, []);

  const aktive = projects
    .filter((p) => p.status !== "Ferdig")
    .sort(sortAktiveProjects);
  const ferdige = projects.filter((p) => p.status === "Ferdig");

  return (
    <section
      id="prosjekter-liste"
      className="py-24 px-6 min-h-screen"
      style={{ background: "#8AAD94" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionKicker>Hva skjer nå</SectionKicker>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: "#0a2e1a" }}>
            Pågående prosjekter og dialoger
          </h1>
          <p className="mt-4 text-base max-w-2xl mx-auto" style={{ color: "rgba(10,46,26,0.65)" }}>
            Hva skjer når selskaper tar AI på alvor? Vi guider norske bedrifter gjennom hele reisen – fra full forvirring til full utnyttelse.
          </p>
          <p className="mt-2 text-sm max-w-2xl mx-auto" style={{ color: "rgba(10,46,26,0.45)" }}>
            Anonymiserte case-studier og pågående AI-implementeringer. Vi deler det vi kan — uten å røpe hvem kundene er.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 rounded-full border-2 border-[rgba(10,46,26,0.2)] border-t-[rgba(10,46,26,0.7)] animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col gap-10">

            {/* Pågående */}
            {aktive.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
                  <h3 className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: "rgba(10,46,26,0.55)" }}>
                    Pågående samarbeid og dialoger
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {aktive.map((p) => {
                    const style = STATUS_STYLE[p.status ?? ""] ?? STATUS_STYLE["Dialog"];
                    return (
                      <div
                        key={p.id}
                        className="group rounded-2xl overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-xl flex flex-col"
                        style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(10,46,26,0.12)" }}
                      >
                        {/* Image */}
                        {p.image && (
                          <div className="relative w-full flex-shrink-0" style={{ height: "180px" }}>
                            <Image src={p.image} alt={p.tittel} fill className="object-cover" />
                            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(10,46,26,0.9) 100%)" }} />
                            {p.status && (
                              <span
                                className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
                                style={{ background: style.bg, color: style.color, backdropFilter: "blur(8px)", border: `1px solid ${style.dot}44` }}
                              >
                                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: style.dot }} />
                                {p.status}
                              </span>
                            )}
                          </div>
                        )}
                        {/* Content */}
                        <div className="p-5 flex flex-col gap-2 flex-1">
                          <h4 className="font-extrabold text-sm leading-snug" style={{ color: "#0a2e1a" }}>{p.tittel}</h4>
                          {p.kunde && (
                            <p className="text-xs font-semibold" style={{ color: "#14532d" }}>{p.kunde}</p>
                          )}
                          {p.beskrivelse && (
                            <p className="text-xs leading-relaxed mt-1" style={{ color: "rgba(10,46,26,0.6)" }}>{p.beskrivelse}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Fullførte */}
            {ferdige.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#8aad94" }} />
                  <h3 className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: "rgba(10,46,26,0.55)" }}>
                    Fullførte prosjekter
                  </h3>
                </div>
                <div className="flex flex-col gap-3">
                  {ferdige.map((p) => (
                    <div
                      key={p.id}
                      className="rounded-2xl p-6"
                      style={{ background: "rgba(255,255,255,0.35)", border: "1px solid rgba(10,46,26,0.1)", opacity: 0.75 }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-2xl flex-shrink-0">{getBransjeIcon(p.kunde ?? "")}</span>
                          <div>
                            <h4 className="font-extrabold text-base leading-snug" style={{ color: "rgba(10,46,26,0.8)" }}>{p.tittel}</h4>
                            {p.kunde && <p className="text-sm mt-0.5" style={{ color: "rgba(10,46,26,0.5)" }}>{p.kunde}</p>}
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap flex-shrink-0" style={{ background: "rgba(10,46,26,0.1)", color: "#14532d" }}>
                          Ferdig
                        </span>
                      </div>
                      {p.beskrivelse && (
                        <p className="text-sm leading-relaxed mt-3 pl-11" style={{ color: "rgba(10,46,26,0.5)" }}>
                          {p.beskrivelse}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="rounded-2xl px-6 py-5 flex items-start gap-4" style={{ background: "rgba(10,46,26,0.1)", border: "1px solid rgba(10,46,26,0.18)" }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#14532d" strokeWidth={2} className="flex-shrink-0 mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(10,46,26,0.65)" }}>
                Av hensyn til kundenes konfidensialitet er alle prosjekter anonymisert. Navn, bransjedetaljer og spesifikk teknologi kan være generalisert. Ta kontakt for referanser.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

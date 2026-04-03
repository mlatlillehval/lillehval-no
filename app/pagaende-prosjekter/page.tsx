 "use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

type ProjectRow = {
  id: string;
  tittel: string;
  kunde: string | null;
  beskrivelse: string | null;
  status: string | null;
  vis_paa_nettside: boolean | null;
  opprettet: string | null;
};

export default function PagaendeProsjekter() {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!url || !anon) {
        setError(
          "Supabase-miljøvariabler mangler (NEXT_PUBLIC_SUPABASE_URL/ANON_KEY)."
        );
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

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setProjects((data ?? []) as ProjectRow[]);
      setLoading(false);
    };

    void fetchProjects();
  }, []);

  return (
    <section
      id="pagaende-prosjekter"
      className="py-24 px-6 min-h-screen"
      style={{ background: "#0a2e1a" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="inline-block mb-3 text-sm font-semibold uppercase tracking-widest"
            style={{ color: "#4ade80" }}
          >
            Hva skjer nå
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Pågående prosjekter
          </h2>
          <p
            className="mt-4 text-lg max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Her vil du snart se hva Lillehval jobber med akkurat nå — anonymiserte case-studier og pågående AI-implementeringer.
          </p>
        </div>

        {loading ? (
          <p className="text-white/70 text-sm text-center">Laster prosjekter…</p>
        ) : projects.length === 0 ? (
          <div
            className="rounded-2xl p-10 text-center"
            style={{
              background: "rgba(74,222,128,0.05)",
              border: "1px solid rgba(74,222,128,0.2)",
            }}
          >
            <p className="text-white font-semibold text-lg">Ingen prosjekter</p>
            <p
              className="mt-2 text-sm"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Ingen prosjekter er satt som synlige akkurat nå.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(74,222,128,0.05)",
                  border: "1px solid rgba(74,222,128,0.2)",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-white font-extrabold text-lg truncate">
                      {p.tittel}
                    </h3>
                    {p.kunde && (
                      <p className="text-sm text-white/70 mt-1 truncate">
                        {p.kunde}
                      </p>
                    )}
                  </div>
                  {p.status && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-white/80 border border-white/10 whitespace-nowrap">
                      {p.status}
                    </span>
                  )}
                </div>
                {p.beskrivelse && (
                  <p className="text-sm text-white/70 mt-3 whitespace-pre-wrap">
                    {p.beskrivelse}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

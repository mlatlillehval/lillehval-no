"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

type LeadRow = {
  id: string;
  navn: string | null;
  bedrift: string | null;
  epost: string;
  total_score: number;
  score_kategori: string | null;
  opprettet: string | null;
};

export default function AdminPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (!url || !anon) {
          setError("Supabase-miljøvariabler mangler (NEXT_PUBLIC_SUPABASE_URL/ANON_KEY).");
          setLoading(false);
          return;
        }

        // Vi bruker `ai_beredskap`-tabellen slik den finnes i prosjektet.
        // Hvis du heller har laget en view/tabell som heter `ai_readiness_leads`,
        // bytt tabellnavn og feltmapping her.
        const supabase = createBrowserClient(url, anon);
        const { data, error } = await supabase
          .from("ai_beredskap")
          .select("id,navn,bedrift,epost,total_score,score_kategori,opprettet")
          .order("opprettet", { ascending: false });

        if (error) {
          setError(error.message);
          setLoading(false);
          return;
        }

        setLeads((data ?? []) as LeadRow[]);
        setLoading(false);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Kunne ikke hente leads.");
        setLoading(false);
      }
    };

    void fetchLeads();
  }, []);

  const handleLogout = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!url || !anon) {
        router.push("/login");
        return;
      }

      const supabase = createBrowserClient(url, anon);
      await supabase.auth.signOut();
    } finally {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Lillehval Admin</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-red-500 transition"
          >
            Logg ut
          </button>
        </div>

        {error && (
          <p className="mb-4 text-sm font-medium text-red-600" role="alert">
            {error}
          </p>
        )}

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-700">
              Leads – AI Beredskap
            </h2>
          </div>

          {loading ? (
            <p className="p-6 text-gray-400 text-sm">Laster...</p>
          ) : leads.length === 0 ? (
            <p className="p-6 text-gray-400 text-sm">
              Ingen leads ennå.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 text-left">Navn</th>
                  <th className="px-6 py-3 text-left">Selskap</th>
                  <th className="px-6 py-3 text-left">E-post</th>
                  <th className="px-6 py-3 text-left">Score</th>
                  <th className="px-6 py-3 text-left">Dato</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{lead.navn || "–"}</td>
                    <td className="px-6 py-4">{lead.bedrift || "–"}</td>
                    <td className="px-6 py-4">{lead.epost || "–"}</td>
                    <td className="px-6 py-4 font-medium">
                      {Number.isFinite(lead.total_score) ? lead.total_score : "–"}
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {lead.opprettet
                        ? new Date(lead.opprettet).toLocaleDateString("nb-NO")
                        : "–"}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                        {lead.score_kategori || "Ny"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}


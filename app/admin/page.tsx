"use client";

import { useEffect, useMemo, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

type Tab = "ai" | "bookings" | "projects";

type LeadRow = {
  id: string;
  navn: string | null;
  bedrift: string | null;
  epost: string;
  total_score: number;
  score_kategori: string | null;
  opprettet: string | null;
};

type BookingRow = {
  id: string;
  navn: string;
  epost: string;
  bedrift: string | null;
  telefon: string | null;
  melding: string | null;
  opprettet: string | null;
};

type ProjectRow = {
  id: string;
  tittel: string;
  kunde: string | null;
  beskrivelse: string | null;
  status: string | null;
  vis_paa_nettside: boolean | null;
  opprettet: string | null;
};

function getSupabaseOrNull() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  return createBrowserClient(url, anon);
}

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("ai");

  const [aiLeads, setAiLeads] = useState<LeadRow[]>([]);
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [projects, setProjects] = useState<ProjectRow[]>([]);

  const [globalError, setGlobalError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Booking editor
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const selectedBooking = useMemo(
    () => bookings.find((b) => b.id === selectedBookingId) ?? null,
    [bookings, selectedBookingId]
  );
  const [bookingMeldingDraft, setBookingMeldingDraft] = useState<string>("");
  const [savingBooking, setSavingBooking] = useState(false);

  // Project editor
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const selectedProject = useMemo(
    () => projects.find((p) => p.id === selectedProjectId) ?? null,
    [projects, selectedProjectId]
  );
  const [projectDraft, setProjectDraft] = useState<{
    tittel: string;
    kunde: string;
    beskrivelse: string;
    status: string;
    vis_paa_nettside: boolean;
  }>({
    tittel: "",
    kunde: "",
    beskrivelse: "",
    status: "",
    vis_paa_nettside: true,
  });
  const [savingProject, setSavingProject] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      const sb = getSupabaseOrNull();
      if (!sb) {
        setGlobalError(
          "Supabase-miljøvariabler mangler (NEXT_PUBLIC_SUPABASE_URL/ANON_KEY)."
        );
        setLoading(false);
        return;
      }

      setGlobalError(null);
      setLoading(true);

      try {
        const [
          { data: aiData, error: aiError },
          { data: bookingData, error: bookingError },
          { data: projectData, error: projectError },
        ] = await Promise.all([
          sb
            .from("ai_beredskap")
            .select(
              "id,navn,bedrift,epost,total_score,score_kategori,opprettet"
            )
            .order("opprettet", { ascending: false }),
          sb
            .from("moetebookinger")
            .select(
              "id,navn,epost,bedrift,telefon,melding,opprettet"
            )
            .order("opprettet", { ascending: false })
            .limit(100),
          sb
            .from("prosjekter")
            .select(
              "id,tittel,kunde,beskrivelse,status,vis_paa_nettside,opprettet"
            )
            .order("opprettet", { ascending: false })
            .limit(100),
        ]);

        if (aiError) throw aiError;
        if (bookingError) throw bookingError;
        if (projectError) throw projectError;

        setAiLeads((aiData ?? []) as LeadRow[]);
        setBookings((bookingData ?? []) as BookingRow[]);
        setProjects((projectData ?? []) as ProjectRow[]);

        setSelectedBookingId((prev) => prev ?? (bookingData?.[0]?.id ?? null));
        setSelectedProjectId((prev) => prev ?? (projectData?.[0]?.id ?? null));
      } catch (e) {
        setGlobalError(e instanceof Error ? e.message : "Kunne ikke hente data.");
      } finally {
        setLoading(false);
      }
    };

    void fetchAll();
  }, []);

  useEffect(() => {
    if (!selectedBooking) return;
    setBookingMeldingDraft(selectedBooking.melding ?? "");
  }, [selectedBooking]);

  useEffect(() => {
    if (!selectedProject) return;
    setProjectDraft({
      tittel: selectedProject.tittel ?? "",
      kunde: selectedProject.kunde ?? "",
      beskrivelse: selectedProject.beskrivelse ?? "",
      status: selectedProject.status ?? "",
      vis_paa_nettside: selectedProject.vis_paa_nettside ?? false,
    });
  }, [selectedProject]);

  const refreshBookings = async () => {
    const sb = getSupabaseOrNull();
    if (!sb) return;
    const { data, error } = await sb
      .from("moetebookinger")
      .select("id,navn,epost,bedrift,telefon,melding,opprettet")
      .order("opprettet", { ascending: false })
      .limit(100);
    if (!error) setBookings((data ?? []) as BookingRow[]);
  };

  const refreshProjects = async () => {
    const sb = getSupabaseOrNull();
    if (!sb) return;
    const { data, error } = await sb
      .from("prosjekter")
      .select("id,tittel,kunde,beskrivelse,status,vis_paa_nettside,opprettet")
      .order("opprettet", { ascending: false })
      .limit(100);
    if (!error) setProjects((data ?? []) as ProjectRow[]);
  };

  const handleLogout = async () => {
    try {
      const sb = getSupabaseOrNull();
      await sb?.auth.signOut();
    } finally {
      router.push("/login");
    }
  };

  const updateBookingMelding = async () => {
    if (!selectedBooking) return;
    const sb = getSupabaseOrNull();
    if (!sb) return;
    setSavingBooking(true);
    setGlobalError(null);
    try {
      const melding = bookingMeldingDraft.trim() || null;
      const { error } = await sb
        .from("moetebookinger")
        .update({ melding })
        .eq("id", selectedBooking.id);
      if (error) throw error;
      await refreshBookings();
    } catch (e) {
      setGlobalError(e instanceof Error ? e.message : "Kunne ikke lagre melding.");
    } finally {
      setSavingBooking(false);
    }
  };

  const updateSelectedProject = async () => {
    if (!selectedProject) return;
    const sb = getSupabaseOrNull();
    if (!sb) return;
    setSavingProject(true);
    setGlobalError(null);
    try {
      const { error } = await sb.from("prosjekter").update({
        tittel: projectDraft.tittel.trim(),
        kunde: projectDraft.kunde.trim() || null,
        beskrivelse: projectDraft.beskrivelse.trim() || null,
        status: projectDraft.status.trim() || null,
        vis_paa_nettside: projectDraft.vis_paa_nettside,
      }).eq("id", selectedProject.id);
      if (error) throw error;
      await refreshProjects();
    } catch (e) {
      setGlobalError(e instanceof Error ? e.message : "Kunne ikke lagre prosjekt.");
    } finally {
      setSavingProject(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Lillehval Admin</h1>
            <p className="text-sm text-gray-500 mt-1">
              Oversikt, oppfølging og enkel redigering.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-red-500 transition"
            >
              Logg ut
            </button>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-semibold border ${
              tab === "ai"
                ? "bg-blue-50 border-blue-200 text-blue-700"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setTab("ai")}
            type="button"
          >
            AI-leads
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-semibold border ${
              tab === "bookings"
                ? "bg-blue-50 border-blue-200 text-blue-700"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setTab("bookings")}
            type="button"
          >
            Møtebookinger
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-semibold border ${
              tab === "projects"
                ? "bg-blue-50 border-blue-200 text-blue-700"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setTab("projects")}
            type="button"
          >
            Tekst på nettsiden
          </button>
        </div>

        {globalError && (
          <p className="mb-4 text-sm font-medium text-red-600" role="alert">
            {globalError}
          </p>
        )}

        {loading ? (
          <div className="bg-white rounded-xl shadow-md p-6 text-sm text-gray-500">
            Laster...
          </div>
        ) : tab === "ai" ? (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-700">Leads – AI Beredskap</h2>
            </div>
            {aiLeads.length === 0 ? (
              <p className="p-6 text-gray-400 text-sm">Ingen leads ennå.</p>
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
                  {aiLeads.map((lead) => (
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
        ) : tab === "bookings" ? (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-700">Møtebookinger</h2>
              <p className="text-xs text-gray-500 mt-1">
                Klikk en booking for å endre teksten (`melding`).
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="border-r border-gray-100">
                <div className="p-4">
                  {bookings.length === 0 ? (
                    <p className="text-sm text-gray-400">Ingen bookinger ennå.</p>
                  ) : (
                    <div className="space-y-3">
                      {bookings.map((b) => {
                        const isSelected = b.id === selectedBookingId;
                        return (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => setSelectedBookingId(b.id)}
                            className={`w-full text-left p-3 rounded-xl border transition ${
                              isSelected
                                ? "border-blue-200 bg-blue-50"
                                : "border-gray-100 bg-white hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex justify-between gap-3">
                              <div className="min-w-0">
                                <div className="font-semibold text-gray-900 truncate">
                                  {b.navn}
                                </div>
                                <div className="text-sm text-gray-500 truncate">
                                  {b.bedrift || "–"} · {b.epost}
                                </div>
                              </div>
                              <div className="text-xs text-gray-400 whitespace-nowrap">
                                {b.opprettet
                                  ? new Date(b.opprettet).toLocaleDateString("nb-NO")
                                  : "–"}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4">
                {!selectedBooking ? (
                  <p className="text-sm text-gray-500">
                    Velg en booking i listen til venstre.
                  </p>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-semibold text-gray-800">
                        {selectedBooking.navn} · {selectedBooking.bedrift || "–"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {selectedBooking.epost}
                        {selectedBooking.telefon ? ` · ${selectedBooking.telefon}` : ""}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Melding (vises/lagres slik: ønsket tidspunkt øverst)
                      </label>
                      <textarea
                        value={bookingMeldingDraft}
                        onChange={(e) => setBookingMeldingDraft(e.target.value)}
                        rows={10}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => void updateBookingMelding()}
                        disabled={savingBooking}
                        className="px-4 py-2 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 transition"
                      >
                        {savingBooking ? "Lagrer..." : "Lagre melding"}
                      </button>
                      <button
                        type="button"
                        disabled={savingBooking}
                        onClick={() =>
                          setBookingMeldingDraft(selectedBooking.melding ?? "")
                        }
                        className="px-4 py-2 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 disabled:opacity-60 transition"
                      >
                        Avbryt
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-700">
                Tekst på nettsiden (prosjekter)
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Dette styrer seksjonen `Pågående prosjekter`.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="border-r border-gray-100">
                <div className="p-4">
                  <div className="text-sm font-semibold text-gray-800 mb-3">
                    Velg prosjekt
                  </div>
                  {projects.length === 0 ? (
                    <p className="text-sm text-gray-400">Ingen prosjekter.</p>
                  ) : (
                    <div className="space-y-2">
                      {projects.map((p) => {
                        const isSelected = p.id === selectedProjectId;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setSelectedProjectId(p.id)}
                            className={`w-full text-left p-3 rounded-xl border transition ${
                              isSelected
                                ? "border-blue-200 bg-blue-50"
                                : "border-gray-100 bg-white hover:bg-gray-50"
                            }`}
                          >
                            <div className="font-semibold text-gray-900 truncate">
                              {p.tittel}
                            </div>
                            <div className="text-xs text-gray-500 truncate">
                              {p.kunde || "–"} · {p.status || "–"}
                            </div>
                            <div className="text-[11px] text-gray-400 mt-1">
                              Synlig: {p.vis_paa_nettside ? "Ja" : "Nei"}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4">
                {!selectedProject ? (
                  <p className="text-sm text-gray-500">
                    Velg et prosjekt for å redigere tekst.
                  </p>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Synlig på nettsiden
                      </label>
                      <label className="flex items-center gap-2 text-sm text-gray-800">
                        <input
                          type="checkbox"
                          checked={projectDraft.vis_paa_nettside}
                          onChange={(e) =>
                            setProjectDraft((d) => ({
                              ...d,
                              vis_paa_nettside: e.target.checked,
                            }))
                          }
                        />
                        {projectDraft.vis_paa_nettside ? "Ja" : "Nei"}
                      </label>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Tittel *
                      </label>
                      <input
                        value={projectDraft.tittel}
                        onChange={(e) =>
                          setProjectDraft((d) => ({
                            ...d,
                            tittel: e.target.value,
                          }))
                        }
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Kunde
                      </label>
                      <input
                        value={projectDraft.kunde}
                        onChange={(e) =>
                          setProjectDraft((d) => ({
                            ...d,
                            kunde: e.target.value,
                          }))
                        }
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Status
                      </label>
                      <input
                        value={projectDraft.status}
                        onChange={(e) =>
                          setProjectDraft((d) => ({
                            ...d,
                            status: e.target.value,
                          }))
                        }
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Beskrivelse (tekst på nettsiden)
                      </label>
                      <textarea
                        value={projectDraft.beskrivelse}
                        onChange={(e) =>
                          setProjectDraft((d) => ({
                            ...d,
                            beskrivelse: e.target.value,
                          }))
                        }
                        rows={8}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => void updateSelectedProject()}
                        disabled={savingProject}
                        className="px-4 py-2 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 transition"
                      >
                        {savingProject ? "Lagrer..." : "Lagre prosjekt"}
                      </button>
                      <button
                        type="button"
                        disabled={savingProject}
                        onClick={() => {
                          if (!selectedProject) return;
                          setProjectDraft({
                            tittel: selectedProject.tittel ?? "",
                            kunde: selectedProject.kunde ?? "",
                            beskrivelse: selectedProject.beskrivelse ?? "",
                            status: selectedProject.status ?? "",
                            vis_paa_nettside:
                              selectedProject.vis_paa_nettside ?? false,
                          });
                        }}
                        className="px-4 py-2 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 disabled:opacity-60 transition"
                      >
                        Avbryt
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


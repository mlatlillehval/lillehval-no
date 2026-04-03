"use client";

import { useEffect, useState } from "react";
import {
  FRONT_PAGE_DEFAULTS,
  FRONT_PAGE_KEYS,
  type FrontpageCopy,
} from "@/app/data/frontpageCopy";

function labelForKey(key: keyof FrontpageCopy) {
  switch (key) {
    case "hero_badge_text":
      return "Hero: badge tekst";
    case "hero_headline_top":
      return "Hero: overskrift (linje 1)";
    case "hero_headline_highlight":
      return "Hero: overskrift (uthevet)";
    case "hero_headline_bottom":
      return "Hero: overskrift (linje 3)";
    case "hero_subheadline":
      return "Hero: undertekst";
    case "hero_cta_text":
      return "Hero: CTA-knapp tekst";
    case "hero_trust_line":
      return "Hero: trust line";
    case "salespitch_kicker":
      return "SalesPitch: kicker";
    case "salespitch_title_line1":
      return "SalesPitch: tittel linje 1";
    case "salespitch_title_line2":
      return "SalesPitch: tittel linje 2";
    default:
      return key;
  }
}

export default function FrontpageTextEditor() {
  const [copy, setCopy] = useState<FrontpageCopy>(FRONT_PAGE_DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/frontpage-content");
        const json = (await res.json()) as Partial<FrontpageCopy>;
        setCopy({ ...FRONT_PAGE_DEFAULTS, ...(json as any) });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Kunne ikke laste innhold.");
      } finally {
        setLoading(false);
      }
    };
    void run();
  }, []);

  const onSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/frontpage-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(copy),
      });

      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        throw new Error(json.error ?? "Kunne ikke lagre.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Kunne ikke lagre.");
      return;
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-700">Tekst på forsiden</h2>
        <p className="text-xs text-gray-500 mt-1">
          Rediger hovedteksten i hero og overskriften i sales pitch.
        </p>
      </div>

      <div className="p-4">
        {loading ? (
          <p className="text-sm text-gray-500">Laster innhold…</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
              <h3 className="text-sm font-bold text-gray-800 mb-3">Hero</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    {labelForKey("hero_badge_text")}
                  </label>
                  <input
                    value={copy.hero_badge_text}
                    onChange={(e) =>
                      setCopy((d) => ({ ...d, hero_badge_text: e.target.value }))
                    }
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      {labelForKey("hero_headline_top")}
                    </label>
                    <input
                      value={copy.hero_headline_top}
                      onChange={(e) =>
                        setCopy((d) => ({
                          ...d,
                          hero_headline_top: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      {labelForKey("hero_headline_highlight")}
                    </label>
                    <input
                      value={copy.hero_headline_highlight}
                      onChange={(e) =>
                        setCopy((d) => ({
                          ...d,
                          hero_headline_highlight: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      {labelForKey("hero_headline_bottom")}
                    </label>
                    <input
                      value={copy.hero_headline_bottom}
                      onChange={(e) =>
                        setCopy((d) => ({
                          ...d,
                          hero_headline_bottom: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    {labelForKey("hero_subheadline")}
                  </label>
                  <textarea
                    value={copy.hero_subheadline}
                    onChange={(e) =>
                      setCopy((d) => ({ ...d, hero_subheadline: e.target.value }))
                    }
                    rows={4}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      {labelForKey("hero_cta_text")}
                    </label>
                    <input
                      value={copy.hero_cta_text}
                      onChange={(e) =>
                        setCopy((d) => ({ ...d, hero_cta_text: e.target.value }))
                      }
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      {labelForKey("hero_trust_line")}
                    </label>
                    <input
                      value={copy.hero_trust_line}
                      onChange={(e) =>
                        setCopy((d) => ({
                          ...d,
                          hero_trust_line: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
              <h3 className="text-sm font-bold text-gray-800 mb-3">
                Sales Pitch
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    {labelForKey("salespitch_kicker")}
                  </label>
                  <input
                    value={copy.salespitch_kicker}
                    onChange={(e) =>
                      setCopy((d) => ({
                        ...d,
                        salespitch_kicker: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    {labelForKey("salespitch_title_line1")}
                  </label>
                  <input
                    value={copy.salespitch_title_line1}
                    onChange={(e) =>
                      setCopy((d) => ({
                        ...d,
                        salespitch_title_line1: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    {labelForKey("salespitch_title_line2")}
                  </label>
                  <input
                    value={copy.salespitch_title_line2}
                    onChange={(e) =>
                      setCopy((d) => ({
                        ...d,
                        salespitch_title_line2: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {error && (
              <p className="text-sm font-medium text-red-600" role="alert">
                {error}
              </p>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={() => void onSave()}
                disabled={saving}
                className="px-4 py-2 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 transition"
              >
                {saving ? "Lagrer..." : "Lagre endringer"}
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => setCopy(FRONT_PAGE_DEFAULTS)}
                className="px-4 py-2 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-60 transition"
              >
                Reset til standard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


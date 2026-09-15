export type FrontpageCopy = {
  hero_badge_text: string;
  hero_headline_green_lead: string;
  hero_headline_top: string;
  hero_headline_highlight: string;
  hero_headline_mid: string;
  hero_headline_bottom: string;
  hero_subheadline: string;
  hero_cta_text: string;
  hero_trust_line: string;
  salespitch_kicker: string;
  salespitch_title_line1: string;
  salespitch_title_line2: string;
};

export const FRONT_PAGE_DEFAULTS: FrontpageCopy = {
  hero_badge_text: "AI-rådgivning for norske bedrifter",
  hero_headline_green_lead: "Vi",
  hero_headline_top: "gjør",
  hero_headline_highlight: "AI-reisen konkret",
  hero_headline_mid: "og gjennomførbar for norske bedrifter",
  hero_headline_bottom: "",
  hero_subheadline:
    "Dere har skjønt at AI angår dere. Vi kartlegger, bygger og blir med i drift — uten at dere gir fra dere kontrollen.",
  hero_cta_text: "Book et møte",
  hero_trust_line: "Ingen forpliktelser. Helt gratis.",

  salespitch_kicker: "Slik vi jobber",
  salespitch_title_line1: "Fra kartlegging til drift",
  salespitch_title_line2: "Dere eier arbeidet. Vi gjennomfører.",
};

/** Slår sikkert sammen API/JSON med defaults (unngår `any` i klienter). */
export function mergeFrontpageDefaultsFromApi(json: unknown): FrontpageCopy {
  if (json === null || typeof json !== "object") {
    return FRONT_PAGE_DEFAULTS;
  }
  const src = json as Partial<Record<keyof FrontpageCopy, unknown>>;
  const merged: FrontpageCopy = { ...FRONT_PAGE_DEFAULTS };
  for (const key of FRONT_PAGE_KEYS) {
    const val = src[key];
    if (typeof val === "string") {
      merged[key] = val;
    }
  }
  if (/\b30\s*min/i.test(merged.hero_cta_text)) {
    merged.hero_cta_text = FRONT_PAGE_DEFAULTS.hero_cta_text;
  }
  return merged;
}

export const FRONT_PAGE_KEYS: (keyof FrontpageCopy)[] = [
  "hero_badge_text",
  "hero_headline_green_lead",
  "hero_headline_top",
  "hero_headline_highlight",
  "hero_headline_mid",
  "hero_headline_bottom",
  "hero_subheadline",
  "hero_cta_text",
  "hero_trust_line",
  "salespitch_kicker",
  "salespitch_title_line1",
  "salespitch_title_line2",
];

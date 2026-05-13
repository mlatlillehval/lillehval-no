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
  hero_headline_green_lead: "AI",
  hero_headline_top: "er en",
  hero_headline_highlight: "mulighet og potensial",
  hero_headline_mid: "mange bedrifter ikke kjenner til",
  hero_headline_bottom: "",
  hero_subheadline:
    "Mange bedrifter ser at AI kan gjøre en forskjell — men vet ikke hvor de skal starte. Mulighetene er reelle, men landskapet er uoversiktlig og tidkrevende å navigere alene. Lillehval er guiden som gjør reisen konkret og gjennomførbar.",
  hero_cta_text: "Book et 30 min møte med oss for å vite mer.",
  hero_trust_line: "Ingen forpliktelser. Helt gratis.",

  salespitch_kicker: "Hvorfor nå",
  salespitch_title_line1: "Ikke bare enklere.",
  salespitch_title_line2: "Vi gjør AI til din fordel.",
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

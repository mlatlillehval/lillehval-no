export type FrontpageCopy = {
  hero_badge_text: string;
  hero_headline_top: string;
  hero_headline_highlight: string;
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
  hero_headline_top: "AI-teknologien er i endring",
  hero_headline_highlight: "og verktøykassene",
  hero_headline_bottom: "endrer seg.",
  hero_subheadline:
    "Nye muligheter for å spare tid og skape verdi.\nVi navigerer AI-landskapet\n— sammen med deg.",
  hero_cta_text: "Book gratis møte",
  hero_trust_line: "Ingen forpliktelser. 30 minutter. Helt gratis.",

  salespitch_kicker: "Hvorfor nå",
  salespitch_title_line1: "Ikke bare enklere.",
  salespitch_title_line2: "Vi gjør AI til din fordel.",
};

export const FRONT_PAGE_KEYS: (keyof FrontpageCopy)[] = [
  "hero_badge_text",
  "hero_headline_top",
  "hero_headline_highlight",
  "hero_headline_bottom",
  "hero_subheadline",
  "hero_cta_text",
  "hero_trust_line",
  "salespitch_kicker",
  "salespitch_title_line1",
  "salespitch_title_line2",
];


export const BRAND_COLORS = {
  primaryGreen: "#15803d",
  darkGreen: "#14532d",
  deepGreen: "#0a2e1a",
  amberStart: "#f59e0b",
  amberDark: "#d4840a",
  lightGreen: "#8aad94",
  mediumGreen: "#4a7a55",
  heroBeige: "#f2ede3",
  sectionBackground: "#edf4ea",
  textMain: "#1a3320",
} as const;

export type BrandSurface = "light" | "dark" | "transparent";
export type BrandLogoKind =
  | "wordmarkWithJourney"
  | "wordmarkJourneyInline"
  | "journeyOnly"
  | "whaleJourneyRight"
  | "whaleJourneyLeft";

const LOGO_BASE = "/logo-manual-v1.1";

const brandLogoMap: Record<BrandLogoKind, Record<BrandSurface, string>> = {
  wordmarkWithJourney: {
    light: `${LOGO_BASE}/Logo - Lillehval mørk + reise - lys bakgrunn.svg`,
    dark: `${LOGO_BASE}/Logo - Lillehval lys + reise - mørk bakgrunn .svg`,
    transparent: `${LOGO_BASE}/Logo - Lillehval mørk + reise - transparent.svg`,
  },
  wordmarkJourneyInline: {
    light: `${LOGO_BASE}/Logo - Lillehval mørk inkl reise lys - bakgrunn.svg`,
    dark: `${LOGO_BASE}/Logo - Lillehval lys inkl reise -  mørk bakgrunn.svg`,
    transparent: `${LOGO_BASE}/Logo - Lillehval mørk inkl reise - transparent.svg`,
  },
  journeyOnly: {
    light: `${LOGO_BASE}/Logo - Reise alene - lys bakgrunn.svg`,
    dark: `${LOGO_BASE}/Logo - Lillehval reise alene - mørk bakggrunn.svg`,
    transparent: `${LOGO_BASE}/Logo - Reise alene - transparent.svg`,
  },
  whaleJourneyRight: {
    light: `${LOGO_BASE}/Logo - Hval høyre + reise lys - bakgrunn.svg`,
    dark: `${LOGO_BASE}/Logo - Hval høyre + reise - mørk bakgrunn.svg`,
    transparent: `${LOGO_BASE}/Logo - Hval høyre +. reise - transparent.svg`,
  },
  whaleJourneyLeft: {
    light: `${LOGO_BASE}/Logo - Hval venstre + reise - lys bakgrunn.svg`,
    dark: `${LOGO_BASE}/Logo - Hval venstre  + reise - mørk bakgrunn.svg`,
    transparent: `${LOGO_BASE}/Logo - Hval venstre + reise - transparent.svg`,
  },
};

export function getBrandLogoSrc(kind: BrandLogoKind, surface: BrandSurface): string {
  return brandLogoMap[kind][surface];
}

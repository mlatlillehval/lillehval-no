import type { MetadataRoute } from "next";
import { AI_BLOG_POSTS } from "@/app/data/aiBlogPosts";
import { CASE_STUDIES } from "@/app/data/caseStudies";
import { tjenester } from "@/app/data/tjenester";
import { getSiteUrl } from "@/lib/site-url";

const STATIC_PATHS = [
  "/",
  "/hjelp-med-ai",
  "/kontakt",
  "/personvern",
  "/blogg",
  "/ai-beredskap",
  "/ai-forklart",
  "/ai-tjenester",
  "/hvorfor-oss",
  "/ofte-stilte-sporsmal",
  "/pagaende-prosjekter",
  "/siste-nyheter",
  "/siste-nyheter/talkshow",
  "/sommervikar",
] as const;

/** Sist vesentlig oppdatert per statisk side (ISO-dato). */
const STATIC_LAST_MODIFIED: Partial<Record<(typeof STATIC_PATHS)[number], string>> = {
  "/": "2026-06-12",
  "/hjelp-med-ai": "2026-06-12",
  "/kontakt": "2026-06-12",
  "/personvern": "2026-06-12",
  "/blogg": "2026-06-08",
  "/pagaende-prosjekter": "2026-06-12",
  "/siste-nyheter": "2026-06-12",
  "/hvorfor-oss": "2026-06-12",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const fallback = new Date("2026-06-01");

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: path === "/" ? `${base}/` : `${base}${path}`,
    lastModified: STATIC_LAST_MODIFIED[path] ? new Date(STATIC_LAST_MODIFIED[path]!) : fallback,
    changeFrequency: path === "/" ? "weekly" : "weekly",
    priority:
      path === "/"
        ? 1
        : path === "/hjelp-med-ai"
          ? 0.95
          : path === "/ofte-stilte-sporsmal"
            ? 0.8
            : path === "/blogg"
              ? 0.78
              : path === "/pagaende-prosjekter"
                ? 0.76
                : 0.75,
  }));

  const tjenesteEntries: MetadataRoute.Sitemap = tjenester.map((t) => ({
    url: `${base}/ai-tjenester/${t.slug}`,
    lastModified: fallback,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = AI_BLOG_POSTS.map((post) => ({
    url: `${base}/blogg/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "yearly",
    priority: 0.65,
  }));

  const caseEntries: MetadataRoute.Sitemap = CASE_STUDIES.filter((c) => c.vis_paa_nettside).map((c) => ({
    url: `${base}/case/${c.slug}`,
    lastModified: new Date(c.opprettet),
    changeFrequency: "monthly",
    priority: 0.68,
  }));

  return [...staticEntries, ...tjenesteEntries, ...blogEntries, ...caseEntries];
}

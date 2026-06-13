import type { MetadataRoute } from "next";
import { AI_BLOG_POSTS } from "@/app/data/aiBlogPosts";
import { tjenester } from "@/app/data/tjenester";
import { getSiteUrl } from "@/lib/site-url";

const STATIC_PATHS = [
  "/",
  "/hjelp-med-ai",
  "/kontakt",
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

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: path === "/" ? `${base}/` : `${base}${path}`,
    lastModified: now,
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
              : 0.75,
  }));

  const tjenesteEntries: MetadataRoute.Sitemap = tjenester.map((t) => ({
    url: `${base}/ai-tjenester/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = AI_BLOG_POSTS.map((post) => ({
    url: `${base}/blogg/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "yearly",
    priority: 0.65,
  }));

  return [...staticEntries, ...tjenesteEntries, ...blogEntries];
}

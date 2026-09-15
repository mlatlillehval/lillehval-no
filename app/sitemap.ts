import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/app/data/aiBlogPosts";
import { CASE_STUDIES } from "@/app/data/caseStudies";
import { tjenester } from "@/app/data/tjenester";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date("2026-09-15"), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/hjelp-med-ai`, lastModified: new Date("2026-09-15"), changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/ai-radgivning`, lastModified: new Date("2026-09-15"), changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/ai-implementering`, lastModified: new Date("2026-09-15"), changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/kontakt`, lastModified: new Date("2026-09-15"), changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/personvern`, lastModified: new Date("2026-06-12"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/blogg`, lastModified: new Date("2026-09-15"), changeFrequency: "weekly", priority: 0.78 },
    { url: `${base}/ai-beredskap`, lastModified: new Date("2026-09-01"), changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/ai-forklart`, lastModified: new Date("2026-06-01"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/ai-metodikk`, lastModified: new Date("2026-06-01"), changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/hvorfor-oss`, lastModified: new Date("2026-09-15"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/pagaende-prosjekter`, lastModified: new Date("2026-06-12"), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/siste-nyheter`, lastModified: new Date("2026-06-12"), changeFrequency: "daily", priority: 0.7 },
    { url: `${base}/siste-nyheter/talkshow`, lastModified: new Date("2026-06-12"), changeFrequency: "weekly", priority: 0.55 },
    { url: `${base}/ai-tjenester`, lastModified: new Date("2026-09-15"), changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/ofte-stilte-sporsmal`, lastModified: new Date("2026-09-15"), changeFrequency: "monthly", priority: 0.72 },
    { url: `${base}/kjop/takk`, lastModified: new Date("2026-06-12"), changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/kjop/avbrutt`, lastModified: new Date("2026-06-12"), changeFrequency: "yearly", priority: 0.1 },
    { url: `${base}/llms.txt`, lastModified: new Date("2026-09-15"), changeFrequency: "weekly", priority: 0.5 },
    { url: `${base}/llms-full.txt`, lastModified: new Date("2026-09-15"), changeFrequency: "weekly", priority: 0.4 },
  ];

  const blogPages: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${base}/blogg/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const casePages: MetadataRoute.Sitemap = CASE_STUDIES.map((c) => ({
    url: `${base}/case/${c.slug}`,
    lastModified: new Date(c.opprettet),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  const tjenestePages: MetadataRoute.Sitemap = tjenester.map((t) => ({
    url: `${base}/ai-tjenester/${t.slug}`,
    lastModified: new Date("2026-06-12"),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticPages, ...blogPages, ...casePages, ...tjenestePages];
}

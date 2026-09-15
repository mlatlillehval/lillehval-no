import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

const DISALLOW = ["/admin", "/login", "/api/"];

const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "anthropic-ai",
  "Google-Extended",
  "GoogleOther",
  "PerplexityBot",
  "Applebot-Extended",
  "cohere-ai",
  "YouBot",
  "Amazonbot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW,
      },
      {
        userAgent: AI_CRAWLERS,
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: DISALLOW,
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}

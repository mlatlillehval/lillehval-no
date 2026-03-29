import { unstable_cache } from "next/cache";
import Parser from "rss-parser";

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

const parser = new Parser({ timeout: 8000 });

const AI_KEYWORDS = [
  "ai", "kunstig intelligens", "maskinlæring", "chatgpt", "openai",
  "llm", "language model", "generativ", "generative", "copilot",
  "claude", "gemini", "midjourney", "automatisering", "deep learning",
  "neural", "robot", "agent", "artificial intelligence",
];

function isAIRelated(title: string, description?: string): boolean {
  const text = `${title} ${description ?? ""}`.toLowerCase();
  return AI_KEYWORDS.some((kw) => text.includes(kw));
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "Ukjent dato";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "Ukjent dato";
  return d.toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

async function fetchFeed(url: string, sourceName: string): Promise<NewsItem[]> {
  try {
    const feed = await parser.parseURL(url);
    return (feed.items ?? []).map((item) => ({
      title: item.title ?? "Uten tittel",
      link: item.link ?? "#",
      pubDate: formatDate(item.pubDate ?? item.isoDate),
      source: sourceName,
    }));
  } catch {
    return [];
  }
}

async function fetchNorwayNews(): Promise<NewsItem[]> {
  const sources = [
    { url: "https://www.kode24.no/rss", name: "Kode24" },
    { url: "https://www.digi.no/rss", name: "Digi.no" },
    { url: "https://shifter.no/feed/", name: "Shifter" },
    { url: "https://e24.no/rss2", name: "E24" },
    { url: "https://www.tu.no/rss", name: "Teknisk Ukeblad" },
  ];

  const results = await Promise.allSettled(
    sources.map((s) => fetchFeed(s.url, s.name))
  );

  const all: NewsItem[] = results.flatMap((r) =>
    r.status === "fulfilled" ? r.value : []
  );

  const aiFiltered = all.filter((item) => isAIRelated(item.title));

  // If we have fewer than 5 AI articles, fill up with remaining tech articles
  if (aiFiltered.length >= 5) return aiFiltered.slice(0, 5);

  const nonAI = all.filter((item) => !isAIRelated(item.title));
  return [...aiFiltered, ...nonAI].slice(0, 5);
}

async function fetchWorldNews(): Promise<NewsItem[]> {
  const sources = [
    {
      url: "https://techcrunch.com/category/artificial-intelligence/feed/",
      name: "TechCrunch",
    },
    {
      url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
      name: "The Verge",
    },
    {
      url: "https://feeds.arstechnica.com/arstechnica/technology-lab",
      name: "Ars Technica",
    },
  ];

  const results = await Promise.allSettled(
    sources.map((s) => fetchFeed(s.url, s.name))
  );

  const all: NewsItem[] = results.flatMap((r) =>
    r.status === "fulfilled" ? r.value : []
  );

  const aiFiltered = all.filter((item) => isAIRelated(item.title));
  if (aiFiltered.length >= 5) return aiFiltered.slice(0, 5);
  const nonAI = all.filter((item) => !isAIRelated(item.title));
  return [...aiFiltered, ...nonAI].slice(0, 5);
}

export const getCachedNews = unstable_cache(
  async () => {
    const [norway, world] = await Promise.all([
      fetchNorwayNews(),
      fetchWorldNews(),
    ]);
    return {
      norway,
      world,
      updatedAt: new Date().toISOString(),
    };
  },
  ["ai-news"],
  {
    tags: ["ai-news"],
    revalidate: 86400, // fallback: revalidate every 24h
  }
);

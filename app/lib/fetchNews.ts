import { unstable_cache } from "next/cache";
import Parser from "rss-parser";

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  /** Publiseringstidspunkt (ISO 8601) — brukes til månedsfilter og sortering. */
  publishedAt: string;
  source: string;
  /** Geografisk kildegruppe etter sammenslåing til spotlight-liste. */
  region?: "norway" | "world";
  /** Utdrag fra RSS (content:encoded / summary) — brukes til å gjenkjenne AI-relaterte saker når tittelen er vag. */
  description?: string;
}

/** Antall nyheter som vises samlet under «Hold deg oppdatert» for inneværende måned. */
export const AI_NEWS_SPOTLIGHT_TOTAL = 10;

/** Maks antall saker fra samme kilde (kilde = visningsnavn / RSS-feed). */
export const AI_NEWS_MAX_PER_SOURCE = 2;

const parser = new Parser({ timeout: 8000 });

/** Må ha tydelig AI/ML-/GenAI-kontekst (ikke bare «teknologi»). */
function hasAiMlContext(text: string): boolean {
  return (
    /\b(kunstig intelligens|artificial intelligence|maskinlæring|machine learning|generativ|generative|\bgenai\b|språkmodell|language model|large language|\bllms?\b|chatgpt|openai|anthropic|claude|gemini|copilot|deep learning|neural net|langchain|foundation model|multimodal)\b/i.test(
      text
    ) ||
    /\b(retrieval augmented|\brag\b|vector (database|store)|embeddings?|fine-?tuning|finetuning|inferens|inference|mlops|\bml ops\b|model serving)\b/i.test(
      text
    ) ||
    /\b(intelligent automation|cognitive automation|ai agents?)\b/i.test(text)
  );
}

/** AI-strategi, styring, regulering, risiko, målbilde. */
function matchesAiStrategyAngle(text: string): boolean {
  return (
    /\b(strategi|strategy|strategisk|roadmap|governance|styringsmodell|rammeverk|målbilde|regulatorisk|regulatory|risikostyring|risk management|beredskap|compliance|ciso|ai act|eu forordning|eu-forordning)\b/i.test(
      text
    ) ||
    /\b(ai|generativ|llm|maskinlæring|kunstig intelligens)\b.{0,80}\b(strategi|strategy|roadmap|governance|rammeverk)\b/i.test(
      text
    ) ||
    /\b(strategi|strategy|roadmap|governance|rammeverk)\b.{0,80}\b(ai|generativ|llm|maskinlæring|kunstig intelligens)\b/i.test(
      text
    )
  );
}

/** Innføring, arkitektur, integrasjon, drift, pilot, RAG, evaluering. */
function matchesAiImplementationAngle(text: string): boolean {
  return (
    /\b(implementering|implementation|implementere|integrasjon|integration|utrulling|deployment|deploy|arkitektur|architecture|plattform|platform|migrering|migration|modernisering|pilot|proof of concept|\bpoc\b|sandbox|go-live|golive|produksjonssetting|utviklingsløp|systemutvikling)\b/i.test(
      text
    ) ||
    /\b(retrieval augmented|\brag\b|vector (database|store)|data pipeline|evaluering|benchmark|finetuning|fine-tuning|opplæring i ai|ai-kurs)\b/i.test(
      text
    ) ||
    /\b(ai|llm|generativ|maskinlæring)\b.{0,80}\b(integrasjon|implementation|deployment|arkitektur|plattform|pilot|api)\b/i.test(
      text
    ) ||
    /\b(integrasjon|implementation|deployment|arkitektur|plattform|pilot)\b.{0,80}\b(ai|llm|generativ|maskinlæring)\b/i.test(
      text
    )
  );
}

/** Prosess, arbeidsflyt, RPA, hyperautomatisering — i kombinasjon med AI (globalt sjekket). */
function matchesAiProcessAutomationAngle(text: string): boolean {
  return (
    /\b(prosessautomatisering|process automation|hyperautomation|hyperautomatisering|robotic process|\brpa\b|workflow|arbeidsflyt|forretningsprosess|business process|orkestrering|orchestration|prosessforbedring|saksflyt|intelligent automation|cognitive automation)\b/i.test(
      text
    ) ||
    /\b(ai|generativ|llm|maskinlæring)\b.{0,80}\b(automatisering|automation|workflow|rpa|prosess)\b/i.test(
      text
    ) ||
    /\b(automatisering|automation|workflow|rpa|prosess)\b.{0,80}\b(ai|generativ|llm|maskinlæring|kunstig intelligens)\b/i.test(
      text
    )
  );
}

/** Nyheter begrenset til AI-strategi, -implementering og AI-drevet prosessautomatisering. */
function isStrategicImplementationOrAutomationNews(
  title: string,
  description?: string
): boolean {
  const text = `${title} ${description ?? ""}`.toLowerCase();
  if (!hasAiMlContext(text)) return false;
  return (
    matchesAiStrategyAngle(text) ||
    matchesAiImplementationAngle(text) ||
    matchesAiProcessAutomationAngle(text)
  );
}

/** Fjerner saker som sannsynlig krever pluss-/abonnementsinnhold (URL eller tittel fra RSS). */
function isLikelyPaywalledOrSubscriptionOnly(link: string, title: string): boolean {
  const url = link.toLowerCase();
  const ttl = title.toLowerCase();
  const urlHints = [
    "/pluss",
    "/plus/",
    "pluss.",
    ".pluss.",
    "e24-pluss",
    "e24pluss",
    "nettavisen.no/premium",
    "dn.no/pluss",
    "aftenposten.no/pluss",
    "vg.no/pluss",
    "dagbladet.no/pluss",
    "subscriber",
    "/subscriber/",
    "technologyreview.com/subscriber",
    "wired.com/subscriber",
  ];
  if (urlHints.some((h) => url.includes(h))) return true;
  if (/\(vg\s*\+\)|\(e24\s*\+\)|\[pluss\]|\bpluss-artikkel\b|\bfor abonnenter\b|\bkrever abonnement\b/i.test(ttl)) return true;
  return false;
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

const OSLO_TZ = "Europe/Oslo";

function yearMonthOslo(d: Date): string {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: OSLO_TZ,
    year: "numeric",
    month: "2-digit",
  }).format(d);
}

function parseRssItemToIso(item: { pubDate?: string; isoDate?: string }): string | null {
  const raw = item.isoDate ?? item.pubDate;
  if (!raw?.trim()) return null;
  const d = new Date(raw);
  if (isNaN(d.getTime())) return null;
  return d.toISOString();
}

function isPublishedInCurrentMonthOslo(iso: string, now: Date = new Date()): boolean {
  return yearMonthOslo(new Date(iso)) === yearMonthOslo(now);
}

/** Lesbar etikett for inneværende nyhetsmåned (norsk tid). */
export function formatCurrentNewsMonthLabelOslo(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("nb-NO", {
    timeZone: OSLO_TZ,
    month: "long",
    year: "numeric",
  }).format(now);
}

function dedupeByLink(items: NewsItem[]): NewsItem[] {
  const seen = new Set<string>();
  const out: NewsItem[] = [];
  for (const item of items) {
    if (seen.has(item.link)) continue;
    seen.add(item.link);
    out.push(item);
  }
  return out;
}

/** Én runde om gangen per kilde; hver kilde bidrar maks AI_NEWS_MAX_PER_SOURCE nyeste saker før utvelgelse. */
function pickRoundRobinBySource(items: NewsItem[], limit: number): NewsItem[] {
  if (limit <= 0) return [];
  const queues = new Map<string, NewsItem[]>();
  const sourceOrder: string[] = [];
  for (const item of items) {
    if (!queues.has(item.source)) {
      sourceOrder.push(item.source);
      queues.set(item.source, []);
    }
    queues.get(item.source)!.push(item);
  }
  for (const list of queues.values()) {
    list.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
    if (list.length > AI_NEWS_MAX_PER_SOURCE) list.length = AI_NEWS_MAX_PER_SOURCE;
  }
  const out: NewsItem[] = [];
  let idx = 0;
  while (out.length < limit && queues.size > 0) {
    const src = sourceOrder[idx % sourceOrder.length];
    const q = queues.get(src);
    if (!q || q.length === 0) {
      queues.delete(src);
      const at = sourceOrder.indexOf(src);
      if (at !== -1) sourceOrder.splice(at, 1);
      idx = 0;
      continue;
    }
    out.push(q.shift()!);
    idx++;
  }
  return out;
}

/** Alle tematiske treff, rotert per kilde (maks AI_NEWS_MAX_PER_SOURCE per kilde), uten tak på antall. */
function pickThemedCandidatePool(items: NewsItem[]): NewsItem[] {
  const unique = dedupeByLink(items);
  const matched = unique.filter((item) =>
    isStrategicImplementationOrAutomationNews(item.title, item.description)
  );
  return pickRoundRobinBySource(matched, matched.length);
}

/** Veksler Norge / verden slik at spotlight-listen blander geografier når begge har treff. */
function mergeSpotlightNews(
  norway: NewsItem[],
  world: NewsItem[],
  limit: number
): NewsItem[] {
  const noOrdered = pickRoundRobinBySource(norway, norway.length);
  const wwOrdered = pickRoundRobinBySource(world, world.length);
  let i = 0;
  let j = 0;
  let preferNorway = true;
  const out: NewsItem[] = [];
  while (out.length < limit) {
    if (preferNorway && i < noOrdered.length) {
      out.push({ ...noOrdered[i++], region: "norway" });
    } else if (!preferNorway && j < wwOrdered.length) {
      out.push({ ...wwOrdered[j++], region: "world" });
    } else if (i < noOrdered.length) {
      out.push({ ...noOrdered[i++], region: "norway" });
    } else if (j < wwOrdered.length) {
      out.push({ ...wwOrdered[j++], region: "world" });
    } else {
      break;
    }
    preferNorway = !preferNorway;
  }
  return out;
}

async function fetchFeed(url: string, sourceName: string): Promise<NewsItem[]> {
  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
        "User-Agent": "LillehvalNyhetsrobot/1.0 (+https://www.lillehval.no)",
      },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const feed = await parser.parseString(xml);
    return (feed.items ?? []).flatMap((item) => {
      const publishedAt = parseRssItemToIso(item);
      if (!publishedAt || !isPublishedInCurrentMonthOslo(publishedAt)) return [];
      const raw = item.isoDate ?? item.pubDate;
      const row: NewsItem = {
        title: item.title ?? "Uten tittel",
        link: item.link ?? "#",
        pubDate: formatDate(raw),
        publishedAt,
        source: sourceName,
        description: item.contentSnippet ?? item.summary,
      };
      if (isLikelyPaywalledOrSubscriptionOnly(row.link, row.title)) return [];
      return [row];
    });
  } catch {
    return [];
  }
}

async function fetchNorwayNews(): Promise<NewsItem[]> {
  const sources = [
    { url: "https://www.kode24.no/rss", name: "Kode24" },
    { url: "https://www.digi.no/rss", name: "Digi.no" },
    { url: "https://shifter.no/feed/", name: "Shifter" },
    { url: "https://nrkbeta.no/feed/", name: "NRKbeta" },
    { url: "https://www.tu.no/rss", name: "Teknisk Ukeblad" },
    { url: "https://www.computerworld.no/rss", name: "Computerworld" },
    { url: "https://www.khrono.no/rss", name: "Khrono" },
    { url: "https://www.forskning.no/rss", name: "Forskning.no" },
    { url: "https://blogg.kantega.no/rss/", name: "Kantega" },
    { url: "https://www.knowit.no/rss", name: "Knowit" },
    { url: "https://www.journalisten.no/rss", name: "Journalisten" },
    { url: "https://www.ife.no/feed/", name: "IFE" },
    { url: "https://www.norsis.no/feed/", name: "NorSIS" },
  ];

  const results = await Promise.allSettled(
    sources.map((s) => fetchFeed(s.url, s.name))
  );

  const all: NewsItem[] = results.flatMap((r) =>
    r.status === "fulfilled" ? r.value : []
  );

  return pickThemedCandidatePool(all);
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
    {
      url: "https://venturebeat.com/category/ai/feed/",
      name: "VentureBeat",
    },
    {
      url: "https://www.technologyreview.com/feed/",
      name: "MIT Tech Review",
    },
    {
      url: "https://www.wired.com/feed/tag/ai/latest/rss",
      name: "Wired",
    },
    {
      url: "https://feeds.bbci.co.uk/news/technology/rss.xml",
      name: "BBC News",
    },
    {
      url: "https://www.theguardian.com/technology/artificialintelligenceai/rss",
      name: "The Guardian",
    },
    {
      url: "https://blog.google/technology/ai/rss/",
      name: "Google",
    },
    {
      url: "https://openai.com/blog/rss.xml",
      name: "OpenAI",
    },
    {
      url: "https://huggingface.co/blog/feed.xml",
      name: "Hugging Face",
    },
    {
      url: "https://www.zdnet.com/topic/artificial-intelligence/rss.xml",
      name: "ZDNet",
    },
    {
      url: "https://spectrum.ieee.org/rss/artificial-intelligence/fulltext",
      name: "IEEE Spectrum",
    },
    {
      url: "https://www.engadget.com/rss.xml",
      name: "Engadget",
    },
    {
      url: "https://dev.to/feed/tag/ai",
      name: "DEV Community",
    },
    {
      url: "https://www.infoworld.com/category/artificial-intelligence/index.rss",
      name: "InfoWorld",
    },
    {
      url: "https://simonwillison.net/atom/everything/",
      name: "Simon Willison",
    },
    {
      url: "https://www.theregister.com/headlines.atom",
      name: "The Register",
    },
  ];

  const results = await Promise.allSettled(
    sources.map((s) => fetchFeed(s.url, s.name))
  );

  const all: NewsItem[] = results.flatMap((r) =>
    r.status === "fulfilled" ? r.value : []
  );

  return pickThemedCandidatePool(all);
}

export const getCachedNews = unstable_cache(
  async () => {
    const [norwayPool, worldPool] = await Promise.all([
      fetchNorwayNews(),
      fetchWorldNews(),
    ]);
    const items = mergeSpotlightNews(
      norwayPool,
      worldPool,
      AI_NEWS_SPOTLIGHT_TOTAL
    );
    return {
      items,
      updatedAt: new Date().toISOString(),
    };
  },
  [
    "ai-news",
    "spotlight",
    String(AI_NEWS_SPOTLIGHT_TOTAL),
    "oslo-current-month",
    `max-${AI_NEWS_MAX_PER_SOURCE}-per-source`,
    "theme-strategy-impl-automation",
  ],
  {
    tags: ["ai-news"],
    revalidate: 3600, // omtrent «dagens» rytme; tag revalideres også via /api/revalidate-news
  }
);

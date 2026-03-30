import Image from "next/image";
import { getCachedNews, NewsItem } from "../lib/fetchNews";

function formatUpdatedAt(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("nb-NO", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="green-news-card flex flex-col gap-2 p-4 rounded-xl"
    >
      <p className="news-title text-sm font-semibold text-[#1a3320] leading-snug transition-colors">
        {item.title}
      </p>
      <div className="flex items-center justify-between mt-auto pt-1">
        <span className="text-xs font-medium" style={{ color: "#15803d" }}>{item.source}</span>
        <span className="text-xs" style={{ color: "rgba(26,51,32,0.4)" }}>{item.pubDate}</span>
      </div>
    </a>
  );
}

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-10 gap-2 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="rgba(34,139,70,0.4)" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
      <p className="text-sm" style={{ color: "rgba(26,51,32,0.4)" }}>Kunne ikke hente nyheter akkurat nå. Prøv igjen senere.</p>
    </div>
  );
}

export default async function NewsSection() {
  const { norway, world, updatedAt } = await getCachedNews();

  return (
    <section id="siste-nyheter" className="py-24 px-6" style={{ background: "#e8e2d4" }}>
      <div className="max-w-6xl mx-auto">
        {/* Illustration */}
        <div className="relative w-full rounded-2xl overflow-hidden mb-12" style={{ height: "420px" }}>
          <Image
            src="/news-illustration.jpg"
            alt="Dagens AI-nyheter fra Norge og verden"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, transparent 60%, #000000 100%)" }}
          />
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: "#15803d" }}>
              Hold deg oppdatert
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1a3320]">
              Siste AI-nyheter
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(26,51,32,0.4)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Oppdatert: {formatUpdatedAt(updatedAt)}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Norway */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🇳🇴</span>
              <h3 className="text-lg font-extrabold text-[#1a3320]">AI-nyheter i Norge</h3>
              <span className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(34,139,70,0.1)", color: "#15803d" }}>
                Topp 5
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {norway.length > 0 ? norway.map((item, i) => <NewsCard key={i} item={item} />) : <EmptyState />}
            </div>
          </div>

          {/* World */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🌍</span>
              <h3 className="text-lg font-extrabold text-[#1a3320]">AI-nyheter i Verden</h3>
              <span className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(34,139,70,0.1)", color: "#15803d" }}>
                Topp 5
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {world.length > 0 ? world.map((item, i) => <NewsCard key={i} item={item} />) : <EmptyState />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

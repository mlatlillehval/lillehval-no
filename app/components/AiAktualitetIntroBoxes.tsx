import Image from "next/image";

const categories = [
  {
    id: "nyhetsbrev",
    label: "Nyhetsbrev",
    desc: "Ukentlig AI-oppdatering",
    image: "/ai-aktualitet-nyhetsbrev.png",
    accent: "#15803d",
  },
  {
    id: "shorts",
    label: "Shorts",
    desc: "Under ett minutt",
    image: "/ai-aktualitet-shorts.png",
    accent: "#d4840a",
  },
  {
    id: "ai-bloggen",
    label: "AI-bloggen",
    desc: "Dybdeartikler om AI",
    image: "/blog-ai-01.png",
    accent: "#15803d",
  },
  {
    id: "siste-nyheter",
    label: "Siste AI-nyheter",
    desc: "Hva skjer i verden",
    image: "/news-illustration.jpg",
    accent: "#4a7a55",
  },
  {
    id: "podcast",
    label: "Podcast",
    desc: "Lytt på farten",
    image: "/ai-aktualitet-podcast.png",
    accent: "#4a7a55",
  },
  {
    id: "talkshow",
    label: "Talkshow",
    desc: "Samtaler om AI",
    image: "/ai-aktualitet-talkshow.png",
    accent: "#14532d",
  },
];

export default function AiAktualitetIntroBoxes() {
  return (
    <div className="mb-12">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map(({ id, label, desc, image, accent }) => (
          <a
            key={id}
            href={`#${id}`}
            className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            style={{
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(26,51,32,0.1)",
            }}
          >
            {/* Cover image */}
            <div className="relative w-full overflow-hidden" style={{ height: "120px" }}>
              <Image
                src={image}
                alt={label}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="px-4 py-3 flex flex-col gap-1.5">
              <p className="font-bold text-sm leading-snug" style={{ color: "#1a3320" }}>
                {label}
              </p>
              <p className="text-xs" style={{ color: "rgba(26,51,32,0.5)" }}>
                {desc}
              </p>
              <div
                className="mt-1 flex items-center gap-1 text-xs font-semibold transition-opacity duration-150 group-hover:opacity-80"
                style={{ color: accent }}
              >
                <span>Se mer</span>
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

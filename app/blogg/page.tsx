import Image from "next/image";
import Link from "next/link";
import PageShell from "../components/PageShell";
import SectionKicker from "../components/SectionKicker";
import { getAllBlogPosts, getReadMinutes } from "../data/aiBlogPosts";
import { createPageMetadata, OG_IMAGES } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/blogg",
  title: "AI-bloggen",
  description:
    "Ti korte innlegg om AI for norske bedrifter — strategi, personvern, piloter, RAG, kundeservice og skalering.",
  ogImage: OG_IMAGES.blogg,
});

export default function BloggIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <PageShell>
      <main className="py-16 px-6" style={{ background: "#e8e2d4" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <SectionKicker>AI-bloggen</SectionKicker>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1a3320]">
              Perspektiver på AI for norske bedrifter
            </h1>
            <p className="mt-4 text-base max-w-2xl mx-auto" style={{ color: "rgba(26,51,32,0.65)" }}>
              Korte, praktiske innlegg du kan lese på noen minutter — skrevet for ledere og team som vurderer AI i
              hverdagen.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blogg/${post.slug}`}
                className="green-card rounded-2xl overflow-hidden transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803d] focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, 320px"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs font-semibold mb-2" style={{ color: "#15803d" }}>
                    {new Date(post.publishedAt).toLocaleDateString("nb-NO", { dateStyle: "medium" })} · ca.{" "}
                    {getReadMinutes(post)} min
                  </p>
                  <h2 className="text-sm font-bold text-[#1a3320] leading-snug line-clamp-3">{post.title}</h2>
                  <p className="mt-2 text-xs line-clamp-2" style={{ color: "rgba(26,51,32,0.5)" }}>
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </PageShell>
  );
}

import Image from "next/image";
import Link from "next/link";
import { getReadMinutes, type AIBlogPost } from "../data/aiBlogPosts";

type BlogPostViewProps = {
  post: AIBlogPost;
  showBackLink?: boolean;
};

export default function BlogPostView({ post, showBackLink = true }: BlogPostViewProps) {
  const readMinutes = getReadMinutes(post);

  return (
    <article className="max-w-3xl mx-auto">
      {showBackLink ? (
        <p className="mb-6">
          <Link
            href="/blogg"
            className="text-sm font-semibold underline-offset-2 hover:underline"
            style={{ color: "#15803d" }}
          >
            ← Alle innlegg
          </Link>
        </p>
      ) : null}
      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-8">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#15803d" }}>
        AI-bloggen · {new Date(post.publishedAt).toLocaleDateString("nb-NO", { dateStyle: "long" })} · ca.{" "}
        {readMinutes} min lesing
      </p>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a3320] leading-tight">{post.title}</h1>
      <p className="mt-4 text-base font-medium leading-relaxed" style={{ color: "rgba(26,51,32,0.7)" }}>
        {post.excerpt}
      </p>
      <div className="mt-8 space-y-4 text-base leading-relaxed text-[#1a3320]">
        {post.body.split(/\n\n+/).map((para, i) => (
          <p key={i}>{para.trim()}</p>
        ))}
      </div>
      <div
        className="mt-10 rounded-2xl p-6"
        style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)" }}
      >
        <p className="font-bold text-[#1a3320] mb-2">Trenger dere hjelp med AI i praksis?</p>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(26,51,32,0.75)" }}>
          Lillehval hjelper norske bedrifter fra kartlegging til assistenter og agenter. Book et gratis og
          uforpliktende møte.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/hjelp-med-ai"
            className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-bold"
            style={{ background: "#f59e0b", color: "#052016" }}
          >
            Hjelp med AI
          </Link>
          <Link
            href="/kontakt"
            className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold border"
            style={{ borderColor: "rgba(21,128,61,0.35)", color: "#14532d" }}
          >
            Kontakt oss
          </Link>
        </div>
      </div>
    </article>
  );
}

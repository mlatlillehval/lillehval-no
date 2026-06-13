import { notFound } from "next/navigation";
import BlogPostView from "../../components/BlogPostView";
import JsonLd from "../../components/JsonLd";
import PageShell from "../../components/PageShell";
import { AI_BLOG_POSTS, getBlogPostBySlug } from "../../data/aiBlogPosts";
import { blogPostingJsonLd, breadcrumbsJsonLd, createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return AI_BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return createPageMetadata({
    path: `/blogg/${slug}`,
    title: post.title,
    description: post.excerpt,
    ogImage: post.image,
    openGraphType: "article",
    publishedTime: `${post.publishedAt}T08:00:00+01:00`,
  });
}

export default async function BloggPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <PageShell>
      <JsonLd
        data={[
          blogPostingJsonLd(post),
          breadcrumbsJsonLd([
            { name: "Forside", path: "/" },
            { name: "AI-bloggen", path: "/blogg" },
            { name: post.title, path: `/blogg/${post.slug}` },
          ]),
        ]}
      />
      <main className="py-16 px-6" style={{ background: "#f2ede3" }}>
        <BlogPostView post={post} />
      </main>
    </PageShell>
  );
}

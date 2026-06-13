import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CaseStudyView from "../../components/CaseStudyView";
import JsonLd from "../../components/JsonLd";
import PageShell from "../../components/PageShell";
import { CASE_STUDIES, getCaseStudyBySlug } from "../../data/caseStudies";
import { breadcrumbsJsonLd, caseStudyJsonLd, createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return CASE_STUDIES.filter((c) => c.vis_paa_nettside).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) return {};

  return createPageMetadata({
    path: `/case/${slug}`,
    title: caseStudy.tittel,
    description: caseStudy.beskrivelse,
    ogImage: caseStudy.image,
    openGraphType: "article",
    publishedTime: `${caseStudy.opprettet}T08:00:00+01:00`,
  });
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy || !caseStudy.vis_paa_nettside) notFound();

  return (
    <PageShell>
      <JsonLd
        data={[
          caseStudyJsonLd(caseStudy),
          breadcrumbsJsonLd([
            { name: "Forside", path: "/" },
            { name: "Prosjekter", path: "/pagaende-prosjekter" },
            { name: caseStudy.tittel, path: `/case/${caseStudy.slug}` },
          ]),
        ]}
      />
      <main className="py-16 px-6" style={{ background: "#8AAD94" }}>
        <CaseStudyView caseStudy={caseStudy} />
      </main>
    </PageShell>
  );
}

import type { Metadata } from "next";
import { HELP_PAGE_DESCRIPTION } from "@/app/data/aiHelpIntent";
import { MARIUS_EMAIL, MARIUS_PHONE_TEL } from "@/app/data/siteContact";
import { SOCIAL_LINKS } from "@/app/data/siteSocial";
import { tjenester } from "@/app/data/tjenester";
import type { Tjeneste } from "@/app/data/tjenester";
import { getSiteUrl } from "@/lib/site-url";

/** Delingsbilde for Open Graph / Twitter (erstatt med dedikert 1200×630 ved behov). */
export const DEFAULT_OG_IMAGE = "/hero-bedrift-utvikling.jpg";

export const SITE_DESCRIPTION = HELP_PAGE_DESCRIPTION;

export type PageMetadataOptions = {
  /** Sti uten domene, f.eks. `/ai-tjenester` eller `/`. */
  path: string;
  /** Kort sidetittel — layout legger til « – Lillehval». */
  title?: string;
  /** Full tittel uten mal (typisk forsiden). */
  absoluteTitle?: string;
  description: string;
  ogImage?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (path === "/" || path === "") {
    return `${base}/`;
  }
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createPageMetadata(opts: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(opts.path);
  const ogImage = opts.ogImage ?? DEFAULT_OG_IMAGE;
  const ogTitle =
    opts.absoluteTitle ?? (opts.title ? `${opts.title} – Lillehval` : "Lillehval");

  const metadata: Metadata = {
    description: opts.description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "nb_NO",
      siteName: "Lillehval",
      title: ogTitle,
      description: opts.description,
      url: opts.path === "/" ? "/" : opts.path,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Lillehval – AI-rådgivning for norske bedrifter",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: opts.description,
      images: [ogImage],
    },
  };

  if (opts.absoluteTitle) {
    metadata.title = { absolute: opts.absoluteTitle };
  } else if (opts.title) {
    metadata.title = opts.title;
  }

  if (opts.noIndex) {
    metadata.robots = { index: false, follow: false };
  }

  return metadata;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${absoluteUrl("/")}#organization`,
    name: "Lillehval",
    alternateName: "Lillehval AS",
    url: absoluteUrl("/"),
    logo: absoluteUrl("/logo-whale-hero.png"),
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    description: SITE_DESCRIPTION,
    slogan: "Hjelp med AI for norske bedrifter",
    email: MARIUS_EMAIL,
    telephone: MARIUS_PHONE_TEL,
    areaServed: {
      "@type": "Country",
      name: "Norway",
    },
    knowsLanguage: ["nb", "no"],
    knowsAbout: [
      "Kunstig intelligens",
      "AI-rådgivning",
      "AI-implementering",
      "AI-assistenter",
      "AI-agenter",
      "AI-strategi for bedrifter",
      "Prosessautomatisering",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: MARIUS_PHONE_TEL,
      email: MARIUS_EMAIL,
      availableLanguage: ["Norwegian", "Bokmål"],
      areaServed: "NO",
      url: absoluteUrl("/"),
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI-tjenester for bedrifter",
      itemListElement: tjenester.map((t) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: t.title,
          description: t.tagline,
          url: absoluteUrl(`/ai-tjenester/${t.slug}`),
          provider: { "@id": `${absoluteUrl("/")}#organization` },
        },
      })),
    },
    sameAs: SOCIAL_LINKS.map((link) => link.href),
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    url: absoluteUrl("/"),
    name: "Lillehval",
    description: SITE_DESCRIPTION,
    publisher: { "@id": `${absoluteUrl("/")}#organization` },
    inLanguage: "nb-NO",
  };
}

export function serviceJsonLd(tjeneste: Tjeneste) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: tjeneste.title,
    description: tjeneste.tagline,
    provider: { "@id": `${absoluteUrl("/")}#organization` },
    url: absoluteUrl(`/ai-tjenester/${tjeneste.slug}`),
    areaServed: {
      "@type": "Country",
      name: "Norway",
    },
  };
}

export type BreadcrumbItem = { name: string; path: string };

export function breadcrumbsJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export type FaqItem = { question: string; answer: string };

export function helpWithAiWebPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl("/hjelp-med-ai")}#webpage`,
    url: absoluteUrl("/hjelp-med-ai"),
    name: "Hjelp med AI for norske bedrifter",
    description: HELP_PAGE_DESCRIPTION,
    isPartOf: { "@id": `${absoluteUrl("/")}#website` },
    about: { "@id": `${absoluteUrl("/")}#organization` },
    inLanguage: "nb-NO",
    primaryImageOfPage: absoluteUrl(DEFAULT_OG_IMAGE),
  };
}

export function faqPageJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

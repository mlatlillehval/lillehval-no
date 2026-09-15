const PRODUCTION_SITE_URL = "https://www.lillehval.no";

function isVercelDeploymentHost(url: string): boolean {
  try {
    return new URL(url).hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

/**
 * Kanonisk nettsted-URL for sitemap, robots, Open Graph og Stripe-retur.
 * Produksjon skal alltid være www.lillehval.no — aldri *.vercel.app —
 * ellers siterer crawlere feil host og lillehval.no blir usynlig.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") ?? "";
  const usableExplicit = explicit && !isVercelDeploymentHost(explicit) ? explicit : "";

  if (process.env.VERCEL_ENV === "production") {
    return usableExplicit || PRODUCTION_SITE_URL;
  }

  if (usableExplicit) return usableExplicit;

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    return `https://${vercel.replace(/\/$/, "")}`;
  }

  return "http://127.0.0.1:3000";
}

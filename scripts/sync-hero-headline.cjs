/**
 * Oppdaterer hero-rader i frontpage_content: overskrift + CTA-knapp + trust-linje.
 * Kjør fra prosjektrot: node scripts/sync-hero-headline.cjs
 * Krever .env.local med NEXT_PUBLIC_SUPABASE_URL og SUPABASE_SERVICE_ROLE_KEY (eller anon).
 */
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

function loadEnvLocal() {
  const p = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(p)) {
    console.error("Fant ikke .env.local — opprett den med Supabase-URL og nøkler først.");
    process.exit(1);
  }
  const out = {};
  for (const line of fs.readFileSync(p, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const k = t.slice(0, eq).trim();
    let v = t.slice(eq + 1).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    out[k] = v;
  }
  return out;
}

const rows = [
  { key: "hero_headline_green_lead", value: "AI" },
  { key: "hero_headline_top", value: "er en" },
  { key: "hero_headline_highlight", value: "mulighet og potensial" },
  { key: "hero_headline_mid", value: "mange bedrifter ikke kjenner til" },
  { key: "hero_headline_bottom", value: "" },
  { key: "hero_cta_text", value: "Book et 30 min møte med oss for å vite mer." },
  { key: "hero_trust_line", value: "Ingen forpliktelser. Helt gratis." },
];

async function main() {
  const env = loadEnvLocal();
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !key) {
    console.error("Mangler NEXT_PUBLIC_SUPABASE_URL eller nøkkel i .env.local.");
    process.exit(1);
  }

  const sb = createClient(url, key);
  const { error } = await sb.from("frontpage_content").upsert(rows, {
    onConflict: "key",
  });

  if (error) {
    console.error("Supabase-feil:", error.message);
    process.exit(1);
  }
  console.log("OK: hero-tekster (overskrift + CTA) er oppdatert i frontpage_content.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

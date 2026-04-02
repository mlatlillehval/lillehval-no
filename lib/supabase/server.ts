import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

/**
 * Server-side Supabase-klient for API-ruter.
 * Bruk SUPABASE_SERVICE_ROLE_KEY i produksjon (skjul i Vercel env).
 * Uten den brukes anon-nøkkel — da må RLS tillate INSERT for anonyme.
 */
export function createSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Mangler NEXT_PUBLIC_SUPABASE_URL og/eller Supabase-nøkkel (anon eller service role)."
    );
  }

  return createClient<Database>(url, key);
}

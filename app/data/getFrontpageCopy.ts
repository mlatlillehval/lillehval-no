import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  FRONT_PAGE_DEFAULTS,
  FRONT_PAGE_KEYS,
  type FrontpageCopy,
} from "./frontpageCopy";

/** Samme innhold som GET /api/frontpage-content — brukes på server for første paint uten layout-hop. */
export async function getFrontpageCopy(): Promise<FrontpageCopy> {
  try {
    const sb = createSupabaseServerClient() as any;

    const { data, error } = await sb
      .from("frontpage_content")
      .select("key,value")
      .in("key", FRONT_PAGE_KEYS as string[]);

    if (error) {
      return FRONT_PAGE_DEFAULTS;
    }

    const overrides: Partial<FrontpageCopy> = {};
    for (const row of data ?? []) {
      const k = row.key as keyof FrontpageCopy;
      if (FRONT_PAGE_KEYS.includes(k) && typeof row.value === "string") {
        (overrides as Record<string, string>)[k] = row.value;
      }
    }

    return { ...FRONT_PAGE_DEFAULTS, ...overrides };
  } catch {
    return FRONT_PAGE_DEFAULTS;
  }
}

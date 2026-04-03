import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  FRONT_PAGE_DEFAULTS,
  FRONT_PAGE_KEYS,
  type FrontpageCopy,
} from "@/app/data/frontpageCopy";

function getAllowedAdminEmails() {
  const raw = process.env.ADMIN_EMAILS ?? "";
  return raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

function isAdminUserEmail(email: string | null | undefined) {
  const allowed = getAllowedAdminEmails();
  if (allowed.length === 0) return true; // fallback (unngår låsing i dev)
  if (!email) return false;
  return allowed.includes(email.toLowerCase());
}

export async function GET(_request: NextRequest) {
  try {
    const sb = createSupabaseServerClient() as any;

    const { data, error } = await sb
      .from("frontpage_content")
      .select("key,value")
      .in("key", FRONT_PAGE_KEYS as string[]);

    if (error) {
      // Hvis tabellen ikke finnes/tilgang mangler, returner defaults.
      return NextResponse.json(FRONT_PAGE_DEFAULTS);
    }

    const overrides: Partial<FrontpageCopy> = {};
    for (const row of data ?? []) {
      const k = row.key as keyof FrontpageCopy;
      if (FRONT_PAGE_KEYS.includes(k) && typeof row.value === "string") {
        (overrides as any)[k] = row.value;
      }
    }

    return NextResponse.json({ ...FRONT_PAGE_DEFAULTS, ...overrides });
  } catch {
    return NextResponse.json(FRONT_PAGE_DEFAULTS);
  }
}

export async function POST(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  try {
    const supabaseAuth = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value);
            });

            response = NextResponse.next({
              request: { headers: request.headers },
            });

            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    const { data } = await supabaseAuth.auth.getUser();
    const email = data.user?.email;

    if (!data.user) {
      return NextResponse.json({ error: "Ikke innlogget." }, { status: 401 });
    }

    if (!isAdminUserEmail(email)) {
      return NextResponse.json(
        { error: "Du har ikke tilgang." },
        { status: 403 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Kunne ikke verifisere sesjon." },
      { status: 401 }
    );
  }

  let body: Partial<FrontpageCopy>;
  try {
    body = (await request.json()) as Partial<FrontpageCopy>;
  } catch {
    return NextResponse.json({ error: "Ugyldig JSON." }, { status: 400 });
  }

  const updates: FrontpageCopy = { ...FRONT_PAGE_DEFAULTS };
  for (const key of FRONT_PAGE_KEYS) {
    const val = body[key];
    if (typeof val === "string") updates[key] = val;
  }

  try {
    const sbAdmin = createSupabaseServerClient() as any;
    const rows = FRONT_PAGE_KEYS.map((key) => ({
      key,
      value: (updates as any)[key] as string,
    }));

    const { error } = await sbAdmin
      .from("frontpage_content")
      .upsert(rows as any, { onConflict: "key" });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Serverfeil." },
      { status: 503 }
    );
  }
}


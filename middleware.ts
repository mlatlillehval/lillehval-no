import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  let res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            req.cookies.set(name, value);
            res = NextResponse.next({ request: req });
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const adminEmails = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((e) => e.trim().toLowerCase());

    const userEmail = session.user.email?.toLowerCase() || "";

    if (!adminEmails.includes(userEmail)) {
      return NextResponse.redirect(
        new URL("/login?error=unauthorized", req.url)
      );
    }
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};


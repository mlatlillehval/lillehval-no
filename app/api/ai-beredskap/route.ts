import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Json } from "@/types/supabase";

type Body = {
  total_score: number;
  score_kategori?: string | null;
  bedrift?: string | null;
  navn?: string | null;
  epost?: string | null;
  svar: Json;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Ugyldig JSON" }, { status: 400 });
  }

  const score =
    typeof body.total_score === "number" && Number.isFinite(body.total_score)
      ? body.total_score
      : NaN;

  if (Number.isNaN(score)) {
    return NextResponse.json({ error: "total_score mangler eller er ugyldig." }, { status: 400 });
  }

  if (body.svar === undefined || body.svar === null) {
    return NextResponse.json({ error: "svar mangler." }, { status: 400 });
  }

  try {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from("ai_beredskap").insert({
      total_score: score,
      score_kategori: body.score_kategori?.trim() || null,
      bedrift: body.bedrift?.trim() || null,
      navn: body.navn?.trim() || null,
      epost: body.epost?.trim() || null,
      svar: body.svar,
    });

    if (error) {
      console.error("[ai-beredskap]", error);
      return NextResponse.json(
        { error: "Kunne ikke lagre analysen. Prøv igjen senere." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[ai-beredskap]", e);
    return NextResponse.json(
      { error: "Serveren er ikke konfigurert for lagring (Supabase)." },
      { status: 503 }
    );
  }
}

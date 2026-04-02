import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
type Body = {
  navn: string;
  epost: string;
  bedrift?: string | null;
  melding?: string | null;
  telefon?: string | null;
  /** ISO-dato (YYYY-MM-DD) og klokkeslett, legges inn i melding hvis tabellen ikke har egne felt */
  onsketDato?: string;
  onsketTid?: string;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Ugyldig JSON" }, { status: 400 });
  }

  const navn = typeof body.navn === "string" ? body.navn.trim() : "";
  const epost = typeof body.epost === "string" ? body.epost.trim() : "";

  if (!navn || !epost) {
    return NextResponse.json(
      { error: "Navn og e-post er påkrevd." },
      { status: 400 }
    );
  }

  let melding = typeof body.melding === "string" ? body.melding.trim() : "";
  if (body.onsketDato && body.onsketTid) {
    const slot = `Ønsket møtetidspunkt: ${body.onsketDato} kl. ${body.onsketTid}`;
    melding = melding ? `${slot}\n\n${melding}` : slot;
  }

  try {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from("moetebookinger").insert({
      navn,
      epost,
      bedrift: body.bedrift?.trim() || null,
      melding: melding || null,
      telefon: body.telefon?.trim() || null,
    });

    if (error) {
      console.error("[moetebooking]", error);
      return NextResponse.json(
        { error: "Kunne ikke lagre booking. Prøv igjen senere." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[moetebooking]", e);
    return NextResponse.json(
      { error: "Serveren er ikke konfigurert for lagring (Supabase)." },
      { status: 503 }
    );
  }
}

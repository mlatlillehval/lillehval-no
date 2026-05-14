import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAllowedMoeteTid } from "@/lib/moetebookingTimes";
import { isBlockedBookingDayUtc, parseYmdParts } from "@/lib/norwegianPublicHolidays";
import { formatMoeteSlotNb, sendMoeteBookingEmails } from "@/lib/sendMoeteBookingEmails";
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

  if (body.onsketDato) {
    const parsed = parseYmdParts(body.onsketDato);
    if (!parsed) {
      return NextResponse.json({ error: "Ugyldig datoformat." }, { status: 400 });
    }
    if (isBlockedBookingDayUtc(parsed.y, parsed.m, parsed.d)) {
      return NextResponse.json(
        { error: "Valgt dato er i fortiden, på en helg eller på en norsk helligdag og kan ikke bookes." },
        { status: 400 }
      );
    }
  }

  if (body.onsketTid != null && String(body.onsketTid).trim() !== "") {
    if (!isAllowedMoeteTid(typeof body.onsketTid === "string" ? body.onsketTid : "")) {
      return NextResponse.json(
        { error: "Møtetid må være et helt klokkeslett mellom 10:00 og 14:00." },
        { status: 400 }
      );
    }
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

    const slotLabel =
      body.onsketDato && body.onsketTid
        ? formatMoeteSlotNb(body.onsketDato, body.onsketTid)
        : undefined;

    await sendMoeteBookingEmails({
      navn,
      epost,
      slotLabel,
      bedrift: body.bedrift?.trim() || null,
      melding: melding || null,
      telefon: body.telefon?.trim() || null,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[moetebooking]", e);
    return NextResponse.json(
      { error: "Serveren er ikke konfigurert for lagring (Supabase)." },
      { status: 503 }
    );
  }
}

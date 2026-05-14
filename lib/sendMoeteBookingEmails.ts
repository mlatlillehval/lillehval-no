import { Resend } from "resend";
import { MARIUS_EMAIL } from "@/app/data/siteContact";
import { parseYmdParts } from "@/lib/norwegianPublicHolidays";

/** Lesbar norsk dato + klokkeslett for e-post (samme logikk som i modal). */
export function formatMoeteSlotNb(onsketDato: string, onsketTid: string): string {
  const parsed = parseYmdParts(onsketDato);
  if (!parsed) return `${onsketDato} kl. ${onsketTid}`;
  const { y, m, d } = parsed;
  // parseYmdParts.m er månedsindeks 0–11 (samme som Date)
  const date = new Date(y, m, d);
  const dayPart = date.toLocaleDateString("nb-NO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  return `${dayPart} kl. ${onsketTid}`;
}

type BookingEmailPayload = {
  navn: string;
  epost: string;
  slotLabel?: string;
  bedrift?: string | null;
  melding?: string | null;
  telefon?: string | null;
};

/**
 * Bekreftelse til kunde + varsel til Lillehval. Krever RESEND_API_KEY og RESEND_FROM.
 * Ved manglende konfigurasjon eller feil logges det — booking i DB skal ikke feile.
 */
export async function sendMoeteBookingEmails(payload: BookingEmailPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM?.trim();
  if (!apiKey || !from) {
    console.warn(
      "[moetebooking] E-post er ikke konfigurert (mangler RESEND_API_KEY eller RESEND_FROM). Ingen bekreftelse sendes."
    );
    return;
  }

  const resend = new Resend(apiKey);
  const internalTo = process.env.BOOKING_INTERNAL_EMAIL?.trim() || MARIUS_EMAIL;
  const { navn, epost, slotLabel, bedrift, melding, telefon } = payload;

  const userLines = [
    `Hei ${navn},`,
    "",
    slotLabel
      ? `Vi har mottatt din forespørsel om møte ${slotLabel}.`
      : "Vi har mottatt din forespørsel om møte.",
    "",
    `Vi tar kontakt så snart vi har sett på bookingen. Har du spørsmål i mellomtiden, kan du skrive til oss på ${MARIUS_EMAIL}.`,
    "",
    "Hilsen Lillehval",
  ];

  const internalLines = [
    "Ny møtebooking på nettsiden:",
    "",
    `Navn: ${navn}`,
    `E-post: ${epost}`,
    ...(bedrift ? [`Bedrift: ${bedrift}`] : []),
    ...(telefon ? [`Telefon: ${telefon}`] : []),
    ...(slotLabel ? [`Ønsket tidspunkt: ${slotLabel}`] : []),
    ...(melding ? ["Melding:", melding] : []),
  ];

  const userSend = resend.emails.send({
    from,
    to: epost,
    subject: "Bekreftelse: Vi har mottatt din møteforespørsel",
    text: userLines.join("\n"),
  });

  const internalSend = resend.emails.send({
    from,
    to: internalTo,
    subject: `Ny møtebooking: ${navn}`,
    text: internalLines.join("\n"),
    replyTo: epost,
  });

  const outcomes = await Promise.allSettled([userSend, internalSend]);
  for (const o of outcomes) {
    if (o.status === "rejected") {
      console.error("[moetebooking] E-postfeil:", o.reason);
      continue;
    }
    const { error } = o.value;
    if (error) console.error("[moetebooking] Resend:", error);
  }
}

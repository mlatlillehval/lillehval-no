import { Resend } from "resend";
import { MARIUS_EMAIL } from "@/app/data/siteContact";
import { parseYmdParts } from "@/lib/norwegianPublicHolidays";

/** Lesbar norsk dato + klokkeslett for e-post (samme logikk som i modal). */
export function formatMoeteSlotNb(onsketDato: string, onsketTid: string): string {
  const parsed = parseYmdParts(onsketDato);
  if (!parsed) return `${onsketDato} kl. ${onsketTid}`;
  const { y, m, d } = parsed;
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

export type MoeteBookingEmailResult = {
  customerOk: boolean;
  internalOk: boolean;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function emailShell(title: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="nb">
<body style="margin:0;padding:24px;background:#f2ede3;font-family:system-ui,sans-serif;color:#1a3320;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;padding:28px 24px;border:1px solid rgba(21,128,61,0.18);">
    <p style="margin:0 0 16px;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#15803d;">Lillehval</p>
    <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;">${escapeHtml(title)}</h1>
    ${bodyHtml}
  </div>
</body>
</html>`;
}

/**
 * Bekreftelse til den som booker + varsel til ml@lillehval.no.
 * Krever RESEND_API_KEY. RESEND_FROM bør være på verifisert domene.
 */
export async function sendMoeteBookingEmails(
  payload: BookingEmailPayload
): Promise<MoeteBookingEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from =
    process.env.RESEND_FROM?.trim() || "Lillehval <post@lillehval.no>";
  if (!apiKey) {
    console.warn(
      "[moetebooking] E-post er ikke konfigurert (mangler RESEND_API_KEY). Ingen bekreftelse sendes."
    );
    return { customerOk: false, internalOk: false };
  }

  const resend = new Resend(apiKey);
  const internalTo = process.env.BOOKING_INTERNAL_EMAIL?.trim() || MARIUS_EMAIL;
  const { navn, epost, slotLabel, bedrift, melding, telefon } = payload;
  const slotText = slotLabel ?? "et avtalt tidspunkt";

  const userText = [
    `Hei ${navn},`,
    "",
    `Vi har mottatt din forespørsel om møte ${slotText}.`,
    "",
    `Vi tar kontakt så snart vi har sett på bookingen. Har du spørsmål i mellomtiden, kan du skrive til oss på ${MARIUS_EMAIL}.`,
    "",
    "Hilsen Lillehval",
  ].join("\n");

  const userHtml = emailShell(
    "Vi har mottatt møteforespørselen din",
    `<p style="margin:0 0 12px;line-height:1.5;">Hei ${escapeHtml(navn)},</p>
     <p style="margin:0 0 12px;line-height:1.5;">Vi har mottatt din forespørsel om møte <strong>${escapeHtml(slotText)}</strong>.</p>
     <p style="margin:0 0 12px;line-height:1.5;">Vi tar kontakt så snart vi har sett på bookingen. Har du spørsmål, skriv til <a href="mailto:${MARIUS_EMAIL}" style="color:#15803d;">${MARIUS_EMAIL}</a>.</p>
     <p style="margin:24px 0 0;line-height:1.5;">Hilsen Lillehval</p>`
  );

  const internalLines = [
    "Ny møtebooking på nettsiden:",
    "",
    `Navn: ${navn}`,
    `E-post: ${epost}`,
    ...(bedrift ? [`Bedrift: ${bedrift}`] : []),
    ...(telefon ? [`Telefon: ${telefon}`] : []),
    `Ønsket tidspunkt: ${slotText}`,
    ...(melding ? ["", "Melding:", melding] : []),
  ];

  const internalHtml = emailShell(
    `Ny møtebooking: ${navn}`,
    `<p style="margin:0 0 16px;line-height:1.5;">Noen har booket møte på lillehval.no.</p>
     <table style="width:100%;border-collapse:collapse;font-size:14px;">
       <tr><td style="padding:6px 0;color:#58705f;">Navn</td><td style="padding:6px 0;">${escapeHtml(navn)}</td></tr>
       <tr><td style="padding:6px 0;color:#58705f;">E-post</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(epost)}" style="color:#15803d;">${escapeHtml(epost)}</a></td></tr>
       ${bedrift ? `<tr><td style="padding:6px 0;color:#58705f;">Bedrift</td><td style="padding:6px 0;">${escapeHtml(bedrift)}</td></tr>` : ""}
       ${telefon ? `<tr><td style="padding:6px 0;color:#58705f;">Telefon</td><td style="padding:6px 0;">${escapeHtml(telefon)}</td></tr>` : ""}
       <tr><td style="padding:6px 0;color:#58705f;">Tidspunkt</td><td style="padding:6px 0;">${escapeHtml(slotText)}</td></tr>
     </table>
     ${melding ? `<p style="margin:16px 0 0;line-height:1.5;white-space:pre-wrap;">${escapeHtml(melding)}</p>` : ""}`
  );

  const { data: customerData, error: customerError } = await resend.emails.send({
    from,
    to: [epost],
    bcc: [internalTo],
    replyTo: MARIUS_EMAIL,
    subject: "Bekreftelse: Vi har mottatt din møteforespørsel",
    text: userText,
    html: userHtml,
  });

  const { data: internalData, error: internalError } = await resend.emails.send({
    from,
    to: [internalTo],
    replyTo: epost,
    subject: `Ny møtebooking: ${navn}`,
    text: internalLines.join("\n"),
    html: internalHtml,
  });

  if (customerError) console.error("[moetebooking] Resend kunde:", customerError);
  if (internalError) console.error("[moetebooking] Resend intern:", internalError);

  return {
    customerOk: Boolean(customerData?.id) && !customerError,
    internalOk: Boolean(internalData?.id) && !internalError,
  };
}

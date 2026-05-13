import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getSiteUrl } from "@/lib/site-url";
import { normalizeCheckoutKeys, stripeCheckoutCatalog } from "@/lib/stripe-checkout-catalog";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY?.trim();
  if (!secret) {
    return NextResponse.json(
      { error: "Betaling er ikke konfigurert ennå. Ta kontakt på ml@lillehval.no." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ugyldig forespørsel." }, { status: 400 });
  }

  const productIds = (body as { productIds?: unknown }).productIds;
  if (!Array.isArray(productIds) || !productIds.every((x) => typeof x === "string")) {
    return NextResponse.json({ error: "Mangler productIds (liste med strenger)." }, { status: 400 });
  }

  const normalized = normalizeCheckoutKeys(productIds);
  if ("error" in normalized) {
    return NextResponse.json({ error: normalized.error }, { status: 400 });
  }

  const stripe = new Stripe(secret, {
    apiVersion: "2026-03-25.dahlia",
    typescript: true,
  });

  const base = getSiteUrl();
  const line_items = normalized.map((key) => {
    const p = stripeCheckoutCatalog[key];
    return {
      quantity: 1 as const,
      price_data: {
        currency: "nok" as const,
        unit_amount: p.unitAmountOre,
        product_data: {
          name: p.name,
          description: p.description,
          metadata: { checkout_key: key },
        },
      },
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${base}/kjop/takk?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/kjop/avbrutt`,
      locale: "nb",
      billing_address_collection: "required",
      allow_promotion_codes: true,
      metadata: {
        product_keys: normalized.join(","),
      },
      payment_intent_data: {
        metadata: {
          product_keys: normalized.join(","),
        },
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: "Kunne ikke opprette betalingsside." }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("[checkout]", e);
    return NextResponse.json(
      { error: "Noe gikk galt med betalingsleverandøren. Prøv igjen eller ta kontakt." },
      { status: 502 }
    );
  }
}

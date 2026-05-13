"use client";

import { MARIUS_EMAIL } from "../data/siteContact";
import { stripeCheckoutCatalog, isCheckoutProductKey } from "../../lib/stripe-checkout-catalog";

type Props = {
  productIds: string[];
  className?: string;
  children: React.ReactNode;
  variant?: "primary" | "card" | "compact";
};

function getProductNames(productIds: string[]): string {
  return productIds
    .map((id) => (isCheckoutProductKey(id) ? stripeCheckoutCatalog[id].name.replace("Lillehval — ", "") : id))
    .join(", ");
}

export function CheckoutPayButton({
  productIds,
  className = "",
  children,
  variant = "primary",
}: Props) {
  const names = getProductNames(productIds);
  const subject = encodeURIComponent(`Interesse: ${names}`);
  const body = encodeURIComponent(
    `Hei,\n\nJeg er interessert i å kjøpe følgende:\n${names}\n\nVennligst ta kontakt for å avtale levering og fakturering.\n\nMed vennlig hilsen,\n`
  );
  const href = `mailto:${MARIUS_EMAIL}?subject=${subject}&body=${body}`;

  const base =
    variant === "primary"
      ? "inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-bold text-white transition hover:opacity-90"
      : variant === "compact"
        ? "inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-bold text-white transition hover:brightness-110 shrink-0"
        : "w-full inline-flex items-center justify-center px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition border";

  const style =
    variant === "primary"
      ? {
          background: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)",
          boxShadow: "0 2px 12px rgba(34,197,94,0.3)",
        }
      : variant === "compact"
        ? {
            background: "#15803d",
            boxShadow: "0 1px 6px rgba(21,128,61,0.35)",
          }
        : {
            borderColor: "rgba(34,139,70,0.45)",
            color: "#15803d",
            background: "rgba(255,255,255,0.9)",
          };

  const wrapClass = variant === "compact" ? "inline-block max-w-full" : "w-full";

  return (
    <div className={wrapClass}>
      <a
        href={href}
        className={`${base} ${className}`}
        style={style}
      >
        {children}
      </a>
      <p className="text-xs mt-1.5 leading-snug" style={{ color: "rgba(26,51,32,0.45)" }}>
        Faktura — vi svarer innen én virkedag
      </p>
    </div>
  );
}

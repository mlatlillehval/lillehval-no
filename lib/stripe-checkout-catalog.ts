import type { CheckoutProductKey } from "./checkout-ids";
import { CHECKOUT_BUNDLE_ALL_KEY } from "./checkout-ids";

/** NOK → øre (Stripe) */
function ore(kr: number): number {
  return Math.round(kr * 100);
}

const EKS_MVA = "Pris eks. mva. Digital leveranse etter betaling.";

export const stripeCheckoutCatalog: Record<
  CheckoutProductKey,
  { name: string; description: string; unitAmountOre: number }
> = {
  "asst-salgsassistenten": {
    name: "Lillehval — Salgsassistenten",
    description: EKS_MVA,
    unitAmountOre: ore(4900),
  },
  "asst-lederassistenten": {
    name: "Lillehval — Lederassistenten",
    description: EKS_MVA,
    unitAmountOre: ore(4900),
  },
  "asst-kundeserviceassistenten": {
    name: "Lillehval — Kundeserviceassistenten",
    description: EKS_MVA,
    unitAmountOre: ore(4900),
  },
  "asst-innholdsassistenten": {
    name: "Lillehval — Innholdsassistenten",
    description: EKS_MVA,
    unitAmountOre: ore(4900),
  },
  "asst-hr-assistenten": {
    name: "Lillehval — HR-assistenten",
    description: EKS_MVA,
    unitAmountOre: ore(4900),
  },
  "asst-okonomiassistenten": {
    name: "Lillehval — Økonomiassistenten",
    description: EKS_MVA,
    unitAmountOre: ore(4900),
  },
  "asst-prosjektassistenten": {
    name: "Lillehval — Prosjektassistenten",
    description: EKS_MVA,
    unitAmountOre: ore(4900),
  },
  "asst-rapporteringsassistenten": {
    name: "Lillehval — Rapporteringsassistenten",
    description: EKS_MVA,
    unitAmountOre: ore(4900),
  },
  "asst-juridisk-assistent": {
    name: "Lillehval — Juridisk assistent",
    description: EKS_MVA,
    unitAmountOre: ore(4900),
  },
  "asst-strategiassistenten": {
    name: "Lillehval — Strategiassistenten",
    description: EKS_MVA,
    unitAmountOre: ore(4900),
  },
  [CHECKOUT_BUNDLE_ALL_KEY]: {
    name: "Lillehval — Alle 10 assistenter (pakketilbud)",
    description: EKS_MVA,
    unitAmountOre: ore(39_900),
  },
};

export function isCheckoutProductKey(id: string): id is CheckoutProductKey {
  return id in stripeCheckoutCatalog;
}

export function normalizeCheckoutKeys(raw: string[]): CheckoutProductKey[] | { error: string } {
  const unique = [...new Set(raw.map((s) => s.trim()).filter(Boolean))];
  if (unique.length === 0) {
    return { error: "Ingen produkter valgt." };
  }
  for (const id of unique) {
    if (!isCheckoutProductKey(id)) {
      return { error: "Ugyldig produkt." };
    }
  }
  const keys = unique as CheckoutProductKey[];
  const hasBundle = keys.includes(CHECKOUT_BUNDLE_ALL_KEY);
  if (hasBundle && keys.length > 1) {
    return { error: "Pakketilbud kan ikke kombineres med enkeltkjøp i samme ordre." };
  }
  if (keys.length > 15) {
    return { error: "For mange linjer i én ordre." };
  }
  return keys;
}

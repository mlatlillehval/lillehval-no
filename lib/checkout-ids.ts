/** Stripe Checkout product keys — sendes til /api/checkout (priser ligger kun på server). */

export const CHECKOUT_ASSISTANT_KEY_BY_NUMERIC_ID = {
  1: "asst-salgsassistenten",
  2: "asst-lederassistenten",
  3: "asst-kundeserviceassistenten",
  4: "asst-innholdsassistenten",
  5: "asst-hr-assistenten",
  6: "asst-okonomiassistenten",
  7: "asst-prosjektassistenten",
  8: "asst-rapporteringsassistenten",
  9: "asst-juridisk-assistent",
  10: "asst-strategiassistenten",
} as const;

export type CheckoutAssistantKey =
  (typeof CHECKOUT_ASSISTANT_KEY_BY_NUMERIC_ID)[keyof typeof CHECKOUT_ASSISTANT_KEY_BY_NUMERIC_ID];

export const CHECKOUT_BUNDLE_ALL_KEY = "bundle-alle-10" as const;

export type CheckoutProductKey = CheckoutAssistantKey | typeof CHECKOUT_BUNDLE_ALL_KEY;

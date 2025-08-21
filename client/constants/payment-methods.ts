export const PAYMENT_METHODS = ["کارت به کارت", "نقدی", "سایر"] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const PAYMENT_METHOD_MAP: Record<PaymentMethod, string> = {
  "کارت به کارت": "CARD",
  نقدی: "CASH",
  سایر: "OTHER",
};

export const PAYMENT_METHOD_REVERSE_MAP: Record<string, PaymentMethod> = {
  CARD: "کارت به کارت",
  CASH: "نقدی",
  OTHER: "سایر",
};

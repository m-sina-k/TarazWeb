export const TRANSACTION_CATEGORIES = [
  "خرید روزانه",
  "غذا",
  "حمل و نقل",
  "تفریح و سرگرمی",
  "خرید",
  "سلامتی",
  "سفر",
  "هزینه های خانه",
  "درآمد",
  "سرمایه گذاری",
  "سایر",
] as const;

export type TransactionCategory = (typeof TRANSACTION_CATEGORIES)[number];

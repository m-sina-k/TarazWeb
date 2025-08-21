import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts Persian/Arabic digits to English digits
 * @param str - String containing Persian/Arabic digits
 * @returns String with English digits
 */
export function persianToEnglish(
  str: string | number | undefined | null
): string {
  if (str === null || str === undefined) return "";

  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  let result = String(str);

  persianDigits.forEach((persianDigit, index) => {
    result = result.replace(
      new RegExp(persianDigit, "g"),
      englishDigits[index]
    );
  });

  arabicDigits.forEach((arabicDigit, index) => {
    result = result.replace(new RegExp(arabicDigit, "g"), englishDigits[index]);
  });

  return result;
}

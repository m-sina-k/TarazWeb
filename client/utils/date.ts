import { format } from "date-fns-jalali";
import { faIR } from "date-fns-jalali/locale";

export function formatDateForAPI(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatJalaliDate(
  date: Date | string,
  formatStr: string = "yyyy/MM/dd"
): string {
  let dateObj: Date;

  if (typeof date === "string") {
    const dateMatch = date.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (dateMatch) {
      const [, year, month, day] = dateMatch.map(Number);
      dateObj = new Date(year, month - 1, day);
    } else {
      dateObj = new Date(date);
    }

    if (isNaN(dateObj.getTime())) {
      console.error("Invalid date value:", date);
      return "";
    }
  } else {
    dateObj = date;
  }

  return format(dateObj, formatStr, { locale: faIR });
}

export function formatJalaliDateFull(
  date: Date | string,
  formatStr: string = "EEEE، d MMMM yyyy"
): string {
  let dateObj: Date;

  if (typeof date === "string") {
    const dateMatch = date.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (dateMatch) {
      const [, year, month, day] = dateMatch.map(Number);
      dateObj = new Date(year, month - 1, day);
    } else {
      dateObj = new Date(date);
    }

    if (isNaN(dateObj.getTime())) {
      console.error("Invalid date value:", date);
      return "";
    }
  } else {
    dateObj = date;
  }

  return format(dateObj, formatStr, { locale: faIR });
}

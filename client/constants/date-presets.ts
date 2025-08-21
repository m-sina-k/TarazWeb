export enum DateRangePreset {
  LAST_30_DAYS = "30days",
  LAST_MONTH = "lastMonth",
  LAST_3_MONTHS = "last3Months",
  LAST_YEAR = "lastYear",
  THIS_MONTH = "thisMonth",
  THIS_YEAR = "thisYear",
  ALL_TIME = "allTime",
}

export const DATE_PRESET_LABELS: Record<DateRangePreset, string> = {
  [DateRangePreset.LAST_30_DAYS]: "۳۰ روز گذشته",
  [DateRangePreset.LAST_MONTH]: "ماه گذشته",
  [DateRangePreset.LAST_3_MONTHS]: "۳ ماه گذشته",
  [DateRangePreset.LAST_YEAR]: "سال گذشته",
  [DateRangePreset.THIS_MONTH]: "این ماه",
  [DateRangePreset.THIS_YEAR]: "امسال",
  [DateRangePreset.ALL_TIME]: "همه زمان‌ها",
};

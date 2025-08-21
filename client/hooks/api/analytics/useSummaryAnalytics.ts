"use client";

import { useQuery } from "@tanstack/react-query";
import Http from "@/utils/http";
import type { Dictionary } from "ts-wiz";
import { DateRangePreset } from "@/constants/date-presets";

export interface SummaryAnalyticsFilters {
  preset?: DateRangePreset;
  from?: string;
  to?: string;
}

export interface SummaryAnalytics extends Dictionary {
  availableBalance: number;
  totalIncome: number;
  totalExpenses: number;
  transactionCount: number;
  savingRate: {
    percentage: number;
    expenseRatio: number;
  };
  percentageChange?: {
    availableBalance?: number;
    totalIncome?: number;
    totalExpenses?: number;
    transactionCount?: number;
    savingRate?: number;
  };
}

export interface SummaryAnalyticsResponse extends Dictionary {
  message: string;
  data: SummaryAnalytics;
}

export const useSummaryAnalytics = (filters?: SummaryAnalyticsFilters) => {
  return useQuery({
    queryKey: ["analytics", "summary", filters],
    queryFn: async (): Promise<SummaryAnalyticsResponse> => {
      const params: Dictionary = {};

      if (filters?.preset) params.preset = filters.preset;
      if (filters?.from) params.from = filters.from;
      if (filters?.to) params.to = filters.to;

      return Http.get<SummaryAnalyticsResponse>({
        url: "/api/analytics/summary",
        params,
      });
    },
  });
};

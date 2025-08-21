"use client";

import { useQuery } from "@tanstack/react-query";
import Http from "@/utils/http";
import type { Dictionary } from "ts-wiz";
import { DateRangePreset } from "@/constants/date-presets";

export interface ChartAnalyticsFilters {
  preset?: DateRangePreset;
  from?: string;
  to?: string;
}

export interface ChartDataPoint extends Dictionary {
  date: string;
  income: number;
  expense: number;
}

export interface ChartAnalytics extends Dictionary {
  chartData: ChartDataPoint[];
  totalIncomeCount?: number;
  totalExpenseCount?: number;
  preset?: Dictionary;
}

export interface ChartAnalyticsResponse extends Dictionary {
  message: string;
  data: ChartAnalytics;
}

export const useChartAnalytics = (filters?: ChartAnalyticsFilters) => {
  return useQuery({
    queryKey: ["analytics", "chart", filters],
    queryFn: async (): Promise<ChartAnalyticsResponse> => {
      const params: Dictionary = {};

      if (filters?.preset) params.preset = filters.preset;
      if (filters?.from) params.from = filters.from;
      if (filters?.to) params.to = filters.to;

      return Http.get<ChartAnalyticsResponse>({
        url: "/api/analytics/chart",
        params,
      });
    },
  });
};

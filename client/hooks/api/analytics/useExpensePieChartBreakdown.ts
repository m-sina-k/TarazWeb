"use client";

import { useQuery } from "@tanstack/react-query";
import Http from "@/utils/http";
import type { Dictionary } from "ts-wiz";
import { DateRangePreset } from "@/constants/date-presets";

export interface ExpenseBreakdownFilters {
  preset?: DateRangePreset;
  from?: string;
  to?: string;
}

export interface ExpenseBreakdownItem extends Dictionary {
  category: string;
  amount: number;
  percentage: number;
}

export interface ExpenseBreakdown extends Dictionary {
  breakdown: ExpenseBreakdownItem[];
}

export interface ExpenseBreakdownResponse extends Dictionary {
  message: string;
  data: ExpenseBreakdown;
}

export const useExpensePieChartBreakdown = (
  filters?: ExpenseBreakdownFilters
) => {
  return useQuery({
    queryKey: ["analytics", "expense-breakdown", filters],
    queryFn: async (): Promise<ExpenseBreakdownResponse> => {
      const params: Dictionary = {};

      if (filters?.preset) params.preset = filters.preset;
      if (filters?.from) params.from = filters.from;
      if (filters?.to) params.to = filters.to;

      const response = await Http.get<{
        message: string;
        data: {
          breakdown: Array<{
            name: string;
            value: number;
            percentage: number;
          }>;
        };
      }>({
        url: "/api/analytics/expense-breakdown",
        params,
      });

      return {
        ...response,
        data: {
          breakdown: response.data.breakdown.map((item) => ({
            category: item.name,
            amount: item.value,
            percentage: item.percentage,
          })),
        },
      };
    },
  });
};

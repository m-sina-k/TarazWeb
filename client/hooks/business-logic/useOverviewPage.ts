import { useMemo } from "react";
import { parseAsString, useQueryState } from "nuqs";
import { useSummaryAnalytics } from "@/hooks/api/analytics/useSummaryAnalytics";
import {
  useChartAnalytics,
  type ChartDataPoint,
} from "@/hooks/api/analytics/useChartAnalytics";
import { useExpensePieChartBreakdown } from "@/hooks/api/analytics/useExpensePieChartBreakdown";
import { useGetAllTransactions } from "@/hooks/api/transactions/useGetAllTransactions";
import { useGetCurrentUser } from "@/hooks/api/user/useGetCurrentUser";
import { DateRangePreset } from "@/constants/date-presets";

const datePresetParam = parseAsString.withDefault(DateRangePreset.ALL_TIME);

export function useOverviewPage() {
  const [preset, setPreset] = useQueryState("preset", datePresetParam);
  const { data: userData } = useGetCurrentUser();

  const filters = useMemo(
    () => ({
      preset: preset as DateRangePreset,
    }),
    [preset]
  );

  const {
    data: summaryData,
    isLoading: summaryLoading,
    isError: summaryError,
  } = useSummaryAnalytics(filters);
  const {
    data: chartData,
    isLoading: chartLoading,
    isError: chartError,
  } = useChartAnalytics(filters);
  const {
    data: expenseData,
    isLoading: expenseLoading,
    isError: expenseError,
  } = useExpensePieChartBreakdown(filters);
  const {
    data: transactionsData,
    isLoading: transactionsLoading,
    isError: transactionsError,
  } = useGetAllTransactions({}, { pageSize: 5, pageNumber: 1 });

  const summary = summaryData?.data;
  const chart: ChartDataPoint[] = (
    (chartData?.data?.chartData || []) as unknown as Array<{
      date: string;
      income: number;
      expenses: number;
    }>
  ).map((item) => ({
    date: item.date,
    income: item.income,
    expense: item.expenses,
  }));
  const expenseBreakdown = expenseData?.data?.breakdown || [];
  const recentTransactions = transactionsData?.items || [];

  return {
    preset,
    setPreset,
    userData,
    summary,
    summaryLoading,
    summaryError,
    chart,
    chartLoading,
    chartError,
    expenseBreakdown,
    expenseLoading,
    expenseError,
    recentTransactions,
    transactionsLoading,
    transactionsError,
  };
}

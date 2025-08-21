"use client";

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatJalaliDate } from "@/utils/date";
import type { ChartDataPoint } from "@/hooks/api/analytics/useChartAnalytics";
import { LoadingSpinner } from "../common/loading-spinner";
import { EmptyState } from "../common/empty-state";
import { ErrorState } from "../common/error-state";

interface DashboardChartProps {
  data?: ChartDataPoint[];
  isLoading?: boolean;
  isError?: boolean;
  variant?: "line" | "area";
}

export function DashboardChart({
  data,
  isLoading,
  isError,
  variant = "area",
}: DashboardChartProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return <ErrorState />;
  }

  if (!data || data.length < 2) {
    return <EmptyState />;
  }

  const formattedData = data.map((item) => ({
    ...item,
    date: formatJalaliDate(item.date),
  }));

  const ChartComponent = variant === "area" ? AreaChart : LineChart;
  const IncomeComponent = (variant === "area" ? Area : Line) as typeof Area;
  const ExpenseComponent = (variant === "area" ? Area : Line) as typeof Area;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ChartComponent data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tick={{ fill: "currentColor" }}
          style={{ fontSize: "12px" }}
        />
        <YAxis
          tick={{ fill: "currentColor" }}
          style={{ fontSize: "12px" }}
          tickFormatter={(value) =>
            new Intl.NumberFormat("fa-IR").format(value)
          }
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--popover)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
          }}
          formatter={(value: number) =>
            new Intl.NumberFormat("fa-IR").format(value)
          }
        />
        <Legend />
        <IncomeComponent
          type="monotone"
          dataKey="income"
          stroke="var(--chart-1)"
          fill="var(--chart-1)"
          fillOpacity={variant === "area" ? 0.6 : 1}
          name="درآمد"
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <ExpenseComponent
          type="monotone"
          dataKey="expense"
          stroke="var(--chart-2)"
          fill="var(--chart-2)"
          fillOpacity={variant === "area" ? 0.6 : 1}
          name="هزینه"
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </ChartComponent>
    </ResponsiveContainer>
  );
}

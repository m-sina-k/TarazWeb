"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import type { ExpenseBreakdownItem } from "@/hooks/api/analytics/useExpensePieChartBreakdown";
import { LoadingSpinner } from "../common/loading-spinner";
import { EmptyState } from "../common/empty-state";
import { ErrorState } from "../common/error-state";

interface ExpensePieChartProps {
  data?: ExpenseBreakdownItem[];
  isLoading?: boolean;
  isError?: boolean;
}

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
  "var(--chart-7)",
  "var(--chart-8)",
  "var(--chart-9)",
];

export function ExpensePieChart({
  data,
  isLoading,
  isError,
}: ExpensePieChartProps) {
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

  if (!data || data.length === 0) {
    return <EmptyState />;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={false}
          outerRadius={120}
          fill="var(--chart-1)"
          dataKey="amount"
          nameKey="category"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--popover)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
          }}
          itemStyle={{
            color: "var(--text)",
          }}
          labelStyle={{
            color: "var(--text)",
          }}
          formatter={(value: number) =>
            `${new Intl.NumberFormat("fa-IR").format(value)} تومان`
          }
          labelFormatter={(label) => label}
        />
        <Legend
          formatter={(value: string) => {
            const item = data.find((d) => d.category === value);
            return `${value} (${item?.percentage ?? 0}%)`;
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

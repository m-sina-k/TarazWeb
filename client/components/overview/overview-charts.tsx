"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardChart } from "@/components/charts/dashboard-chart";
import { ExpensePieChart } from "@/components/charts/expense-pie-chart";
import type { ChartDataPoint } from "@/hooks/api/analytics/useChartAnalytics";
import type { ExpenseBreakdownItem } from "@/hooks/api/analytics/useExpensePieChartBreakdown";

interface OverviewChartsProps {
  chartData: ChartDataPoint[];
  chartLoading: boolean;
  chartError?: boolean;
  expenseData: ExpenseBreakdownItem[];
  expenseLoading: boolean;
  expenseError?: boolean;
}

export function OverviewCharts({
  chartData,
  chartLoading,
  chartError,
  expenseData,
  expenseLoading,
  expenseError,
}: OverviewChartsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>نمودار درآمد و هزینه</CardTitle>
        </CardHeader>
        <CardContent>
          <DashboardChart
            data={chartData}
            isLoading={chartLoading}
            isError={chartError}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>توزیع هزینه‌ها</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpensePieChart
            data={expenseData}
            isLoading={expenseLoading}
            isError={expenseError}
          />
        </CardContent>
      </Card>
    </div>
  );
}

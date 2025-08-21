"use client";

import { BalanceStatCard } from "./balance-stat-card";
import { IncomeStatCard } from "./income-stat-card";
import { ExpenseStatCard } from "./expense-stat-card";
import { TransactionCountStatCard } from "./transaction-count-stat-card";
import { ErrorState } from "../common/error-state";
import { Card } from "../ui/card";

interface SummaryData {
  availableBalance?: number;
  totalIncome?: number;
  totalExpenses?: number;
  transactionCount?: number;
  savingRate?: {
    percentage?: number;
  };
  percentageChange?: {
    availableBalance?: number;
    totalIncome?: number;
    totalExpenses?: number;
  };
}

interface OverviewStatsCardsProps {
  summary: SummaryData | undefined;
  isLoading: boolean;
  isError?: boolean;
}

export function OverviewStatsCards({
  summary,
  isLoading,
  isError,
}: OverviewStatsCardsProps) {
  if (isError) {
    return (
      <Card>
        <ErrorState />
      </Card>
    );
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <BalanceStatCard
        value={summary?.availableBalance}
        isLoading={isLoading}
        percentageChange={summary?.percentageChange?.availableBalance}
        delay={0}
      />
      <IncomeStatCard
        value={summary?.totalIncome}
        isLoading={isLoading}
        percentageChange={summary?.percentageChange?.totalIncome}
        delay={50}
      />
      <ExpenseStatCard
        value={summary?.totalExpenses}
        isLoading={isLoading}
        percentageChange={summary?.percentageChange?.totalExpenses}
        delay={100}
      />
      <TransactionCountStatCard
        value={summary?.transactionCount}
        isLoading={isLoading}
        savingRate={summary?.savingRate?.percentage}
        delay={150}
      />
    </div>
  );
}

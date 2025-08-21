"use client";

// Disable static generation since this page uses useSearchParams
export const dynamic = "force-dynamic";

import { Suspense, useCallback } from "react";
import { useQueryState } from "nuqs";
import { parseAsString } from "nuqs";
import { PageLayout } from "@/components/layout/page-layout";
import { DateRangeSelect } from "@/components/date/date-range-select";
import { useOverviewPage } from "@/hooks/business-logic/useOverviewPage";
import { OverviewStatsCards } from "@/components/overview/overview-stats-cards";
import { OverviewCharts } from "@/components/overview/overview-charts";
import { RecentTransactionsTable } from "@/components/overview/recent-transactions-table";
import { DateRangePreset } from "@/constants/date-presets";
import { formatJalaliDateFull } from "@/utils/date";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TransactionSheets } from "@/components/transactions/transaction-sheets";
import {
  useCreateTransaction,
  type CreateTransactionRequest,
} from "@/hooks/api/transactions/useCreateTransaction";
import type { UpdateTransactionRequest } from "@/hooks/api/transactions/useUpdateTransaction";

const addParam = parseAsString;

function OverviewPageContent() {
  const [add, setAdd] = useQueryState("add", addParam);
  const {
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
  } = useOverviewPage();

  const createMutation = useCreateTransaction();

  const isAddOpen = add === "true";
  const setIsAddOpen = useCallback(
    (open: boolean) => {
      setAdd(open ? "true" : null);
    },
    [setAdd]
  );

  const handleAddTransaction = () => {
    setIsAddOpen(true);
  };

  const handleCreate = useCallback(
    async (data: CreateTransactionRequest | UpdateTransactionRequest) => {
      await createMutation.mutateAsync(data as CreateTransactionRequest);
      setIsAddOpen(false);
    },
    [createMutation, setIsAddOpen]
  );

  return (
    <PageLayout
      title={`سلام ${userData?.user?.name || ""} 👋`}
      subtitle={formatJalaliDateFull(new Date())}
      actions={
        <div className="flex items-center gap-2">
          <DateRangeSelect
            value={preset as DateRangePreset}
            onValueChange={setPreset}
            className="flex gap-2"
          />
          <Button onClick={handleAddTransaction}>
            <Plus className="ml-2 h-4 w-4" />
            افزودن تراکنش
          </Button>
        </div>
      }
    >
      <OverviewStatsCards
        summary={summary}
        isLoading={summaryLoading}
        isError={summaryError}
      />
      <OverviewCharts
        chartData={chart}
        chartLoading={chartLoading}
        chartError={chartError}
        expenseData={expenseBreakdown}
        expenseLoading={expenseLoading}
        expenseError={expenseError}
      />
      <RecentTransactionsTable
        transactions={recentTransactions}
        isLoading={transactionsLoading}
        isError={transactionsError}
      />

      <TransactionSheets
        isAddOpen={isAddOpen}
        onAddClose={() => setIsAddOpen(false)}
        editingTransaction={null}
        onEditClose={() => {}}
        onCreate={handleCreate}
        onUpdate={async () => {}}
        isCreating={createMutation.isPending}
        isUpdating={false}
      />
    </PageLayout>
  );
}

export default function OverviewPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OverviewPageContent />
    </Suspense>
  );
}

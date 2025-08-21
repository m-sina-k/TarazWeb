"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { formatJalaliDate } from "@/utils/date";
import type { Transaction } from "@/hooks/api/transactions/useGetAllTransactions";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { EmptyState } from "../common/empty-state";
import { ErrorState } from "../common/error-state";

interface RecentTransactionsTableProps {
  transactions: Transaction[];
  isLoading: boolean;
  isError?: boolean;
}

export function RecentTransactionsTable({
  transactions,
  isLoading,
  isError,
}: RecentTransactionsTableProps) {
  const columns: ColumnDef<Transaction>[] = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "عنوان",
      },
      {
        accessorKey: "type",
        header: "نوع",
        cell: ({ row }) => {
          const type = row.getValue("type") as string;
          return (
            <Badge variant={type === "INCOME" ? "success" : "destructive"}>
              {type === "INCOME" ? "درآمد" : "هزینه"}
            </Badge>
          );
        },
      },
      {
        accessorKey: "amount",
        header: "مبلغ",
        cell: ({ row }) => {
          const amount = row.getValue("amount") as number;
          return new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
        },
      },
      {
        accessorKey: "date",
        header: "تاریخ",
        cell: ({ row }) => {
          const date = row.getValue("date") as string;
          return formatJalaliDate(date);
        },
      },
    ],
    []
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>تراکنش‌های اخیر</span>
          <Link
            href="/transactions"
            className="flex items-center gap-2 text-sm underline text-primary"
          >
            همه تراکنش ها
            <ArrowLeftIcon className="w-4 h-4" />
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isError ? (
          <ErrorState />
        ) : transactions.length > 0 ? (
          <DataTable
            columns={columns}
            data={transactions}
            isLoading={isLoading}
          />
        ) : (
          <EmptyState />
        )}
      </CardContent>
    </Card>
  );
}

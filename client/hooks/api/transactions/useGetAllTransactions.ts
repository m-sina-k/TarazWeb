"use client";

import { useQuery } from "@tanstack/react-query";
import Http from "@/utils/http";
import type { Dictionary } from "ts-wiz";

export interface TransactionFilters {
  keyword?: string;
  type?: "INCOME" | "EXPENSE";
  recurringStatus?: "RECURRING" | "NON_RECURRING";
}

export interface TransactionPagination {
  pageSize?: number;
  pageNumber?: number;
}

export interface Transaction extends Dictionary {
  _id: string;
  userId: string;
  title: string;
  type: "INCOME" | "EXPENSE";
  amount: number;
  description?: string;
  category: string;
  date: string;
  isRecurring: boolean;
  recurringInterval?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | null;
  nextRecurringDate?: string | null;
  lastProcessed?: string | null;
  status: "PENDING" | "COMPLETED" | "FAILED";
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllTransactionsResponse extends Dictionary {
  message: string;
  items: Transaction[];
  pagination: {
    pageSize: number;
    pageNumber: number;
    totalCount: number;
    totalPages: number;
    skip: number;
  };
}

export const useGetAllTransactions = (
  filters?: TransactionFilters,
  pagination?: TransactionPagination
) => {
  return useQuery({
    queryKey: ["transactions", filters, pagination],
    queryFn: async (): Promise<GetAllTransactionsResponse> => {
      const params: Dictionary = {};

      if (filters?.keyword) params.keyword = filters.keyword;
      if (filters?.type) params.type = filters.type;
      if (filters?.recurringStatus)
        params.recurringStatus = filters.recurringStatus;
      if (pagination?.pageSize)
        params.pageSize = pagination.pageSize.toString();
      if (pagination?.pageNumber)
        params.pageNumber = pagination.pageNumber.toString();

      return Http.get<GetAllTransactionsResponse>({
        url: "/api/transaction/all",
        params,
      });
    },
  });
};

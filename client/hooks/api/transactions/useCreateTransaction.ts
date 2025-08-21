"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Http from "@/utils/http";
import { getErrorMessage } from "@/utils/error-messages";
import type { Dictionary } from "ts-wiz";

export interface CreateTransactionRequest extends Dictionary {
  title: string;
  type: "INCOME" | "EXPENSE";
  amount: number;
  description?: string;
  category: string;
  date: string | Date;
  isRecurring?: boolean;
  recurringInterval?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | null;
  paymentMethod: string;
}

export interface CreateTransactionResponse extends Dictionary {
  message: string;
  transaction: Dictionary;
}

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: CreateTransactionRequest
    ): Promise<CreateTransactionResponse> => {
      return Http.post<CreateTransactionResponse>({
        url: "/api/transaction/create",
        data: {
          ...data,
          date: data.date instanceof Date ? data.date.toISOString() : data.date,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
      toast.success("تراکنش با موفقیت ایجاد شد");
    },
    onError: (error: unknown) => {
      const errorResponse = error as {
        response?: {
          data?: {
            message?: string;
            errorCode?: string;
          };
        };
        message?: string;
      };

      const errorCode =
        errorResponse?.response?.data?.errorCode ||
        (errorResponse as { errorCode?: string })?.errorCode;
      const serverMessage = errorResponse?.response?.data?.message;

      const errorMessage = getErrorMessage(
        errorCode,
        serverMessage || "خطا در ایجاد تراکنش"
      );

      toast.error(errorMessage);
    },
  });
};

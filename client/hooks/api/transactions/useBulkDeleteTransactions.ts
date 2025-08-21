"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Http from "@/utils/http";
import { getErrorMessage } from "@/utils/error-messages";
import type { Dictionary } from "ts-wiz";

export interface BulkDeleteTransactionsRequest extends Dictionary {
  transactionIds: string[];
}

export interface BulkDeleteTransactionsResponse extends Dictionary {
  message: string;
  deletedCount?: number;
}

export const useBulkDeleteTransactions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: BulkDeleteTransactionsRequest
    ): Promise<BulkDeleteTransactionsResponse> => {
      return Http.delete<BulkDeleteTransactionsResponse>({
        url: "/api/transaction/bulk-delete",
        data,
      });
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
      toast.success(`${response.deletedCount || 0} تراکنش با موفقیت حذف شد`);
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
        serverMessage || "خطا در حذف تراکنش‌ها"
      );

      toast.error(errorMessage);
    },
  });
};

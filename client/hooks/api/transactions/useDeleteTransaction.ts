"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Http from "@/utils/http";
import { getErrorMessage } from "@/utils/error-messages";
import type { Dictionary } from "ts-wiz";

export interface DeleteTransactionResponse extends Dictionary {
  message: string;
}

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<DeleteTransactionResponse> => {
      return Http.delete<DeleteTransactionResponse>({
        url: `/api/transaction/delete/${id}`,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
      toast.success("تراکنش با موفقیت حذف شد");
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
        serverMessage || "خطا در حذف تراکنش"
      );

      toast.error(errorMessage);
    },
  });
};

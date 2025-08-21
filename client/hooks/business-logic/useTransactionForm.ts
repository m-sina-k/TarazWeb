import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  transactionFormSchema,
  type TransactionFormValues,
} from "@/components/forms/transaction-form/transaction-form-schema";
import { PAYMENT_METHOD_MAP } from "@/constants/payment-methods";
import { formatDateForAPI } from "@/utils/date";
import type { CreateTransactionRequest } from "@/hooks/api/transactions/useCreateTransaction";
import type { UpdateTransactionRequest } from "@/hooks/api/transactions/useUpdateTransaction";

interface UseTransactionFormParams {
  defaultValues?: Partial<TransactionFormValues>;
  onSubmit: (
    data: CreateTransactionRequest | UpdateTransactionRequest
  ) => void | Promise<void>;
}

export function useTransactionForm({
  defaultValues,
  onSubmit,
}: UseTransactionFormParams) {
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      title: "",
      type: "EXPENSE",
      amount: 0,
      category: "",
      paymentMethod: "",
      isRecurring: false,
      date: defaultValues?.date || new Date(),
      description: "",
      ...defaultValues,
    },
  });

  const isRecurring = form.watch("isRecurring");

  const handleSubmit = (values: TransactionFormValues) => {
    const paymentMethod =
      PAYMENT_METHOD_MAP[
        values.paymentMethod as keyof typeof PAYMENT_METHOD_MAP
      ] || values.paymentMethod;

    onSubmit({
      ...values,
      paymentMethod,
      date: formatDateForAPI(values.date),
      recurringInterval: values.isRecurring
        ? values.recurringInterval || null
        : null,
    });
  };

  return {
    form,
    isRecurring,
    handleSubmit,
  };
}

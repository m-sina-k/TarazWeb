"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useTransactionForm } from "@/hooks/business-logic/useTransactionForm";
import { TransactionFormFields } from "./transaction-form/transaction-form-fields";
import type { TransactionFormValues } from "./transaction-form/transaction-form-schema";
import type { CreateTransactionRequest } from "@/hooks/api/transactions/useCreateTransaction";
import type { UpdateTransactionRequest } from "@/hooks/api/transactions/useUpdateTransaction";
import { LoadingSpinner } from "../common/loading-spinner";

interface TransactionFormProps {
  defaultValues?: Partial<TransactionFormValues>;
  onSubmit: (
    data: CreateTransactionRequest | UpdateTransactionRequest
  ) => void | Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
}

export function TransactionForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel = "ذخیره",
}: TransactionFormProps) {
  const { form, isRecurring, handleSubmit } = useTransactionForm({
    defaultValues,
    onSubmit,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <TransactionFormFields form={form} isRecurring={isRecurring} />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <LoadingSpinner size="sm" variant="white" />
          ) : (
            submitLabel
          )}
        </Button>
      </form>
    </Form>
  );
}

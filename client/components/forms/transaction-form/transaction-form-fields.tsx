"use client";

import { UseFormReturn } from "react-hook-form";
import { BasicFields } from "./fields/basic-fields";
import { DateField } from "./fields/date-field";
import { PaymentFields } from "./fields/payment-fields";
import { RecurringFields } from "./fields/recurring-fields";
import type { TransactionFormValues } from "./transaction-form-schema";

interface TransactionFormFieldsProps {
  form: UseFormReturn<TransactionFormValues>;
  isRecurring: boolean;
}

export function TransactionFormFields({
  form,
  isRecurring,
}: TransactionFormFieldsProps) {
  return (
    <>
      <BasicFields form={form} />
      <DateField form={form} />
      <PaymentFields form={form} />
      <RecurringFields form={form} isRecurring={isRecurring} />
    </>
  );
}

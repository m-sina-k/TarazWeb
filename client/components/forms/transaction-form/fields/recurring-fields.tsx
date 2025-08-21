"use client";

import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { TransactionFormValues } from "../transaction-form-schema";

const RECURRING_INTERVALS = [
  { value: "DAILY", label: "روزانه" },
  { value: "WEEKLY", label: "هفتگی" },
  { value: "MONTHLY", label: "ماهانه" },
  { value: "YEARLY", label: "سالانه" },
] as const;

interface RecurringFieldsProps {
  form: UseFormReturn<TransactionFormValues>;
  isRecurring: boolean;
}

export function RecurringFields({ form, isRecurring }: RecurringFieldsProps) {
  useEffect(() => {
    if (!isRecurring) {
      form.setValue("recurringInterval", null);
    }
  }, [isRecurring, form]);

  return (
    <>
      <FormField
        control={form.control}
        name="isRecurring"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start justify-between rounded-lg p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">تراکنش تکرار شونده</FormLabel>
              <FormDescription>
                این تراکنش به صورت خودکار تکرار می‌شود
              </FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      {isRecurring && (
        <FormField
          control={form.control}
          name="recurringInterval"
          render={({ field }) => (
            <FormItem>
              <FormLabel>بازه تکرار</FormLabel>
              <Select
                onValueChange={(value) =>
                  field.onChange(
                    value as "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY"
                  )
                }
                value={field.value || undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="بازه تکرار را انتخاب کنید" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {RECURRING_INTERVALS.map((interval) => (
                    <SelectItem key={interval.value} value={interval.value}>
                      {interval.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
}

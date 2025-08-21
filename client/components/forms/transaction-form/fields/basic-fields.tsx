"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PersianCurrencyInput } from "@/components/ui/persian-currency-input";
import { TRANSACTION_CATEGORIES } from "@/constants/categories";
import type { TransactionFormValues } from "../transaction-form-schema";

interface BasicFieldsProps {
  form: UseFormReturn<TransactionFormValues>;
}

export function BasicFields({ form }: BasicFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>عنوان</FormLabel>
            <FormControl>
              <Input placeholder="عنوان تراکنش" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>نوع</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="نوع تراکنش را انتخاب کنید" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="INCOME">درآمد</SelectItem>
                <SelectItem value="EXPENSE">هزینه</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>مبلغ</FormLabel>
            <FormControl>
              <PersianCurrencyInput
                id="amount"
                name="amount"
                placeholder="0"
                decimalsLimit={0}
                prefix=""
                suffix=" تومان"
                onValueChange={(value, name, values) => {
                  field.onChange(values?.float || 0);
                }}
                value={field.value}
                className="flex h-10 w-full rounded-md border border-input bg-foreground px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>دسته‌بندی</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="دسته‌بندی را انتخاب کنید" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {TRANSACTION_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

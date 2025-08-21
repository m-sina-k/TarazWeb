"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { formatJalaliDate } from "@/utils/date";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CalendarHijri as Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { TransactionFormValues } from "../transaction-form-schema";

interface DateFieldProps {
  form: UseFormReturn<TransactionFormValues>;
}

export function DateField({ form }: DateFieldProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <FormField
      control={form.control}
      name="date"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>تاریخ</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-right font-normal bg-foreground",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    formatJalaliDate(field.value)
                  ) : (
                    <span>انتخاب تاریخ</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date);
                  setOpen(false);
                }}
                defaultMonth={field.value}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TransactionsFiltersProps {
  keyword: string;
  onKeywordChange: (value: string) => void;
  type: string | null;
  onTypeChange: (value: string | null) => void;
  recurringStatus: string | null;
  onRecurringStatusChange: (value: string | null) => void;
}

export function TransactionsFilters({
  keyword,
  onKeywordChange,
  type,
  onTypeChange,
  recurringStatus,
  onRecurringStatusChange,
}: TransactionsFiltersProps) {
  const hasActiveFilters = keyword || type || recurringStatus;

  const handleClearFilters = () => {
    onKeywordChange("");
    onTypeChange(null);
    onRecurringStatusChange(null);
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
      <div className="relative flex-1 w-full sm:max-w-[400px]">
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="جستجو با نام یا دسته بندی"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          className="pr-9 h-[40px]"
        />
      </div>
      <Select value={type || undefined} onValueChange={onTypeChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="نوع" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="INCOME">درآمد</SelectItem>
          <SelectItem value="EXPENSE">هزینه</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={recurringStatus || undefined}
        onValueChange={onRecurringStatusChange}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="تکرار" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="RECURRING">تکرار شونده</SelectItem>
          <SelectItem value="NON_RECURRING">غیر تکرار شونده</SelectItem>
        </SelectContent>
      </Select>
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={handleClearFilters}
          className="w-full sm:w-auto h-[40px]"
        >
          <X className="ml-2 h-4 w-4" />
          پاک کردن فیلترها
        </Button>
      )}
    </div>
  );
}

"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePreset, DATE_PRESET_LABELS } from "@/constants/date-presets";

interface DateRangeSelectProps {
  value?: DateRangePreset;
  onValueChange?: (value: DateRangePreset) => void;
  className?: string;
}

export function DateRangeSelect({
  value,
  onValueChange,
  className,
}: DateRangeSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(val) => onValueChange?.(val as DateRangePreset)}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder="انتخاب بازه زمانی" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(DateRangePreset).map((preset) => (
          <SelectItem key={preset} value={preset}>
            {DATE_PRESET_LABELS[preset]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

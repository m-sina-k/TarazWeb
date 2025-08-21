"use client";

import React, { useRef, useEffect } from "react";
import CurrencyInput, {
  type CurrencyInputProps,
} from "react-currency-input-field";
import { persianToEnglish } from "@/lib/utils";

type PersianCurrencyInputProps = CurrencyInputProps;

export function PersianCurrencyInput({
  onValueChange,
  ...props
}: PersianCurrencyInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isConvertingRef = useRef(false);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const persianDigitMap: Record<string, string> = {
      "۰": "0",
      "۱": "1",
      "۲": "2",
      "۳": "3",
      "۴": "4",
      "۵": "5",
      "۶": "6",
      "۷": "7",
      "۸": "8",
      "۹": "9",
    };

    const insertTextAtCursor = (text: string) => {
      if (!input) return;

      isConvertingRef.current = true;

      const start = input.selectionStart || 0;
      const end = input.selectionEnd || 0;

      try {
        input.setRangeText(text, start, end, "end");

        const inputEvent = new Event("input", { bubbles: true });
        input.dispatchEvent(inputEvent);
      } catch {
        const currentValue = input.value;
        const newValue =
          currentValue.substring(0, start) + text + currentValue.substring(end);
        input.value = newValue;
        input.setSelectionRange(start + text.length, start + text.length);

        const inputEvent = new Event("input", { bubbles: true });
        input.dispatchEvent(inputEvent);
      }

      setTimeout(() => {
        isConvertingRef.current = false;
      }, 0);
    };

    const handleBeforeInput = (e: InputEvent) => {
      if (isConvertingRef.current) return;

      if (e.data) {
        const convertedData = persianToEnglish(e.data);
        if (convertedData !== e.data) {
          e.preventDefault();

          insertTextAtCursor(convertedData);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isConvertingRef.current) return;

      const key = e.key;
      if (persianDigitMap[key]) {
        e.preventDefault();
        e.stopPropagation();

        insertTextAtCursor(persianDigitMap[key]);
      }
    };

    const handlePaste = (e: ClipboardEvent) => {
      if (isConvertingRef.current) return;

      const pastedText = e.clipboardData?.getData("text") || "";
      const convertedText = persianToEnglish(pastedText);

      if (pastedText !== convertedText) {
        e.preventDefault();
        e.stopPropagation();

        insertTextAtCursor(convertedText);
      }
    };

    input.addEventListener("beforeinput", handleBeforeInput, true);
    input.addEventListener("keydown", handleKeyDown, true);
    input.addEventListener("paste", handlePaste, true);

    return () => {
      input.removeEventListener("beforeinput", handleBeforeInput, true);
      input.removeEventListener("keydown", handleKeyDown, true);
      input.removeEventListener("paste", handlePaste, true);
    };
  }, []);

  const handleValueChange: CurrencyInputProps["onValueChange"] = (
    value,
    name,
    values
  ) => {
    if (value) {
      const convertedValue = persianToEnglish(value);
      if (convertedValue !== value && onValueChange) {
        const floatValue = convertedValue
          ? parseFloat(convertedValue.replace(/,/g, ""))
          : null;
        onValueChange(
          convertedValue,
          name,
          values
            ? {
                ...values,
                float: floatValue,
                value: convertedValue,
              }
            : undefined
        );
        return;
      }
    }

    if (onValueChange) {
      onValueChange(value, name, values);
    }
  };

  return (
    <CurrencyInput
      {...props}
      ref={inputRef}
      onValueChange={handleValueChange}
    />
  );
}

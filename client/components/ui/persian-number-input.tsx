"use client";

import React, { useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { persianToEnglish } from "@/lib/utils";
import type { ComponentProps } from "react";

interface PersianNumberInputProps extends ComponentProps<typeof Input> {
  type?: "number" | "text";
}

export function PersianNumberInput({
  onChange,
  onKeyDown,
  onPaste,
  ...props
}: PersianNumberInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const handleKeyDown = (e: KeyboardEvent) => {
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

      const key = e.key;
      if (persianDigitMap[key]) {
        e.preventDefault();
        e.stopPropagation();

        const start = input.selectionStart || 0;
        const end = input.selectionEnd || 0;
        const currentValue = input.value;
        const newValue =
          currentValue.substring(0, start) +
          persianDigitMap[key] +
          currentValue.substring(end);

        input.value = newValue;

        const newCursorPos = start + 1;
        input.setSelectionRange(newCursorPos, newCursorPos);

        const inputEvent = new Event("input", { bubbles: true });
        input.dispatchEvent(inputEvent);

        if (onKeyDown) {
          const syntheticEvent = {
            ...e,
            key: persianDigitMap[key],
            preventDefault: () => {},
            stopPropagation: () => {},
          } as unknown as React.KeyboardEvent<HTMLInputElement>;
          onKeyDown(syntheticEvent);
        }
        return;
      }

      if (onKeyDown) {
        onKeyDown(e as unknown as React.KeyboardEvent<HTMLInputElement>);
      }
    };

    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const pastedText = e.clipboardData?.getData("text") || "";
      const convertedText = persianToEnglish(pastedText);

      const start = input.selectionStart || 0;
      const end = input.selectionEnd || 0;
      const currentValue = input.value;
      const newValue =
        currentValue.substring(0, start) +
        convertedText +
        currentValue.substring(end);

      input.value = newValue;
      const newCursorPos = start + convertedText.length;
      input.setSelectionRange(newCursorPos, newCursorPos);

      const inputEvent = new Event("input", { bubbles: true });
      input.dispatchEvent(inputEvent);

      if (onPaste) {
        const syntheticEvent = {
          ...e,
          clipboardData: {
            ...e.clipboardData,
            getData: () => convertedText,
          },
        } as unknown as React.ClipboardEvent<HTMLInputElement>;
        onPaste(syntheticEvent);
      }
    };

    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const originalValue = target.value;
      const convertedValue = persianToEnglish(originalValue);

      if (originalValue !== convertedValue) {
        const start = target.selectionStart || 0;
        const diff = convertedValue.length - originalValue.length;

        target.value = convertedValue;
        target.setSelectionRange(start + diff, start + diff);

        if (onChange) {
          const syntheticEvent = {
            ...e,
            target: { ...target, value: convertedValue },
            currentTarget: { ...target, value: convertedValue },
          } as unknown as React.ChangeEvent<HTMLInputElement>;
          onChange(syntheticEvent);
        }
      }
    };

    input.addEventListener("keydown", handleKeyDown);
    input.addEventListener("paste", handlePaste);
    input.addEventListener("input", handleInput);

    return () => {
      input.removeEventListener("keydown", handleKeyDown);
      input.removeEventListener("paste", handlePaste);
      input.removeEventListener("input", handleInput);
    };
  }, [onChange, onKeyDown, onPaste]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const convertedValue = persianToEnglish(e.target.value);
    if (convertedValue !== e.target.value) {
      e.target.value = convertedValue;
    }

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Input
      {...props}
      ref={inputRef}
      onChange={handleChange}
      type={props.type === "number" ? "text" : props.type || "text"}
      inputMode={props.type === "number" ? "numeric" : props.inputMode}
    />
  );
}

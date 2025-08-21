"use client";

import { cn } from "@/lib/utils";

export interface LoadingSpinnerProps {
  /**
   * Size of the spinner
   * @default "md"
   */
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Color variant of the spinner
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "muted" | "destructive" | "white";
}

const sizeClasses = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-[3px]",
  xl: "h-12 w-12 border-4",
  "2xl": "h-16 w-16 border-4",
};

const variantClasses = {
  primary: "border-primary border-t-transparent",
  secondary: "border-secondary border-t-transparent",
  muted: "border-muted-foreground border-t-transparent",
  destructive: "border-destructive border-t-transparent",
  white: "border-white border-t-transparent",
};

export function LoadingSpinner({
  size = "md",
  className,
  variant = "primary",
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("inline-block", className)}
    >
      <div
        className={cn(
          "animate-spin rounded-full",
          sizeClasses[size],
          variantClasses[variant]
        )}
      />
      <span className="sr-only">در حال بارگذاری...</span>
    </div>
  );
}

"use client";

import type { PropsWithChildren, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageLayoutProps extends PropsWithChildren {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}

export function PageLayout({
  children,
  title,
  subtitle,
  actions,
  className,
}: PageLayoutProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {(title || subtitle || actions) && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {title && (
              <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            )}
            {subtitle && (
              <p className="text-muted-foreground mt-2">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

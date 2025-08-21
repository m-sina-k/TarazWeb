"use client";

import { PageLayout } from "@/components/layout/page-layout";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function AppearanceSettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const themes = [
    {
      value: "light",
      label: "روشن",
      image: "/images/light-theme.svg",
    },
    {
      value: "dark",
      label: "تاریک",
      image: "/images/dark-theme.svg",
    },
    {
      value: "system",
      label: "سیستمی",
      image: "/images/system-theme.svg",
    },
  ];

  return (
    <PageLayout title="ظاهر" subtitle="تنظیمات نمایش و تم">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {themes.map((themeOption) => (
          <button
            key={themeOption.value}
            onClick={() => setTheme(themeOption.value)}
            className={cn(
              "flex flex-col gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all flex-1",
              "hover:bg-accent/50",
              theme === themeOption.value
                ? "border-primary bg-accent"
                : "border-border hover:border-primary/50"
            )}
          >
            <div className="font-medium text-center">{themeOption.label}</div>
            <div className="relative w-full h-32 rounded-md overflow-hidden bg-background">
              <Image
                src={themeOption.image}
                alt={themeOption.label}
                fill
                className="object-contain p-2"
              />
            </div>
          </button>
        ))}
      </div>
    </PageLayout>
  );
}

"use client";

import { StatCard } from "./stat-card";

interface IncomeStatCardProps {
  value: number | undefined;
  isLoading: boolean;
  percentageChange?: number;
  delay?: number;
}

export function IncomeStatCard({
  value,
  isLoading,
  percentageChange,
  delay,
}: IncomeStatCardProps) {
  return (
    <StatCard
      title="کل درآمد"
      icon="/images/money-add.png"
      value={value}
      isLoading={isLoading}
      suffix="تومان"
      percentageChange={percentageChange}
      textColor={"text-green-500"}
      delay={delay}
    />
  );
}

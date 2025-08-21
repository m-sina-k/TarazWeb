"use client";

import { StatCard } from "./stat-card";

interface ExpenseStatCardProps {
  value: number | undefined;
  isLoading: boolean;
  percentageChange?: number;
  delay?: number;
}

export function ExpenseStatCard({
  value,
  isLoading,
  percentageChange,
  delay,
}: ExpenseStatCardProps) {
  return (
    <StatCard
      title="کل هزینه"
      icon="/images/money-remove.png"
      value={value}
      isLoading={isLoading}
      suffix="تومان"
      percentageChange={percentageChange}
      percentageChangeColor="red"
      reversePercentageColor={true}
      textColor="text-red-500"
      delay={delay}
    />
  );
}

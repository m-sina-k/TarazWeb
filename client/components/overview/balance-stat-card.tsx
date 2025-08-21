"use client";

import { StatCard } from "./stat-card";

interface BalanceStatCardProps {
  value: number | undefined;
  isLoading: boolean;
  percentageChange?: number;
  delay?: number;
}

export function BalanceStatCard({
  value,
  isLoading,
  percentageChange,
  delay,
}: BalanceStatCardProps) {
  const textColor =
    value !== undefined && value < 0 ? "text-red-500" : "text-green-500";
  return (
    <StatCard
      title="موجودی"
      icon="/images/wallet.png"
      value={value}
      isLoading={isLoading}
      suffix="تومان"
      percentageChange={percentageChange}
      percentageChangeColor="green"
      textColor={textColor}
      delay={delay}
    />
  );
}

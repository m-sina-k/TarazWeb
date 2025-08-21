"use client";

import { StatCard } from "./stat-card";

interface TransactionCountStatCardProps {
  value: number | undefined;
  isLoading: boolean;
  savingRate?: number;
  delay?: number;
}

export function TransactionCountStatCard({
  value,
  isLoading,
  savingRate,
  delay,
}: TransactionCountStatCardProps) {
  const savingRateValue = Number(savingRate?.toFixed(0) || 0);
  const savingRateAbsoluteValue =
    savingRateValue >= 0 ? savingRateValue : `${Math.abs(savingRateValue)} - `;
  return (
    <StatCard
      title="تعداد تراکنش"
      icon="/images/transaction.png"
      value={value}
      isLoading={isLoading}
      subtitle={`نرخ پس‌انداز: %${savingRateAbsoluteValue}`}
      delay={delay}
    />
  );
}

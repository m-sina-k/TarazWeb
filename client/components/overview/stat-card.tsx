"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CountUp from "react-countup";
import { LoadingSpinner } from "../common/loading-spinner";
import { useSpring, animated } from "@react-spring/web";
import { useEffect } from "react";

interface StatCardProps {
  title: string;
  icon: string;
  value: number | undefined;
  isLoading: boolean;
  suffix?: string;
  subtitle?: string;
  percentageChange?: number;
  percentageChangeColor?: "green" | "red";
  reversePercentageColor?: boolean;
  textColor?: string;
  delay?: number;
}

export function StatCard({
  title,
  icon,
  value,
  isLoading,
  suffix,
  subtitle,
  percentageChange,
  percentageChangeColor = "green",
  reversePercentageColor = false,
  textColor,
  delay = 0,
}: StatCardProps) {
  const [springs, api] = useSpring(() => ({
    from: { opacity: 0, transform: "scale(0.95)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: { tension: 200, friction: 20 },
    delay,
  }));

  useEffect(() => {
    if (!isLoading && value !== undefined) {
      api.start({
        from: { opacity: 0, transform: "scale(0.95)" },
        to: { opacity: 1, transform: "scale(1)" },
        delay,
      });
    }
  }, [isLoading, value, delay, api]);

  const getPercentageColor = (change: number) => {
    if (reversePercentageColor) {
      return change >= 0 ? "text-red-600" : "text-green-600";
    }
    return change >= 0
      ? percentageChangeColor === "green"
        ? "text-green-600"
        : "text-red-600"
      : percentageChangeColor === "green"
      ? "text-red-600"
      : "text-green-600";
  };

  return (
    <animated.div style={springs}>
      <Card className="min-h-[180px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Image src={icon} alt={title} width={50} height={50} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? (
              <div className="flex items-center justify-center mt-4">
                <LoadingSpinner size="md" />
              </div>
            ) : (
              <div className="flex items-center">
                <span className={textColor}>
                  <CountUp
                    end={value !== undefined ? Math.abs(value) : 0}
                    duration={1}
                    separator=","
                    decimals={0}
                  />
                </span>
                {value !== undefined && value < 0 && (
                  <p className="text-red-500"> - </p>
                )}
                {suffix && <span className="mr-2 text-xl">{suffix}</span>}
              </div>
            )}
          </div>
          {percentageChange !== undefined && (
            <p
              className={`text-xs flex items-center mt-1 ${getPercentageColor(
                percentageChange
              )}`}
            >
              {percentageChange >= 0 ? (
                <span className="mr-1">↑</span>
              ) : (
                <span className="mr-1">↓</span>
              )}
              {Math.abs(percentageChange).toFixed(1)}%
            </p>
          )}
          {subtitle && !isLoading && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </CardContent>
      </Card>
    </animated.div>
  );
}

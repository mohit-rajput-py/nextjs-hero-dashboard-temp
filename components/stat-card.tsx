"use client";

import { Card, Chip } from "@heroui/react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down";
}

export function StatCard({ title, value, trend, trendDirection }: StatCardProps) {
  return (
    <Card className="p-4 rounded-xl shadow-sm border border-divider">
      <dt className="text-sm text-default-400 font-medium">{title}</dt>
      <div className="flex items-center justify-between mt-2">
        <dd className="text-2xl font-semibold tabular-nums text-foreground">
          {value}
        </dd>
        <Chip
          size="sm"
          color={trendDirection === "up" ? "success" : "danger"}
          variant="soft"
        >
          {trendDirection === "up" ? (
            <TrendingUp className="size-3" />
          ) : (
            <TrendingDown className="size-3" />
          )}
          <Chip.Label>{trend}</Chip.Label>
        </Chip>
      </div>
    </Card>
  );
}

"use client";

import { Card, Button } from "@heroui/react";
import { MoreVertical } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", organic: 2000, paidAds: 1000 },
  { month: "Feb", organic: 15000, paidAds: 10000 },
  { month: "Mar", organic: 8000, paidAds: 12000 },
  { month: "Apr", organic: 14000, paidAds: 14000 },
  { month: "May", organic: 15000, paidAds: 8000 },
  { month: "Jun", organic: 8000, paidAds: 9000 },
  { month: "Jul", organic: 18000, paidAds: 12000 },
  { month: "Aug", organic: 18000, paidAds: 10000 },
  { month: "Sep", organic: 20000, paidAds: 5000 },
  { month: "Oct", organic: 17000, paidAds: 12000 },
  { month: "Nov", organic: 22000, paidAds: 18000 },
  { month: "Dec", organic: 15000, paidAds: 9000 },
];

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="size-3 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-xs text-default-400">{label}</span>
    </div>
  );
}

export function TrafficChart() {
  return (
    <Card className="rounded-2xl shadow-none border border-divider overflow-hidden">
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <h3 className="text-base font-semibold text-foreground">
          Traffic Source
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <LegendDot color="#338ef7" label="Organic" />
            <LegendDot color="#7dd3fc" label="Paid Ads" />
          </div>
          <Button
            isIconOnly
            size="sm"
            variant="tertiary"
            aria-label="More options"
          >
            <MoreVertical className="size-4" />
          </Button>
        </div>
      </div>

      <div className="px-4 pb-3">
        <div className="mb-3">
          <span className="text-lg font-semibold tabular-nums text-foreground">
            231,856
          </span>
          <span className="text-xs text-default-400 ml-1">Sessions</span>
        </div>

        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e4e4e7"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "#a1a1aa" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "#a1a1aa" }}
              tickFormatter={(v: number) =>
                v >= 1000 ? `${v / 1000}k` : `${v}`
              }
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #e4e4e7",
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                fontSize: 13,
              }}
            />
            <Line
              type="monotone"
              dataKey="organic"
              stroke="#338ef7"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="paidAds"
              stroke="#7dd3fc"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

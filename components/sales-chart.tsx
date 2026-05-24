"use client";

import { Card, Chip, Select, ListBox } from "@heroui/react";
import { TrendingUp } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { month: "01", sales: 30 },
  { month: "02", sales: 53 },
  { month: "03", sales: 35 },
  { month: "04", sales: 17 },
  { month: "05", sales: 44 },
  { month: "06", sales: 24 },
  { month: "07", sales: 26 },
  { month: "08", sales: 31 },
  { month: "09", sales: 10 },
  { month: "10", sales: 44 },
  { month: "11", sales: 38 },
  { month: "12", sales: 32 },
];

interface MiniStatProps {
  value: string;
  trend: string;
  label: string;
}

function MiniStat({ value, trend, label }: MiniStatProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1.5">
        <span className="text-lg font-semibold tabular-nums text-foreground">
          {value}
        </span>
        <Chip size="sm" color="success" variant="soft" className="bg-transparent">
          <TrendingUp className="size-3" />
          <Chip.Label>{trend}</Chip.Label>
        </Chip>
      </div>
      <span className="text-xs text-default-400">{label}</span>
    </div>
  );
}

export function SalesChart() {
  return (
    <Card className="rounded-2xl shadow-sm border border-divider overflow-hidden">
      <div className="flex items-center justify-between px-5 pt-5 pb-2">
        <h3 className="text-base font-semibold text-foreground">
          Sales Performance
        </h3>
        <Select
          variant="secondary"
          className="w-[140px]"
          defaultSelectedKey="last-2-weeks"
          aria-label="Time period"
          placeholder="Select period"
        >
          <Select.Trigger className="h-auto min-h-0 px-3 py-1.5 text-xs">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="last-week" textValue="Last week">
                Last week
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="last-2-weeks" textValue="Last 2 weeks">
                Last 2 weeks
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="last-month" textValue="Last month">
                Last month
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="last-3-months" textValue="Last 3 months">
                Last 3 months
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      <div className="px-5 pb-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-4">
          <MiniStat value="US$28,441" trend="3.3%" label="Weekly Sales" />
          <MiniStat value="US$4,063" trend="3.3%" label="Daily Sales" />
          <MiniStat value="278" trend="3.3%" label="Total Sales" />
        </div>

        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={data} barSize={16}>
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
            />
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #e4e4e7",
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                fontSize: 13,
              }}
            />
            <Bar
              dataKey="sales"
              fill="#006FEE"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

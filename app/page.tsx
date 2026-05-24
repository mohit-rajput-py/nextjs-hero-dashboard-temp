"use client";

import { Tabs, Button, ButtonGroup } from "@heroui/react";
import { RefreshCw, Calendar, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import { StatCard } from "@/components/stat-card";
import { EmployeeTable } from "@/components/employee-table";

const SalesChart = dynamic(() => import("@/components/sales-chart").then(m => ({ default: m.SalesChart })), { ssr: false });
const TrafficChart = dynamic(() => import("@/components/traffic-chart").then(m => ({ default: m.TrafficChart })), { ssr: false });

export default function DashboardPage() {
  return (
    <>
      {/* Tabs row + actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs defaultSelectedKey="overview">
          <Tabs.ListContainer>
            <Tabs.List aria-label="Dashboard tabs">
              <Tabs.Tab id="overview">Overview<Tabs.Indicator /></Tabs.Tab>
              <Tabs.Tab id="sales">Sales<Tabs.Indicator /></Tabs.Tab>
              <Tabs.Tab id="expenses">Expenses<Tabs.Indicator /></Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>
        </Tabs>

        <div className="flex flex-wrap items-center gap-2">
          <Button isIconOnly size="sm" variant="tertiary" aria-label="Refresh">
            <RefreshCw className="size-4" />
          </Button>

          <ButtonGroup>
            <Button size="sm" variant="tertiary">
              <Calendar className="size-4" />
              Monthly
            </Button>
            <Button isIconOnly size="sm" variant="tertiary" aria-label="Change period">
              <ChevronDown className="size-4" />
            </Button>
          </ButtonGroup>

          <Button size="sm">Download</Button>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Revenue" value="US$228,441" trend="3.3%" trendDirection="up" />
        <StatCard title="Expenses" value="US$25,108" trend="3.3%" trendDirection="down" />
        <StatCard title="Sales" value="458" trend="3.3%" trendDirection="up" />
        <StatCard title="Profit" value="US$203,133" trend="4.1%" trendDirection="up" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <SalesChart />
        <TrafficChart />
      </div>

      {/* Employee Table */}
      <EmployeeTable />
    </>
  );
}

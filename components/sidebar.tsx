"use client";

import {
  Home,
  Receipt,
  ListChecks,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Avatar, Chip, ScrollShadow } from "@heroui/react";

const navItems = [
  { label: "Dashboard", icon: Home, href: "/", active: true },
  { label: "Orders", icon: Receipt, href: "/orders" },
  { label: "Tracker", icon: ListChecks, href: "/tracker", badge: "New" },
  { label: "Analytics", icon: BarChart3, href: "/analytics" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

const footerItems = [
  { label: "Help & Information", icon: HelpCircle, href: "/help" },
  { label: "Log out", icon: LogOut, href: "/logout" },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] border-r border-divider bg-background z-50 flex flex-col">
      {/* Header: User info */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-3 px-1 py-1">
          <Avatar size="sm" className="shrink-0">
            <Avatar.Image
              src="https://i.pravatar.cc/150?u=kate"
              alt="Kate Moore"
            />
            <Avatar.Fallback>KM</Avatar.Fallback>
          </Avatar>
          <div className="flex min-w-0 flex-col">
            <span className="text-sm font-medium leading-tight text-foreground">
              Kate Moore
            </span>
            <span className="text-xs font-medium leading-tight text-default-400">
              Admin
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ScrollShadow className="flex-1 px-3 py-1" hideScrollBar>
        <nav>
          <ul className="flex flex-col gap-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      item.active
                        ? "bg-default-100 text-foreground"
                        : "text-default-500 hover:bg-default-50 hover:text-foreground"
                    }`}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <Chip size="sm" color="success" variant="soft">
                        {item.badge}
                      </Chip>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </ScrollShadow>

      {/* Footer */}
      <div className="border-t border-divider px-3 py-3">
        <ul className="flex flex-col gap-0.5">
          {footerItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-default-500 hover:bg-default-50 hover:text-foreground transition-colors"
                >
                  <Icon className="size-4 shrink-0" />
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

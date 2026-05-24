"use client";

import * as React from "react";
import { SidebarProvider, useSidebar } from "@/components/sidebar-context";
import { Sidebar } from "@/components/sidebar";
import { TopNavbar } from "@/components/top-navbar";

function LayoutShellContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();
  return (
    <div className="min-h-full flex bg-background text-foreground w-full">
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className={`flex flex-1 flex-col transition-all duration-300 ${isCollapsed ? "ml-16" : "ml-(--sidebar-width)"}`}>
        <TopNavbar />
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-5 py-3 pb-10 flex flex-col gap-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <LayoutShellContent>{children}</LayoutShellContent>
    </SidebarProvider>
  );
}

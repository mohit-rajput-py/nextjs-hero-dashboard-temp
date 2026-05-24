"use client";

import { Button } from "@heroui/react";
import { Search, Bell, UserPlus, PanelLeft } from "lucide-react";

export function TopNavbar() {
  return (
    <header className="sticky top-0 z-40 h-16 bg-background">
      <div className="mx-auto max-w-7xl h-full flex items-center px-5 gap-3">
        <Button isIconOnly size="sm" variant="ghost" aria-label="Toggle sidebar">
          <PanelLeft className="size-4" />
        </Button>

        <h1 className="text-xl font-semibold text-foreground truncate">
          Good morning, Piyu
        </h1>

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          <Button isIconOnly size="sm" variant="tertiary" aria-label="Search">
            <Search className="size-4" />
          </Button>
          <Button isIconOnly size="sm" variant="tertiary" aria-label="Notifications">
            <Bell className="size-4" />
          </Button>
          <Button size="sm">
            <UserPlus className="size-4" />
            Invite
          </Button>
        </div>
      </div>
    </header>
  );
}

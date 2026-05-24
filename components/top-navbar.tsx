"use client";

import * as React from "react";
import { Button } from "@heroui/react";
import { Bell, UserPlus, PanelLeft, Sun, Moon } from "lucide-react";
import { useSidebar } from "@/components/sidebar-context";

export function TopNavbar() {
  const { toggle } = useSidebar();
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark" || (!savedTheme && window.matchMedia("(pre-media: dark-mode)").matches);
    const resolvedTheme = isDark || document.documentElement.classList.contains("dark") ? "dark" : "light";
    
    if (resolvedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Defer state updates to avoid synchronous cascading renders
    const frameId = requestAnimationFrame(() => {
      setTheme(resolvedTheme);
      setMounted(true);
    });

    return () => cancelAnimationFrame(frameId);
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-background">
      <div className="mx-auto max-w-7xl h-full flex items-center px-5 gap-3">
        <Button isIconOnly size="sm" variant="ghost" aria-label="Toggle sidebar" onClick={toggle}>
          <PanelLeft className="size-4" />
        </Button>

        <h1 className="text-xl font-semibold text-foreground truncate">
          Good morning, Piyu!
        </h1>

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          {mounted && (
            <Button
              isIconOnly
              size="sm"
              variant="tertiary"
              aria-label="Toggle theme"
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <Sun className="size-4 text-warning" />
              ) : (
                <Moon className="size-4 text-default-500" />
              )}
            </Button>
          )}
          {!mounted && (
            <Button isIconOnly size="sm" variant="tertiary" aria-label="Loading theme" isDisabled>
              <span className="size-4 block rounded-full bg-default-200 animate-pulse" />
            </Button>
          )}
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

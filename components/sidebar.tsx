"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  Home,
  Receipt,
  ListChecks,
  BarChart3,
  Settings,
  ChevronDown,
  Command,
} from "lucide-react";
import { Avatar, Chip, ScrollShadow, Disclosure } from "@heroui/react";
import { useSidebar } from "@/components/sidebar-context";

const navItems = [
  { label: "Dashboard", icon: Home, href: "/" },
  {
    label: "Orders",
    icon: Receipt,
    href: "/orders",
    items: [
      { label: "Overview", href: "/orders/overview" },
      { label: "All Orders", href: "/orders/all" },
      { label: "Delivered", href: "/orders/delivered" },
      { label: "Cancelled", href: "/orders/cancelled" },
    ],
  },
  { label: "Tracker", icon: ListChecks, href: "/tracker", badge: "New" },
  { label: "Analytics", icon: BarChart3, href: "/analytics" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, isMobileOpen, closeMobile } = useSidebar();
  const isOrdersRoute = pathname.startsWith("/orders");
  const [isOrdersExpanded, setIsOrdersExpanded] = React.useState(isOrdersRoute);

  // Sync expanded state if the route changes to /orders/*, or close on collapse
  React.useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      if (isOrdersRoute) {
        setIsOrdersExpanded(true);
      } else if (isCollapsed) {
        setIsOrdersExpanded(false);
      }
    });
    return () => cancelAnimationFrame(frameId);
  }, [pathname, isOrdersRoute, isCollapsed]);

  // Close mobile drawer on route change
  React.useEffect(() => {
    closeMobile();
  }, [pathname, closeMobile]);

  return (
    <>
      {/* Mobile Sidebar Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={closeMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen border-r border-divider bg-background z-50 flex flex-col transition-transform lg:transition-all duration-300 
          lg:translate-x-0 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          ${isCollapsed ? "lg:w-16 w-[240px]" : "w-[240px] lg:w-(--sidebar-width)"}
        `}
      >
        {/* Header: Company logo & name */}
        <div className={`px-4 py-4 ${isCollapsed ? "lg:px-2 px-4" : "px-4"}`}>
          <div className={`flex items-center px-1 py-1 ${isCollapsed ? "lg:justify-center justify-start gap-2.5" : "gap-2.5"}`}>
            <div className="flex size-7 items-center justify-center rounded-lg bg-accent text-white shrink-0">
              <Command className="size-4 shrink-0" />
            </div>
            <span className={`text-sm font-semibold tracking-tight text-foreground ${isCollapsed ? "lg:hidden block" : "block"}`}>
              Pipy inc
            </span>
          </div>
        </div>

        {/* Navigation */}
        <ScrollShadow className={`flex-1 ${isCollapsed ? "lg:px-2 lg:py-3 px-3 py-3" : "px-3 py-3"}`} hideScrollBar>
          <nav>
            <ul className="flex flex-col gap-0.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isParentActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                return (
                  <React.Fragment key={item.label}>
                    {/* Case A: Collapsible Menu */}
                    {item.items && (
                      <li className={`w-full block lg:${isCollapsed ? "hidden" : "block"}`}>
                        <Disclosure
                          isExpanded={isOrdersExpanded}
                          onExpandedChange={setIsOrdersExpanded}
                        >
                          <Disclosure.Heading>
                            <Disclosure.Trigger
                              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer select-none text-left focus:outline-none ${
                                isParentActive
                                  ? "bg-default-100 text-foreground font-semibold"
                                  : "text-default-500 hover:bg-default-50 hover:text-foreground font-normal"
                              }`}
                            >
                              <Icon className="size-4 shrink-0" />
                              <span className="flex-1">{item.label}</span>
                              <ChevronDown
                                className={`size-4 shrink-0 transition-transform duration-200 ${
                                  isOrdersExpanded ? "rotate-180" : ""
                                }`}
                              />
                            </Disclosure.Trigger>
                          </Disclosure.Heading>
                          <Disclosure.Content>
                            <Disclosure.Body className="mt-0.5 flex flex-col gap-0.5 border-l border-divider ml-5 pl-2">
                              {item.items.map((subItem) => {
                                const isSubActive = pathname === subItem.href;
                                return (
                                  <a
                                    key={subItem.label}
                                    href={subItem.href}
                                    className={`block rounded-md px-2.5 py-1 text-xs transition-colors ${
                                      isSubActive
                                        ? "text-foreground bg-default-100 font-semibold"
                                        : "text-default-500 hover:text-foreground hover:bg-default-50 font-normal"
                                    }`}
                                  >
                                    {subItem.label}
                                  </a>
                                );
                              })}
                            </Disclosure.Body>
                          </Disclosure.Content>
                        </Disclosure>
                      </li>
                    )}

                    {/* Case B: Simple Menu Item or Collapsed Fallback */}
                    <li className={item.items ? (isCollapsed ? "lg:block hidden" : "hidden") : "block"}>
                      <a
                        href={item.href}
                        className={`flex items-center transition-colors ${
                          isCollapsed
                            ? "lg:justify-center lg:size-10 lg:mx-auto lg:p-0 gap-3 px-3 py-2 text-sm"
                            : "gap-3 px-3 py-2 text-sm"
                        } ${
                          isParentActive
                            ? "bg-default-100 text-foreground font-semibold"
                            : "text-default-500 hover:bg-default-50 hover:text-foreground font-normal"
                        }`}
                      >
                        <Icon className="size-4 shrink-0" />
                        <span className={`flex-1 ${isCollapsed ? "lg:hidden block" : "block"}`}>{item.label}</span>
                        {item.badge && (
                          <Chip
                            size="sm"
                            color="success"
                            variant="soft"
                            className={isCollapsed ? "lg:hidden" : ""}
                          >
                            {item.badge}
                          </Chip>
                        )}
                      </a>
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>
          </nav>
        </ScrollShadow>

        {/* Footer: User info */}
        <div className="border-t border-divider px-4 py-4 bg-default-50/50">
          <div className={`flex items-center ${isCollapsed ? "lg:justify-center lg:px-0 justify-start px-1 py-0.5 gap-3" : "gap-3 px-1 py-0.5"}`}>
            <Avatar size="sm" className="shrink-0">
              <Avatar.Image
                src="https://i.pravatar.cc/150?u=kate"
                alt="Kate Moore"
              />
              <Avatar.Fallback>KM</Avatar.Fallback>
            </Avatar>
            <div className={`flex min-w-0 flex-col ${isCollapsed ? "lg:hidden flex" : "flex"}`}>
              <span className="text-sm font-semibold leading-tight text-foreground">
                Kate Moore
              </span>
              <span className="text-xs font-normal leading-tight text-default-500">
                Admin
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

# Architectural Blueprint: Reusable Config-Driven Dashboard System

This document outlines the architectural plan to refactor the current static HeroUI dashboard into a highly modular, reusable, and config-driven dashboard system. The design is optimized for future SaaS projects, emphasizing clean folder structure, permission-ready rendering, and visual composition.

---

## 1. Directory Structure

A clean separation between shared dashboard primitives, specific business features, and configuration schemas is key for a reusable architecture:

```text
src/
├── app/                  # Next.js Page Router / Layout files
├── config/               # Global configurations (Navigation, Branding, Roles)
│   ├── dashboard.config.ts
│   └── navigation.config.ts
├── components/
│   ├── shared/           # Framework UI Primitives (HeroUI base extensions)
│   │   ├── card-widget.tsx
│   │   ├── data-table/
│   │   ├── page-header.tsx
│   │   └── stat-card.tsx
│   ├── layout/           # Shared Layout Elements
│   │   ├── sidebar/
│   │   ├── topbar/
│   │   └── footer/
│   └── features/         # Feature-specific components (Sales, Traffic, Employees)
├── hooks/                # Custom React Hooks (useDataTable, useAuth, etc.)
├── types/                # Core Type Definitions
└── lib/                  # Shared utility functions (formatting, class mergers)
```

---

## 2. Config-Driven Navigation

Hardcoding paths and titles in layout code prevents reuse. The sidebar and navbar structure should compile from a unified navigation configuration schema.

### Schema Definition (`types/navigation.ts`)
```typescript
import { ComponentType } from "react";

export interface SubMenuItem {
  label: string;
  href: string;
  roles?: string[];
}

export interface NavItem {
  label: string;
  href: string;
  icon?: ComponentType<{ className?: string }>;
  badge?: string;
  roles?: string[];
  items?: SubMenuItem[]; // Support for collapsible structures
}

export interface NavigationConfig {
  company: {
    name: string;
    logo: ComponentType<{ className?: string }>;
  };
  mainNav: NavItem[];
}
```

### Benefits
* **Rapid Deployment**: Building a new dashboard for a different project only requires editing `navigation.config.ts` without touching React DOM layout files.
* **Declarative Security**: Simply define allowed `roles` on the config object; the sidebar layout component dynamically filters items based on the active session context.

---

## 3. Reusable Component Architectures

### A. Reusable Table Component (`components/shared/data-table/`)
A common pitfall is creating separate components for every database entity. Instead, construct a generic `<DataTable />` wrapper that extends HeroUI's primitives.

* **Separation of Concerns**: Define columns configurations (cells, labels, alignments) as dynamic data objects.
* **State Management Hook**: Expose a custom hook `useDataTable({ data, columns, pagination })` to manage sorting, selection, and searching states separately from rendering.
* **Custom Cells**: Use a column cell renderer function to inject custom elements (such as Chip components for employee statuses or progress bars) dynamically.

### B. Reusable Chart/Widget Component (`components/shared/card-widget.tsx`)
Rather than wrapping charts directly inside layouts:
* Create a generic `<CardWidget />` wrapper that handles Card headers, title metrics, dropdown action menus (e.g. Refresh, Download), loading skeleton overlays, and Error Boundaries.
* Inject specific chart layouts (Sales Chart, Traffic Chart) as React `children`.

---

## 4. What to Keep Data-Driven vs. Static

| Layer / Element | Approach | Rationale |
| :--- | :--- | :--- |
| **Sidebar & Navbar Items** | **Data-Driven (Config)** | Allows updating paths, icons, badges, and roles globally. |
| **Branding Details (Logo/Text)** | **Data-Driven (Config)** | Essential for tenant-specific or white-labeled dashboards. |
| **Grid Layout Configuration** | **Static (React Composition)** | Overengineering grid coordinates in JSON/Config leads to unreadable config files. Use React components to compose pages. |
| **Table Schema (Columns)** | **Data-Driven (Config)** | Keeps columns, alignments, and actions modular and easy to change. |
| **Raw UI Primitives** | **Static (Component Files)** | Base styles (borders, card roundness, typography) should follow the global Tailwind design tokens. |

---

## 5. Security & Permission Gating

The dashboard layout should inspect route-level permissions before mounting components:
* **Route Level**: Middleware checks Next.js route metadata configs.
* **Navigation Level**: The Navigation mapping loops filter out items where `item.roles` does not overlap with `user.role`.
* **Component Level**: A custom wrapper component `<PermissionGate fallback={<Skeleton />} rules={['admin']}>` protects high-privilege cards and action buttons.

---

## 6. Overengineering Risks to Avoid

> [!WARNING]
> **Avoid "JSON-Driven Layouts"**: Do not try to define the whole dashboard page layout (columns, card positions, spacing) inside a single large JSON config. This makes debugging responsive layouts (Tailwind breakpoints) incredibly hard and removes standard React developer ergonomics. Keep layout organization as React JSX, but populate data-rich cards using config schemas.

> [!TIP]
> **Keep Data Hooks Agnostic**: Do not tie UI wrappers (like `<DataTable />`) to specific API client endpoints. Let pages or container components fetch data and pass results down as generic arrays. This guarantees the UI package can reside in any Next.js codebase.

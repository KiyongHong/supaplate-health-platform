# Frontend Codemap

**Freshness Stamp:** 2026-01-26 11:55:00

## Structure
Built as a SPA with server-side rendering support via React Router v7.

## Key Components
- **Layouts (`app/core/layouts`):**
    - `navigation.layout.tsx`: Main wrapper with navigation bars.
    - `public.layout.tsx`: Unauthenticated routes.
    - `private.layout.tsx`: Authenticated routes.
    - `dashboard.layout.tsx`: User dashboard area.
    - `admin.layout.tsx`: Admin panel.
- **Global UI Pieces (`app/core/components`):** Buttons, inputs, dialogs, etc. (Radix/Tailwind based).
- **Feature Screens (`app/features/**/screens`):** Domain-specific pages.

## Routing Strategy
- Centralized in `app/routes.ts`.
- Uses a mix of flat and nested layout-based routing.
- Prefixes like `/api`, `/dashboard`, `/admin`, `/auth` group related functionality.

## State & Data Fetching
- **Server State:** Handled by React Router loaders and actions.
- **Transitions:** `nprogress` for loading indicators.
- **Styling:** Tailwind 4 with `tailwindcss-animate` for micro-animations.

## Internationalization
- **Locales:** `app/locales` (en.ts, ko.ts).
- **Types:** Strictly typed keys in `app/locales/types.ts`.
- **Switcher:** Language selection integrated into the navigation.

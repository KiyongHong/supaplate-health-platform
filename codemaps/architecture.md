# Architecture Codemap

**Freshness Stamp:** 2026-01-26 11:55:00

## System Overview
A premium health platform built with a modern React Router (v7) stack, leveraging Supabase for authentication and database services. The application follows a feature-based architecture pattern.

## Tech Stack
- **Framework:** React Router v7 (Vite)
- **Styling:** Tailwind CSS v4, Lucide Icons, Radix UI Primitives
- **Database:** PostgreSQL (Supabase/Postgres.js)
- **ORM:** Drizzle ORM
- **Authentication:** Supabase Auth (SSR)
- **Internationalization:** i18next (English & Korean)
- **Other:** Sentry (Monitoring), Resend (Emails), Toss Payments SDK, hCaptcha

## Directory Structure
- `app/core`: Shared components, hooks, layouts, and libraries.
- `app/features`: Domain-specific logic organized by feature (Auth, Health, Blog, Payments, etc.).
- `sql/`: Database migrations and functions.
- `scripts/`: Maintenance and seeding scripts.
- `transactional-emails/`: React Email templates.

## Key Boundaries
- **Backend/Frontend:** React Router Loaders/Actions serve as the primary API layer within feature directories.
- **Shared UI:** `app/core/components` (Shadcn-style bits).
- **Data Models:** Centralized in feature-specific `schema.ts` files, unified via Drizzle.

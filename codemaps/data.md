# Data Codemap

**Freshness Stamp:** 2026-01-26 11:55:00

## Core Models (Drizzle Schemas)
- **Users & Profiles:** Defined in `app/features/users/schema.ts`. Tracks user identity and profile metadata.
- **Payments & Subscriptions:** Defined in `app/features/payments/schema.ts`. Tracks transactions and plan statuses.
- **Health Data:** Defined in `app/features/health/schema.ts`. Stores health checkup records and analyzed metrics.
- **Blog & Content:** Defined in `app/features/blog/schema.ts`. Stores posts, categories, and topics.

## Database Infrastructure
- **Provider:** PostgreSQL (Supabase).
- **Shared Types:** `database.types.ts` (Auto-generated from Supabase).
- **Initialization:** `app/core/db/drizzle-client.server.ts`.
- **Migrations:** `sql/migrations/` (Drizzle Kit managed).

## Data Flow
1. **Mutation:** Server Actions in `app/features/**/api` or screens call Drizzle to update the DB.
2. **Query:** Loaders fetch data using Drizzle, often with feature-specific helpers in `app/features/**/queries` (if existing).
3. **Synchronization:** Supabase Auth triggers (like `handle_sign_up`) manage side effects at the database level.

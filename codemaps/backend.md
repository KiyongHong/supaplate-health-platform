# Backend Codemap

**Freshness Stamp:** 2026-01-26 11:55:00

## Structure
Backend logic is primarily encapsulated in React Router loaders and actions within the `app/features/` domain folders.

## Key APIs & Server Logic
- **Authentication:** Located in `app/features/auth`. Uses Supabase Auth SSR.
- **Health Analysis:** Located in `app/features/health`. Likely contains logic for analyzing NHIS data and Peter Attia standards.
- **Payments:** Located in `app/features/payments`. Integration with Toss Payments SDK.
- **Content Management:** `app/features/blog` and `app/features/admin` for managing posts and metadata.
- **Cron Jobs:** `app/features/cron` for scheduled tasks like mailers.

## Database Access
- **Client:** `app/core/db/drizzle-client.server.ts`
- **ORM:** Drizzle ORM with `postgres.js` driver.
- **Migrations:** Managed via `drizzle-kit` in `sql/migrations`.
- **Functions:** Database hooks (e.g., `handle_sign_up`) implemented as SQL functions in `sql/functions`.

## Email System
- Uses **Resend** as the delivery provider.
- Templates are built with **React Email** in `transactional-emails/`.

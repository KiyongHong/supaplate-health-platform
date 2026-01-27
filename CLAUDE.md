# CLAUDE.md - AI Assistant Guide

This document provides context for AI assistants working with the Supaplate Health Platform codebase.

## Project Overview

**Supaplate Health Platform** is a personalized health checkup analysis platform built on the Supaplate template. It analyzes health data using Peter Attia's strict longevity standards and recommends Huberman Lab protocols for health improvement.

### Tech Stack
- **Framework**: React Router v7 (file-based routing)
- **Database**: PostgreSQL via Supabase with Drizzle ORM
- **Styling**: Tailwind CSS v4 with shadcn/ui components (New York style)
- **Authentication**: Supabase Auth with OAuth (Google, Kakao) + Toss identity verification
- **Payments**: Toss Payments SDK
- **i18n**: i18next with English and Korean support
- **Email**: Resend + React Email
- **Testing**: Playwright for E2E tests
- **Monitoring**: Sentry for error tracking
- **Deployment**: Vercel

## Project Structure

```
/
├── app/
│   ├── core/                    # Shared code across features
│   │   ├── components/          # Shared React components
│   │   │   └── ui/              # shadcn/ui components
│   │   ├── db/                  # Database helpers
│   │   ├── hooks/               # Shared React hooks
│   │   ├── layouts/             # Route layouts (public, private, navigation)
│   │   ├── lib/                 # Utility libraries
│   │   └── screens/             # Core screens (404, error, sitemap)
│   ├── features/                # Feature-based modules
│   │   ├── admin/               # Admin panel for blog management
│   │   ├── auth/                # Authentication flows
│   │   ├── blog/                # Blog system with Tiptap editor
│   │   ├── contact/             # Contact form
│   │   ├── cron/                # Scheduled tasks (mailer)
│   │   ├── health/              # Core health analysis feature
│   │   ├── home/                # Landing page
│   │   ├── legal/               # Legal pages (terms, privacy)
│   │   ├── payments/            # Toss Payments integration
│   │   ├── protocols/           # Huberman protocol display
│   │   ├── settings/            # User settings
│   │   └── users/               # User profiles and dashboard
│   ├── locales/                 # i18n translation files (en.ts, ko.ts)
│   ├── routes.ts                # Route configuration
│   ├── root.tsx                 # Root layout component
│   └── i18n.ts                  # i18next configuration
├── e2e/                         # Playwright E2E tests
├── sql/
│   ├── migrations/              # Drizzle migrations
│   └── functions/               # PostgreSQL functions
├── transactional-emails/        # React Email templates
├── public/                      # Static assets
└── scripts/                     # Utility scripts (e.g., seed-protocols.ts)
```

## Key Conventions

### File Naming
- **Screens**: `features/<feature>/screens/<name>.tsx` - React Router route components
- **Schemas**: `features/<feature>/schema.ts` - Drizzle ORM table definitions
- **API Routes**: `features/<feature>/api/<name>.tsx` - Server-only actions/loaders
- **Services**: `features/<feature>/services/<name>.server.ts` - Server-side business logic
- **Libraries**: `features/<feature>/lib/<name>.ts` - Feature-specific utilities
- **Server-only files**: Use `.server.ts` suffix for files that should only run on the server

### Import Aliases
- `~/` - Maps to `./app/` directory
- `@rr/` - Maps to React Router types
- `database.types` - Supabase generated types

### Component Architecture
- UI components use **shadcn/ui** (New York style) located in `app/core/components/ui/`
- Use `lucide-react` for icons
- Form components: `FormButton`, `FetcherFormButton`, `FormError`, `FormSuccess`
- Translations accessed via `useTranslation()` hook from `react-i18next`

### Database Patterns
- Use Drizzle ORM for all database operations
- Schemas define Row Level Security (RLS) policies inline using `pgPolicy`
- Common helpers from `~/core/db/helpers.server`:
  - `timestamps` - adds `created_at` and `updated_at` columns
  - `makeIdentityColumn(name)` - creates auto-incrementing primary key
- Foreign keys reference `authUsers.id` from Supabase auth

### Authentication
- Server-side: Use `makeServerClient(request)` from `~/core/lib/supa-client.server`
- Always return headers from loaders/actions: `return json(data, { headers })`
- Guard routes with `requireAuthentication(client)` from `~/core/lib/guards.server`
- Layouts: `private.layout.tsx` redirects unauthenticated users to `/login`

### Route Configuration
Routes are defined in `app/routes.ts` using React Router's declarative API:
- `layout()` - Wrap routes with a layout component
- `prefix()` - Add path prefix to route group
- `route()` - Define a route with path and component
- `index()` - Define index route for a path

### Styling
- Tailwind CSS v4 with CSS variables for theming
- Global styles in `app/app.css`
- Use `cn()` utility from `~/core/lib/utils` for conditional classes
- Prettier auto-sorts Tailwind classes

### Internationalization
- Supported languages: English (`en`), Korean (`ko`)
- Translations in `app/locales/en.ts` and `app/locales/ko.ts`
- Access translations: `const { t } = useTranslation()`
- Server-side: `await i18next.getFixedT(request)`

## Common Commands

```bash
# Development
npm run dev              # Start dev server with Sentry instrumentation
npm run build            # Build for production (runs typecheck first)
npm run start            # Start production server

# Type checking
npm run typecheck        # Generate types and run TypeScript compiler

# Database
npm run db:generate      # Generate Drizzle migrations
npm run db:migrate       # Run migrations
npm run db:seed          # Seed Huberman protocols
npm run db:typegen       # Generate Supabase types

# Testing
npm run test:e2e         # Run Playwright tests
npm run test:e2e:ui      # Run Playwright with UI

# Code quality
npm run format           # Format code with Prettier
```

## Database Schema

### Core Tables
- **profiles** - Extended user data (links to Supabase auth.users)
- **health_checkups** - User health data with analysis results
- **huberman_protocols** - Health protocols with vector embeddings for semantic search
- **payments** - Payment transaction records
- **posts** - Blog posts with Tiptap JSON content

### Health-Specific Fields in Profiles
- `ci`, `di` - Identity verification values from Toss
- `subscription_status` - `'free'` | `'premium'` | `'expired'`
- `verified_at` - When identity was verified
- `role` - `'user'` | `'admin'`

## Environment Variables

Required variables (validated in `root.tsx`):
- `DATABASE_URL` - PostgreSQL connection string
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key

Optional:
- `VITE_GOOGLE_TAG_ID` - Google Analytics
- `VITE_CHANNEL_PLUGIN_KEY` - Channel.io support chat
- `VITE_SENTRY_DSN` - Sentry error tracking
- `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN` - Sentry config
- `VITE_APP_NAME` - Application name for meta tags

## Feature: Health Analysis

### Peter Attia Standards (`features/health/lib/attia-standards.ts`)
Defines strict health metric thresholds compared to conventional standards:
- LDL Cholesterol: < 70 mg/dL (vs conventional < 130)
- HbA1c: < 5.4% (vs conventional < 5.7%)
- And more metabolic, lipid, and inflammation markers

### Huberman Protocols (`features/health/lib/huberman-protocols.ts`)
Maps health metrics to actionable protocols from Huberman Lab:
- Categories: sleep, nutrition, exercise, supplements
- Each protocol has action items and scientific basis
- Stored in database with vector embeddings for semantic search

### Analysis Flow
1. User completes identity verification via Toss
2. Health data fetched from Korean NHIS API (mocked currently)
3. Each biomarker analyzed against Attia strict standards
4. Relevant Huberman protocols recommended based on sub-optimal metrics
5. Free tier shows 2 metrics; premium unlocks all analysis

## Important Patterns

### Loader/Action Pattern
```typescript
export async function loader({ request }: LoaderFunctionArgs) {
  const [client, headers] = makeServerClient(request);
  const user = await requireAuthentication(client);

  // Fetch data...
  const { data } = await client.from('table').select();

  return json({ data }, { headers });
}
```

### Form Actions
```typescript
export async function action({ request }: ActionFunctionArgs) {
  requireMethod('POST')(request);
  const [client, headers] = makeServerClient(request);
  const formData = await request.formData();

  // Process form...

  return json({ success: true }, { headers });
}
```

### Meta Function
```typescript
export const meta: MetaFunction<typeof loader> = ({ data }) => [
  { title: `${data?.title} | ${import.meta.env.VITE_APP_NAME}` },
];
```

## Testing

E2E tests organized by feature in `/e2e/`:
- `e2e/auth/` - Authentication flows
- `e2e/users/` - User management
- `e2e/settings/` - Settings pages
- `e2e/utils/` - Test utilities

Tests run against dev server on port 4000 by default.

## Deployment

Deploy to Vercel (see `DEPLOY.md`):
1. Connect GitHub repository
2. Vercel auto-detects React Router v7
3. Configure environment variables
4. Deploy

## Code Style

- Prettier with import sorting (`@trivago/prettier-plugin-sort-imports`)
- Import order: CSS/assets > third-party types > local types > third-party modules > ~/lib > ~/components/ui > ~/ > ./
- TypeScript strict mode enabled
- No ESLint configured (Prettier only)

## Notes for AI Assistants

1. **Always use the `~/` import alias** for app-relative imports
2. **Include headers** when returning from loaders/actions that use Supabase client
3. **Check authentication** in private routes using `requireAuthentication()`
4. **Add RLS policies** when creating new tables in schema files
5. **Add translations** to both `en.ts` and `ko.ts` when adding new UI text
6. **Use server suffix** (`.server.ts`) for files with server-only code
7. **Follow feature folder structure** - keep related code together in feature directories
8. **Use existing UI components** from `~/core/components/ui/` before creating new ones

# Project Guidelines: Health Checkup Platform

Based on **Supaplate** (React Router v7 + Supabase + Drizzle ORM).

---

## When to Use

Reference this skill when building features for the **Personal Health Checkup Platform**. This includes:
- Implementing Peter Attia's analysis logic
- Integrating Health Insurance API
- Building Huberman Protocol recommendations
- Managing Supabase database & auth

---

## Architecture Overview

**Tech Stack:**
- **Frontend**: React Router v7, React 19, Tailwind CSS, shadcn/ui
- **Backend/DB**: Supabase (PostgreSQL, Auth, Realtime)
- **ORM**: Drizzle ORM
- **AI**: Gemini API / GPT-4 for analysis & RAG
- **Payment**: Stripe
- **Deployment**: Vercel / Cloudflare Pages

**Data Flow:**
```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                            │
│  React Router v7 + Zustand + TanStack Query                │
│  (Client-side data fetching & state management)             │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
        ┌──────────┐   ┌──────────┐   ┌──────────┐
        │ Supabase │   │  Health  │   │    AI    │
        │   Auth   │   │ API (KR) │   │ Provider │
        │    DB    │   │          │   │ (Gemini) │
        └──────────┘   └──────────┘   └──────────┘
```

---

## File Structure

Follow the **Feature-based** folder structure:

```
src/
├── app/
│   ├── components/       # Shared UI components (shadcn/ui)
│   ├── features/         # Feature-based modules
│   │   ├── auth/         # Authentication feature
│   │   ├── checkup/      # Health checkup analysis feature
│   │   ├── protocols/    # Huberman protocols feature
│   │   └── payment/      # Stripe integration
│   ├── routes.ts         # React Router configuration
│   ├── root.tsx          # Root layout
│   └── app.css           # Global styles
├── database.types.ts     # Supabase generated types
├── drizzle.config.ts     # Drizzle configuration
└── server/               # Backend functions (if any custom server)
```

**Feature Directory Structure:**
```
features/checkup/
├── components/           # Feature-specific UI
│   ├── AnalysisChart.tsx
│   └── RiskScoreCard.tsx
├── hooks/                # Feature-specific hooks
│   └── useCheckupData.ts
├── types.ts              # Feature-specific types
├── utils.ts              # Analysis logic (Strict criteria)
└── services.ts           # API calls
```

---

## Code Patterns

### 1. Supabase Data Fetching
Use `supabaseClient` directly or wrap in hooks.

```typescript
import { useLoaderData } from "react-router";
import { supabase } from "~/lib/supabase";

export async function loader() {
  const { data, error } = await supabase
    .from('health_checkups')
    .select('*')
  
  if (error) throw new Error(error.message);
  return { checkups: data };
}
```

### 2. Peter Attia Strict Analysis Logic
Encapsulate analysis logic in pure functions.

```typescript
// features/checkup/utils.ts

export const analyzeGlucose = (mgDl: number) => {
  // Strict: < 90 mg/dL
  // Normal: < 100 mg/dL
  if (mgDl < 90) return { status: 'OPTIMAL', score: 100 };
  if (mgDl < 100) return { status: 'NORMAL', score: 80 };
  return { status: 'RISK', score: 50 };
};
```

### 3. API Response Pattern
Standardize internal API responses.

```typescript
interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function fetchHealthData(ci: string): Promise<ServiceResponse<HealthData>> {
  try {
    // Call Health Insurance API
    const result = await healthApi.getCheckupList(ci);
    return { success: true, data: result };
  } catch (e) {
    return { success: false, error: 'Failed to fetch external data' };
  }
}
```

---

## Testing Requirements

### 1. Unit Tests (Business Logic)
Test strict criteria logic thoroughly.

```typescript
// features/checkup/utils.test.ts
import { analyzeGlucose } from './utils';

test('analyzeGlucose evaluates strict criteria correctly', () => {
  expect(analyzeGlucose(85).status).toBe('OPTIMAL');
  expect(analyzeGlucose(95).status).toBe('NORMAL');
  expect(analyzeGlucose(105).status).toBe('RISK');
});
```

### 2. Integration Tests
Mock Supabase calls.

### 3. E2E Tests
Use Playwright for critical flows (Login -> specific checkup flow).

---

## Deployment & Security

- **Environment Variables**:
  - `SUPABASE_URL`, `SUPABASE_ANON_KEY` (Public)
  - `HEALTH_API_KEY`, `STRIPE_SECRET_KEY` (Private/Server-side only)
- **RLS (Row Level Security)**:
  - Enable RLS on ALL tables.
  - Users can only read/write their own `health_checkups`.

---

## Critical Rules

1. **Strict Types**: No `any`. Use generated Supabase types.
2. **Immutability**: Use spread operators, do not mutate state directly.
3. **Validation**: Validate all inputs using `zod`.
4. **Mobile First**: Design for mobile view first, then desktop.
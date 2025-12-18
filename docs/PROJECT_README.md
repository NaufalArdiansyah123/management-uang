# MoneyApp Project Notes

This file documents current scaffold and next steps for the MoneyApp (Next.js + Supabase).

## What exists now
- `lib/supabase/client.ts` — Supabase client wrapper (browser/server usage will follow)
- `.env.example` — example environment variables
- `db/supabase_schema.sql` — SQL schema for tables and RLS policies
- Project todo plan tracked via workspace todo list

## Quick local setup
1. Copy `.env.example` to `.env.local` and fill `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
2. Install and run:

```bash
pnpm install
pnpm dev
```

3. Apply DB schema via Supabase SQL editor or `psql` using `db/supabase_schema.sql`.

## APK build options (overview)
- Capacitor: wrap web app assets into an Android project and build with Android Studio.
- TWA: wrap hosted PWA using Trusted Web Activity.

## Next implementation tasks
- Authentication (login/register) pages using Supabase
- Middleware for route protection
- Dashboard with balance and charts
- Transactions and categories CRUD
- PWA manifest + service worker
- Bottom tab navigation for mobile

If you want, I'll implement authentication pages next (login + register + route middleware).

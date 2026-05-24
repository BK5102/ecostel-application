# Ecostel Tech Stack Review

## Original State

The repository was a TanStack Start/Vite application with Cloudflare Worker configuration. It did not match the requested stack of Next.js, FastAPI, Supabase, and Vercel.

## Required Direction

- Next.js App Router for public pages, authenticated product surfaces, routing, metadata, and Vercel deployment.
- FastAPI for quote workflows, file validation, CAD parsing orchestration, supplier/order APIs, and future AI services.
- Supabase for authentication, PostgreSQL, private file storage, row-level security, and audit-friendly relational data.
- Vercel for frontend production and preview deployments.

## Recommended Production Additions

- Background jobs: Trigger.dev, Inngest, Celery, or a managed queue for CAD parsing, quote generation, supplier notifications, and long-running imports.
- Observability: Sentry for frontend/API errors, OpenTelemetry for traces, and structured logs with request IDs.
- File security: private Supabase buckets, signed URLs, virus scanning, file type validation, and isolated CAD/PDF parsing workers.
- Database: migration tooling, RLS tests, audit tables, point-in-time recovery, and separate staging/production Supabase projects.
- CI/CD: GitHub Actions for lint, typecheck, tests, dependency audit, and build verification before Vercel deployment.
- Secrets: Vercel environment variables and backend secret manager only; no service role keys in browser code.

## Current Implementation Update

- Replaced the active app shell with Next.js pages and dropdown navigation.
- Removed the active careers, open roles, and apply flows.
- Added FastAPI scaffold under `backend/`.
- Added Supabase client helpers under `lib/supabase/`.
- Added Vercel configuration and security headers.
- Added project security and future-work guidance in `SECURITY_PLAN.md` and `PROMPT.md`.

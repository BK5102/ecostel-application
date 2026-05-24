# Ecostel Security Plan

## Required Production Stack

- Frontend: Next.js App Router deployed on Vercel.
- API: FastAPI for quote, upload, supplier, order, and CAD processing workflows.
- Database and auth: Supabase Auth, PostgreSQL, Storage, and Row Level Security.
- Deployment: Vercel for the Next.js application; FastAPI can run on a dedicated service or Vercel Python functions for early-stage workloads.

## Key Issues Found

- The previous project used TanStack Start, Vite, and Cloudflare Worker config, which did not match the required Next.js and Vercel stack.
- The active page was a careers/internship landing page with open role and apply flows. This conflicted with the product platform direction.
- There was no Supabase integration layer, no backend API boundary, no authentication design, and no documented data security model.
- The app had no explicit security headers, upload controls, rate limiting, environment validation, or production deployment plan.
- The content and navigation were not aligned with the provided platform sitemap.

## Authentication And Authorization

- Use Supabase Auth for users, organizations, suppliers, and internal operators.
- Enable MFA for internal users and supplier admins.
- Store roles in relational tables rather than trusting client-side claims.
- Enforce authorization through Supabase Row Level Security policies on every user-owned table.
- Keep service role keys server-only. They must never be exposed to the browser or committed to the repo.
- Use short-lived signed URLs for private files and CAD documents.

## Data Model Security

- Default all Supabase tables to RLS enabled.
- Model tenancy explicitly with `organization_id` and supplier access tables.
- Use immutable audit tables for quote, order, file, supplier status, and admin actions.
- Encrypt sensitive customer notes and proprietary manufacturing metadata where business risk requires it.
- Restrict direct database writes from the client to narrow, policy-protected tables.

## File Upload And CAD Security

- Treat every uploaded file as hostile.
- Enforce file size, extension, MIME type, and content validation in FastAPI before storage.
- Store original uploads in private Supabase Storage buckets.
- Run CAD/PDF parsing in isolated workers with timeouts and memory limits.
- Strip metadata from files before sharing with suppliers unless explicitly needed.
- Generate derived previews separately from original customer files.

## API Security

- Validate every request body with Pydantic or Zod schemas.
- Apply rate limits to quote, upload, auth, and supplier endpoints.
- Use CSRF-safe patterns for cookie-based sessions.
- Restrict CORS to the production Vercel domain and approved preview domains.
- Return generic errors to clients and log detailed errors privately.
- Add request IDs across Next.js, FastAPI, Supabase, and background jobs.

## Frontend Security

- Keep secrets out of `NEXT_PUBLIC_*`.
- Use strict Content Security Policy. The current CSP allows inline scripts because Next.js needs it during development; harden this before launch with nonces where feasible.
- Use `next/image` for local images and vetted remote sources.
- Avoid rendering untrusted HTML. If rich text becomes necessary, sanitize it server-side.
- Keep dependencies minimal and run automated dependency scanning.

## Deployment And Operations

- Use Vercel preview deployments for every pull request.
- Store secrets in Vercel and backend host secret managers, not `.env` files in git.
- Require branch protection, code owners, and passing checks before merge.
- Run database migrations through versioned SQL migration files.
- Maintain separate Supabase projects for local, staging, and production.
- Configure backups, point-in-time recovery, and restore drills before onboarding real customers.

## Monitoring And Incident Response

- Add Sentry or equivalent error tracking for Next.js and FastAPI.
- Add structured logs for auth events, file access, quote creation, and supplier updates.
- Alert on unusual upload volume, failed auth spikes, RLS policy errors, and service role usage.
- Keep an incident runbook with owner, severity, containment steps, user notification criteria, and postmortem template.

## Pre-Launch Checklist

- Supabase RLS policies reviewed and tested.
- Private buckets verified with signed URL access only.
- Production CSP reviewed.
- Upload scanner and parser isolation in place.
- CORS locked to production and preview domains.
- Dependency audit clean or exceptions documented.
- Backup and restore tested.
- Logging, alerting, and incident contacts configured.

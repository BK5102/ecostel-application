# EcoStel Project Prompt

You are developing EcoStel, a manufacturing platform for teams that need faster quoting, clearer collaboration, project tracking, and reliable execution from prototype to production.

## Non-Negotiable Stack

- Use Next.js App Router for the frontend and backend API routes (Node.js runtime).
- Use Node.js for all server-side logic — Next.js API routes handle validation, orchestration, file handling, and integrations.
- Use Supabase for Auth, PostgreSQL, Storage, Realtime where useful, and Row Level Security.
- Deploy on Vercel with preview deployments for every pull request. Supabase manages the database and backend services.

## Product Direction

- Do not build careers, internships, open roles, or apply flows.
- Navigation must use individual pages, not a single-page anchor-only layout.
- Primary navbar groups are Home, Capabilities, Industries, Solutions, Resource, and About us.
- Each main navigation group should expose dropdown links that match the platform sitemap.
- Page descriptions and marketing copy should come from the provided Notion/PDF platform document, trimmed only for relevance and clarity.
- Detail pages that use sidebar navigation must keep the main content column on a consistent 16px vertical spacing rhythm between all sections, boxes, tables, benefit grids, and CTAs.
- The top-right navbar CTA should be "Become a Supplier".
- The Get Instant Quote flow should ask the user to upload a drawing or CAD file.
- The Solutions page should use `Solutions` as the page header and place a `Get Instant Quote` CTA directly below the hero description.
- The Solutions page should be structured as four Instant Quote sections: `Quote with Speed and Clarity`, `Get Accurate Quotes Easily`, `Long-Term Production Planning`, and `Compare Options Easily`.
- The fourth Solutions section should include real supplier comparison columns with clickable `Select Supplier` buttons, not image-only text.
- Solutions detail pages should place benefit icon grids and final CTA boxes as standalone sections, not nested inside the preceding content box.
- Project Tracking should include a compact supplier performance table directly below `Monitor Supplier Performance`; it must fit inside the content panel without horizontal scrolling.
- Project Tracking should include a delivery carrier section below `Manage updates and spending`, using actual linked logo assets where exact brand marks are required.
- The landing page hero should use:
  - "Reshaping the Future of Sustainable Manufacturing"
  - "Precision, Sustainability, and Innovation Combined"
- The footer should be a black CTA/footer section with "Transform Your Operations Today!", quick links, social links, and contact details. The footer headline should be prominent but not oversized; it must not crowd or obscure the footer columns.
- Social links must point to:
  - LinkedIn: `https://www.linkedin.com/company/ecostel-engineering/posts/?feedView=all`
  - Instagram: `https://www.instagram.com/ecostel.co/`

## Brand Direction

- Use the supplied EcoStel logo style: green circular mark, white block icon, and EcoStel wordmark.
- The favicon/app icon should use the green circular mark with the white block icon.
- On dark backgrounds, use the white circular logo variant shown in the footer reference.
- Keep spelling/casing as `EcoStel` for visible brand text unless source material requires otherwise.

## Visual Assets

- Images must be extracted directly from the provided Notion/PDF platform document whenever the page refers to those visuals.
- The Meet our clients section should show only extracted company brand logos, not the surrounding heading text from the PDF screenshot.
- The landing page Industries section should not have the large image above it.
- The Capabilities section should show the extracted manufacturing parts/process visual before the capability cards.
- Capability cards and capability detail boxes should not include large images inside the box; keep those boxes focused on title, description, and process tags.
- The Capabilities intro should use the line from the image: "Built on advanced manufacturing infrastructure with reliable delivery and reduced operational friction."
- Directly below that Capabilities intro sentence, add "Structured matter from structured data." using the same font size, style, and color as the intro text.
- Include a Quality Systems section on the Capabilities page with the exact documentation text from the provided source image.
- Include a separate 3D printing materials download box on the Capabilities page using the supplied `3D_Printing_Materials.pdf`.
- Include a Buyer Protection section on the Capabilities page with extracted text and a cropped parts image beside it.
- Industries section boxes should be text-only: show each industry header and description, with no images inside the boxes.

## Source Copy

Use these phrases and descriptions as the canonical source:

- "Manufacturing as an on-demand system layer."
- "Reliable 3D printing infrastructure for prototyping, testing, and scaled production workflows."
- "Structured matter from structured data."
- "Reshaping the Future of Sustainable Manufacturing"
- "Precision, Sustainability, and Innovation Combined"
- "Built on advanced manufacturing infrastructure with reliable delivery and reduced operational friction."
- "Quote with Speed and Clarity."
- "Our team checks your design and shares useful feedback, so you can decide quickly and move forward without delays."
- "Upload your parts and get fast, reliable quotes powered by experts and AI, with easy comparison to choose the best price."
- "Long-Term Production Planning"
- "We plan repeat orders ahead keeping production smooth and predictable."
- "Compare Options Easily"
- "Find different prices and delivery times in one place, so you can choose the best option from trusted partners without the hassle."
- "Production Verified. Documentation Included."
- "Certificate of Conformance"
- "First Article Inspection"
- "CMM)"
- "Material Test Reports"
- "Material Certifications"
- "RoHS Compliance"
- "Download our extensive list of available 3D Printing materials"
- "Need something beyond the catalog? We'll source it for you."
- "Buyer Protection"
- "From prototype to production, every part moves through verified manufacturing workflows built for speed, quality, and reliability."
- "Ecostel combines certified systems with production-ready manufacturing partners to deliver predictable outcomes at scale."
- "Ecostel Buyer Protection"
- "Work closely with our team and suppliers in one place. Get DFM feedback early, make better decisions, and build strong relationships you can rely on."
- "Stay organized with simple tools to track, review, and collaborate so everyone stays on the same page."
- "Every part meets specifications, with controlled processes and timely delivery."
- "Built for teams that can't afford delays."
- "We work with teams building the next generation of products. Join us in making manufacturing faster, smarter, and more reliable."

## Build Status

### Phase 1 — Foundation

**Completed:**
- Marketing site — all pages live: Home, Capabilities (+ slug), Industries (+ slug), Solutions (+ slug), Resources (+ slug), About, Contact, For Vendors.
- Brand system locked — Rubik font via `next/font/google`, CSS custom properties (`--brand`, `--brand-dark`, `--bg`, `--ink`, `--shadow`, `--line`), favicon, logo.
- SEO — `metadataBase`, OpenGraph, Twitter card, robots metadata. Lighthouse SEO = 100.
- Security headers — CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy in `next.config.ts`.
- Rate limiting — 120 req/min per IP on all `/api/*` routes via `middleware.ts`.
- Supabase client — `lib/supabase/client.ts` (browser) and `lib/supabase/server.ts` (SSR) with Zod-validated env in `lib/env.ts`.
- Database schema — `supabase/migrations/001_initial_schema.sql`: 18 tables covering organizations, users, vendor profiles, RFQs, quotes, orders, messages, audit log, notifications.
- RLS policies — `supabase/migrations/002_rls_policies.sql`: RLS enabled on all tables with `current_org_id()` / `current_org_type()` helper functions; buyers see own data, vendors see assigned RFQs only, admins see all.
- Auth middleware — `middleware.ts` refreshes Supabase session on every request; redirects unauthenticated users from `/buyer/*`, `/vendor/*`, `/admin/*` to `/auth/login`.
- Auth pages — `/auth/login`, `/auth/signup` (with buyer/vendor role selection), `/auth/verify-email`, `/auth/reset-password`, `/auth/update-password`.
- Auth API routes — `/api/auth/callback` (PKCE code exchange), `/api/auth/signout`.
- Buyer workspace — `/buyer` dashboard (live RFQ counts + recent list from Supabase), sticky sidebar with nav + user profile + sign-out.
- RFQ submission — `/buyer/rfq/new`: title, process, due date, part details (name, qty, material, finish, tolerances), CAD/drawing file upload to Supabase Storage (`rfq-files` bucket), inserts `rfqs` + `rfq_parts` rows, sets status to `submitted`.
- Document tech stack corrected — Architecture Spec, Build Plan, and Requirements Contract `.docx` files updated to reflect Next.js / Node.js / Supabase / Vercel (removed NestJS, AWS ECS, S3, Redis, BullMQ, OpenSearch, Docker, ClamAV).
- RFQ detail page — `/buyer/rfqs/[id]`: part specs, CAD download links, quote list, 5-step status timeline, details sidebar.
- Vendor registration flow — `/vendor/register` (3-step: company → capabilities → documents) + `/vendor/pending` confirmation page; upserts vendor_profiles, inserts capabilities/certifications, uploads docs to `vendor-docs` bucket, sets kyc_status to pending.
- Admin panel — `/admin` dashboard (live counts), `/admin/rfqs` (RFQ triage with vendor assignment dropdown, updates rfq status to in_review), `/admin/vendors` (approve/reject vendor applications); admin layout gate-checks org type = admin.

- Vercel build fix — `useSearchParams()` in `/auth/login` wrapped in `<Suspense>` (Next.js 15 prerender requirement).
- "Instant Quote" nav dropdown link appends #upload-drawing so clicking it scrolls directly to the DrawingUpload section
- Benefit cards ("Built for Complex Projects" etc.) and "Free to start" CTA on /solutions/instant-quote; positioned after "Compare Options Easily"; all borders removed (card borders + CTA content-panel wrapper)
- Footer scaled down — all text sizes, spacing, and padding reduced significantly (headline 48px→24px, links/body 28px→13px, grid gap 64px→32px)
- Sidebar nav removed from all 11 content pages — `PageLayout` no longer renders the `<aside>` list; content boxes expand to full width across capabilities, industries, solutions, resources, about, contact, for-vendors and their slug pages.

**Phase 1 remaining:**
- Supabase Storage bucket setup — create `rfq-files` and `vendor-docs` private buckets in Supabase dashboard; fill `.env.local` with real project credentials.
- End-to-end test — buyer signup → RFQ submission → admin sees it and assigns a vendor (Phase 1 quality gate).

**Phase 2 (not started):** Vendor dashboards, quote submission, buyer quote comparison, PO acceptance, threaded messaging, email notifications.

## Deployment

### Vercel — marketing skeleton (no Supabase required)

The Supabase env vars are `.optional()` in `lib/env.ts`, so the build succeeds without real credentials. All marketing routes work. Auth/workspace routes render but are non-functional until real credentials are wired.

**Steps (browser only, no CLI):**
1. Sign in to vercel.com with GitHub
2. Import repo `BK5102/ecostel-application`
3. Framework: Next.js (auto-detected)
4. Add env vars:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://placeholder.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `placeholder`
   - `SUPABASE_SERVICE_ROLE_KEY` = `placeholder`
   - `NEXT_PUBLIC_SITE_URL` = *(leave blank — Vercel sets this automatically)*
5. Deploy

### Activating the full platform

Replace placeholder env vars in **Vercel → Project → Settings → Environment Variables** with real Supabase credentials, then redeploy. Also required:
- Run `supabase/migrations/001_initial_schema.sql` then `002_rls_policies.sql` in Supabase SQL editor
- Create private Storage buckets: `rfq-files` and `vendor-docs`

## Security Requirements

- Treat customer files, CAD data, quotes, supplier details, and order status as confidential.
- Use Supabase RLS for all tenant-owned data.
- Keep service role keys server-only.
- Validate all API input with schemas.
- Rate-limit sensitive endpoints.
- Store uploads in private buckets.
- Use signed URLs for temporary file access.
- Add audit logs for quote, order, file, supplier, and admin actions.
- Review `SECURITY_PLAN.md` before implementing new data or API surfaces.

## Engineering Principles

- Prefer boring, scalable architecture over clever prototypes.
- Keep the frontend focused on clear manufacturing workflows.
- Keep backend responsibilities explicit: validation, orchestration, file handling, and integrations.
- Avoid exposing supplier/customer data across tenants.
- Document assumptions when source copy is incomplete.
- Add tests around auth, RLS, upload validation, and quote workflow behavior before production launch.

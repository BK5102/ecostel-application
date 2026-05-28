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

### Phase 1 — Foundation (code complete)

**Infrastructure**
- Supabase client — `lib/supabase/client.ts` (browser) and `lib/supabase/server.ts` (SSR) with Zod-validated env in `lib/env.ts`. Supabase env vars are `.optional()` so build succeeds without real credentials.
- Database schema — `supabase/migrations/001_initial_schema.sql`: 18 tables (organizations, users, vendor_profiles, vendor_capabilities, vendor_certifications, rfqs, rfq_parts, rfq_assignments, quotes, quote_lines, orders, order_milestones, invoices, payouts, messages, activity, notifications).
- RLS policies — `supabase/migrations/002_rls_policies.sql`: enabled on all 18 tables; `current_org_id()` / `current_org_type()` security-definer helpers; buyers see own data, vendors see assigned RFQs only, admins see all.
- Auth middleware — `middleware.ts` refreshes session on every request; protects `/buyer/*`, `/vendor/*`, `/admin/*`; redirects unauthenticated to `/auth/login?next=<path>`.
- Security headers — CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy in `next.config.ts`.
- Rate limiting — 120 req/min per IP on all `/api/*` routes.
- `.env.local` template in repo root (gitignored); `.env.local` placeholders used for skeleton Vercel deploy.

**Marketing site**
- All pages live: Home, Capabilities (+ slug), Industries (+ slug), Solutions (+ slug), Resources (+ slug), About, Contact, For Vendors.
- Brand system — Rubik via `next/font/google`, CSS custom properties (`--brand #0EAB6E`, `--brand-dark`, `--bg`, `--ink`, `--shadow`, `--line`), favicon.
- Brand logo — `public/ecostel-logo.png` (white background removed, transparent PNG); all layouts use `<img>` tag, SVG inline fallback removed. Appears in navbar, footer, auth card, buyer sidebar, admin sidebar.
- SEO — `metadataBase`, OpenGraph, Twitter card, robots metadata.
- Sidebar nav removed from all 11 content pages — `PageLayout` no longer renders the `<aside>`; content boxes expand to full width.
- Footer scaled down — headline `clamp(16-24px)`, links/body `13px`, grid gap `32px`, link gap `10px`.
- Solutions / Instant Quote — benefit cards ("Built for Complex Projects" etc.) and "Free to start" CTA live on `/solutions/instant-quote` after "Compare Options Easily"; card borders and CTA wrapper border removed.
- "Instant Quote" nav dropdown href → `/solutions/instant-quote#upload-drawing` so page scrolls to DrawingUpload on click (`id="upload-drawing"` already on the component).

**Auth**
- Pages: `/auth/login` (Suspense-wrapped for Next.js 15 prerender), `/auth/signup` (buyer/vendor role), `/auth/verify-email`, `/auth/reset-password`, `/auth/update-password`.
- API routes: `/api/auth/callback` (PKCE exchange), `/api/auth/signout`.

**Buyer workspace**
- `/buyer` — dashboard with live RFQ counts + recent list.
- `/buyer/rfq/new` — multi-field RFQ form with CAD file upload to `rfq-files` Supabase Storage bucket.
- `/buyer/rfqs` — RFQ list grouped by status with count badges.
- `/buyer/rfqs/[id]` — part specs, CAD download links, quote list, 5-step status timeline, details sidebar. Shows `?submitted=1` confirmation banner.

**Vendor workspace**
- `/vendor/register` — 3-step form (company info → capabilities → documents); upserts `vendor_profiles`, inserts `vendor_capabilities` + `vendor_certifications`, uploads docs to `vendor-docs` bucket, sets `kyc_status = pending`.
- `/vendor/pending` — post-application confirmation page with next-steps list.

**Admin panel**
- `/admin` — dashboard with live counts (pending RFQs, pending vendors, approved vendors). Gate-checks `org.type === "admin"`, redirects others to `/buyer`.
- `/admin/rfqs` — RFQ triage; inline vendor assignment dropdown; assigns `rfq_assignments` row and moves RFQ to `in_review`.
- `/admin/vendors` — approve/reject vendor applications; updates `kyc_status`.

**Documentation**
- `README.md` — full project documentation: stack, all routes, DB schema, security, local dev setup, Vercel deploy steps.
- `PROMPT.md` — living source of truth; updated with every commit.
- `.docx` planning documents updated to reflect Next.js / Node.js / Supabase / Vercel stack.

**Phase 1 remaining (infrastructure only — no code changes needed)**
- Create `rfq-files` and `vendor-docs` private Storage buckets in Supabase dashboard.
- Fill `.env.local` and Vercel env vars with real Supabase project credentials.
- Run migrations in Supabase SQL editor (`001_initial_schema.sql` then `002_rls_policies.sql`).
- End-to-end quality gate: buyer signup → RFQ submit → admin assigns vendor.

### Phase 2 — Not started
Vendor dashboards, quote submission, buyer quote comparison, PO acceptance, threaded messaging, email notifications.

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

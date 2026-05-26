# EcoStel — Manufacturing Platform

EcoStel is a manufacturing startup for teams that need faster quoting, clearer supplier collaboration, project tracking, and reliable execution from prototype to production.

---

## Stack

| Layer | Technology |
|---|---|
| Frontend / API | Next.js 15 App Router (Node.js runtime) |
| Database | Supabase PostgreSQL |
| Auth | Supabase Auth (PKCE, SSR cookies via `@supabase/ssr`) |
| File storage | Supabase Storage (private buckets, signed URLs) |
| Hosting | Vercel (preview deployments on every PR) |
| Styling | CSS custom properties, Rubik via `next/font/google` |

---

## Project structure

```
app/
  (marketing)/          # Public marketing site
    page.tsx            # Home
    capabilities/       # Capabilities index + [slug]
    industries/         # Industries index + [slug]
    solutions/          # Solutions index + [slug]
    resources/          # Resources index + [slug]
    about/
    contact/
    for-vendors/
  auth/                 # Auth pages (login, signup, verify, reset, update-password)
  api/
    auth/callback/      # PKCE code exchange
    auth/signout/       # Sign-out handler
  buyer/                # Buyer workspace (auth-gated)
    page.tsx            # Dashboard
    rfq/new/            # RFQ submission form
    rfqs/               # RFQ list (grouped by status)
    rfqs/[id]/          # RFQ detail (parts, timeline, quotes)
  vendor/               # Vendor workspace (auth-gated)
    register/           # 3-step supplier application form
    pending/            # Post-application confirmation
  admin/                # Admin panel (admin org type only)
    page.tsx            # Dashboard (counts)
    rfqs/               # RFQ triage + vendor assignment
    vendors/            # Vendor approval / rejection
components/
  page-shell.tsx        # Shared layout: Navbar, Footer, ContentPanel, PageHero
  quote-comparison.tsx  # Solutions page supplier comparison table
lib/
  supabase/
    client.ts           # Browser Supabase client
    server.ts           # SSR Supabase client (cookie-based)
  env.ts                # Zod-validated env vars
  site-content.ts       # All marketing copy and page data
supabase/
  migrations/
    001_initial_schema.sql   # 18-table PostgreSQL schema
    002_rls_policies.sql     # Row Level Security policies
middleware.ts           # Session refresh + route protection
```

---

## Pages

### Marketing (public)
| Route | Description |
|---|---|
| `/` | Landing page — hero, capabilities overview, industries, client logos, CTA |
| `/capabilities` | Full capabilities index with process cards |
| `/capabilities/[slug]` | Individual capability detail (CNC, 3D printing, sheet metal, etc.) |
| `/industries` | Industries served |
| `/industries/[slug]` | Industry detail page |
| `/solutions` | Four instant-quote solution sections with supplier comparison |
| `/solutions/[slug]` | Solution detail with benefit grids and CTA |
| `/resources` | Resource library |
| `/resources/[slug]` | Resource detail |
| `/about` | About EcoStel |
| `/contact` | Contact form |
| `/for-vendors` | Supplier landing page with CTA to register |

### Auth
| Route | Description |
|---|---|
| `/auth/login` | Email + password sign-in |
| `/auth/signup` | Registration with buyer / vendor role selection |
| `/auth/verify-email` | Post-signup verification prompt |
| `/auth/reset-password` | Send password reset email |
| `/auth/update-password` | Set new password (from reset link) |

### Buyer workspace
| Route | Description |
|---|---|
| `/buyer` | Dashboard — live RFQ counts, recent submissions |
| `/buyer/rfq/new` | Submit a new RFQ (parts, CAD upload, due date) |
| `/buyer/rfqs` | All RFQs grouped by status |
| `/buyer/rfqs/[id]` | RFQ detail — parts, status timeline, assigned quotes |

### Vendor workspace
| Route | Description |
|---|---|
| `/vendor/register` | 3-step application: company info → capabilities → documents |
| `/vendor/pending` | Confirmation page after application submission |

### Admin panel
| Route | Description |
|---|---|
| `/admin` | Dashboard — pending RFQs, pending vendors, approved vendor count |
| `/admin/rfqs` | RFQ triage — assign approved vendors, move status to in_review |
| `/admin/vendors` | Review vendor applications — approve or reject |

---

## Database schema (18 tables)

`organizations` · `users` · `vendor_profiles` · `vendor_capabilities` · `vendor_certifications` · `vendor_scores` · `rfqs` · `rfq_parts` · `rfq_assignments` · `quotes` · `quote_lines` · `orders` · `order_milestones` · `invoices` · `payouts` · `messages` · `activity` · `notifications`

Row Level Security is enabled on all tables. Buyers see their own org's data only. Vendors see only RFQs they are assigned to. Admins see all rows across all orgs. Two security-definer helper functions (`current_org_id()`, `current_org_type()`) drive all RLS policies.

---

## Security

- **RLS** on all 18 tables — tenants cannot see each other's data
- **Auth middleware** — session refreshed on every request; `/buyer/*`, `/vendor/*`, `/admin/*` redirect unauthenticated users to login
- **CSP headers** — `script-src`, `img-src`, `connect-src`, `frame-ancestors` locked in `next.config.ts`
- **Rate limiting** — 120 req/min per IP on all `/api/*` routes in `middleware.ts`
- **Private storage** — CAD files and vendor documents in private Supabase Storage buckets; accessed via signed URLs only
- **Service role key** — server-only, never sent to browser

---

## Local development

### 1. Clone and install

```bash
git clone https://github.com/BK5102/ecostel-application.git
cd ecostel-application
npm install
```

### 2. Configure environment

Copy `.env.local` (already in the repo as a template) and fill in your Supabase credentials:

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Find these values in your Supabase dashboard under **Project Settings → API**.

### 3. Run migrations

In the Supabase dashboard SQL editor, run in order:

```
supabase/migrations/001_initial_schema.sql
supabase/migrations/002_rls_policies.sql
```

### 4. Create Storage buckets

In the Supabase dashboard under **Storage**, create two **private** buckets:
- `rfq-files` — buyer CAD and drawing uploads
- `vendor-docs` — vendor business document uploads

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Vercel deployment (marketing skeleton — no Supabase required)

The marketing site builds and serves fully without a live Supabase project. Only auth and workspace features require real credentials.

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project** and import `BK5102/ecostel-application`
3. Framework preset: **Next.js** (auto-detected)
4. Under **Environment Variables**, add:

| Variable | Value for skeleton deploy |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://placeholder.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `placeholder` |
| `SUPABASE_SERVICE_ROLE_KEY` | `placeholder` |
| `NEXT_PUBLIC_SITE_URL` | *(leave blank — Vercel fills this automatically)* |

5. Click **Deploy**

All marketing, capabilities, industries, solutions, resources, about, contact, and for-vendors pages will be live. Auth forms render but are non-functional until real credentials are added.

To activate the full platform later: replace the placeholder values with real Supabase credentials in **Vercel → Project → Settings → Environment Variables** and redeploy.

---

## Build status

### Phase 1 — Complete

- Marketing site (all routes)
- Brand system, SEO, security headers, rate limiting
- Database schema + RLS policies
- Auth flow (signup, login, email verify, password reset)
- Buyer workspace (dashboard, RFQ submission, RFQ list, RFQ detail)
- Vendor registration flow (3-step form, pending page)
- Admin panel (dashboard, RFQ triage, vendor approval)

### Phase 1 — Remaining (infrastructure only)

- Fill real Supabase credentials into `.env.local` and Vercel env vars
- Create `rfq-files` and `vendor-docs` Storage buckets in Supabase dashboard
- Run database migrations
- End-to-end test: buyer signup → RFQ submit → admin assigns vendor

### Phase 2 — Not started

Vendor dashboards, quote submission, buyer quote comparison, PO acceptance, threaded messaging, email notifications.

---

## Brand

- **Primary color:** `#0EAB6E` (green)
- **Dark accent:** `#06513b`
- **Font:** Rubik (self-hosted via `next/font/google`)
- **Logo:** Green circular mark with white block grid icon + EcoStel wordmark
- **Favicon:** Green circular mark

Social:
- LinkedIn: [ecostel-engineering](https://www.linkedin.com/company/ecostel-engineering/posts/?feedView=all)
- Instagram: [@ecostel.co](https://www.instagram.com/ecostel.co/)

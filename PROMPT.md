# EcoStel Project Prompt

You are developing EcoStel, a manufacturing platform for teams that need faster quoting, clearer collaboration, project tracking, and reliable execution from prototype to production.

## Non-Negotiable Stack

- Use Next.js App Router for the frontend.
- Use FastAPI for backend APIs, file upload validation, quote workflow orchestration, and future CAD/AI services.
- Use Supabase for Auth, PostgreSQL, Storage, Realtime where useful, and Row Level Security.
- Deploy the frontend on Vercel with preview deployments for every pull request.

## Product Direction

- Do not build careers, internships, open roles, or apply flows.
- Navigation must use individual pages, not a single-page anchor-only layout.
- Primary navbar groups are Home, Capabilities, Industries, Solutions, Resource, and About us.
- Each main navigation group should expose dropdown links that match the platform sitemap.
- Page descriptions and marketing copy should come from the provided Notion/PDF platform document, trimmed only for relevance and clarity.
- The top-right navbar CTA should be "Become a Supplier".
- The Get Instant Quote flow should ask the user to upload a drawing or CAD file.
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
- Include 3D printing materials information on the Capabilities page using the extracted materials/download visual.

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
- "Work closely with our team and suppliers in one place. Get DFM feedback early, make better decisions, and build strong relationships you can rely on."
- "Stay organized with simple tools to track, review, and collaborate so everyone stays on the same page."
- "Every part meets specifications, with controlled processes and timely delivery."
- "Built for teams that can't afford delays."
- "We work with teams building the next generation of products. Join us in making manufacturing faster, smarter, and more reliable."

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

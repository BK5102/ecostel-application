-- ============================================================
-- Ecostel Platform — Initial Schema
-- ============================================================

-- Organizations (buyer orgs and vendor orgs)
create table organizations (
  id          uuid primary key default gen_random_uuid(),
  type        text not null check (type in ('buyer', 'vendor', 'admin')),
  name        text not null,
  plan        text not null default 'free',
  kyc_status  text not null default 'pending' check (kyc_status in ('pending', 'approved', 'rejected')),
  created_at  timestamptz not null default now()
);

-- Users — extends auth.users; one row per Supabase auth user
create table users (
  id          uuid primary key references auth.users(id) on delete cascade,
  org_id      uuid references organizations(id) on delete cascade,
  email       text not null,
  name        text,
  role        text not null default 'member',
  created_at  timestamptz not null default now()
);

-- Vendor profiles
create table vendor_profiles (
  id                  uuid primary key default gen_random_uuid(),
  org_id              uuid not null unique references organizations(id) on delete cascade,
  locations           text[] default '{}',
  capacity            text,
  lead_time_avg_days  integer,
  verified_at         timestamptz,
  created_at          timestamptz not null default now()
);

-- Vendor capabilities
create table vendor_capabilities (
  id            uuid primary key default gen_random_uuid(),
  vendor_id     uuid not null references vendor_profiles(id) on delete cascade,
  process       text not null,
  sub_processes text[] default '{}',
  materials     text[] default '{}'
);

-- Vendor certifications
create table vendor_certifications (
  id         uuid primary key default gen_random_uuid(),
  vendor_id  uuid not null references vendor_profiles(id) on delete cascade,
  type       text not null,
  issuer     text,
  expires_at date,
  doc_url    text
);

-- Vendor performance scores
create table vendor_scores (
  id               uuid primary key default gen_random_uuid(),
  vendor_id        uuid not null unique references vendor_profiles(id) on delete cascade,
  on_time_pct      numeric(5,2) default 0,
  acceptance_pct   numeric(5,2) default 0,
  time_to_quote_hrs numeric(6,1) default 0,
  overall          numeric(5,2) default 0,
  updated_at       timestamptz not null default now()
);

-- RFQs
create table rfqs (
  id           uuid primary key default gen_random_uuid(),
  buyer_org_id uuid not null references organizations(id) on delete cascade,
  created_by   uuid not null references users(id),
  title        text not null,
  process      text,
  status       text not null default 'draft'
               check (status in ('draft','submitted','in_review','quoted','closed','cancelled')),
  due_by       date,
  notes        text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- RFQ parts
create table rfq_parts (
  id          uuid primary key default gen_random_uuid(),
  rfq_id      uuid not null references rfqs(id) on delete cascade,
  name        text not null,
  material    text,
  qty         integer not null default 1,
  finish      text,
  tolerances  text,
  cad_url     text,
  created_at  timestamptz not null default now()
);

-- RFQ vendor assignments
create table rfq_assignments (
  rfq_id       uuid not null references rfqs(id) on delete cascade,
  vendor_id    uuid not null references vendor_profiles(id) on delete cascade,
  assigned_by  uuid references users(id),
  assigned_at  timestamptz not null default now(),
  status       text not null default 'pending'
               check (status in ('pending','accepted','declined','quoted')),
  primary key (rfq_id, vendor_id)
);

-- Quotes
create table quotes (
  id           uuid primary key default gen_random_uuid(),
  rfq_id       uuid not null references rfqs(id) on delete cascade,
  vendor_id    uuid not null references vendor_profiles(id) on delete cascade,
  status       text not null default 'draft'
               check (status in ('draft','submitted','accepted','rejected','expired')),
  notes        text,
  submitted_at timestamptz,
  expires_at   timestamptz,
  created_at   timestamptz not null default now()
);

-- Quote lines (per part)
create table quote_lines (
  id            uuid primary key default gen_random_uuid(),
  quote_id      uuid not null references quotes(id) on delete cascade,
  part_id       uuid not null references rfq_parts(id) on delete cascade,
  unit_price    numeric(12,2) not null,
  lead_time_days integer not null,
  moq           integer not null default 1,
  shipping_cost numeric(12,2) default 0
);

-- Orders
create table orders (
  id             uuid primary key default gen_random_uuid(),
  quote_id       uuid not null unique references quotes(id) on delete cascade,
  po_number      text unique,
  status         text not null default 'pending'
                 check (status in ('pending','confirmed','in_production','shipped','delivered','disputed','cancelled')),
  total          numeric(12,2),
  escrow_status  text default 'unfunded'
                 check (escrow_status in ('unfunded','funded','released','refunded')),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- Order milestones
create table order_milestones (
  id           uuid primary key default gen_random_uuid(),
  order_id     uuid not null references orders(id) on delete cascade,
  type         text not null,
  notes        text,
  evidence_url text,
  completed_at timestamptz not null default now()
);

-- Invoices
create table invoices (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references orders(id) on delete cascade,
  amount      numeric(12,2) not null,
  currency    text not null default 'INR',
  status      text not null default 'pending'
              check (status in ('pending','paid','failed','refunded')),
  gateway     text,
  gateway_ref text,
  created_at  timestamptz not null default now()
);

-- Payouts
create table payouts (
  id             uuid primary key default gen_random_uuid(),
  vendor_org_id  uuid not null references organizations(id) on delete cascade,
  order_id       uuid not null references orders(id) on delete cascade,
  amount         numeric(12,2) not null,
  status         text not null default 'pending'
                 check (status in ('pending','processing','released','failed')),
  released_at    timestamptz,
  created_at     timestamptz not null default now()
);

-- Threaded messages
create table messages (
  id         uuid primary key default gen_random_uuid(),
  thread_id  uuid not null,
  author_id  uuid not null references users(id),
  body       text not null,
  parent_id  uuid references messages(id),
  created_at timestamptz not null default now()
);

-- Immutable activity / audit log
create table activity (
  id          uuid primary key default gen_random_uuid(),
  org_id      uuid references organizations(id) on delete set null,
  actor_id    uuid references users(id) on delete set null,
  type        text not null,
  target_id   uuid,
  target_type text,
  metadata    jsonb default '{}',
  at          timestamptz not null default now()
);

-- Notifications
create table notifications (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references users(id) on delete cascade,
  type       text not null,
  payload    jsonb default '{}',
  read_at    timestamptz,
  created_at timestamptz not null default now()
);

-- ── Indexes ──────────────────────────────────────────────────
create index rfqs_buyer_org_idx       on rfqs(buyer_org_id);
create index rfqs_status_idx          on rfqs(status);
create index rfq_parts_rfq_idx        on rfq_parts(rfq_id);
create index rfq_assignments_rfq_idx  on rfq_assignments(rfq_id);
create index rfq_assignments_vendor_idx on rfq_assignments(vendor_id);
create index quotes_rfq_idx           on quotes(rfq_id);
create index quotes_vendor_idx        on quotes(vendor_id);
create index orders_quote_idx         on orders(quote_id);
create index messages_thread_idx      on messages(thread_id);
create index notifications_user_idx   on notifications(user_id, read_at);
create index activity_org_idx         on activity(org_id, at desc);

-- ── Auto-update updated_at ────────────────────────────────────
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger rfqs_updated_at
  before update on rfqs
  for each row execute function set_updated_at();

create trigger orders_updated_at
  before update on orders
  for each row execute function set_updated_at();

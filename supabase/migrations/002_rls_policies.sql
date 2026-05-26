-- ============================================================
-- Ecostel Platform — Row Level Security Policies
-- ============================================================

-- Enable RLS on every table
alter table organizations         enable row level security;
alter table users                 enable row level security;
alter table vendor_profiles       enable row level security;
alter table vendor_capabilities   enable row level security;
alter table vendor_certifications enable row level security;
alter table vendor_scores         enable row level security;
alter table rfqs                  enable row level security;
alter table rfq_parts             enable row level security;
alter table rfq_assignments       enable row level security;
alter table quotes                enable row level security;
alter table quote_lines           enable row level security;
alter table orders                enable row level security;
alter table order_milestones      enable row level security;
alter table invoices              enable row level security;
alter table payouts               enable row level security;
alter table messages              enable row level security;
alter table activity              enable row level security;
alter table notifications         enable row level security;

-- ── Stable helper functions (security definer = run as owner) ─
create or replace function current_org_id()
returns uuid language sql stable security definer as $$
  select org_id from users where id = auth.uid();
$$;

create or replace function current_org_type()
returns text language sql stable security definer as $$
  select o.type
  from organizations o
  join users u on u.org_id = o.id
  where u.id = auth.uid();
$$;

-- ── Organizations ─────────────────────────────────────────────
create policy "org_select" on organizations
  for select using (
    id = current_org_id() or current_org_type() = 'admin'
  );

create policy "org_insert_own" on organizations
  for insert with check (true); -- handled server-side on signup

-- ── Users ─────────────────────────────────────────────────────
create policy "users_select_own_org" on users
  for select using (
    org_id = current_org_id() or current_org_type() = 'admin'
  );

create policy "users_update_own" on users
  for update using (id = auth.uid());

create policy "users_insert_own" on users
  for insert with check (id = auth.uid());

-- ── Vendor profiles ───────────────────────────────────────────
create policy "vendor_profiles_select" on vendor_profiles
  for select using (
    org_id = current_org_id()
    or current_org_type() in ('buyer', 'admin')
  );

create policy "vendor_profiles_insert" on vendor_profiles
  for insert with check (
    org_id = current_org_id() and current_org_type() = 'vendor'
  );

create policy "vendor_profiles_update" on vendor_profiles
  for update using (
    org_id = current_org_id() and current_org_type() = 'vendor'
  );

-- ── Vendor capabilities ───────────────────────────────────────
create policy "vendor_capabilities_select" on vendor_capabilities
  for select using (
    vendor_id in (select id from vendor_profiles where org_id = current_org_id())
    or current_org_type() in ('buyer', 'admin')
  );

create policy "vendor_capabilities_write" on vendor_capabilities
  for all using (
    vendor_id in (select id from vendor_profiles where org_id = current_org_id())
  );

-- ── Vendor certifications ─────────────────────────────────────
create policy "vendor_certifications_select" on vendor_certifications
  for select using (
    vendor_id in (select id from vendor_profiles where org_id = current_org_id())
    or current_org_type() in ('buyer', 'admin')
  );

create policy "vendor_certifications_write" on vendor_certifications
  for all using (
    vendor_id in (select id from vendor_profiles where org_id = current_org_id())
  );

-- ── Vendor scores ─────────────────────────────────────────────
create policy "vendor_scores_select" on vendor_scores
  for select using (
    vendor_id in (select id from vendor_profiles where org_id = current_org_id())
    or current_org_type() in ('buyer', 'admin')
  );

-- ── RFQs ──────────────────────────────────────────────────────
-- Buyers see own; admins see all; vendors see only assigned
create policy "rfqs_select" on rfqs
  for select using (
    buyer_org_id = current_org_id()
    or current_org_type() = 'admin'
    or (current_org_type() = 'vendor' and id in (
      select ra.rfq_id
      from rfq_assignments ra
      join vendor_profiles vp on vp.id = ra.vendor_id
      where vp.org_id = current_org_id()
    ))
  );

create policy "rfqs_insert" on rfqs
  for insert with check (
    buyer_org_id = current_org_id() and current_org_type() = 'buyer'
  );

create policy "rfqs_update_draft" on rfqs
  for update using (
    buyer_org_id = current_org_id() and status = 'draft'
  );

-- ── RFQ parts ─────────────────────────────────────────────────
create policy "rfq_parts_select" on rfq_parts
  for select using (
    rfq_id in (select id from rfqs where buyer_org_id = current_org_id())
    or current_org_type() = 'admin'
    or (current_org_type() = 'vendor' and rfq_id in (
      select ra.rfq_id
      from rfq_assignments ra
      join vendor_profiles vp on vp.id = ra.vendor_id
      where vp.org_id = current_org_id()
    ))
  );

create policy "rfq_parts_insert" on rfq_parts
  for insert with check (
    rfq_id in (
      select id from rfqs where buyer_org_id = current_org_id() and status = 'draft'
    )
  );

create policy "rfq_parts_update" on rfq_parts
  for update using (
    rfq_id in (
      select id from rfqs where buyer_org_id = current_org_id() and status = 'draft'
    )
  );

-- ── RFQ assignments ───────────────────────────────────────────
-- Admins assign; vendors see their own; buyers see who's assigned to their RFQs
create policy "rfq_assignments_select" on rfq_assignments
  for select using (
    current_org_type() = 'admin'
    or vendor_id in (select id from vendor_profiles where org_id = current_org_id())
    or rfq_id in (select id from rfqs where buyer_org_id = current_org_id())
  );

create policy "rfq_assignments_admin_insert" on rfq_assignments
  for insert with check (current_org_type() = 'admin');

create policy "rfq_assignments_vendor_update" on rfq_assignments
  for update using (
    vendor_id in (select id from vendor_profiles where org_id = current_org_id())
  );

-- ── Quotes ────────────────────────────────────────────────────
create policy "quotes_select" on quotes
  for select using (
    current_org_type() = 'admin'
    or vendor_id in (select id from vendor_profiles where org_id = current_org_id())
    or rfq_id in (select id from rfqs where buyer_org_id = current_org_id())
  );

create policy "quotes_vendor_insert" on quotes
  for insert with check (
    vendor_id in (select id from vendor_profiles where org_id = current_org_id())
    and current_org_type() = 'vendor'
  );

create policy "quotes_vendor_update_draft" on quotes
  for update using (
    vendor_id in (select id from vendor_profiles where org_id = current_org_id())
    and status = 'draft'
  );

-- ── Quote lines ───────────────────────────────────────────────
create policy "quote_lines_select" on quote_lines
  for select using (
    current_org_type() = 'admin'
    or quote_id in (
      select id from quotes where
        vendor_id in (select id from vendor_profiles where org_id = current_org_id())
        or rfq_id in (select id from rfqs where buyer_org_id = current_org_id())
    )
  );

create policy "quote_lines_vendor_write" on quote_lines
  for all using (
    quote_id in (
      select id from quotes where
        vendor_id in (select id from vendor_profiles where org_id = current_org_id())
        and status = 'draft'
    )
  );

-- ── Orders ────────────────────────────────────────────────────
create policy "orders_select" on orders
  for select using (
    current_org_type() = 'admin'
    or quote_id in (
      select q.id from quotes q
      join rfqs r on r.id = q.rfq_id
      where r.buyer_org_id = current_org_id()
    )
    or quote_id in (
      select id from quotes where
        vendor_id in (select id from vendor_profiles where org_id = current_org_id())
    )
  );

-- ── Order milestones ──────────────────────────────────────────
create policy "order_milestones_select" on order_milestones
  for select using (
    current_org_type() = 'admin'
    or order_id in (select id from orders)
  );

create policy "order_milestones_vendor_insert" on order_milestones
  for insert with check (current_org_type() in ('vendor', 'admin'));

-- ── Invoices ──────────────────────────────────────────────────
create policy "invoices_select" on invoices
  for select using (
    current_org_type() = 'admin'
    or order_id in (
      select o.id from orders o
      join quotes q on q.id = o.quote_id
      join rfqs r on r.id = q.rfq_id
      where r.buyer_org_id = current_org_id()
    )
  );

-- ── Payouts ───────────────────────────────────────────────────
create policy "payouts_select" on payouts
  for select using (
    vendor_org_id = current_org_id() or current_org_type() = 'admin'
  );

-- ── Messages ──────────────────────────────────────────────────
create policy "messages_select" on messages
  for select using (
    author_id = auth.uid() or current_org_type() = 'admin'
  );

create policy "messages_insert" on messages
  for insert with check (author_id = auth.uid());

-- ── Activity log ──────────────────────────────────────────────
create policy "activity_select" on activity
  for select using (
    org_id = current_org_id() or current_org_type() = 'admin'
  );

-- Activity is append-only; written by server via service role only

-- ── Notifications ─────────────────────────────────────────────
create policy "notifications_own" on notifications
  for select using (user_id = auth.uid());

create policy "notifications_update_own" on notifications
  for update using (user_id = auth.uid());

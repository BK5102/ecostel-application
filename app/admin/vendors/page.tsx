import { createClient } from "@/lib/supabase/server";
import ApproveVendorButton from "./approve-vendor-button";

export const metadata = { title: "Vendor Applications" };

export default async function AdminVendorsPage() {
  const supabase = await createClient();

  const { data: orgs } = await supabase
    .from("organizations")
    .select(`
      id,
      name,
      kyc_status,
      created_at,
      vendor_profiles (
        id,
        capacity,
        lead_time_avg_days,
        locations,
        vendor_capabilities ( process, materials ),
        vendor_certifications ( type )
      )
    `)
    .eq("type", "vendor")
    .order("created_at", { ascending: true });

  const pending = orgs?.filter((o) => o.kyc_status === "pending") ?? [];
  const approved = orgs?.filter((o) => o.kyc_status === "approved") ?? [];
  const rejected = orgs?.filter((o) => o.kyc_status === "rejected") ?? [];

  return (
    <>
      <div className="buyer-page-header">
        <div>
          <h1>Vendor Applications</h1>
          <p className="buyer-page-sub">
            {pending.length} pending · {approved.length} approved · {rejected.length} rejected
          </p>
        </div>
      </div>

      {pending.length > 0 && (
        <section className="buyer-section">
          <div className="buyer-section-header">
            <h2>Pending review</h2>
            <span className="rfq-count-badge">{pending.length}</span>
          </div>
          <div className="admin-vendor-list">
            {pending.map((org) => (
              <VendorCard key={org.id} org={org} showActions />
            ))}
          </div>
        </section>
      )}

      {approved.length > 0 && (
        <section className="buyer-section">
          <div className="buyer-section-header">
            <h2>Approved</h2>
            <span className="rfq-count-badge">{approved.length}</span>
          </div>
          <div className="admin-vendor-list">
            {approved.map((org) => (
              <VendorCard key={org.id} org={org} />
            ))}
          </div>
        </section>
      )}

      {rejected.length > 0 && (
        <section className="buyer-section">
          <div className="buyer-section-header">
            <h2>Rejected</h2>
            <span className="rfq-count-badge">{rejected.length}</span>
          </div>
          <div className="admin-vendor-list">
            {rejected.map((org) => (
              <VendorCard key={org.id} org={org} />
            ))}
          </div>
        </section>
      )}

      {!orgs?.length && (
        <div className="buyer-empty">
          <p>No vendor applications yet.</p>
        </div>
      )}
    </>
  );
}

type Org = {
  id: string;
  name: string;
  kyc_status: string;
  created_at: string;
  vendor_profiles: {
    id: string;
    capacity: string | null;
    lead_time_avg_days: number | null;
    locations: string[];
    vendor_capabilities: { process: string; materials: string[] }[];
    vendor_certifications: { type: string }[];
  }[];
};

function VendorCard({ org, showActions }: { org: Org; showActions?: boolean }) {
  const profile = org.vendor_profiles?.[0];
  const processes = profile?.vendor_capabilities?.map((c) => c.process) ?? [];
  const certs = profile?.vendor_certifications?.map((c) => c.type) ?? [];

  return (
    <div className="admin-vendor-card">
      <div className="admin-vendor-card-header">
        <div>
          <strong>{org.name}</strong>
          <small>
            Applied {new Date(org.created_at).toLocaleDateString("en-IN", {
              day: "numeric", month: "short", year: "numeric",
            })}
            {profile?.locations?.length ? ` · ${profile.locations[0]}` : ""}
          </small>
        </div>
        <span className={`status-pill status-${org.kyc_status}`}>
          {org.kyc_status.charAt(0).toUpperCase() + org.kyc_status.slice(1)}
        </span>
      </div>

      {processes.length > 0 && (
        <div className="admin-vendor-tags">
          {processes.map((p) => <span key={p} className="tag">{p}</span>)}
        </div>
      )}

      {certs.length > 0 && (
        <div className="admin-vendor-tags">
          {certs.map((c) => <span key={c} className="tag tag-cert">{c}</span>)}
        </div>
      )}

      {profile?.capacity && (
        <p style={{ fontSize: 13, color: "var(--muted)", margin: "4px 0 0" }}>
          Capacity: {profile.capacity}
          {profile.lead_time_avg_days ? ` · Lead time: ${profile.lead_time_avg_days} days` : ""}
        </p>
      )}

      {showActions && <ApproveVendorButton orgId={org.id} />}
    </div>
  );
}

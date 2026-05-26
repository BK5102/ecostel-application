import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Admin Dashboard" };

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: pendingRfqs },
    { count: pendingVendors },
    { count: activeVendors },
  ] = await Promise.all([
    supabase.from("rfqs").select("id", { count: "exact", head: true }).eq("status", "submitted"),
    supabase
      .from("organizations")
      .select("id", { count: "exact", head: true })
      .eq("type", "vendor")
      .eq("kyc_status", "pending"),
    supabase
      .from("organizations")
      .select("id", { count: "exact", head: true })
      .eq("type", "vendor")
      .eq("kyc_status", "approved"),
  ]);

  return (
    <>
      <div className="buyer-page-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="buyer-page-sub">Platform overview and quick actions</p>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <span className="stat-label">RFQs awaiting triage</span>
          <span className="stat-value">{pendingRfqs ?? 0}</span>
          <Link href="/admin/rfqs" className="stat-link">
            Review <ArrowRight size={13} aria-hidden />
          </Link>
        </div>
        <div className="stat-card">
          <span className="stat-label">Vendor applications pending</span>
          <span className="stat-value">{pendingVendors ?? 0}</span>
          <Link href="/admin/vendors" className="stat-link">
            Review <ArrowRight size={13} aria-hidden />
          </Link>
        </div>
        <div className="stat-card">
          <span className="stat-label">Approved vendors</span>
          <span className="stat-value">{activeVendors ?? 0}</span>
        </div>
      </div>
    </>
  );
}

import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LayoutDashboard, FileText, Users, LogOut } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login?next=/admin");

  const { data: profile } = await supabase
    .from("users")
    .select("org_id, organizations(type)")
    .eq("id", user.id)
    .single();

  const orgType = (profile?.organizations as unknown as { type: string } | null)?.type;
  if (orgType !== "admin") redirect("/buyer");

  return (
    <div className="buyer-layout">
      <aside className="buyer-sidebar">
        <Link href="/admin" className="buyer-logo" aria-label="EcoStel Admin">
          <img src="/ecostel-logo.png" alt="EcoStel logo" width={28} height={28} />
          <span>Admin</span>
        </Link>

        <nav className="buyer-nav" aria-label="Admin navigation">
          <Link href="/admin" className="buyer-nav-link">
            <LayoutDashboard size={16} aria-hidden /> Dashboard
          </Link>
          <Link href="/admin/rfqs" className="buyer-nav-link">
            <FileText size={16} aria-hidden /> RFQ Triage
          </Link>
          <Link href="/admin/vendors" className="buyer-nav-link">
            <Users size={16} aria-hidden /> Vendors
          </Link>
        </nav>

        <div className="buyer-sidebar-footer">
          <div className="buyer-user-row">
            <div className="buyer-avatar" aria-hidden>
              {(user.email ?? "A")[0].toUpperCase()}
            </div>
            <div className="buyer-user-info">
              <strong>Admin</strong>
              <span>{user.email}</span>
            </div>
          </div>
          <form action="/api/auth/signout" method="POST">
            <button type="submit" className="buyer-signout" aria-label="Sign out">
              <LogOut aria-hidden size={15} />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <main className="buyer-main">{children}</main>
    </div>
  );
}

import Link from "next/link";
import { redirect } from "next/navigation";
import { ClipboardList, LayoutDashboard, LogOut, Package, Settings } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

const navItems = [
  { label: "Dashboard", href: "/buyer", Icon: LayoutDashboard },
  { label: "My RFQs", href: "/buyer/rfqs", Icon: ClipboardList },
  { label: "Orders", href: "/buyer/orders", Icon: Package },
  { label: "Settings", href: "/buyer/settings", Icon: Settings },
];

export default async function BuyerLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login?next=/buyer");

  const { data: profile } = await supabase
    .from("users")
    .select("name, role")
    .eq("id", user.id)
    .single();

  return (
    <div className="buyer-layout">
      <aside className="buyer-sidebar">
        <Link href="/" className="buyer-logo" aria-label="EcoStel home">
          <svg width="28" height="28" viewBox="0 0 36 36" fill="none" aria-hidden>
            <circle cx="18" cy="18" r="18" fill="#0EAB6E" />
            <rect x="10" y="10" width="7" height="7" rx="1" fill="white" />
            <rect x="19" y="10" width="7" height="7" rx="1" fill="white" />
            <rect x="10" y="19" width="7" height="7" rx="1" fill="white" />
            <rect x="19" y="19" width="7" height="7" rx="1" fill="white" opacity="0.45" />
          </svg>
          <span>EcoStel</span>
        </Link>

        <nav className="buyer-nav" aria-label="Buyer workspace navigation">
          {navItems.map(({ label, href, Icon }) => (
            <Link key={href} href={href} className="buyer-nav-link">
              <Icon aria-hidden size={16} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="buyer-sidebar-footer">
          <div className="buyer-user-row">
            <div className="buyer-avatar" aria-hidden>
              {(profile?.name ?? user.email ?? "U")[0].toUpperCase()}
            </div>
            <div className="buyer-user-info">
              <strong>{profile?.name ?? "My Account"}</strong>
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

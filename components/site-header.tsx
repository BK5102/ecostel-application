import Link from "next/link";
import { ChevronDown, Send } from "lucide-react";
import { EcostelLogo } from "@/components/ecostel-logo";
import { navGroups } from "@/lib/site-content";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="nav-inner">
        <Link className="brand" href="/">
          <EcostelLogo />
        </Link>
        <nav aria-label="Primary navigation" className="nav-menu">
          <Link className="nav-link" href="/">
            Home
          </Link>
          {navGroups.map((group) => (
            <div className="nav-item" key={group.label}>
              <Link className="nav-trigger" href={group.href}>
                {group.label}
                <ChevronDown aria-hidden size={14} />
              </Link>
              <div className="dropdown">
                {group.items.map((item) => (
                  <Link className="dropdown-link" href={item.href} key={item.href}>
                    <span className="dropdown-title">{item.label}</span>
                    <span className="dropdown-copy">{item.description}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <Link className="cta" href="/solutions/collaboration">
          Become a Supplier
          <Send aria-hidden size={15} />
        </Link>
      </div>
      <nav aria-label="Mobile navigation" className="mobile-nav">
        <Link href="/">Home</Link>
        {navGroups.map((group) => (
          <Link href={group.href} key={group.href}>
            {group.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

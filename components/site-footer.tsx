import Link from "next/link";
import { EcostelLogo } from "@/components/ecostel-logo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <EcostelLogo />
          <span> - Manufacturing as an on-demand system layer.</span>
        </div>
        <div>
          <Link href="/about#privacy">Privacy</Link>
          <span> / </span>
          <Link href="/resources/articles">Articles</Link>
          <span> / </span>
          <span>{new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}

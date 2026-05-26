import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-shell">
      <div className="auth-card">
        <Link href="/" className="auth-logo" aria-label="EcoStel home">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
            <circle cx="18" cy="18" r="18" fill="#0EAB6E" />
            <rect x="10" y="10" width="7" height="7" rx="1" fill="white" />
            <rect x="19" y="10" width="7" height="7" rx="1" fill="white" />
            <rect x="10" y="19" width="7" height="7" rx="1" fill="white" />
            <rect x="19" y="19" width="7" height="7" rx="1" fill="white" opacity="0.45" />
          </svg>
          <span className="auth-logo-wordmark">EcoStel</span>
        </Link>
        {children}
      </div>
    </div>
  );
}

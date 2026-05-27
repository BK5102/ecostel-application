import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-shell">
      <div className="auth-card">
        <Link href="/" className="auth-logo" aria-label="EcoStel home">
          <img src="/ecostel-logo.png" alt="EcoStel logo" width={36} height={36} />
          <span className="auth-logo-wordmark">EcoStel</span>
        </Link>
        {children}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgType, setOrgType] = useState<"buyer" | "vendor">("buyer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
        data: { name, org_name: orgName, org_type: orgType },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    router.push("/auth/verify-email");
  }

  return (
    <>
      <h1>Create account</h1>
      <p className="auth-subtitle">Start sourcing smarter with EcoStel.</p>

      {error ? <div className="auth-alert error">{error}</div> : null}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name">Your name</label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Smith"
          />
        </div>

        <div className="field">
          <label htmlFor="org-name">Company name</label>
          <input
            id="org-name"
            type="text"
            autoComplete="organization"
            required
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            placeholder="Acme Engineering"
          />
        </div>

        <div className="field">
          <label htmlFor="org-type">I am joining as</label>
          <select
            id="org-type"
            value={orgType}
            onChange={(e) => setOrgType(e.target.value as "buyer" | "vendor")}
          >
            <option value="buyer">Buyer — I need parts manufactured</option>
            <option value="vendor">Supplier — I manufacture parts</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="email">Work email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 8 characters"
          />
        </div>

        <button className="cta auth-submit" type="submit" disabled={loading}>
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="auth-footer">
        Already have an account?{" "}
        <Link href="/auth/login">Sign in</Link>
      </p>
    </>
  );
}

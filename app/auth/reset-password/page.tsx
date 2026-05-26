"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });

    if (resetError) {
      setError(resetError.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <>
        <h1>Email sent</h1>
        <p className="auth-subtitle">
          If that address is registered, you&apos;ll receive a password reset link shortly.
        </p>
        <div className="auth-alert success">Check your inbox and follow the link to reset your password.</div>
        <p className="auth-footer">
          <Link href="/auth/login">Back to sign in</Link>
        </p>
      </>
    );
  }

  return (
    <>
      <h1>Reset password</h1>
      <p className="auth-subtitle">Enter your email and we&apos;ll send a reset link.</p>

      {error ? <div className="auth-alert error">{error}</div> : null}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="email">Email</label>
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

        <button className="cta auth-submit" type="submit" disabled={loading}>
          {loading ? "Sending…" : "Send reset link"}
        </button>
      </form>

      <p className="auth-footer">
        <Link href="/auth/login">Back to sign in</Link>
      </p>
    </>
  );
}

import Link from "next/link";
import { MailCheck } from "lucide-react";

export const metadata = { title: "Check your email" };

export default function VerifyEmailPage() {
  return (
    <>
      <div className="auth-icon-row">
        <MailCheck size={40} strokeWidth={1.5} className="auth-icon-success" aria-hidden />
      </div>
      <h1>Check your email</h1>
      <p className="auth-subtitle">
        We sent a confirmation link to your address. Click it to activate your account and sign in.
      </p>
      <div className="auth-alert success">
        Didn&apos;t receive it? Check your spam folder or{" "}
        <Link href="/auth/signup">try signing up again</Link>.
      </div>
      <p className="auth-footer">
        <Link href="/auth/login">Back to sign in</Link>
      </p>
    </>
  );
}

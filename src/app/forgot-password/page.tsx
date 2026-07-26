"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };

  return (
    <section className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: "var(--bg)" }}>
      <div className="w-full max-w-[380px]">
        <div className="text-center mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl mx-auto mb-4" style={{ backgroundColor: "var(--primary)" }}>
            <Mail className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-[22px] font-bold" style={{ color: "var(--fg-heading)" }}>Reset your password</h1>
          <p className="text-[13px] mt-1" style={{ color: "var(--fg-muted)" }}>Enter your email and we&apos;ll send you a reset link.</p>
        </div>

        <div className="p-6 rounded-xl border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
          {sent ? (
            <div className="text-center py-4">
              <CheckCircle className="h-8 w-8 mx-auto mb-3" style={{ color: "var(--primary)" }} />
              <p className="text-[14px] font-medium" style={{ color: "var(--fg-heading)" }}>Check your email</p>
              <p className="text-[12px] mt-1" style={{ color: "var(--fg-muted)" }}>
                If an account exists with {email}, you&apos;ll receive a password reset link shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="email" placeholder="Email address" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border text-[14px] outline-none transition-colors"
                style={{ backgroundColor: "var(--bg-input)", borderColor: "var(--border)", color: "var(--fg)" }} />
              <button type="submit" className="w-full py-2.5 rounded-lg text-[14px] font-semibold text-white transition-all duration-200"
                style={{ backgroundColor: "var(--primary)" }}>
                Send Reset Link
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center">
          <Link href="/login" className="inline-flex items-center gap-1.5 text-[13px] transition-colors" style={{ color: "var(--fg-muted)" }}>
            <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
          </Link>
        </p>
      </div>
    </section>
  );
}

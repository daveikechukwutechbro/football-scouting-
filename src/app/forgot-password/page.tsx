"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0A0A0F] px-6">
      <div className="w-full max-w-[380px]">
        <div className="text-center mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10B981] mx-auto mb-4">
            <Mail className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-[22px] font-bold text-[#F1F5F9]">Reset your password</h1>
          <p className="text-[13px] text-[#636681] mt-1">
            Enter your email and we&apos;ll send you a reset link.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[#111118] border border-white/[0.04]">
          {sent ? (
            <div className="text-center py-4">
              <CheckCircle className="h-8 w-8 text-[#10B981] mx-auto mb-3" />
              <p className="text-[14px] text-[#F1F5F9] font-medium">Check your email</p>
              <p className="text-[12px] text-[#636681] mt-1">
                If an account exists with {email}, you&apos;ll receive a password reset link shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[14px] text-[#F1F5F9] placeholder-[#475569] focus:border-[#10B981]/[0.3] focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg text-[14px] font-semibold text-white bg-[#10B981] hover:bg-[#0EA573] transition-all duration-200"
              >
                Send Reset Link
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center">
          <Link href="/login" className="inline-flex items-center gap-1.5 text-[13px] text-[#475569] hover:text-[#94A3B8] transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
          </Link>
        </p>
      </div>
    </section>
  );
}

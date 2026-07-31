"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle, AlertCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await sendPasswordResetEmail(auth, email);
      setStatus("sent");
    } catch (err: any) {
      setError(err.code === "auth/user-not-found" ? "No account found with this email" : "Something went wrong. Try again.");
      setStatus("idle");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary mx-auto mb-4">
            <Mail className="h-6 w-6 text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Reset your password</h1>
          <p className="text-sm text-muted mt-1">Enter your email and we&apos;ll send you a reset link</p>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-surface">
          {status === "sent" ? (
            <div className="text-center py-4">
              <CheckCircle className="h-10 w-10 text-primary mx-auto mb-3" />
              <p className="text-sm text-foreground font-medium">Check your email</p>
              <p className="text-xs text-muted mt-1">We sent a password reset link to <span className="font-medium text-foreground">{email}</span></p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                  <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                  <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
                </div>
              )}
              <input type="email" placeholder="Email address" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground placeholder-muted text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
              <button type="submit" disabled={status === "sending"}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-hover transition-colors disabled:opacity-50">
                {status === "sending" ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          <Link href="/login" className="inline-flex items-center gap-1.5 font-medium text-primary hover:text-primary-hover">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
          </Link>
        </p>
      </div>
    </section>
  );
}

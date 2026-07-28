"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, AlertCircle, Mail, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resentMsg, setResentMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setLoading(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password, or your email is not yet verified.");
    } else {
      try {
        const sessRes = await fetch("/api/auth/session");
        const session = await sessRes.json();
        if (session?.user?.role === "admin") router.push("/admin");
        else router.push("/");
      } catch { router.push("/"); }
      router.refresh();
    }
  };

  const handleResendVerification = async () => {
    if (!email.trim()) { setError("Enter your email first"); return; }
    setResending(true); setResentMsg("");
    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) setResentMsg("Verification email sent! Check your inbox.");
      else setError(data.error || "Failed to resend");
    } catch { setError("Network error"); }
    setResending(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary mx-auto mb-4">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-white fill-current">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
          <p className="text-sm text-muted mt-1">Sign in to your ProScout account</p>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-surface space-y-4">
          <button
            onClick={() => { setGoogleLoading(true); signIn("google", { callbackUrl: "/" }); }}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-semibold text-foreground border border-border bg-background hover:bg-surface-alt transition-colors disabled:opacity-50"
          >
            {googleLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            )}
            {googleLoading ? "Connecting..." : "Continue with Google"}
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 mb-4">
              <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
              <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
            </div>
          )}
          {resentMsg && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 mb-4">
              <Mail className="h-4 w-4 text-green-500 shrink-0" />
              <span className="text-sm text-green-600 dark:text-green-400">{resentMsg}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" placeholder="Email address" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground placeholder-muted text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
            <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground placeholder-muted text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-hover transition-colors disabled:opacity-50">
              <LogIn className="h-4 w-4" /> {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-4 flex flex-col items-center gap-2 text-center">
            <button type="button" disabled={resending} onClick={handleResendVerification}
              className="text-xs text-muted hover:text-primary transition-colors underline underline-offset-2">
              {resending ? "Sending..." : "Resend verification email"}
            </button>
            <Link href="/forgot-password" className="text-xs text-muted hover:text-primary transition-colors underline underline-offset-2">
              Forgot password?
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-primary hover:text-primary-hover">
            Create account
          </Link>
        </p>
      </div>
    </section>
  );
}

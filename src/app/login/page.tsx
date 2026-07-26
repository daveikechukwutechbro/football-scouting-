"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password. Please try again.");
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: "var(--bg)" }}>
      <div className="w-full max-w-[380px]">
        <div className="text-center mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl mx-auto mb-4" style={{ backgroundColor: "var(--primary)" }}>
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white fill-current">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <h1 className="text-[22px] font-bold" style={{ color: "var(--fg-heading)" }}>Welcome back</h1>
          <p className="text-[13px] mt-1" style={{ color: "var(--fg-muted)" }}>Sign in to your ProScout account</p>
        </div>

        <div className="p-6 rounded-xl border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
          {error && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg mb-4" style={{ backgroundColor: "var(--danger-light)" }}>
              <AlertCircle className="h-4 w-4 shrink-0" style={{ color: "var(--danger)" }} />
              <span className="text-[12px]" style={{ color: "var(--danger)" }}>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="email" placeholder="Email address" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border text-[14px] outline-none transition-colors"
              style={{ backgroundColor: "var(--bg-input)", borderColor: "var(--border)", color: "var(--fg)" }} />
            <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border text-[14px] outline-none transition-colors"
              style={{ backgroundColor: "var(--bg-input)", borderColor: "var(--border)", color: "var(--fg)" }} />
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-[14px] font-semibold text-white transition-all duration-200 disabled:opacity-50"
              style={{ backgroundColor: "var(--primary)" }}>
              <LogIn className="h-4 w-4" />
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-[13px]" style={{ color: "var(--fg-muted)" }}>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium transition-colors" style={{ color: "var(--primary)" }}>Register now</Link>
        </p>
      </div>
    </section>
  );
}

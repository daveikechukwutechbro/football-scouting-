"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendEmailVerification } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, AlertCircle, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      if (!cred.user.emailVerified) {
        await auth.signOut();
        setError("Email not verified. Check your inbox or resend.");
        setLoading(false);
        return;
      }
      router.push("/");
    } catch (err: any) {
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential")
        setError("Invalid email or password");
      else if (err.code === "auth/too-many-requests")
        setError("Too many attempts. Try again later.");
      else setError(err.message || "Login failed");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      router.push("/");
    } catch (err: any) {
      if (err.code !== "auth/popup-closed-by-user") setError(err.message || "Google sign-in failed");
    }
    setLoading(false);
  };

  const handleResendVerification = async () => {
    if (!email.trim()) { setError("Enter your email first"); return; }
    setLoading(true);
    try {
      await sendEmailVerification(auth.currentUser!);
      setError("");
      alert("Verification email sent! Check your inbox.");
    } catch { setError("Failed to resend. Sign in first."); }
    setLoading(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary mx-auto mb-4">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-white fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
          <p className="text-sm text-muted mt-1">Sign in to your ProScout account</p>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-surface space-y-4">
          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
              <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
              <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
            </div>
          )}

          <button onClick={handleGoogleLogin} disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-semibold text-foreground border border-border bg-background hover:bg-surface-alt transition-colors disabled:opacity-50">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
              <svg viewBox="0 0 24 24" className="h-5 w-5"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            )}
            Continue with Google
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <input type="email" placeholder="Email address" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground placeholder-muted text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
            <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground placeholder-muted text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-hover transition-colors disabled:opacity-50">
              <LogIn className="h-4 w-4" /> {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="flex flex-col items-center gap-2 text-center">
            <button type="button" disabled={loading} onClick={handleResendVerification}
              className="text-xs text-muted hover:text-primary transition-colors underline underline-offset-2">
              Resend verification email
            </button>
            <Link href="/forgot-password" className="text-xs text-muted hover:text-primary transition-colors underline underline-offset-2">
              Forgot password?
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-primary hover:text-primary-hover">Create account</Link>
        </p>
      </div>
    </section>
  );
}

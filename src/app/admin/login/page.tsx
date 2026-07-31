"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2 } from "lucide-react";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "infoproscoutt@gmail.com";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      if (cred.user.email !== ADMIN_EMAIL) {
        await auth.signOut();
        setError("You are not authorized to access the admin panel");
        setLoading(false);
        return;
      }
      router.push("/admin");
    } catch (err: any) {
      if (err.code === "auth/invalid-credential") setError("Invalid email or password");
      else setError("Invalid email or password");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0F1419] flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 rounded-2xl border border-border bg-surface">
        <div className="text-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary mx-auto mb-4">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
          <p className="text-sm text-muted mt-1">Sign in to the admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 p-3">
              <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <input type="email" placeholder="infoproscoutt@gmail.com" required value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />

          <input type="password" placeholder="Password" required value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />

          <button type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-hover transition-colors disabled:opacity-50">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

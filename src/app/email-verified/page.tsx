"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { applyActionCode } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { CheckCircle, LogIn, AlertCircle, Loader2 } from "lucide-react";

function EmailVerifiedContent() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const mode = searchParams.get("mode");
    const oobCode = searchParams.get("oobCode");

    if (mode === "verifyEmail" && oobCode) {
      applyActionCode(auth, oobCode)
        .then(() => setState("success"))
        .catch(() => setState("error"));
    } else {
      setState("success");
    }
  }, [searchParams]);

  return (
    <div className="w-full max-w-md text-center">
      <div className="p-8 rounded-2xl border border-border bg-surface">
        {state === "loading" && (
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
        )}
        {state === "success" && (
          <>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-primary" strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Email Verified!</h1>
            <p className="text-sm text-muted leading-relaxed">
              Your email has been successfully verified. You can now sign in to your ProScout account and complete your registration.
            </p>
            <div className="mt-8">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-hover transition-colors"
              >
                <LogIn className="h-4 w-4" /> Sign In Now
              </Link>
            </div>
          </>
        )}
        {state === "error" && (
          <>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 mx-auto mb-6">
              <AlertCircle className="h-8 w-8 text-red-500" strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Verification Failed</h1>
            <p className="text-sm text-muted leading-relaxed">
              This link is invalid or has expired. Try signing in and requesting a new verification email.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-hover transition-colors"
              >
                <LogIn className="h-4 w-4" /> Go to Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function EmailVerifiedPage() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-background">
      <Suspense fallback={
        <div className="w-full max-w-md text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
        </div>
      }>
        <EmailVerifiedContent />
      </Suspense>
    </section>
  );
}

"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import Link from "next/link";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

function PaymentCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [status, setStatus] = useState<"checking" | "success" | "failed">("checking");
  const [error, setError] = useState("");
  const ran = useRef(false);

  useEffect(() => {
    if (loading) return;
    if (ran.current) return;
    ran.current = true;

    const flwStatus = searchParams.get("status");
    const transactionId = searchParams.get("transaction_id");

    if (flwStatus !== "successful" && flwStatus !== "success") {
      setStatus("failed");
      setError("Payment was not completed.");
      return;
    }
    if (!transactionId) {
      setStatus("failed");
      setError("Missing transaction reference. Please try again.");
      return;
    }
    if (!user) {
      setStatus("failed");
      setError("You must be signed in to complete registration.");
      return;
    }

    const finalize = async () => {
      try {
        const token = await user.getIdToken();
        const saved = localStorage.getItem("proscout-registration");
        const formData = saved ? JSON.parse(saved) : {};

        const res = await fetch("/api/payment/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ transactionId, formData }),
        });
        const result = await res.json();

        if (!res.ok) {
          setStatus("failed");
          setError(result.error || "Verification failed. Please try again.");
          return;
        }

        localStorage.removeItem("proscout-registration");
        setStatus("success");
        setTimeout(() => router.push("/dashboard"), 2000);
      } catch {
        setStatus("failed");
        setError("Network error during verification. Please try again.");
      }
    };

    finalize();
  }, [searchParams, user, loading, router]);

  if (status === "checking") {
    return (
      <div className="w-full max-w-md text-center">
        <div className="p-8 rounded-2xl border border-border bg-surface">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
          <h1 className="text-xl font-bold text-foreground mb-2">Confirming your payment...</h1>
          <p className="text-sm text-muted">Please wait while we verify your transaction.</p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="w-full max-w-md text-center">
        <div className="p-8 rounded-2xl border border-border bg-surface">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h1>
          <p className="text-sm text-muted">
            Your registration is complete. Redirecting you to your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md text-center">
      <div className="p-8 rounded-2xl border border-border bg-surface">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 mx-auto mb-6">
          <AlertCircle className="h-8 w-8 text-red-500" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Payment Issue</h1>
        <p className="text-sm text-muted">{error}</p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-hover transition-colors"
          >
            Back to Registration
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentCallbackPage() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-background">
      <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />}>
        <PaymentCallbackContent />
      </Suspense>
    </section>
  );
}

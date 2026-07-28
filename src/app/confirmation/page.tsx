import Link from "next/link";
import { CheckCircle, ArrowRight, Mail } from "lucide-react";

export default function ConfirmationPage() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-lg text-center">
        <div className="p-8 rounded-2xl border border-border bg-surface">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Application Submitted!</h1>
          <p className="text-sm text-muted leading-relaxed max-w-sm mx-auto">
            Your profile has been registered. Our scouts will review it within 48 hours.
          </p>
          <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-sm font-medium text-amber-800 dark:text-amber-300">Verify your email</p>
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
                  We sent a verification link to your email. Click it to activate your account and receive scout updates.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-hover transition-colors">
              Back to Home
            </Link>
            <Link href="/login" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-foreground border border-border hover:bg-surface-alt transition-colors">
              Sign In <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { CheckCircle, ArrowRight, Home } from "lucide-react";

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
            Thank you for registering with ProScout Football. Our scouts will review your profile within 48 hours.
          </p>
          <div className="mt-6 p-4 rounded-xl bg-surface-alt border border-border">
            <p className="text-xs text-muted">
              You&apos;ll receive an email notification once your profile has been reviewed. In the meantime, you can log in to check your application status.
            </p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-hover transition-colors">
              <Home className="h-4 w-4" /> Back to Home
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

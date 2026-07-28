import Link from "next/link";
import { CheckCircle, LogIn } from "lucide-react";

export default function EmailVerifiedPage() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md text-center">
        <div className="p-8 rounded-2xl border border-border bg-surface">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Email Verified!</h1>
          <p className="text-sm text-muted leading-relaxed">
            Your email has been successfully verified. You can now sign in to your ProScout account.
          </p>
          <div className="mt-8">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-hover transition-colors"
            >
              <LogIn className="h-4 w-4" /> Sign In Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

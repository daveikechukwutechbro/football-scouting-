import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";

export default function CheckEmailPage() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md text-center">
        <div className="p-8 rounded-2xl border border-border bg-surface">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light mx-auto mb-6">
            <Mail className="h-8 w-8 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Check your email</h1>
          <p className="text-sm text-muted leading-relaxed">
            We sent a verification link to your inbox. Click it to activate your account, then you can sign in and complete your player profile.
          </p>
          <div className="mt-6 p-4 rounded-xl bg-surface-alt border border-border">
            <p className="text-xs text-muted">
              Didn&apos;t receive the email? Check your spam folder, or{" "}
              <Link href="/login" className="text-primary hover:text-primary-hover underline underline-offset-2">resend the verification</Link> from the sign-in page.
            </p>
          </div>
          <div className="mt-8">
            <Link href="/login" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-hover transition-colors">
              Go to Sign In <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

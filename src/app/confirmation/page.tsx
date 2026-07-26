import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function ConfirmationPage() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: "var(--bg)" }}>
      <div className="max-w-[420px] text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full mx-auto mb-6" style={{ backgroundColor: "var(--primary-light)" }}>
          <CheckCircle className="h-7 w-7" style={{ color: "var(--primary)" }} />
        </div>
        <h1 className="text-[24px] font-bold tracking-[-0.02em]" style={{ color: "var(--fg-heading)" }}>Application Submitted</h1>
        <p className="mt-3 text-[14px] leading-[1.7]" style={{ color: "var(--fg-muted)" }}>
          Thank you for registering with ProScout Football. Our team will review your profile and get back to you within 48 hours.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-[13px] font-semibold text-white transition-all duration-200" style={{ backgroundColor: "var(--primary)" }}>
            Back to Home <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link href="/about" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-[13px] font-medium border transition-all duration-200" style={{ color: "var(--fg-muted)", borderColor: "var(--border)" }}>
            Learn About Us
          </Link>
        </div>
      </div>
    </section>
  );
}

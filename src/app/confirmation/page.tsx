import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function ConfirmationPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0A0A0F] px-6">
      <div className="max-w-[420px] text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#10B981]/[0.1] mx-auto mb-6">
          <CheckCircle className="h-7 w-7 text-[#10B981]" />
        </div>
        <h1 className="text-[24px] font-bold text-[#F1F5F9] tracking-[-0.02em]">
          Application Submitted
        </h1>
        <p className="mt-3 text-[14px] text-[#636681] leading-[1.7]">
          Thank you for registering with ProScout Football. Our team will review your profile and get back to you within 48 hours.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-[13px] font-semibold text-white bg-[#10B981] hover:bg-[#0EA573] transition-all duration-200"
          >
            Back to Home <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-[13px] font-medium text-[#94A3B8] border border-white/[0.06] hover:border-white/[0.1] hover:text-[#F1F5F9] transition-all duration-200"
          >
            Learn About Us
          </Link>
        </div>
      </div>
    </section>
  );
}

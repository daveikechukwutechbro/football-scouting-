import Hero from "@/components/home/Hero";
import TrustSection from "@/components/home/TrustSection";
import HowItWorks from "@/components/home/HowItWorks";
import OpenTrials from "@/components/home/OpenTrials";
import SuccessStories from "@/components/home/SuccessStories";
import FAQ from "@/components/home/FAQ";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustSection />
      <HowItWorks />
      <OpenTrials />
      <SuccessStories />
      <FAQ />

      <section className="py-20 lg:py-28 border-t border-white/[0.04]">
        <div className="max-w-[720px] mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#F1F5F9] tracking-[-0.02em] leading-[1.15]">
            Ready to take the next step?
          </h2>
          <p className="mt-4 text-[15px] text-[#636681] leading-relaxed max-w-[480px] mx-auto">
            Join thousands of players using ProScout to advance their careers. Free registration takes less than two minutes.
          </p>
          <div className="mt-8">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[14px] font-semibold text-white bg-[#10B981] hover:bg-[#0EA573] transition-all duration-200 shadow-[0_0_24px_rgba(16,185,129,0.15)] hover:shadow-[0_0_32px_rgba(16,185,129,0.2)]"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

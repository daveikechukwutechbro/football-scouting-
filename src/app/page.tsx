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

      <section className="py-20 lg:py-28" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-[720px] mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-[28px] sm:text-[36px] font-bold tracking-[-0.02em] leading-[1.15]" style={{ color: "var(--fg-heading)" }}>
            Ready to take the next step?
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed max-w-[480px] mx-auto" style={{ color: "var(--fg-muted)" }}>
            Join thousands of players using ProScout to advance their careers. Free registration takes less than two minutes.
          </p>
          <div className="mt-8">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[14px] font-semibold text-white transition-all duration-200"
              style={{ backgroundColor: "var(--primary)" }}
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

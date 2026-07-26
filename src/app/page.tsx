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

      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Your next chapter starts here
          </h2>
          <p className="mt-5 text-lg text-gray-400 leading-relaxed">
            Join thousands of aspiring footballers who are already on the path to professional careers. It takes less than two minutes to get started.
          </p>
          <div className="mt-10">
            <Link
              href="/register"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-2xl shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              Create Your Profile Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

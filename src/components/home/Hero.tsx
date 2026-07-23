"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0F1419]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(13,123,62,0.25) 0%, rgba(13,123,62,0.08) 40%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 70%, rgba(212,168,67,0.06) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center">
        <div className="animate-[fadeInUp_0.8s_ease-out_both]">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Showcase Your Talent.{" "}
            <span className="text-[#0D7B3E]">Get Discovered.</span>
          </h1>
        </div>

        <div className="animate-[fadeInUp_0.8s_ease-out_0.15s_both]">
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#9CA3AF] sm:text-xl">
            Join thousands of aspiring footballers. Create your player profile,
            upload your highlights, and get reviewed by professional scouts
            looking for the next big talent.
          </p>
        </div>

        <div className="animate-[fadeInUp_0.8s_ease-out_0.3s_both] mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-lg bg-[#0D7B3E] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#0D7B3E]/25 transition-all duration-200 hover:bg-[#0A6631] hover:shadow-[#0D7B3E]/40"
          >
            Register Now
          </Link>
          <a
            href="#trials"
            className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white/40 hover:bg-white/10"
          >
            View Open Trials
          </a>
        </div>

        <div className="animate-[fadeInUp_0.8s_ease-out_0.45s_both] mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#9CA3AF]">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#0D7B3E]" />
            Free registration
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#0D7B3E]" />
            500+ players scouted
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#0D7B3E]" />
            Trusted worldwide
          </span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-white/40" />
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

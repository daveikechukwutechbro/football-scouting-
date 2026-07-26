"use client";

import Link from "next/link";
import { ArrowRight, Play, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#080c12]" />

      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/[0.04] rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[100px]" />
      <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-amber-500/[0.02] rounded-full blur-[80px]" />

      <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
        <svg viewBox="0 0 800 600" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="0.5">
          <circle cx="400" cy="300" r="200" className="text-white" />
          <circle cx="400" cy="300" r="120" className="text-white" />
          <line x1="400" y1="100" x2="400" y2="500" className="text-white" />
          <line x1="200" y1="300" x2="600" y2="300" className="text-white" />
          <path d="M 300 100 Q 400 200 500 100" className="text-white" />
          <path d="M 300 500 Q 400 400 500 500" className="text-white" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 mb-8 animate-[fadeIn_0.6s_ease-out]">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Trusted by scouts in 50+ countries</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] tracking-tight animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
              Your talent deserves
              <span className="block mt-1 bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                the world&apos;s stage
              </span>
            </h1>

            <p className="mt-7 text-lg text-gray-400 leading-relaxed max-w-xl animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
              ProScout Football connects aspiring players with professional scouts, clubs, and academies worldwide. Build your profile, showcase your highlights, and let your journey to the top begin.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-2xl shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                Start Your Journey
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl text-sm font-semibold text-gray-300 border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.03] transition-all duration-300"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.06]">
                  <Play className="h-3 w-3 text-white fill-white" />
                </div>
                Learn More
              </Link>
            </div>

            <div className="flex items-center gap-8 mt-14 animate-[fadeInUp_0.6s_ease-out_0.4s_both]">
              {[
                { value: "2,500+", label: "Players Registered" },
                { value: "180+", label: "Scouts Active" },
                { value: "50+", label: "Countries" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center relative animate-[fadeIn_0.8s_ease-out_0.3s_both]">
            <div className="relative w-full max-w-lg aspect-square">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/[0.08] to-emerald-500/[0.02] border border-emerald-500/10" />

              <div className="absolute top-8 left-8 right-8 bottom-8 rounded-2xl bg-gradient-to-br from-[#0f1a14] to-[#0a1210] border border-emerald-500/10 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 200 200" className="w-48 h-48 opacity-[0.06]" fill="currentColor">
                    <path d="M100 0C44.8 0 0 44.8 0 100s44.8 100 100 100 100-44.8 100-100S155.2 0 100 0zm0 180c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80zm-5-125h10v50h-10zm0 60h10v10h-10z"/>
                  </svg>
                </div>

                <div className="absolute top-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-400">MJ</div>
                    <div>
                      <div className="text-xs font-semibold text-white">Marcus Johnson</div>
                      <div className="text-[10px] text-gray-500">Striker · London, UK</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Goals", value: "24" },
                      { label: "Assists", value: "12" },
                      { label: "Apps", value: "38" },
                    ].map((s) => (
                      <div key={s.label} className="text-center p-2 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                        <div className="text-lg font-bold text-white">{s.value}</div>
                        <div className="text-[10px] text-gray-500">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2">
                    <div className="px-2 py-1 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400">Professional</div>
                    <div className="px-2 py-1 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-400">Free Agent</div>
                    <div className="px-2 py-1 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-400">Verified</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 p-3 rounded-2xl bg-[#0f141a] border border-white/[0.06] shadow-2xl animate-[float_4s_ease-in-out_infinite]">
                <div className="text-xs font-bold text-emerald-400">+12%</div>
                <div className="text-[10px] text-gray-500">Profile views</div>
              </div>

              <div className="absolute -bottom-4 -left-4 p-3 rounded-2xl bg-[#0f141a] border border-white/[0.06] shadow-2xl animate-[float_4s_ease-in-out_1s_infinite]">
                <div className="text-xs font-bold text-amber-400">New Scout</div>
                <div className="text-[10px] text-gray-500">Viewed your profile</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-5 w-5 text-gray-600" />
      </div>
    </section>
  );
}

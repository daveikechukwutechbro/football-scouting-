"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[#0A0A0F]" />

      <div className="absolute inset-0 opacity-[0.025]">
        <svg viewBox="0 0 1200 800" className="w-full h-full" fill="none" stroke="#10B981" strokeWidth="0.5">
          <circle cx="600" cy="400" r="200" />
          <circle cx="600" cy="400" r="80" />
          <line x1="600" y1="200" x2="600" y2="600" />
          <line x1="400" y1="400" x2="800" y2="400" />
          <rect x="200" y="250" width="120" height="300" rx="0" />
          <rect x="880" y="250" width="120" height="300" rx="0" />
          <rect x="200" y="320" width="50" height="160" rx="0" />
          <rect x="950" y="320" width="50" height="160" rx="0" />
          <path d="M 480 280 Q 600 340 720 280" />
          <path d="M 480 520 Q 600 460 720 520" />
        </svg>
      </div>

      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#10B981]/[0.03] rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#38BDF8]/[0.02] rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-8 py-32 lg:py-0 w-full">
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 lg:gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/[0.08] border border-[#10B981]/[0.12] mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[11px] font-semibold text-[#10B981] uppercase tracking-[0.08em]">
                Trusted by scouts in 50+ countries
              </span>
            </div>

            <h1 className="text-[40px] sm:text-[52px] lg:text-[64px] font-extrabold text-[#F1F5F9] leading-[1.05] tracking-[-0.03em]">
              Show the world
              <br />
              <span className="bg-gradient-to-r from-[#10B981] to-[#38BDF8] bg-clip-text text-transparent">
                what you can do
              </span>
            </h1>

            <p className="mt-6 text-[16px] sm:text-[17px] text-[#94A3B8] leading-[1.65] max-w-[520px]">
              Create your player profile, upload match highlights, and get directly in front of professional scouts actively looking for talent like yours.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-[14px] font-semibold text-white bg-[#10B981] hover:bg-[#0EA573] transition-all duration-200 shadow-[0_0_24px_rgba(16,185,129,0.15)] hover:shadow-[0_0_32px_rgba(16,185,129,0.2)]"
              >
                Create Your Profile
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-[14px] font-medium text-[#94A3B8] border border-white/[0.06] hover:border-white/[0.1] hover:text-[#F1F5F9] transition-all duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <div className="rounded-2xl bg-[#111118] border border-white/[0.04] overflow-hidden">
                <div className="p-5 border-b border-white/[0.04]">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#10B981]/20 to-[#10B981]/5 flex items-center justify-center text-[13px] font-bold text-[#10B981]">
                      MJ
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-[#F1F5F9]">Marcus Johnson</div>
                      <div className="text-[11px] text-[#475569]">Striker · London, UK · Age 21</div>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="grid grid-cols-4 gap-3 mb-5">
                    {[
                      { label: "Goals", value: "24", color: "text-[#10B981]" },
                      { label: "Assists", value: "12", color: "text-[#38BDF8]" },
                      { label: "Apps", value: "38", color: "text-[#F1F5F9]" },
                      { label: "Rating", value: "8.2", color: "text-[#F59E0B]" },
                    ].map((s) => (
                      <div key={s.label} className="text-center py-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                        <div className={`text-[18px] font-bold ${s.color}`}>{s.value}</div>
                        <div className="text-[10px] text-[#475569] mt-0.5 uppercase tracking-[0.05em]">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-[#636681]">Pace</span>
                      <div className="flex-1 mx-3 h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                        <div className="h-full w-[85%] rounded-full bg-[#10B981]" />
                      </div>
                      <span className="text-[#F1F5F9] font-medium tabular-nums">85</span>
                    </div>
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-[#636681]">Shooting</span>
                      <div className="flex-1 mx-3 h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                        <div className="h-full w-[78%] rounded-full bg-[#38BDF8]" />
                      </div>
                      <span className="text-[#F1F5F9] font-medium tabular-nums">78</span>
                    </div>
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-[#636681]">Passing</span>
                      <div className="flex-1 mx-3 h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                        <div className="h-full w-[72%] rounded-full bg-[#10B981]" />
                      </div>
                      <span className="text-[#F1F5F9] font-medium tabular-nums">72</span>
                    </div>
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-[#636681]">Dribbling</span>
                      <div className="flex-1 mx-3 h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                        <div className="h-full w-[80%] rounded-full bg-[#38BDF8]" />
                      </div>
                      <span className="text-[#F1F5F9] font-medium tabular-nums">80</span>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 flex items-center gap-2">
                  <span className="px-2 py-1 rounded text-[10px] font-semibold bg-[#10B981]/[0.08] text-[#10B981]">Free Agent</span>
                  <span className="px-2 py-1 rounded text-[10px] font-semibold bg-[#38BDF8]/[0.08] text-[#38BDF8]">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 lg:mt-24 grid grid-cols-3 gap-8 max-w-[480px]">
          {[
            { value: "2,500+", label: "Players" },
            { value: "180+", label: "Active Scouts" },
            { value: "50+", label: "Countries" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-[24px] font-bold text-[#F1F5F9] tracking-tight">{stat.value}</div>
              <div className="text-[12px] text-[#475569] mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <ChevronDown className="h-5 w-5 text-[#475569]" />
      </div>
    </section>
  );
}

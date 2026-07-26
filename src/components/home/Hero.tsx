"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: "var(--bg)" }}>
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.025]">
        <svg viewBox="0 0 1200 800" className="w-full h-full" fill="none" style={{ stroke: "var(--primary)" }} strokeWidth="0.5">
          <circle cx="600" cy="400" r="200" />
          <circle cx="600" cy="400" r="80" />
          <line x1="600" y1="200" x2="600" y2="600" />
          <line x1="400" y1="400" x2="800" y2="400" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-8 py-32 lg:py-0 w-full">
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 lg:gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8" style={{ backgroundColor: "var(--primary-lighter)", border: "1px solid var(--primary-light)" }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "var(--primary)" }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: "var(--primary)" }}>
                Trusted by scouts in 50+ countries
              </span>
            </div>

            <h1 className="text-[40px] sm:text-[52px] lg:text-[64px] font-extrabold leading-[1.05] tracking-[-0.03em]" style={{ color: "var(--fg-heading)" }}>
              Show the world
              <br />
              <span style={{ color: "var(--primary)" }}>what you can do</span>
            </h1>

            <p className="mt-6 text-[16px] sm:text-[17px] leading-[1.65] max-w-[520px]" style={{ color: "var(--fg-muted)" }}>
              Create your player profile, upload match highlights, and get directly in front of professional scouts actively looking for talent like yours.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-[14px] font-semibold text-white transition-all duration-200"
                style={{ backgroundColor: "var(--primary)" }}
              >
                Create Your Profile
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-[14px] font-medium border transition-all duration-200"
                style={{ color: "var(--fg-muted)", borderColor: "var(--border)" }}
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Preview card */}
          <div className="hidden lg:block">
            <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div className="p-5" style={{ borderBottom: "1px solid var(--border)" }}>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center text-[13px] font-bold" style={{ backgroundColor: "var(--primary-lighter)", color: "var(--primary)" }}>MJ</div>
                  <div>
                    <div className="text-[13px] font-semibold" style={{ color: "var(--fg-heading)" }}>Marcus Johnson</div>
                    <div className="text-[11px]" style={{ color: "var(--fg-muted)" }}>Striker · London, UK · Age 21</div>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-4 gap-3 mb-5">
                  {[
                    { label: "Goals", value: "24", c: "var(--primary)" },
                    { label: "Assists", value: "12", c: "var(--accent)" },
                    { label: "Apps", value: "38", c: "var(--fg-heading)" },
                    { label: "Rating", value: "8.2", c: "var(--warning)" },
                  ].map((s) => (
                    <div key={s.label} className="text-center py-3 rounded-lg" style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)" }}>
                      <div className="text-[18px] font-bold" style={{ color: s.c }}>{s.value}</div>
                      <div className="text-[10px] mt-0.5 uppercase tracking-[0.05em]" style={{ color: "var(--fg-muted)" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Pace", pct: 85, c: "var(--primary)" },
                    { label: "Shooting", pct: 78, c: "var(--accent)" },
                    { label: "Passing", pct: 72, c: "var(--primary)" },
                    { label: "Dribbling", pct: 80, c: "var(--accent)" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center justify-between text-[12px]">
                      <span style={{ color: "var(--fg-muted)" }}>{s.label}</span>
                      <div className="flex-1 mx-3 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--border)" }}>
                        <div className="h-full rounded-full" style={{ width: `${s.pct}%`, backgroundColor: s.c }} />
                      </div>
                      <span className="font-medium tabular-nums" style={{ color: "var(--fg-heading)" }}>{s.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-5 pb-5 flex items-center gap-2">
                <span className="px-2 py-1 rounded text-[10px] font-semibold" style={{ backgroundColor: "var(--primary-lighter)", color: "var(--primary)" }}>Free Agent</span>
                <span className="px-2 py-1 rounded text-[10px] font-semibold" style={{ backgroundColor: "var(--accent-light)", color: "var(--accent)" }}>Verified</span>
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
              <div className="text-[24px] font-bold tracking-tight" style={{ color: "var(--fg-heading)" }}>{stat.value}</div>
              <div className="text-[12px] mt-0.5" style={{ color: "var(--fg-muted)" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <ChevronDown className="h-5 w-5" style={{ color: "var(--fg-muted)" }} />
      </div>
    </section>
  );
}

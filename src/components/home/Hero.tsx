"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

const STATS = [
  { label: "Players", value: "2,500+" },
  { label: "Active Scouts", value: "180+" },
  { label: "Countries", value: "50+" },
];

const CARD_STATS = [
  { label: "Goals", value: "24", color: "text-primary" },
  { label: "Assists", value: "12", color: "text-accent" },
  { label: "Apps", value: "38", color: "text-foreground dark:text-foreground" },
  { label: "Rating", value: "8.2", color: "text-amber-500" },
];

const SKILLS = [
  { label: "Pace", pct: 85, bar: "bg-primary", width: "w-[85%]" },
  { label: "Shooting", pct: 78, bar: "bg-accent", width: "w-[78%]" },
  { label: "Passing", pct: 72, bar: "bg-primary", width: "w-[72%]" },
  { label: "Dribbling", pct: 80, bar: "bg-accent", width: "w-[80%]" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background dark:bg-background">
      <div className="absolute inset-0 opacity-[0.025]">
        <svg viewBox="0 0 1200 800" className="w-full h-full fill-none stroke-primary" strokeWidth="0.5">
          <circle cx="600" cy="400" r="200" />
          <circle cx="600" cy="400" r="80" />
          <line x1="600" y1="200" x2="600" y2="600" />
          <line x1="400" y1="400" x2="800" y2="400" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-0 w-full">
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 lg:gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary-light dark:bg-primary-light mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
                Trusted by scouts in 50+ countries
              </span>
            </div>

            <h1 className="text-[40px] sm:text-[52px] lg:text-[64px] font-extrabold leading-[1.05] tracking-[-0.03em] text-foreground dark:text-foreground">
              Show the world
              <br />
              <span className="text-primary">what you can do</span>
            </h1>

            <p className="mt-6 text-[16px] sm:text-[17px] leading-[1.65] max-w-[520px] text-muted">
              Create your player profile, upload match highlights, and get directly in front of professional scouts actively looking for talent like yours.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-[14px] font-semibold text-white bg-primary transition-all duration-200 hover:opacity-90"
              >
                Create Your Profile
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-[14px] font-medium text-muted border border-border dark:border-border transition-all duration-200 hover:bg-surface-alt dark:hover:bg-surface-alt"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="rounded-2xl border border-border dark:border-border bg-surface dark:bg-surface shadow-lg">
              <div className="p-5 border-b border-border dark:border-border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center text-[13px] font-bold bg-primary-light text-primary">MJ</div>
                  <div>
                    <div className="text-[13px] font-semibold text-foreground dark:text-foreground">Marcus Johnson</div>
                    <div className="text-[11px] text-muted">Striker · London, UK · Age 21</div>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-4 gap-3 mb-5">
                  {CARD_STATS.map((s) => (
                    <div key={s.label} className="text-center py-3 rounded-lg bg-surface-alt dark:bg-surface-alt border border-border dark:border-border">
                      <div className={`text-[18px] font-bold ${s.color}`}>{s.value}</div>
                      <div className="text-[10px] mt-0.5 uppercase tracking-[0.05em] text-muted">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  {SKILLS.map((s) => (
                    <div key={s.label} className="flex items-center justify-between text-[12px]">
                      <span className="text-muted">{s.label}</span>
                      <div className="flex-1 mx-3 h-1.5 rounded-full overflow-hidden bg-border dark:bg-border">
                        <div className={`h-full rounded-full ${s.bar} ${s.width}`} />
                      </div>
                      <span className="font-medium tabular-nums text-foreground dark:text-foreground">{s.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-5 pb-5 flex items-center gap-2">
                <span className="px-2 py-1 rounded text-[10px] font-semibold bg-primary-light text-primary">Free Agent</span>
                <span className="px-2 py-1 rounded text-[10px] font-semibold bg-accent-light text-accent">Verified</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 lg:mt-24 grid grid-cols-3 gap-8 max-w-[480px]">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className="text-[24px] font-bold tracking-tight text-foreground dark:text-foreground">{stat.value}</div>
              <div className="text-[12px] mt-0.5 text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <ChevronDown className="h-5 w-5 text-muted" />
      </div>
    </section>
  );
}

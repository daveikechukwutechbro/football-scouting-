"use client";

import Link from "next/link";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { SAMPLE_TRIALS } from "@/lib/constants";

export default function OpenTrials() {
  return (
    <section id="trials" className="py-20 lg:py-28" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3 block" style={{ color: "var(--primary)" }}>Opportunities</span>
            <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em] leading-[1.15]" style={{ color: "var(--fg-heading)" }}>
              Open trials & events
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SAMPLE_TRIALS.map((trial) => (
            <div
              key={trial.id}
              className="group p-6 rounded-xl border transition-all duration-300"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <h3 className="text-[15px] font-semibold mb-3 leading-snug transition-colors" style={{ color: "var(--fg-heading)" }}>
                {trial.title}
              </h3>
              <p className="text-[13px] leading-relaxed mb-4 line-clamp-2" style={{ color: "var(--fg-muted)" }}>
                {trial.description}
              </p>
              <div className="flex items-center gap-4 text-[12px] mb-4" style={{ color: "var(--fg-muted)" }}>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" style={{ color: "var(--primary)" }} />
                  {trial.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" style={{ color: "var(--primary)" }} />
                  {trial.date}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {trial.positions.map((pos) => (
                  <span key={pos} className="px-2 py-0.5 rounded text-[11px] font-medium border" style={{ backgroundColor: "var(--bg-input)", color: "var(--fg-muted)", borderColor: "var(--border)" }}>
                    {pos}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                <span className="text-[11px]" style={{ color: "var(--fg-muted)" }}>Deadline: {trial.deadline}</span>
                <Link href="/register" className="inline-flex items-center gap-1 text-[12px] font-medium transition-colors" style={{ color: "var(--primary)" }}>
                  Apply <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

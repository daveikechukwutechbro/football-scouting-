"use client";

import Link from "next/link";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { SAMPLE_TRIALS } from "@/lib/constants";

export default function OpenTrials() {
  return (
    <section id="trials" className="py-20 lg:py-28 border-t border-white/[0.04]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#10B981] mb-3 block">Opportunities</span>
            <h2 className="text-[28px] sm:text-[32px] font-bold text-[#F1F5F9] tracking-[-0.02em] leading-[1.15]">
              Open trials & events
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SAMPLE_TRIALS.map((trial) => (
            <div key={trial.id} className="group p-6 rounded-xl bg-[#111118] border border-white/[0.04] hover:border-[#10B981]/[0.12] transition-all duration-300">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-[15px] font-semibold text-[#F1F5F9] group-hover:text-[#10B981] transition-colors leading-snug">
                  {trial.title}
                </h3>
              </div>

              <p className="text-[13px] text-[#636681] leading-relaxed mb-4 line-clamp-2">
                {trial.description}
              </p>

              <div className="flex items-center gap-4 text-[12px] text-[#475569] mb-4">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#10B981]/50" />
                  {trial.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-[#10B981]/50" />
                  {trial.date}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {trial.positions.map((pos) => (
                  <span key={pos} className="px-2 py-0.5 rounded text-[11px] font-medium bg-white/[0.03] text-[#94A3B8] border border-white/[0.04]">
                    {pos}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
                <span className="text-[11px] text-[#3D3D4F]">Deadline: {trial.deadline}</span>
                <Link href="/register" className="inline-flex items-center gap-1 text-[12px] font-medium text-[#10B981] hover:text-[#38BDF8] transition-colors">
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

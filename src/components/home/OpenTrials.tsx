"use client";

import Link from "next/link";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { SAMPLE_TRIALS } from "@/lib/constants";

export default function OpenTrials() {
  return (
    <section id="trials" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.01] to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4 block">Opportunities</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Open trials & discovery events
          </h2>
          <p className="mt-4 text-gray-400 leading-relaxed">
            Apply to upcoming trials hosted by clubs and academies across the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SAMPLE_TRIALS.map((trial) => (
            <div
              key={trial.id}
              className="group relative p-6 rounded-2xl bg-[#0c1017] border border-white/[0.04] hover:border-emerald-500/20 transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    {trial.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-emerald-500/60" />
                      {trial.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-emerald-500/60" />
                      {trial.date}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                {trial.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {trial.positions.map((pos) => (
                  <span key={pos} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-500/[0.06] text-emerald-400 border border-emerald-500/10">
                    {pos}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
                <span className="text-xs text-gray-600">Deadline: {trial.deadline}</span>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Apply Now
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

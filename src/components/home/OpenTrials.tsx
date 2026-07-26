"use client";

import Link from "next/link";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { SAMPLE_TRIALS } from "@/lib/constants";

export default function OpenTrials() {
  return (
    <section id="trials" className="py-20 lg:py-28 border-t border-border dark:border-border bg-background dark:bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-primary mb-3 block">Opportunities</span>
            <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em] leading-[1.15] text-foreground dark:text-foreground">
              Open trials &amp; events
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SAMPLE_TRIALS.map((trial) => (
            <div
              key={trial.id}
              className="group p-6 rounded-xl border border-border dark:border-border bg-surface dark:bg-surface transition-all duration-300 hover:shadow-md"
            >
              <h3 className="text-[15px] font-semibold mb-3 leading-snug text-foreground dark:text-foreground">
                {trial.title}
              </h3>
              <p className="text-[13px] leading-relaxed mb-4 line-clamp-2 text-muted">
                {trial.description}
              </p>
              <div className="flex items-center gap-4 text-[12px] mb-4 text-muted">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  {trial.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  {trial.date}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {trial.positions.map((pos) => (
                  <span key={pos} className="px-2 py-0.5 rounded text-[11px] font-medium border border-border dark:border-border bg-surface-alt dark:bg-surface-alt text-muted">
                    {pos}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border dark:border-border">
                <span className="text-[11px] text-muted">Deadline: {trial.deadline}</span>
                <Link href="/register" className="inline-flex items-center gap-1 text-[12px] font-medium text-primary transition-colors hover:opacity-80">
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

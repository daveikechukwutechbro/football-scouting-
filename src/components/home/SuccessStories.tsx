import { Quote } from "lucide-react";
import { SAMPLE_TESTIMONIALS } from "@/lib/constants";

export default function SuccessStories() {
  return (
    <section className="py-20 lg:py-28 bg-[#0D0D14] border-t border-white/[0.04]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#10B981] mb-3 block">Success Stories</span>
          <h2 className="text-[28px] sm:text-[32px] font-bold text-[#F1F5F9] tracking-[-0.02em]">
            Players who made it
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SAMPLE_TESTIMONIALS.map((story) => (
            <div key={story.id} className="p-6 rounded-xl bg-[#111118] border border-white/[0.04] flex flex-col">
              <Quote className="h-5 w-5 text-[#10B981]/20 mb-4" strokeWidth={1.5} />
              <p className="text-[13px] text-[#94A3B8] leading-[1.7] italic flex-1">
                &ldquo;{story.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/[0.04]">
                <div className="h-9 w-9 rounded-full bg-[#10B981]/[0.08] flex items-center justify-center text-[11px] font-bold text-[#10B981]">
                  {story.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-[#F1F5F9]">{story.name}</div>
                  <div className="text-[11px] text-[#475569]">{story.position}</div>
                </div>
                <span className="text-[10px] font-medium px-2 py-1 rounded bg-[#10B981]/[0.06] text-[#10B981]">
                  {story.outcome}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

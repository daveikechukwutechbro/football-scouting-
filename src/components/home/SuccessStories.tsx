import { Quote } from "lucide-react";
import { SAMPLE_TESTIMONIALS } from "@/lib/constants";

export default function SuccessStories() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4 block">Success Stories</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Players who made it through
          </h2>
          <p className="mt-4 text-gray-400 leading-relaxed">
            Real stories from real players who got discovered on ProScout.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SAMPLE_TESTIMONIALS.map((story) => (
            <div
              key={story.id}
              className="group relative p-6 rounded-2xl bg-[#0c1017] border border-white/[0.04] hover:border-emerald-500/15 transition-all duration-500"
            >
              <Quote className="h-8 w-8 text-emerald-500/10 mb-4" />
              <p className="text-sm text-gray-400 leading-relaxed mb-6 italic">
                &ldquo;{story.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.04]">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 text-sm font-bold text-emerald-400">
                  {story.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white">{story.name}</div>
                  <div className="text-xs text-gray-500">{story.position}</div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-emerald-500/[0.08] text-emerald-400 border border-emerald-500/10">
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

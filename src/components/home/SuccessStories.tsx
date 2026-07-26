import { Quote } from "lucide-react";
import { SAMPLE_TESTIMONIALS } from "@/lib/constants";

export default function SuccessStories() {
  return (
    <section className="py-20 lg:py-28 bg-surface-alt dark:bg-surface-alt border-t border-border dark:border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-primary mb-3 block">Success Stories</span>
          <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em] text-foreground dark:text-foreground">
            Players who made it
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SAMPLE_TESTIMONIALS.map((story) => (
            <div
              key={story.id}
              className="p-6 rounded-xl border border-border dark:border-border bg-surface dark:bg-surface flex flex-col"
            >
              <Quote className="h-5 w-5 mb-4 text-primary opacity-30" strokeWidth={1.5} />
              <p className="text-[13px] leading-[1.7] italic flex-1 text-foreground dark:text-foreground">
                &ldquo;{story.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border dark:border-border">
                <div className="h-9 w-9 rounded-full flex items-center justify-center text-[11px] font-bold bg-primary-light text-primary">
                  {story.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-foreground dark:text-foreground">{story.name}</div>
                  <div className="text-[11px] text-muted">{story.position}</div>
                </div>
                <span className="text-[10px] font-medium px-2 py-1 rounded bg-primary-light text-primary">
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

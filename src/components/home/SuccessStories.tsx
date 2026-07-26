import { Quote } from "lucide-react";
import { SAMPLE_TESTIMONIALS } from "@/lib/constants";

export default function SuccessStories() {
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--bg-muted)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3 block" style={{ color: "var(--primary)" }}>Success Stories</span>
          <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em]" style={{ color: "var(--fg-heading)" }}>
            Players who made it
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SAMPLE_TESTIMONIALS.map((story) => (
            <div
              key={story.id}
              className="p-6 rounded-xl border flex flex-col"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <Quote className="h-5 w-5 mb-4" style={{ color: "var(--primary)", opacity: 0.3 }} strokeWidth={1.5} />
              <p className="text-[13px] leading-[1.7] italic flex-1" style={{ color: "var(--fg-text)" }}>
                &ldquo;{story.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-6 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                <div className="h-9 w-9 rounded-full flex items-center justify-center text-[11px] font-bold" style={{ backgroundColor: "var(--primary-lighter)", color: "var(--primary)" }}>
                  {story.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium" style={{ color: "var(--fg-heading)" }}>{story.name}</div>
                  <div className="text-[11px]" style={{ color: "var(--fg-muted)" }}>{story.position}</div>
                </div>
                <span className="text-[10px] font-medium px-2 py-1 rounded" style={{ backgroundColor: "var(--primary-lighter)", color: "var(--primary)" }}>
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

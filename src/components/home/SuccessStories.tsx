import { Quote } from "lucide-react";
import { SAMPLE_TESTIMONIALS } from "@/lib/constants";

export default function SuccessStories() {
  return (
    <section className="bg-[#0F1419] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Success <span className="text-[#0D7B3E]">Stories</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#9CA3AF]">
            Hear from players who got discovered through our platform
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group relative flex flex-col rounded-xl border border-white/10 bg-[#1A1F2E] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#0D7B3E]/30"
            >
              <Quote className="absolute right-5 top-5 h-8 w-8 text-[#0D7B3E]/10 transition-colors group-hover:text-[#0D7B3E]/20" />

              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#0D7B3E]/20 text-lg font-bold text-[#0D7B3E]">
                  {testimonial.initials}
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-[#0D7B3E]">
                    {testimonial.position}
                  </p>
                </div>
              </div>

              <blockquote className="mt-5 flex-1 text-sm leading-relaxed italic text-[#9CA3AF]">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <div className="mt-5">
                <span className="inline-block rounded-full bg-[#D4A843]/15 px-3 py-1 text-xs font-semibold text-[#D4A843]">
                  {testimonial.outcome}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

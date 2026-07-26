"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 lg:py-28 border-t border-white/[0.04]">
      <div className="max-w-[720px] mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#10B981] mb-3 block">FAQ</span>
          <h2 className="text-[28px] sm:text-[32px] font-bold text-[#F1F5F9] tracking-[-0.02em]">
            Common questions
          </h2>
        </div>

        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? "bg-[#111118] border-[#10B981]/[0.12]"
                    : "bg-[#111118]/50 border-white/[0.04] hover:border-white/[0.06]"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex items-center justify-between w-full px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[14px] font-medium text-[#F1F5F9] pr-4">{item.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#10B981]" : "text-[#475569]"
                    }`}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? "400px" : "0px", opacity: isOpen ? 1 : 0 }}
                >
                  <div className="px-5 pb-4 text-[13px] text-[#636681] leading-[1.7]">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-[13px] text-[#475569]">
          Still have questions?{" "}
          <a href="/contact" className="text-[#10B981] hover:text-[#38BDF8] font-medium transition-colors">Get in touch</a>
        </p>
      </div>
    </section>
  );
}

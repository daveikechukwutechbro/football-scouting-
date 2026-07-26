"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 lg:py-28" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-[720px] mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3 block" style={{ color: "var(--primary)" }}>FAQ</span>
          <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em]" style={{ color: "var(--fg-heading)" }}>
            Common questions
          </h2>
        </div>

        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-xl border transition-all duration-300"
                style={{
                  backgroundColor: isOpen ? "var(--bg-card)" : "var(--bg-card)",
                  borderColor: isOpen ? "var(--primary)" : "var(--border)",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex items-center justify-between w-full px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[14px] font-medium pr-4" style={{ color: "var(--fg-heading)" }}>{item.question}</span>
                  <ChevronDown
                    className="h-4 w-4 shrink-0 transition-transform duration-300"
                    style={{ color: isOpen ? "var(--primary)" : "var(--fg-muted)", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? "400px" : "0px", opacity: isOpen ? 1 : 0 }}
                >
                  <div className="px-5 pb-4 text-[13px] leading-[1.7]" style={{ color: "var(--fg-muted)" }}>
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-[13px]" style={{ color: "var(--fg-muted)" }}>
          Still have questions?{" "}
          <a href="/contact" className="font-medium transition-colors" style={{ color: "var(--primary)" }}>Get in touch</a>
        </p>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 lg:py-28 border-t border-border dark:border-border bg-background dark:bg-background">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-primary mb-3 block">FAQ</span>
          <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em] text-foreground dark:text-foreground">
            Common questions
          </h2>
        </div>

        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-xl border transition-colors duration-300 ${
                  isOpen
                    ? "border-primary dark:border-primary bg-surface dark:bg-surface"
                    : "border-border dark:border-border bg-surface dark:bg-surface"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex items-center justify-between w-full px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[14px] font-medium pr-4 text-foreground dark:text-foreground">{item.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-all duration-300 ${
                      isOpen ? "rotate-180 text-primary" : "rotate-0 text-muted"
                    }`}
                  />
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="min-h-0 overflow-hidden">
                    <div className="px-5 pb-4 text-[13px] leading-[1.7] text-muted">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-[13px] text-muted">
          Still have questions?{" "}
          <a href="/contact" className="font-medium text-primary transition-colors hover:opacity-80">Get in touch</a>
        </p>
      </div>
    </section>
  );
}

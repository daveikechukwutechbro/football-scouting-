"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.015] to-transparent pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4 block">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-gray-400 leading-relaxed">
            Everything you need to know about getting started with ProScout.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "bg-[#0c1017] border-emerald-500/15"
                    : "bg-[#0c1017]/50 border-white/[0.04] hover:border-white/[0.08]"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex items-center justify-between w-full px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-white pr-4">{item.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-emerald-400" : ""
                    }`}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: isOpen ? "500px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="px-6 pb-5 text-sm text-gray-400 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Still have questions?{" "}
            <a href="/contact" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
              Get in touch
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

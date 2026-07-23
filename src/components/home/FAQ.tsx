"use client";

import { useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback(
    (index: number) => {
      setOpenIndex((prev) => (prev === index ? null : index));
    },
    [],
  );

  return (
    <section id="faq" className="bg-[#0F1419] px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Frequently Asked{" "}
            <span className="text-[#0D7B3E]">Questions</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#9CA3AF]">
            Everything you need to know about registering
          </p>
        </div>

        <div className="mt-14 space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`overflow-hidden rounded-xl border transition-colors duration-200 ${
                  isOpen
                    ? "border-[#0D7B3E]/40 bg-[#1A1F2E]"
                    : "border-white/10 bg-[#1A1F2E]"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-base font-medium text-white">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-[#9CA3AF] transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#0D7B3E]" : ""
                    }`}
                  />
                </button>

                <div
                  role="region"
                  className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? "400px" : "0px" }}
                >
                  <div className="border-t border-white/5 px-6 pb-5 pt-4">
                    <p className="text-sm leading-relaxed text-[#9CA3AF]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

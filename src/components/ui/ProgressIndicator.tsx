"use client";

import { Check } from "lucide-react";

interface ProgressIndicatorProps {
  steps: string[];
  currentStep: number;
  completedSteps: number[];
}

export default function ProgressIndicator({
  steps,
  currentStep,
  completedSteps,
}: ProgressIndicatorProps) {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex items-center min-w-max px-4">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          const isActive = index === currentStep;
          const isFuture = !isCompleted && !isActive;

          return (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`
                    flex h-10 w-10 items-center justify-center rounded-full
                    text-sm font-semibold transition-all duration-300
                    ${
                      isCompleted
                        ? "bg-[#0D7B3E] text-white scale-100"
                        : isActive
                          ? "bg-[#0D7B3E] text-white scale-110 ring-4 ring-[#0D7B3E]/30"
                          : "bg-[#232838] text-gray-500 border-2 border-gray-700 scale-100"
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span
                  className={`
                    text-xs font-medium text-center max-w-[80px] leading-tight
                    hidden md:block
                    ${
                      isActive
                        ? "text-[#0D7B3E]"
                        : isCompleted
                          ? "text-white"
                          : "text-gray-500"
                    }
                  `}
                >
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`
                    h-0.5 w-12 mx-2 mt-[-20px] md:mt-0 md:mb-5 rounded-full
                    transition-colors duration-300
                    ${
                      isCompleted
                        ? "bg-[#0D7B3E]"
                        : "bg-gray-700"
                    }
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

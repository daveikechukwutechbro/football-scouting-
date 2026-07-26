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

          return (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300"
                  style={{
                    backgroundColor: isCompleted || isActive ? "var(--primary)" : "var(--bg-input)",
                    color: isCompleted || isActive ? "white" : "var(--fg-muted)",
                    ...(isActive ? { boxShadow: "0 0 0 4px var(--primary-light)" } : {}),
                    ...(isCompleted || isActive ? {} : { border: "2px solid var(--border)" }),
                  }}
                >
                  {isCompleted ? <Check className="h-5 w-5" /> : <span>{index + 1}</span>}
                </div>
                <span
                  className="text-xs font-medium text-center max-w-[80px] leading-tight hidden md:block"
                  style={{ color: isActive ? "var(--primary)" : isCompleted ? "var(--fg)" : "var(--fg-muted)" }}
                >
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className="h-0.5 w-12 mx-2 mt-[-20px] md:mt-0 md:mb-5 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: isCompleted ? "var(--primary)" : "var(--border)" }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

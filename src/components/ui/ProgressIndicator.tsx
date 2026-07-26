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
      <div className="flex min-w-max items-center px-4">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          const isActive = index === currentStep;

          return (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${
                    isCompleted || isActive
                      ? "bg-primary text-white"
                      : "border-2 border-border bg-surface text-muted dark:border-border dark:bg-surface"
                  } ${
                    isActive
                      ? "ring-4 ring-primary/20"
                      : ""
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span
                  className={`max-w-[80px] text-center text-xs font-medium leading-tight hidden md:block ${
                    isActive
                      ? "text-primary"
                      : isCompleted
                        ? "text-foreground dark:text-foreground"
                        : "text-muted"
                  }`}
                >
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`mx-2 mb-5 h-0.5 w-12 rounded-full transition-colors duration-300 md:mt-0 ${
                    isCompleted
                      ? "bg-primary"
                      : "bg-border dark:bg-border"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { type ChangeEvent } from "react";
import {
  Ruler,
  Weight,
  Zap,
  Heart,
} from "lucide-react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import TextArea from "@/components/ui/TextArea";
import { BODY_TYPES, FITNESS_LEVELS } from "@/lib/constants";
import type { StepProps } from "@/lib/types";

export default function Step5PhysicalProfile({
  data,
  updateData,
  errors,
}: StepProps) {
  const handleField = (field: string) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    updateData({ [field]: e.target.value });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-white">Physical Profile</h2>
        <p className="mt-1 text-sm text-gray-400">
          Share your physical attributes to give scouts a complete picture of your abilities.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0D7B3E]/10">
              <Ruler className="h-4 w-4 text-[#0D7B3E]" />
            </div>
            <h3 className="text-sm font-semibold text-white">Basic Measurements</h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-300">
                Height <span className="text-red-500 ml-0.5">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="e.g. 175"
                  value={data.height || ""}
                  onChange={handleField("height")}
                  min={100}
                  max={230}
                  className={`w-full rounded-xl border bg-[#232838] px-4 py-2.5 pr-10 text-sm text-white placeholder-gray-500 outline-none transition-all duration-200 ${
                    errors.height
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
                      : "border-gray-700 focus:border-[#0D7B3E] focus:ring-2 focus:ring-[#0D7B3E]/30"
                  }`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                  cm
                </span>
              </div>
              {errors.height ? (
                <p className="text-xs text-red-500">{errors.height}</p>
              ) : (
                <p className="text-xs text-gray-500">e.g. 175</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-300">
                Weight <span className="text-red-500 ml-0.5">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="e.g. 70"
                  value={data.weight || ""}
                  onChange={handleField("weight")}
                  min={30}
                  max={150}
                  className={`w-full rounded-xl border bg-[#232838] px-4 py-2.5 pr-10 text-sm text-white placeholder-gray-500 outline-none transition-all duration-200 ${
                    errors.weight
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
                      : "border-gray-700 focus:border-[#0D7B3E] focus:ring-2 focus:ring-[#0D7B3E]/30"
                  }`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                  kg
                </span>
              </div>
              {errors.weight ? (
                <p className="text-xs text-red-500">{errors.weight}</p>
              ) : (
                <p className="text-xs text-gray-500">e.g. 70</p>
              )}
            </div>
          </div>

          <Select
            label="Body Type"
            options={BODY_TYPES}
            value={data.bodyType || ""}
            onChange={handleField("bodyType")}
            error={errors.bodyType}
            placeholder="Select body type (optional)"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#D4A843]/10">
              <Zap className="h-4 w-4 text-[#D4A843]" />
            </div>
            <h3 className="text-sm font-semibold text-white">Athletic Attributes</h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Sprint Speed"
              type="text"
              placeholder="e.g. 10.5s for 100m"
              value={data.sprintSpeed || ""}
              onChange={handleField("sprintSpeed")}
              error={errors.sprintSpeed}
              helperText="e.g. 10.5s for 100m"
            />

            <Input
              label="Acceleration"
              type="text"
              placeholder="e.g. Quick off the mark"
              value={data.acceleration || ""}
              onChange={handleField("acceleration")}
              error={errors.acceleration}
            />
          </div>

          <Input
            label="Agility"
            type="text"
            placeholder="e.g. Excellent lateral movement"
            value={data.agility || ""}
            onChange={handleField("agility")}
            error={errors.agility}
            helperText="Describe your agility level or leave blank"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Select
              label="Strength"
              options={FITNESS_LEVELS}
              value={data.strength || ""}
              onChange={handleField("strength")}
              error={errors.strength}
              placeholder="Select level (optional)"
            />

            <Select
              label="Stamina"
              options={FITNESS_LEVELS}
              value={data.stamina || ""}
              onChange={handleField("stamina")}
              error={errors.stamina}
              placeholder="Select level (optional)"
            />

            <Input
              label="Jump Height"
              type="text"
              placeholder="e.g. 45cm"
              value={data.jumpHeight || ""}
              onChange={handleField("jumpHeight")}
              error={errors.jumpHeight}
              helperText="e.g. 45cm"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/10">
              <Heart className="h-4 w-4 text-red-400" />
            </div>
            <h3 className="text-sm font-semibold text-white">Health</h3>
          </div>

          <TextArea
            label="Injury History"
            placeholder="List any significant injuries and recovery details (optional)"
            value={data.injuryHistory || ""}
            onChange={handleField("injuryHistory")}
            error={errors.injuryHistory}
            rows={3}
            helperText="List any significant injuries"
          />

          <TextArea
            label="Medical Concerns"
            placeholder="Any medical conditions or allergies scouts should know about (optional)"
            value={data.medicalConcerns || ""}
            onChange={handleField("medicalConcerns")}
            error={errors.medicalConcerns}
            rows={3}
          />

          <Select
            label="Current Fitness Level"
            options={FITNESS_LEVELS}
            value={data.currentFitnessLevel || ""}
            onChange={handleField("currentFitnessLevel")}
            error={errors.currentFitnessLevel}
            placeholder="Select current fitness level (optional)"
          />
        </div>
      </div>
    </div>
  );
}

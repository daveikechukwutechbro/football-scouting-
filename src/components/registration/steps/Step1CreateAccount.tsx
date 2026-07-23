"use client";

import { Mail, Lock } from "lucide-react";
import Input from "@/components/ui/Input";
import type { StepProps } from "@/lib/constants";

export default function Step1CreateAccount({ data, updateData, errors }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Create Your Account</h2>
        <p className="mt-1 text-sm text-gray-400">
          Set up your login credentials to get started.
        </p>
      </div>

      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        icon={Mail}
        value={data.email || ""}
        onChange={(e) => updateData({ email: e.target.value })}
        error={errors.email}
        required
        autoComplete="email"
      />

      <Input
        label="Password"
        type="password"
        placeholder="Create a strong password"
        icon={Lock}
        value={data.password || ""}
        onChange={(e) => updateData({ password: e.target.value })}
        error={errors.password}
        required
        helperText="Must be at least 8 characters with a number and special character"
        autoComplete="new-password"
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="Re-enter your password"
        icon={Lock}
        value={data.confirmPassword || ""}
        onChange={(e) => updateData({ confirmPassword: e.target.value })}
        error={errors.confirmPassword}
        required
        autoComplete="new-password"
      />
    </div>
  );
}

"use client";

import { useState, type FormEvent, type KeyboardEvent, useRef } from "react";
import Link from "next/link";
import {
  Mail,
  ArrowLeft,
  CheckCircle,
  Lock,
  KeyRound,
  Shield,
} from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

type Step = 1 | 2 | 3 | 4;

function StepIndicator({ currentStep }: { currentStep: Step }) {
  const steps: { num: Step; label: string }[] = [
    { num: 1, label: "Email" },
    { num: 2, label: "Code" },
    { num: 3, label: "New Password" },
    { num: 4, label: "Done" },
  ];

  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      {steps.map((step, i) => (
        <div key={step.num} className="flex items-center">
          <div
            className={`
              flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300
              ${
                currentStep > step.num
                  ? "bg-[#0D7B3E] text-white"
                  : currentStep === step.num
                    ? "bg-[#0D7B3E] text-white ring-4 ring-[#0D7B3E]/30 scale-110"
                    : "bg-[#232838] text-gray-500 border-2 border-gray-700"
              }
            `}
          >
            {currentStep > step.num ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <span>{step.num}</span>
            )}
          </div>
          {i < steps.length - 1 && (
            <div
              className={`
                h-0.5 w-10 mx-2 rounded-full transition-colors duration-300
                ${currentStep > step.num ? "bg-[#0D7B3E]" : "bg-gray-700"}
              `}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function PasswordStrength({ password }: { password: string }) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const labels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
  const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-lime-500", "bg-[#0D7B3E]"];

  if (!password) return null;

  return (
    <div className="space-y-1.5 mt-1">
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`
              h-1.5 flex-1 rounded-full transition-all duration-300
              ${i < score ? colors[score - 1] : "bg-gray-700"}
            `}
          />
        ))}
      </div>
      <p className={`text-xs ${score <= 1 ? "text-red-400" : score <= 2 ? "text-yellow-400" : "text-[#0D7B3E]"}`}>
        {labels[Math.max(0, score - 1)] || "Very Weak"}
      </p>
    </div>
  );
}

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSendCode = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrors({ email: "Email or phone number is required" });
      return;
    }
    setIsLoading(true);
    setErrors({});
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStep(2);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    if (value && index < 5) {
      codeRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      codeRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newCode = [...code];
    for (let i = 0; i < 6; i++) {
      newCode[i] = pasted[i] || "";
    }
    setCode(newCode);
    codeRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleVerifyCode = async (e: FormEvent) => {
    e.preventDefault();
    const codeStr = code.join("");
    if (codeStr.length !== 6) {
      setErrors({ code: "Please enter the complete 6-digit code" });
      return;
    }
    setIsLoading(true);
    setErrors({});
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStep(3);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStep(4);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1419] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Card padding="lg">
          <div className="text-center mb-6">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D7B3E]">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold text-white">ProScout</span>
            </Link>
          </div>

          {step < 4 && <StepIndicator currentStep={step} />}

          {step === 1 && (
            <form onSubmit={handleSendCode} className="space-y-5">
              <div className="text-center mb-2">
                <div className="flex justify-center mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0D7B3E]/10">
                    <KeyRound className="h-7 w-7 text-[#0D7B3E]" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-white">Reset Password</h1>
                <p className="mt-1 text-sm text-gray-400">
                  Enter your email or phone number to receive a reset code
                </p>
              </div>

              <Input
                label="Email or Phone"
                placeholder="you@example.com"
                icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                required
                autoComplete="username"
              />

              <Button
                type="submit"
                variant="primary"
                loading={isLoading}
                className="w-full"
                size="lg"
              >
                Send Reset Code
              </Button>

              <div className="text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to login
                </Link>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyCode} className="space-y-5">
              <div className="text-center mb-2">
                <div className="flex justify-center mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4A843]/10">
                    <Shield className="h-7 w-7 text-[#D4A843]" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-white">Enter Reset Code</h1>
                <p className="mt-1 text-sm text-gray-400">
                  We&apos;ve sent a 6-digit code to your email/phone
                </p>
              </div>

              <div className="flex justify-center gap-3">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { codeRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleCodeKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className={`
                      h-14 w-12 text-center text-xl font-bold rounded-xl border bg-[#232838] text-white
                      outline-none transition-all duration-200
                      ${errors.code
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
                        : "border-gray-700 focus:border-[#0D7B3E] focus:ring-2 focus:ring-[#0D7B3E]/30"
                      }
                    `}
                  />
                ))}
              </div>
              {errors.code && (
                <p className="text-xs text-red-500 text-center">{errors.code}</p>
              )}

              <Button
                type="submit"
                variant="primary"
                loading={isLoading}
                className="w-full"
                size="lg"
              >
                Verify Code
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setErrors({});
                  }}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Didn&apos;t receive the code?{" "}
                  <span className="text-[#0D7B3E] hover:text-[#0a6632] font-medium">Resend</span>
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div className="text-center mb-2">
                <div className="flex justify-center mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0D7B3E]/10">
                    <Lock className="h-7 w-7 text-[#0D7B3E]" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-white">Create New Password</h1>
                <p className="mt-1 text-sm text-gray-400">
                  Enter a new strong password for your account
                </p>
              </div>

              <div>
                <Input
                  label="New Password"
                  type="password"
                  placeholder="Enter new password"
                  icon={Lock}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  error={errors.newPassword}
                  required
                  autoComplete="new-password"
                />
                <PasswordStrength password={newPassword} />
              </div>

              <Input
                label="Confirm Password"
                type="password"
                placeholder="Re-enter new password"
                icon={Lock}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
                required
                autoComplete="new-password"
              />

              <Button
                type="submit"
                variant="primary"
                loading={isLoading}
                className="w-full"
                size="lg"
              >
                Reset Password
              </Button>
            </form>
          )}

          {step === 4 && (
            <div className="text-center py-4">
              <div className="flex justify-center mb-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0D7B3E]/10 animate-in zoom-in duration-500">
                  <CheckCircle className="h-12 w-12 text-[#0D7B3E]" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Password Reset Successful
              </h1>
              <p className="text-sm text-gray-400 mb-8 max-w-xs mx-auto">
                Your password has been updated. You can now sign in with your new password.
              </p>
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                href="/login"
              >
                Sign In
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

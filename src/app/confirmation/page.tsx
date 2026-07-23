"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CheckCircle,
  FileSearch,
  Clock,
  Mail,
  PartyPopper,
  ClipboardCheck,
  UserCheck,
  Trophy,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Application Received",
    description: "We've received your complete application",
  },
  {
    icon: FileSearch,
    title: "Profile Review",
    description: "Our scouts will review your profile within 5-10 business days",
  },
  {
    icon: UserCheck,
    title: "Decision",
    description: "You'll receive an email and/or WhatsApp notification with the outcome",
  },
  {
    icon: Trophy,
    title: "Trial Invitation",
    description: "If shortlisted, you'll receive details about upcoming trials",
  },
];

function ConfettiPiece({ delay, left }: { delay: number; left: number }) {
  const colors = ["#0D7B3E", "#D4A843", "#3B82F6", "#EF4444", "#8B5CF6"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      className="absolute w-2 h-2 rounded-sm opacity-0 animate-[confetti_3s_ease-in-out_forwards]"
      style={{
        left: `${left}%`,
        top: "-10px",
        backgroundColor: color,
        animationDelay: `${delay}ms`,
      }}
    />
  );
}

export default function ConfirmationPage() {
  const [refNumber, setRefNumber] = useState("");

  useEffect(() => {
    const num = Math.floor(10000 + Math.random() * 90000);
    setRefNumber(`PSF-2026-${num}`);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F1419] flex items-center justify-center px-4 py-12">
      <style>{`
        @keyframes confetti {
          0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(400px) rotate(720deg);
          }
        }
        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.2;
          }
          100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
        }
        @keyframes check-draw {
          0% {
            stroke-dashoffset: 50;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>

      <div className="w-full max-w-2xl relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <ConfettiPiece
              key={i}
              delay={i * 150}
              left={Math.random() * 100}
            />
          ))}
        </div>

        <Card padding="lg" className="relative overflow-hidden">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full bg-[#0D7B3E]/20"
                  style={{ animation: "pulse-ring 2s ease-in-out infinite" }}
                />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#0D7B3E]/10 border-2 border-[#0D7B3E]/30">
                  <CheckCircle className="h-14 w-14 text-[#0D7B3E]" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mb-2">
              <PartyPopper className="h-5 w-5 text-[#D4A843]" />
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Application Submitted!
              </h1>
            </div>
            <p className="text-gray-400 mb-6">
              Thank you for applying to ProScout Football
            </p>

            <div className="inline-flex items-center gap-2 rounded-xl bg-[#232838] border border-gray-700 px-5 py-3 mb-8">
              <span className="text-xs text-gray-400">Reference:</span>
              <span className="font-mono text-sm font-bold text-[#D4A843]">
                {refNumber || "PSF-2026-XXXXX"}
              </span>
            </div>

            <p className="text-sm text-gray-400 max-w-md mx-auto mb-10">
              Your application is now under review. Our scouts will carefully evaluate your
              profile, videos, and documents.
            </p>

            <div className="text-left mb-8">
              <h3 className="text-lg font-bold text-white mb-4 text-center">
                What happens next
              </h3>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D7B3E]/10 shrink-0">
                      <step.icon className="h-5 w-5 text-[#0D7B3E]" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#0D7B3E] bg-[#0D7B3E]/10 px-2 py-0.5 rounded-full">
                          Step {index + 1}
                        </span>
                        <h4 className="text-sm font-semibold text-white">{step.title}</h4>
                      </div>
                      <p className="text-sm text-gray-400 mt-0.5">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-[#D4A843]/5 border border-[#D4A843]/20 p-4 mb-8">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-[#D4A843] shrink-0 mt-0.5" />
                <p className="text-sm text-gray-300 text-left">
                  <strong className="text-[#D4A843]">Important:</strong> Keep your reference
                  number safe. Watch your email and phone for updates.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="primary" size="lg" href="/">
                Return Home
              </Button>
              <Button variant="outline" size="lg" href="/login">
                View My Application
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

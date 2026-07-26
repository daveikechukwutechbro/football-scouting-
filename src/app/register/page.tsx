"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import ProgressIndicator from "@/components/ui/ProgressIndicator";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Step1CreateAccount from "@/components/registration/steps/Step1CreateAccount";
import Step2PersonalDetails from "@/components/registration/steps/Step2PersonalDetails";
import Step3Guardian from "@/components/registration/steps/Step3Guardian";
import Step4FootballProfile from "@/components/registration/steps/Step4FootballProfile";
import Step5Physical from "@/components/registration/steps/Step5Physical";
import Step6Statistics from "@/components/registration/steps/Step6Statistics";
import Step7PlayingStyle from "@/components/registration/steps/Step7PlayingStyle";
import Step8Media from "@/components/registration/steps/Step8Media";
import Step9Documents from "@/components/registration/steps/Step9Documents";
import Step10Availability from "@/components/registration/steps/Step10Availability";
import Step11SocialMedia from "@/components/registration/steps/Step11SocialMedia";
import Step12ReviewSubmit from "@/components/registration/steps/Step12ReviewSubmit";
import { STEP_NAMES } from "@/lib/constants";

const STORAGE_KEY = "proscout-registration";

const defaultFormData = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  age: 0,
  nationality: "",
  country: "",
  city: "",
  phoneNumber: "",
  guardianName: "",
  guardianRelationship: "",
  guardianEmail: "",
  guardianPhone: "",
  currentPosition: "",
  secondaryPosition: "",
  preferredFoot: "",
  currentLevel: "",
  contractStatus: "",
  currentClub: "",
  yearsExperience: "",
  previousClubs: "",
  height: "",
  weight: "",
  bodyType: "",
  fitnessLevel: "",
  injuries: "",
  totalAppearances: "",
  totalGoals: "",
  totalAssists: "",
  cleanSheets: "",
  yellowCards: "",
  redCards: "",
  biography: "",
  playingStyle: "",
  strengths: "",
  weaknesses: "",
  favoritePosition: "",
  favoritePlayer: "",
  careerGoal: "",
  motivation: "",
  videos: [] as string[],
  documents: {} as Record<string, File | null>,
  availableForTrials: null as boolean | null,
  availableImmediately: null as boolean | null,
  canTravel: null as boolean | null,
  canRelocate: null as boolean | null,
  preferredCountry: "",
  preferredLeague: "",
  preferredTrialDates: "",
  preferredCommunication: "",
  socialLinks: {} as Record<string, string>,
};

type FormData = typeof defaultFormData;

function loadFormData(): FormData {
  if (typeof window === "undefined") return defaultFormData;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...defaultFormData, ...JSON.parse(saved) };
    }
  } catch {
    // ignore
  }
  return defaultFormData;
}

function saveFormData(data: FormData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

function validateStep(step: number, data: FormData, hasGuardianStep: boolean): Record<string, string> {
  const errors: Record<string, string> = {};

  switch (step) {
    case 1:
      if (!data.email.trim()) errors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Invalid email address";
      if (!data.password) errors.password = "Password is required";
      else if (data.password.length < 8) errors.password = "Password must be at least 8 characters";
      if (!data.confirmPassword) errors.confirmPassword = "Please confirm your password";
      else if (data.password !== data.confirmPassword) errors.confirmPassword = "Passwords do not match";
      break;
    case 2:
      if (!data.firstName.trim()) errors.firstName = "First name is required";
      if (!data.lastName.trim()) errors.lastName = "Last name is required";
      if (!data.dateOfBirth) errors.dateOfBirth = "Date of birth is required";
      if (!data.nationality) errors.nationality = "Nationality is required";
      if (!data.country) errors.country = "Country is required";
      if (!data.city.trim()) errors.city = "City is required";
      if (!data.phoneNumber.trim()) errors.phoneNumber = "Phone number is required";
      break;
    case 3:
      if (hasGuardianStep) {
        if (!data.guardianName.trim()) errors.guardianName = "Guardian name is required";
        if (!data.guardianRelationship) errors.guardianRelationship = "Relationship is required";
        if (!data.guardianEmail.trim()) errors.guardianEmail = "Guardian email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.guardianEmail)) errors.guardianEmail = "Invalid email";
        if (!data.guardianPhone.trim()) errors.guardianPhone = "Guardian phone is required";
      }
      break;
    case 4:
      if (!data.currentPosition) errors.currentPosition = "Position is required";
      if (!data.preferredFoot) errors.preferredFoot = "Preferred foot is required";
      if (!data.currentLevel) errors.currentLevel = "Current level is required";
      if (!data.contractStatus) errors.contractStatus = "Contract status is required";
      break;
    case 5:
      if (!data.height) errors.height = "Height is required";
      if (!data.weight) errors.weight = "Weight is required";
      break;
    case 6:
      if (!data.totalAppearances && data.totalAppearances !== "0") errors.totalAppearances = "Appearances is required";
      if (!data.totalGoals && data.totalGoals !== "0") errors.totalGoals = "Goals is required";
      if (!data.totalAssists && data.totalAssists !== "0") errors.totalAssists = "Assists is required";
      break;
    case 7:
      if (!data.playingStyle.trim()) errors.playingStyle = "Playing style description is required";
      if (!data.strengths.trim()) errors.strengths = "Please list your key strengths";
      break;
    case 8:
      break;
    case 9:
      break;
    case 10:
      if (data.availableForTrials === null) errors.availableForTrials = "Please select an option";
      if (data.availableImmediately === null) errors.availableImmediately = "Please select an option";
      if (data.canTravel === null) errors.canTravel = "Please select an option";
      if (data.canRelocate === null) errors.canRelocate = "Please select an option";
      if (!data.preferredCommunication) errors.preferredCommunication = "Preferred communication method is required";
      break;
    case 11:
      break;
    case 12:
      break;
  }

  return errors;
}

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setFormData(loadFormData());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      saveFormData(formData);
    }
  }, [formData, hydrated]);

  const hasGuardianStep = formData.age > 0 && formData.age < 18;

  const visibleSteps = useMemo(() => {
    const steps = [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    if (hasGuardianStep) {
      steps.splice(2, 0, 3);
    }
    return steps;
  }, [hasGuardianStep]);

  const visibleStepNames = useMemo(() => {
    if (hasGuardianStep) return [...STEP_NAMES];
    return STEP_NAMES.filter((_, i) => i !== 2);
  }, [hasGuardianStep]);

  const completedSteps = useMemo(() => {
    const completed: number[] = [];
    const currentIdx = visibleSteps.indexOf(currentStep);
    for (let i = 0; i < currentIdx; i++) {
      completed.push(visibleSteps[i]);
    }
    return completed;
  }, [currentStep, visibleSteps]);

  const progressCurrentIndex = visibleSteps.indexOf(currentStep);

  const updateData = useCallback((fields: Record<string, any>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
    setErrors((prev) => {
      const next = { ...prev };
      Object.keys(fields).forEach((key) => {
        delete next[key];
      });
      return next;
    });
  }, []);

  const goToNextStep = useCallback(() => {
    const stepErrors = validateStep(currentStep, formData, hasGuardianStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    const currentIdx = visibleSteps.indexOf(currentStep);
    if (currentIdx < visibleSteps.length - 1) {
      setCurrentStep(visibleSteps[currentIdx + 1]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep, formData, hasGuardianStep, visibleSteps]);

  const goToPrevStep = useCallback(() => {
    setErrors({});
    const currentIdx = visibleSteps.indexOf(currentStep);
    if (currentIdx > 0) {
      setCurrentStep(visibleSteps[currentIdx - 1]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep, visibleSteps]);

  const handleSubmit = useCallback(async () => {
    const stepErrors = validateStep(12, formData, hasGuardianStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        setErrors({ general: result.error || "Submission failed. Please try again." });
        setIsSubmitting(false);
        return;
      }

      setIsSubmitted(true);
      localStorage.removeItem(STORAGE_KEY);
      setTimeout(() => {
        window.location.href = "/confirmation";
      }, 1500);
    } catch {
      setErrors({ general: "Network error. Please check your connection and try again." });
      setIsSubmitting(false);
    }
  }, [formData, hasGuardianStep]);

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-[#0F1419] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-[#0D7B3E] animate-spin" />
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0F1419] flex items-center justify-center px-4">
        <Card padding="lg" className="max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0D7B3E]/10">
              <CheckCircle className="h-12 w-12 text-[#0D7B3E] animate-[zoom-in_0.3s_ease-out]" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Application Submitted!</h2>
          <p className="text-sm text-gray-400">
            Redirecting you to the confirmation page...
          </p>
        </Card>
      </div>
    );
  }

  const stepContent = () => {
    const stepProps = { data: formData, updateData, errors };
    switch (currentStep) {
      case 1: return <Step1CreateAccount {...stepProps} />;
      case 2: return <Step2PersonalDetails {...stepProps} />;
      case 3: return <Step3Guardian {...stepProps} />;
      case 4: return <Step4FootballProfile {...stepProps} />;
      case 5: return <Step5Physical {...stepProps} />;
      case 6: return <Step6Statistics {...stepProps} />;
      case 7: return <Step7PlayingStyle {...stepProps} />;
      case 8: return <Step8Media {...stepProps} />;
      case 9: return <Step9Documents {...stepProps} />;
      case 10: return <Step10Availability {...stepProps} />;
      case 11: return <Step11SocialMedia {...stepProps} />;
      case 12: return <Step12ReviewSubmit {...stepProps} />;
      default: return null;
    }
  };

  const isLastStep = currentStep === 12;

  return (
    <div className="min-h-screen bg-[#0F1419]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0D7B3E]">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-lg font-bold text-white">ProScout</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Player Registration</h1>
        </div>

        <div className="mb-8">
          <ProgressIndicator
            steps={visibleStepNames}
            currentStep={progressCurrentIndex}
            completedSteps={completedSteps.map((s) => visibleSteps.indexOf(s))}
          />
        </div>

        <Card padding="lg" className="mb-24 sm:mb-8">
          <div
            key={currentStep}
            className="animate-[fadeIn_0.2s_ease-in-out]"
          >
            <style>{`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(8px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>
            {stepContent()}
          </div>
        </Card>

        <div className="hidden sm:block">
          <div className="flex items-center justify-between gap-4">
            <div>
              {currentStep !== 1 && (
                <Button
                  variant="ghost"
                  onClick={goToPrevStep}
                  size="lg"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              )}
            </div>
            <div className="text-sm text-gray-500">
              Step {visibleSteps.indexOf(currentStep) + 1} of {visibleSteps.length}
            </div>
            <div>
              {isLastStep ? (
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  loading={isSubmitting}
                  size="lg"
                >
                  Submit Application
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={goToNextStep}
                  size="lg"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-[#0F1419] border-t border-gray-800 px-4 py-3 z-50">
          <div className="flex items-center justify-between gap-3 max-w-3xl mx-auto">
            <Button
              variant="ghost"
              onClick={goToPrevStep}
              disabled={currentStep === 1}
              size="md"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <span className="text-xs text-gray-500">
              {visibleSteps.indexOf(currentStep) + 1}/{visibleSteps.length}
            </span>
            {isLastStep ? (
              <Button
                variant="primary"
                onClick={handleSubmit}
                loading={isSubmitting}
                size="md"
              >
                Submit
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={goToNextStep}
                size="md"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

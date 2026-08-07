"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { useAuth } from "@/lib/useAuth";
import ProgressIndicator from "@/components/ui/ProgressIndicator";
import Button from "@/components/ui/Button";
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
  preferredCommunication: "",
  communicationContact: "",
  socialLinks: {} as Record<string, string>,
};

type FormData = typeof defaultFormData;

function loadFormData(): FormData {
  if (typeof window === "undefined") return defaultFormData;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...defaultFormData, ...JSON.parse(saved) };
  } catch {
    /* ignore */
  }
  return defaultFormData;
}

function saveFormData(data: FormData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

function validateStep(
  step: number,
  data: FormData,
  hasGuardianStep: boolean
): Record<string, string> {
  const errors: Record<string, string> = {};
  switch (step) {
    case 2:
      if (!data.firstName.trim()) errors.firstName = "First name is required";
      if (!data.lastName.trim()) errors.lastName = "Last name is required";
      if (!data.dateOfBirth) errors.dateOfBirth = "Date of birth is required";
      if (!data.nationality) errors.nationality = "Nationality is required";
      if (!data.country) errors.country = "Country is required";
      if (!data.city.trim()) errors.city = "City is required";
      if (!data.phoneNumber.trim())
        errors.phoneNumber = "Phone number is required";
      break;
    case 3:
      if (hasGuardianStep) {
        if (!data.guardianName.trim())
          errors.guardianName = "Guardian name is required";
        if (!data.guardianRelationship)
          errors.guardianRelationship = "Relationship is required";
        if (!data.guardianEmail.trim())
          errors.guardianEmail = "Guardian email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.guardianEmail))
          errors.guardianEmail = "Invalid email";
        if (!data.guardianPhone.trim())
          errors.guardianPhone = "Guardian phone is required";
      }
      break;
    case 4:
      if (!data.currentPosition)
        errors.currentPosition = "Position is required";
      if (!data.preferredFoot)
        errors.preferredFoot = "Preferred foot is required";
      if (!data.currentLevel)
        errors.currentLevel = "Current level is required";
      if (!data.contractStatus)
        errors.contractStatus = "Contract status is required";
      if (!data.currentClub.trim())
        errors.currentClub = "Current/last club is required";
      if (!data.yearsExperience)
        errors.yearsExperience = "Years of experience is required";
      break;
    case 5:
      if (!data.height) errors.height = "Height is required";
      if (!data.weight) errors.weight = "Weight is required";
      if (!data.bodyType) errors.bodyType = "Body type is required";
      if (!data.fitnessLevel) errors.fitnessLevel = "Fitness level is required";
      break;
    case 6:
      if (!data.totalAppearances && data.totalAppearances !== "0")
        errors.totalAppearances = "Appearances is required";
      if (!data.totalGoals && data.totalGoals !== "0")
        errors.totalGoals = "Goals is required";
      if (!data.totalAssists && data.totalAssists !== "0")
        errors.totalAssists = "Assists is required";
      if (!data.yellowCards && data.yellowCards !== "0")
        errors.yellowCards = "Yellow cards is required";
      if (!data.redCards && data.redCards !== "0")
        errors.redCards = "Red cards is required";
      break;
    case 7:
      if (!data.biography.trim()) errors.biography = "Biography is required";
      if (!data.playingStyle.trim())
        errors.playingStyle = "Playing style description is required";
      if (!data.strengths.trim())
        errors.strengths = "Please list your key strengths";
      if (!data.careerGoal.trim())
        errors.careerGoal = "Career goal is required";
      if (!data.motivation.trim())
        errors.motivation = "Motivation is required";
      break;
    case 8:
      if (!data.videos || data.videos.length === 0)
        errors.videos = "Please add at least one highlight video";
      break;
    case 9:
      const docs = data.documents || {};
      if (!(docs.nationalId instanceof File))
        errors.nationalId = "National ID is required";
      if (!(docs.passport instanceof File))
        errors.passport = "Passport is required";
      if (!(docs.birthCertificate instanceof File))
        errors.birthCertificate = "Birth certificate is required";
      break;
    case 10:
      if (data.availableForTrials === null)
        errors.availableForTrials = "Please select an option";
      if (data.availableImmediately === null)
        errors.availableImmediately = "Please select an option";
      if (data.canTravel === null)
        errors.canTravel = "Please select an option";
      if (data.canRelocate === null)
        errors.canRelocate = "Please select an option";
      if (!data.preferredCountry)
        errors.preferredCountry = "Preferred country is required";
      if (!data.preferredLeague.trim())
        errors.preferredLeague = "Preferred league is required";
      if (!data.preferredCommunication)
        errors.preferredCommunication =
          "Preferred communication method is required";
      if (!data.communicationContact.trim())
        errors.communicationContact = "Contact details are required";
      break;
    case 11:
      const links = data.socialLinks || {};
      if (!(links.instagram || "").trim())
        errors["social-instagram"] = "Instagram is required";
      break;
  }
  return errors;
}

export default function RegisterPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(2);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/signup");
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  useEffect(() => {
    setFormData(loadFormData());
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (hydrated) saveFormData(formData);
  }, [formData, hydrated]);

  const hasGuardianStep = formData.age > 0 && formData.age < 18;

  const visibleSteps = useMemo(() => {
    const steps = [2, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    if (hasGuardianStep) steps.splice(1, 0, 3);
    return steps;
  }, [hasGuardianStep]);

  const visibleStepNames = useMemo(() => {
    let names = STEP_NAMES.filter((_, i) => i !== 0);
    if (hasGuardianStep) names = [...names.slice(0, 1), STEP_NAMES[2], ...names.slice(1)];
    else names = names.filter((_, i) => i !== 1);
    return names;
  }, [hasGuardianStep]);

  const completedSteps = useMemo(() => {
    const completed: number[] = [];
    const currentIdx = visibleSteps.indexOf(currentStep);
    for (let i = 0; i < currentIdx; i++) completed.push(visibleSteps[i]);
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
    setIsSubmitting(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      const token = await user!.getIdToken();
      const res = await fetch("/api/payment/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!res.ok || !result.checkout_url) {
        setErrors({
          general: result.error || "Could not start payment. Please try again.",
        });
        setIsSubmitting(false);
        return;
      }
      window.location.href = result.checkout_url;
    } catch {
      setErrors({
        general: "Network error. Please check your connection and try again.",
      });
      setIsSubmitting(false);
    }
  }, [formData, user]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background dark:bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 dark:bg-background">
        <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 text-center dark:border-border dark:bg-surface">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-light">
              <CheckCircle className="h-12 w-12 animate-[zoom-in_0.3s_ease-out] text-primary" />
            </div>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-foreground dark:text-foreground">
            Application Submitted!
          </h2>
          <p className="text-sm text-muted">
            Redirecting you to the confirmation page...
          </p>
        </div>
      </div>
    );
  }

  const stepContent = () => {
    const stepProps = { data: formData, updateData, errors };
    switch (currentStep) {
      case 2:
        return <Step2PersonalDetails {...stepProps} />;
      case 3:
        return <Step3Guardian {...stepProps} />;
      case 4:
        return <Step4FootballProfile {...stepProps} />;
      case 5:
        return <Step5Physical {...stepProps} />;
      case 6:
        return <Step6Statistics {...stepProps} />;
      case 7:
        return <Step7PlayingStyle {...stepProps} />;
      case 8:
        return <Step8Media {...stepProps} />;
      case 9:
        return <Step9Documents {...stepProps} />;
      case 10:
        return <Step10Availability {...stepProps} />;
      case 11:
        return <Step11SocialMedia {...stepProps} />;
      case 12:
        return <Step12ReviewSubmit {...stepProps} />;
      default:
        return null;
    }
  };

  const isLastStep = currentStep === 12;

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 text-center">
          <Link href="/" className="mb-4 inline-flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <span className="text-sm font-bold text-white">P</span>
            </div>
            <span className="text-lg font-bold text-foreground dark:text-foreground">
              ProScout
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground dark:text-foreground sm:text-3xl">
            Player Registration
          </h1>
        </div>

        <div className="mb-8">
          <ProgressIndicator
            steps={visibleStepNames}
            currentStep={progressCurrentIndex}
            completedSteps={completedSteps.map((s) => visibleSteps.indexOf(s))}
          />
        </div>

        <div className="mb-24 rounded-2xl border border-border bg-surface p-6 dark:border-border dark:bg-surface sm:mb-8 sm:p-8">
          <div key={currentStep} className="animate-[fadeIn_0.2s_ease-in-out]">
            {stepContent()}
          </div>
        </div>

        <div className="hidden sm:block">
          <div className="flex items-center justify-between gap-4">
            <div>
              {currentStep !== visibleSteps[0] && (
                <Button variant="ghost" onClick={goToPrevStep} size="lg">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
              )}
            </div>
            <div className="text-sm text-muted">
              Step {visibleSteps.indexOf(currentStep) + 1} of{" "}
              {visibleSteps.length}
            </div>
            <div>
              {isLastStep ? (
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  loading={isSubmitting}
                  size="lg"
                >
                  Pay $5 &amp; Submit
                </Button>
              ) : (
                <Button variant="primary" onClick={goToNextStep} size="lg">
                  Next <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface px-4 py-3 dark:border-border dark:bg-surface sm:hidden">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
            <Button
              variant="ghost"
              onClick={goToPrevStep}
              disabled={currentStep === visibleSteps[0]}
              size="md"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <span className="text-xs text-muted">
              {visibleSteps.indexOf(currentStep) + 1}/{visibleSteps.length}
            </span>
            {isLastStep ? (
              <Button
                variant="primary"
                onClick={handleSubmit}
                loading={isSubmitting}
                size="md"
              >
                Pay $5 &amp; Submit
              </Button>
            ) : (
              <Button variant="primary" onClick={goToNextStep} size="md">
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

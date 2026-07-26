import { UserPlus, ClipboardCheck, Video, Send, Eye, PhoneCall } from "lucide-react";

const STEPS = [
  {
    icon: UserPlus,
    number: "01",
    title: "Create Account",
    description: "Sign up in under a minute with just your email. No fees, no commitments.",
  },
  {
    icon: ClipboardCheck,
    number: "02",
    title: "Build Your Profile",
    description: "Complete your football profile with stats, physical attributes, and playing style.",
  },
  {
    icon: Video,
    number: "03",
    title: "Upload Highlights",
    description: "Share match footage and training clips that showcase your best moments.",
  },
  {
    icon: Send,
    number: "04",
    title: "Submit Application",
    description: "Review everything and submit your profile to our global scout network.",
  },
  {
    icon: Eye,
    number: "05",
    title: "Get Discovered",
    description: "Professional scouts review your profile and shortlist standout talent.",
  },
  {
    icon: PhoneCall,
    number: "06",
    title: "Receive Opportunities",
    description: "Get contacted directly by scouts, clubs, and academies for trials and signings.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4 block">The Process</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            From registration to revelation
          </h2>
          <p className="mt-4 text-gray-400 leading-relaxed">
            Six simple steps between you and your next football opportunity.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/20 via-emerald-500/10 to-transparent" />

          <div className="space-y-8 lg:space-y-0">
            {STEPS.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={step.number} className="relative lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center lg:pb-12">
                  <div className={`hidden lg:block absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-2xl bg-[#0c1017] border border-emerald-500/20 flex items-center justify-center z-10`}>
                    <span className="text-xs font-bold text-emerald-400">{step.number}</span>
                  </div>

                  <div className={`${isLeft ? "lg:text-right lg:pr-16" : "lg:col-start-2 lg:pl-16"}`}>
                    <div className={`flex items-start gap-4 ${isLeft ? "lg:flex-row-reverse" : ""}`}>
                      <div className="flex lg:hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/[0.08] border border-emerald-500/20">
                        <span className="text-xs font-bold text-emerald-400">{step.number}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <step.icon className="h-5 w-5 text-emerald-400 hidden lg:block" />
                          <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-sm">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

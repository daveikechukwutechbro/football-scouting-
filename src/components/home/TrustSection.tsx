import { UserCheck, Video, Trophy, Zap, Smartphone } from "lucide-react";

const FEATURES = [
  {
    icon: UserCheck,
    title: "Scout-Reviewed Profiles",
    description: "Every profile is reviewed by professional scouts from top clubs and academies worldwide.",
  },
  {
    icon: Video,
    title: "Video Highlight Support",
    description: "Upload match footage and training clips directly to your profile for scouts to evaluate.",
  },
  {
    icon: Trophy,
    title: "Proven Track Record",
    description: "Over 500 players have been shortlisted and connected with clubs through our platform.",
  },
  {
    icon: Zap,
    title: "Fast Response Times",
    description: "Receive feedback on your application within 48 hours. No long waits, no uncertainty.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Platform",
    description: "Register and manage your profile from anywhere, on any device, at any time.",
  },
];

export default function TrustSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.015] to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4 block">Why ProScout</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Built for players who mean business
          </h2>
          <p className="mt-4 text-gray-400 leading-relaxed">
            Every feature is designed to help you get noticed by the right people at the right time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className="group relative p-6 rounded-2xl bg-[#0c1017] border border-white/[0.04] hover:border-emerald-500/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/[0.03]"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/[0.08] text-emerald-400 mb-4 group-hover:bg-emerald-500/[0.12] transition-colors">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

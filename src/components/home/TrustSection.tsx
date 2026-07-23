import { UserCheck, Video, Trophy, Zap, Smartphone } from "lucide-react";

const trustCards = [
  {
    icon: UserCheck,
    title: "Scout-Reviewed Profiles",
    description:
      "Every profile is reviewed by experienced professional scouts who know what clubs are looking for.",
  },
  {
    icon: Video,
    title: "Video Highlight Support",
    description:
      "Upload match footage and highlight reels directly to your profile so scouts can see you in action.",
  },
  {
    icon: Trophy,
    title: "Proven Track Record",
    description:
      "Over 500 players have been scouted and connected with professional clubs through our platform.",
  },
  {
    icon: Zap,
    title: "Fast Response Times",
    description:
      "Receive feedback on your application within 14 days. No long waits, no guesswork.",
  },
  {
    icon: Smartphone,
    title: "Mobile-Friendly Platform",
    description:
      "Manage your profile, upload videos, and track applications from any device, anywhere.",
  },
];

export default function TrustSection() {
  return (
    <section className="bg-[#0F1419] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Why Players Trust{" "}
            <span className="text-[#0D7B3E]">ProScout</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#9CA3AF]">
            We&apos;ve built a platform that puts players first.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trustCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="group rounded-xl border border-white/10 bg-[#1A1F2E] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#0D7B3E]/40 hover:shadow-lg hover:shadow-[#0D7B3E]/5"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#0D7B3E]/15 text-[#0D7B3E] transition-colors group-hover:bg-[#0D7B3E]/25">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9CA3AF]">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

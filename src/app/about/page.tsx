import { Globe, Users, Target, Award, Shield, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about ProScout Football — the premier platform connecting aspiring footballers with professional scouts worldwide.",
};

const STATS = [
  { value: "2,500+", label: "Players Registered" },
  { value: "180+", label: "Active Scouts" },
  { value: "50+", label: "Countries" },
  { value: "500+", label: "Players Shortlisted" },
];

const VALUES = [
  { icon: Target, title: "Accessibility", description: "Every player, regardless of location or background, deserves access to professional scouting opportunities. Our platform removes traditional barriers." },
  { icon: Shield, title: "Integrity", description: "We maintain the highest standards in player representation and scout verification. Every profile is reviewed with care and professionalism." },
  { icon: Heart, title: "Player-First", description: "Everything we build starts with the player's needs. From profile design to scout matching, our decisions are driven by what helps you succeed." },
  { icon: Globe, title: "Global Reach", description: "Football talent exists everywhere. Our network spans continents, connecting players from over 50 countries with scouts and clubs worldwide." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.03] to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4 block">About ProScout</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              Bridging the gap between
              <span className="block bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">talent and opportunity</span>
            </h1>
            <p className="mt-6 text-lg text-gray-400 leading-relaxed max-w-2xl">
              ProScout Football was founded with a singular mission: to ensure that no talented footballer goes unnoticed because of geography, connections, or resources.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 border-y border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4 block">Our Story</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Born from a belief that talent is universal
              </h2>
              <div className="mt-6 space-y-4 text-gray-400 leading-relaxed">
                <p>
                  Too many talented footballers never get the chance to be seen. They play in local leagues, train hard every day, and dream of professional careers — but lack the connections and exposure that others take for granted.
                </p>
                <p>
                  ProScout Football was created to change that. We built a platform where any player, anywhere in the world, can create a professional profile, upload their highlights, and get directly in front of the scouts and clubs who are actively looking for talent.
                </p>
                <p>
                  Our team includes former professional players, licensed scouts, and technology experts who understand both the beautiful game and the power of digital platforms. Together, we&apos;re democratising football scouting.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-[#0c1216] to-[#0a0e14] border border-white/[0.04] overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 200 200" className="w-40 h-40 opacity-[0.04]" fill="currentColor">
                    <path d="M100 0C44.8 0 0 44.8 0 100s44.8 100 100 100 100-44.8 100-100S155.2 0 100 0zm0 180c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"/>
                  </svg>
                </div>
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-3 p-6">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.03] flex items-center justify-center">
                      <div className="h-6 w-6 rounded-full bg-emerald-500/[0.06]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-gradient-to-b from-emerald-500/[0.015] to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4 block">Our Values</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              What drives us every day
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {VALUES.map((val) => (
              <div key={val.title} className="p-6 rounded-2xl bg-[#0c1017] border border-white/[0.04]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/[0.08] text-emerald-400 mb-4">
                  <val.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{val.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Ready to start your journey?
          </h2>
          <p className="mt-4 text-gray-400 leading-relaxed">
            Join thousands of players who are already using ProScout to advance their football careers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-2xl shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              Register Free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl text-sm font-semibold text-gray-300 border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.03] transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

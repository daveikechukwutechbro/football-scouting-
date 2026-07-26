import { Target, Globe, Users, Shield } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const VALUES = [
  { icon: Target, title: "Our Mission", desc: "Bridge the gap between raw talent and professional opportunity. Every player deserves to be seen, regardless of geography or connections." },
  { icon: Globe, title: "Global Reach", desc: "Scouts from 50+ countries use ProScout to discover talent. We break down borders so talent can cross them." },
  { icon: Users, title: "Player First", desc: "Everything we build starts with the player. Your profile, your story, your career — you stay in control." },
  { icon: Shield, title: "Integrity", desc: "Transparent evaluations. No pay-to-play. Scouts assess talent on merit, not on who you know." },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-24 lg:py-36" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3 block" style={{ color: "var(--primary)" }}>About Us</span>
          <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold tracking-[-0.03em] leading-[1.08] max-w-[640px]" style={{ color: "var(--fg-heading)" }}>
            Built by people who understand the game
          </h1>
          <p className="mt-6 text-[16px] leading-[1.7] max-w-[560px]" style={{ color: "var(--fg-muted)" }}>
            ProScout Football was created by former players, coaches, and scouts who saw how many talented players went unnoticed. We built the platform we wished existed.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VALUES.map((v) => (
              <div key={v.title} className="p-6 rounded-xl border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                <v.icon className="h-5 w-5 mb-3" style={{ color: "var(--primary)" }} strokeWidth={1.5} />
                <h3 className="text-[14px] font-semibold mb-1.5" style={{ color: "var(--fg-heading)" }}>{v.title}</h3>
                <p className="text-[13px] leading-[1.7]" style={{ color: "var(--fg-muted)" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--bg-muted)", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-[720px] mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em]" style={{ color: "var(--fg-heading)" }}>Ready to get started?</h2>
          <p className="mt-4 text-[15px] leading-relaxed max-w-[440px] mx-auto" style={{ color: "var(--fg-muted)" }}>
            Join ProScout today and put your talent in front of the people who matter.
          </p>
          <Link href="/register" className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 rounded-lg text-[14px] font-semibold text-white transition-all duration-200" style={{ backgroundColor: "var(--primary)" }}>
            Create Your Profile <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

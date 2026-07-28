import { Target, Globe, Users, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

const VALUES = [
  { icon: Target, title: "Our Mission", desc: "Bridge the gap between raw talent and professional opportunity. Every player deserves to be seen." },
  { icon: Globe, title: "Global Reach", desc: "Scouts from 50+ countries use ProScout to discover talent. We break down borders." },
  { icon: Users, title: "Player First", desc: "Everything we build starts with the player. Your profile, your story, your career." },
  { icon: Shield, title: "Integrity", desc: "Transparent evaluations. No pay-to-play. Scouts assess talent on merit." },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-24 lg:py-36 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-3 block">About Us</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight max-w-2xl">
            Built by people who understand the game
          </h1>
          <p className="mt-6 text-lg text-muted max-w-xl leading-relaxed">
            ProScout Football was created by former players, coaches, and scouts who saw how many talented players went unnoticed. We built the platform we wished existed.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="p-6 rounded-2xl border border-border bg-surface">
                <v.icon className="h-6 w-6 text-primary mb-3" strokeWidth={1.5} />
                <h3 className="text-base font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-t border-border bg-surface-alt">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground">Ready to get started?</h2>
          <p className="mt-4 text-base text-muted">Join ProScout today and put your talent in front of the people who matter.</p>
          <Link href="/signup" className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-hover transition-colors">
            Create Your Profile <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

import { UserCheck, Video, Trophy, Zap, Smartphone } from "lucide-react";

const FEATURES = [
  { icon: UserCheck, title: "Scout-Reviewed", desc: "Every profile reviewed by professional scouts from top leagues." },
  { icon: Video, title: "Video Highlights", desc: "Upload match footage and training clips directly to your profile." },
  { icon: Trophy, title: "500+ Shortlisted", desc: "Players discovered and connected with clubs through our platform." },
  { icon: Zap, title: "48hr Response", desc: "Receive feedback on your application within two business days." },
  { icon: Smartphone, title: "Mobile Ready", desc: "Manage your profile from any device, anywhere in the world." },
];

export default function TrustSection() {
  return (
    <section className="py-20 lg:py-28 border-t border-border dark:border-border bg-background dark:bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-primary mb-3 block">Why ProScout</span>
            <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em] leading-[1.15] text-foreground dark:text-foreground">
              Everything you need to get discovered
            </h2>
          </div>
          <p className="text-[14px] max-w-[360px] leading-relaxed text-muted">
            Built for players who are serious about their football career.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group p-5 rounded-xl border border-border dark:border-border bg-surface dark:bg-surface transition-all duration-300 hover:shadow-md"
            >
              <f.icon className="h-5 w-5 mb-3 text-primary" strokeWidth={1.5} />
              <h3 className="text-[13px] font-semibold mb-1 text-foreground dark:text-foreground">{f.title}</h3>
              <p className="text-[12px] leading-[1.6] text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

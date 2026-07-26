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
    <section className="py-20 lg:py-28 border-t border-white/[0.04]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#10B981] mb-3 block">Why ProScout</span>
            <h2 className="text-[28px] sm:text-[32px] font-bold text-[#F1F5F9] tracking-[-0.02em] leading-[1.15]">
              Everything you need to get discovered
            </h2>
          </div>
          <p className="text-[14px] text-[#636681] max-w-[360px] leading-relaxed">
            Built for players who are serious about their football career.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="group p-5 rounded-xl bg-[#111118] border border-white/[0.04] hover:border-[#10B981]/[0.12] transition-all duration-300">
              <f.icon className="h-5 w-5 text-[#10B981] mb-3" strokeWidth={1.5} />
              <h3 className="text-[13px] font-semibold text-[#F1F5F9] mb-1">{f.title}</h3>
              <p className="text-[12px] text-[#475569] leading-[1.6]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

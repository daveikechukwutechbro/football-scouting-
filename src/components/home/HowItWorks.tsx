import { UserPlus, ClipboardCheck, Video, Send, Eye, PhoneCall } from "lucide-react";

const STEPS = [
  { num: "01", icon: UserPlus, title: "Create Account", desc: "Sign up in under a minute. Free, no commitments." },
  { num: "02", icon: ClipboardCheck, title: "Build Profile", desc: "Add your stats, physical attributes, and playing style." },
  { num: "03", icon: Video, title: "Upload Highlights", desc: "Share match footage that showcases your best moments." },
  { num: "04", icon: Send, title: "Submit Application", desc: "Review and submit your profile to our scout network." },
  { num: "05", icon: Eye, title: "Get Reviewed", desc: "Professional scouts evaluate your profile and skills." },
  { num: "06", icon: PhoneCall, title: "Get Contacted", desc: "Receive direct offers from scouts, clubs, and academies." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28" style={{ backgroundColor: "var(--bg-muted)" }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3 block" style={{ color: "var(--primary)" }}>The Process</span>
          <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em]" style={{ color: "var(--fg-heading)" }}>
            From registration to opportunity
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="relative group p-6 rounded-xl border transition-all duration-300"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[28px] font-bold tabular-nums" style={{ color: "var(--border)" }}>{step.num}</span>
                <step.icon className="h-5 w-5" style={{ color: "var(--primary)" }} strokeWidth={1.5} />
              </div>
              <h3 className="text-[14px] font-semibold mb-1.5" style={{ color: "var(--fg-heading)" }}>{step.title}</h3>
              <p className="text-[13px] leading-[1.6]" style={{ color: "var(--fg-muted)" }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

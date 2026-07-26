"use client";

import { useState } from "react";
import { Send, Mail, User, MessageSquare, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    } catch { /* ignore */ }
    setStatus("sent");
    setTimeout(() => setStatus("idle"), 3000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <section className="py-24 lg:py-36" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3 block" style={{ color: "var(--primary)" }}>Contact</span>
          <h1 className="text-[36px] sm:text-[48px] font-extrabold tracking-[-0.03em] leading-[1.1] max-w-[520px]" style={{ color: "var(--fg-heading)" }}>Get in touch</h1>
          <p className="mt-6 text-[16px] leading-[1.7] max-w-[480px]" style={{ color: "var(--fg-muted)" }}>
            Questions about your application, partnerships, or anything else — we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_480px] gap-16">
            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email", value: "info@proscoutfootball.com" },
                { icon: User, label: "Location", value: "London, United Kingdom" },
                { icon: MessageSquare, label: "Response Time", value: "Within 24 hours" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 p-4 rounded-xl border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                  <item.icon className="h-5 w-5 mt-0.5" style={{ color: "var(--primary)" }} strokeWidth={1.5} />
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.06em] mb-0.5" style={{ color: "var(--fg-muted)" }}>{item.label}</div>
                    <div className="text-[14px] font-medium" style={{ color: "var(--fg-heading)" }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="px-4 py-3 rounded-lg border text-[14px] outline-none transition-colors"
                  style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--fg)" }} />
                <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="px-4 py-3 rounded-lg border text-[14px] outline-none transition-colors"
                  style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--fg)" }} />
              </div>
              <input type="text" placeholder="Subject" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border text-[14px] outline-none transition-colors"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--fg)" }} />
              <textarea placeholder="Your message" required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border text-[14px] outline-none transition-colors resize-none"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", color: "var(--fg)" }} />
              <button type="submit" disabled={status === "sending"}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-[14px] font-semibold text-white transition-all duration-200 disabled:opacity-50"
                style={{ backgroundColor: "var(--primary)" }}>
                {status === "sent" ? <><CheckCircle className="h-4 w-4" /> Sent</> : status === "sending" ? "Sending..." : <><Send className="h-4 w-4" /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

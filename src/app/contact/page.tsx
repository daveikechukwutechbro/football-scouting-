"use client";

import { useState } from "react";
import { Send, Mail, User, MessageSquare, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try { await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); } catch {}
    setStatus("sent");
    setTimeout(() => setStatus("idle"), 3000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <section className="py-24 lg:py-36 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-3 block">Contact</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">Get in touch</h1>
          <p className="mt-6 text-lg text-muted max-w-xl">Questions about your application, partnerships, or anything else — we&apos;d love to hear from you.</p>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email", value: "info@proscoutfootball.com" },
                { icon: User, label: "Location", value: "London, United Kingdom" },
                { icon: MessageSquare, label: "Response Time", value: "Within 24 hours" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-surface">
                  <item.icon className="h-5 w-5 text-primary mt-0.5" strokeWidth={1.5} />
                  <div>
                    <div className="text-xs text-muted uppercase tracking-wider mb-1">{item.label}</div>
                    <div className="text-sm font-medium text-foreground">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="px-4 py-3 rounded-xl border border-border bg-input text-foreground placeholder-muted text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="px-4 py-3 rounded-xl border border-border bg-input text-foreground placeholder-muted text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
              </div>
              <input type="text" placeholder="Subject" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground placeholder-muted text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
              <textarea placeholder="Your message" required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground placeholder-muted text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none" />
              <button type="submit" disabled={status === "sending"}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-hover transition-colors disabled:opacity-50">
                {status === "sent" ? <><CheckCircle className="h-4 w-4" /> Sent</> : status === "sending" ? "Sending..." : <><Send className="h-4 w-4" /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

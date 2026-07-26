"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, MessageCircle } from "lucide-react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.02] to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4 block">Contact</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Get in touch</h1>
          <p className="mt-3 text-gray-400 max-w-xl">
            Have a question, suggestion, or need support? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <div className="p-8 rounded-2xl bg-[#0c1017] border border-white/[0.04]">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="flex justify-center mb-6">
                      <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-emerald-400" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Message Sent</h3>
                    <p className="text-sm text-gray-400">Thank you for reaching out. We&apos;ll respond within 24 hours.</p>
                    <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }} className="mt-6 text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <h2 className="text-lg font-bold text-white">Send us a message</h2>
                    {error && (
                      <div className="p-3 rounded-xl bg-red-500/[0.06] border border-red-500/15">
                        <p className="text-sm text-red-400">{error}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input label="Name" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required id="c-name" />
                      <Input label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required id="c-email" />
                    </div>
                    <Input label="Subject" placeholder="How can we help?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} id="c-subject" />
                    <TextArea label="Message" placeholder="Write your message here..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={5} id="c-message" />
                    <Button type="submit" variant="primary" loading={loading} className="self-start">
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-5">
              {[
                { icon: Mail, label: "Email", value: "info@proscoutfootball.com", href: "mailto:info@proscoutfootball.com" },
                { icon: Phone, label: "Phone", value: "+44 20 7946 0958", href: "tel:+442079460958" },
                { icon: MapPin, label: "Location", value: "London, United Kingdom", href: null },
              ].map((item) => (
                <div key={item.label} className="p-5 rounded-2xl bg-[#0c1017] border border-white/[0.04] flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/[0.08] text-emerald-400 shrink-0">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-white hover:text-emerald-400 transition-colors">{item.value}</a>
                    ) : (
                      <span className="text-sm text-white">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}

              <div className="p-5 rounded-2xl bg-[#0c1017] border border-white/[0.04]">
                <h3 className="text-sm font-semibold text-white mb-3">Office Hours</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex justify-between"><span>Monday - Friday</span><span>9:00 AM - 6:00 PM</span></div>
                  <div className="flex justify-between"><span>Saturday</span><span>10:00 AM - 2:00 PM</span></div>
                  <div className="flex justify-between"><span>Sunday</span><span>Closed</span></div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/[0.06] to-emerald-500/[0.02] border border-emerald-500/10">
                <MessageCircle className="h-6 w-6 text-emerald-400 mb-3" />
                <h3 className="text-sm font-semibold text-white mb-1">Need immediate help?</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Check our <a href="/#faq" className="text-emerald-400 hover:text-emerald-300 transition-colors">FAQ section</a> for instant answers to common questions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

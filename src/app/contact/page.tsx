"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MessageCircle,
  Send,
  CheckCircle,
  HelpCircle,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
} from "lucide-react";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch {
      setErrors({ general: "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1419]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Contact Us</h1>
          <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
            Have a question or need assistance? We&apos;re here to help. Reach out to us and
            we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <Card padding="lg">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="flex justify-center mb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0D7B3E]/10">
                      <CheckCircle className="h-10 w-10 text-[#0D7B3E]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto">
                    Thank you for reaching out. We&apos;ll get back to you within 24-48 business
                    hours.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-xl font-bold text-white mb-1">Send a Message</h2>
                  <p className="text-sm text-gray-400 mb-4">
                    Fill out the form below and we&apos;ll respond promptly.
                  </p>

                  {errors.general && (
                    <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3">
                      <p className="text-sm text-red-400">{errors.general}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange("name")}
                      error={errors.name}
                      required
                      autoComplete="name"
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange("email")}
                      error={errors.email}
                      required
                      autoComplete="email"
                    />
                  </div>

                  <Input
                    label="Subject"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange("subject")}
                    error={errors.subject}
                    required
                  />

                  <TextArea
                    label="Message"
                    placeholder="Tell us more about your question or concern..."
                    value={formData.message}
                    onChange={handleChange("message")}
                    error={errors.message}
                    required
                    rows={6}
                    showCounter
                    maxLength={2000}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    loading={isSubmitting}
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              )}
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card padding="lg">
              <h2 className="text-xl font-bold text-white mb-4">Get in Touch</h2>
              <p className="text-sm text-gray-400 mb-6">
                Whether you have a question about trials, your account, or anything else, our team
                is ready to answer all your questions.
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D7B3E]/10 shrink-0">
                    <Mail className="h-5 w-5 text-[#0D7B3E]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Email</p>
                    <a
                      href="mailto:info@proscoutfootball.com"
                      className="text-sm text-gray-400 hover:text-[#0D7B3E] transition-colors"
                    >
                      info@proscoutfootball.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D7B3E]/10 shrink-0">
                    <Phone className="h-5 w-5 text-[#0D7B3E]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Phone</p>
                    <a
                      href="tel:+15551234567"
                      className="text-sm text-gray-400 hover:text-[#0D7B3E] transition-colors"
                    >
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D7B3E]/10 shrink-0">
                    <MessageCircle className="h-5 w-5 text-[#0D7B3E]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">WhatsApp</p>
                    <a
                      href="https://wa.me/15559876543"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-400 hover:text-[#0D7B3E] transition-colors"
                    >
                      +1 (555) 987-6543
                    </a>
                  </div>
                </div>
              </div>
            </Card>

            <Card padding="lg">
              <div className="flex items-center gap-3 mb-3">
                <HelpCircle className="h-5 w-5 text-[#D4A843]" />
                <h3 className="text-lg font-bold text-white">FAQ</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Check our frequently asked questions for quick answers.
              </p>
              <Link
                href="/#faq"
                className="text-sm font-medium text-[#0D7B3E] hover:text-[#0a6632] transition-colors"
              >
                View FAQ &rarr;
              </Link>
            </Card>

            <Card padding="lg">
              <h3 className="text-lg font-bold text-white mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, label: "Instagram", href: "#" },
                  { icon: Twitter, label: "X", href: "#" },
                  { icon: Facebook, label: "Facebook", href: "#" },
                  { icon: Youtube, label: "YouTube", href: "#" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#232838] text-gray-400 hover:bg-[#0D7B3E]/10 hover:text-[#0D7B3E] transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

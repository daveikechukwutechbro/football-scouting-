import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "ProScout Football terms of use — the rules governing your use of our platform and services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <section className="relative pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4 block">Legal</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Terms of Use</h1>
          <p className="mt-3 text-sm text-gray-500">Last updated: July 2026</p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {[
            { title: "1. Acceptance of Terms", content: "By accessing or using ProScout Football (the \"Platform\"), you agree to be bound by these Terms of Use. If you do not agree to these terms, you may not use the Platform. We reserve the right to modify these terms at any time, and your continued use of the Platform constitutes acceptance of any changes." },
            { title: "2. Eligibility", content: "You must be at least 13 years old to use ProScout Football. Users between 13 and 18 must have parental or guardian consent. By using the Platform, you represent that you meet these age requirements and have the legal capacity to enter into these terms." },
            { title: "3. Account Registration", content: "You agree to provide accurate, current, and complete information during registration and to keep your account information up to date. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorised use of your account." },
            { title: "4. Platform Services", content: "ProScout Football provides a platform for football players to create profiles, upload media content, and connect with scouts, clubs, and academies. We facilitate connections but do not guarantee any specific outcomes, including but not limited to trials, contracts, or signings. Any agreements formed between players and scouts/clubs are independent of ProScout Football." },
            { title: "5. User Content", content: "You retain ownership of all content you upload to the Platform, including photos, videos, and text. By uploading content, you grant ProScout Football a non-exclusive, worldwide licence to display, store, and share your content for the purpose of providing our services. You represent that you have all necessary rights to the content you upload." },
            { title: "6. Prohibited Conduct", content: "You may not: use the Platform for any unlawful purpose; upload false, misleading, or fraudulent information; impersonate another person or misrepresent your identity; harass, abuse, or harm other users; attempt to gain unauthorised access to the Platform or other users' accounts; use automated systems to access the Platform; or interfere with the proper functioning of the Platform." },
            { title: "7. Intellectual Property", content: "All content and materials on the Platform, excluding user-uploaded content, are the intellectual property of ProScout Football. You may not copy, modify, distribute, or reverse-engineer any part of the Platform without our written consent." },
            { title: "8. Limitation of Liability", content: "ProScout Football is provided \"as is\" without warranties of any kind. We are not liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform. Our total liability shall not exceed the amount you have paid us in the twelve months preceding the claim, or £100, whichever is greater." },
            { title: "9. Indemnification", content: "You agree to indemnify and hold harmless ProScout Football, its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including legal fees) arising from your use of the Platform or violation of these terms." },
            { title: "10. Termination", content: "We may suspend or terminate your account at any time, with or without notice, for conduct that violates these terms or is otherwise harmful to the Platform or other users. Upon termination, your right to use the Platform ceases immediately. We may retain your data as required by law or for legitimate business purposes." },
            { title: "11. Governing Law", content: "These Terms of Use are governed by and construed in accordance with the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales." },
            { title: "12. Contact", content: "For any questions about these Terms of Use, please contact us at legal@proscoutfootball.com." },
          ].map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-bold text-white mb-3">{section.title}</h2>
              <p className="text-sm text-gray-400 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

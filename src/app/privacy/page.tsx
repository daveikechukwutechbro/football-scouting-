import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ProScout Football privacy policy — how we collect, use, and protect your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <section className="relative pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4 block">Legal</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Privacy Policy</h1>
          <p className="mt-3 text-sm text-gray-500">Last updated: July 2026</p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {[
            { title: "1. Introduction", content: "ProScout Football (\"we\", \"our\", or \"us\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform and services. By using ProScout Football, you consent to the practices described in this policy." },
            { title: "2. Information We Collect", content: "We collect information you provide directly to us, including: your name, email address, date of birth, nationality, contact information, physical attributes, football career statistics, playing style descriptions, video uploads, document uploads, social media profiles, and availability preferences. We also automatically collect certain information about your device and usage of our platform, including IP address, browser type, operating system, and usage analytics." },
            { title: "3. How We Use Your Information", content: "We use your information to: create and manage your player profile; match you with relevant scouts, clubs, and trial opportunities; send you notifications about your application status; communicate important platform updates; improve our services and user experience; ensure the security and integrity of our platform; and comply with legal obligations." },
            { title: "4. Information Sharing", content: "We share your profile information with verified scouts, clubs, and academies when you submit an application. We do not sell your personal data to third parties. We may share anonymised, aggregated data for research or industry analysis. We may disclose your information if required by law or to protect the rights and safety of ProScout Football, our users, or the public." },
            { title: "5. Data Security", content: "We implement industry-standard security measures to protect your personal data, including encryption of data in transit and at rest, regular security audits, access controls for our staff, and secure data storage infrastructure. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security." },
            { title: "6. Data Retention", content: "We retain your personal data for as long as your account is active or as needed to provide you with our services. If you wish to delete your account and data, please contact us at privacy@proscoutfootball.com. We will process your request within 30 days." },
            { title: "7. Your Rights", content: "You have the right to: access the personal data we hold about you; correct any inaccurate data; request deletion of your data; restrict how we process your data; data portability; and object to certain uses of your data. To exercise any of these rights, please contact our privacy team at privacy@proscoutfootball.com." },
            { title: "8. Cookies", content: "We use cookies and similar tracking technologies to maintain your session, remember your preferences, and analyse platform usage. For full details, please see our Cookie Policy." },
            { title: "9. Children's Privacy", content: "ProScout Football is not intended for children under 13. For users between 13 and 18, we require parental or guardian consent before collecting personal data. We take additional safeguards for minor users, including restricted profile visibility." },
            { title: "10. Changes to This Policy", content: "We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the \"Last updated\" date. Your continued use of the platform after changes constitutes acceptance of the updated policy." },
            { title: "11. Contact Us", content: "If you have any questions about this Privacy Policy, please contact us at privacy@proscoutfootball.com or write to us at ProScout Football, London, United Kingdom." },
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

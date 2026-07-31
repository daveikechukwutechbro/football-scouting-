import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "ProScout Football cookie policy — how we use cookies and tracking technologies.",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen">
      <section className="relative pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4 block">Legal</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Cookie Policy</h1>
          <p className="mt-3 text-sm text-gray-500">Last updated: July 2026</p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {[
            { title: "1. What Are Cookies", content: "Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work efficiently, improve user experience, and provide information to website owners. Cookies can be \"first-party\" (set by the website you are visiting) or \"third-party\" (set by other websites or services)." },
            { title: "2. How We Use Cookies", content: "ProScout Football uses cookies and similar technologies (such as local storage) for the following purposes: to keep you logged in as you navigate the platform; to remember your preferences and settings; to analyse how our platform is used so we can improve it; to detect and prevent fraud and abuse; and to measure the effectiveness of our marketing efforts." },
            { title: "3. Types of Cookies We Use", content: "Essential Cookies: These are necessary for the platform to function properly. They enable core features such as authentication, security, and session management. You cannot opt out of essential cookies as the platform would not work without them.\n\nAnalytics Cookies: These help us understand how visitors interact with our platform by collecting and reporting information anonymously. We use this data to improve our services.\n\nPreference Cookies: These allow the platform to remember choices you make, such as your language preference or display settings.\n\nMarketing Cookies: These are used to track visitors across websites to display relevant advertisements. We may use these in the future but currently do not." },
            { title: "4. Specific Cookies We Set", content: "firebase-auth-token / persistence: Firebase Authentication stores your login session locally so you stay signed in across pages. It is cleared when you log out.\n\nproscout-registration: Local storage item used to save your progress during the registration wizard. Cleared upon successful submission.\n\n_ga, _gid: Google Analytics cookies that help us understand how visitors use our platform." },
            { title: "5. Third-Party Cookies", content: "We may use third-party services that set their own cookies, including: Google Analytics (for usage analytics); Google Fonts (for typography); and social media platforms (if you interact with embedded social content). These third parties have their own privacy policies governing how they use your data." },
            { title: "6. Managing Cookies", content: "You can control and manage cookies through your browser settings. Most browsers allow you to: view what cookies are stored and delete them individually; block third-party cookies; block cookies from particular sites; block all cookies; and delete all cookies when you close your browser. Note that disabling certain cookies may impair the functionality of the Platform." },
            { title: "7. Changes to This Policy", content: "We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. Any changes will be posted on this page with an updated revision date." },
            { title: "8. Contact", content: "If you have questions about our use of cookies, please contact us at privacy@proscoutfootball.com." },
          ].map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-bold text-white mb-3">{section.title}</h2>
              <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

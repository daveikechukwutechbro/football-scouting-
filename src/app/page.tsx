import Hero from "@/components/home/Hero";
import TrustSection from "@/components/home/TrustSection";
import HowItWorks from "@/components/home/HowItWorks";
import OpenTrials from "@/components/home/OpenTrials";
import SuccessStories from "@/components/home/SuccessStories";
import FAQ from "@/components/home/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustSection />
      <HowItWorks />
      <OpenTrials />
      <SuccessStories />
      <FAQ />
    </>
  );
}

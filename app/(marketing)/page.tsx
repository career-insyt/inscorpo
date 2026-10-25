import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { LearningPathsPreview } from "@/components/landing/learning-paths-preview";
import { CTASection } from "@/components/landing/cta-section";

export const metadata = {
  title: "CAREERINSYT — Gamified Career Operating System",
  description: "আপনার কর্পোরেট ক্যারিয়ারের স্মার্ট গ্যামিফায়েড অপারেটিং সিস্টেম। এক্সেল মডেলিং, পাইথন, পাওয়ার বিআই এবং এআই অটোমেশন মাস্টার করুন।",
};

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <LearningPathsPreview />
      <CTASection />
    </>
  );
}

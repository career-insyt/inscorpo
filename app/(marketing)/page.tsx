import { HeroSection } from "@/components/landing/hero-section";
import { TrustedPartners } from "@/components/landing/trusted-partners";
import { LearningPathsPreview } from "@/components/landing/learning-paths-preview";

export const metadata = {
  title: "CAREERINSYT — Career OS",
  description: "আপনার কর্পোরেট ক্যারিয়ারের স্মার্ট অপারেটিং সিস্টেম। এক্সেল মডেলিং, পাইথন, পাওয়ার বিআই এবং এআই অটোমেশন মাস্টার করুন।",
};

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <TrustedPartners />
      <LearningPathsPreview />
    </>
  );
}


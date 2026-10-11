import { HeroSection } from "@/components/landing/hero-section";
import { TrustedPartners } from "@/components/landing/trusted-partners";
import { LearningPathsPreview } from "@/components/landing/learning-paths-preview";
import { FeaturesSection } from "@/components/landing/features-section";

export const metadata = {
  title: "CAREERINSYT — Career OS",
  description: "Master enterprise modeling, Python automation, Power BI analytics, workplace AI, and digital media production.",
};

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <TrustedPartners />
      <LearningPathsPreview />
      <FeaturesSection />
    </>
  );
}


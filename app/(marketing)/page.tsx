import { HeroSection } from "@/components/landing/hero-section";
import { TrustedPartners } from "@/components/landing/trusted-partners";
import { InteractiveDiagnostic } from "@/components/landing/interactive-diagnostic";
import { FeaturesSection } from "@/components/landing/features-section";
import { LearningPathsPreview } from "@/components/landing/learning-paths-preview";
import { PricingSection } from "@/components/landing/pricing-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { FAQSection } from "@/components/landing/faq-section";
import { CTASection } from "@/components/landing/cta-section";
import { LeadMagnetModal } from "@/components/landing/lead-magnet-modal";

export const metadata = {
  title: "INSYT Corporate — High-Stakes Career Sprints & Verifiable Credentials",
  description: "Master real-world corporate competencies in 5-day sprints. Cryptographically verified credentials, seeded perturbation sandboxes, and FMCG/Banking career pathways.",
};

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <TrustedPartners />
      <InteractiveDiagnostic />
      <FeaturesSection />
      <LearningPathsPreview />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <LeadMagnetModal />
    </>
  );
}

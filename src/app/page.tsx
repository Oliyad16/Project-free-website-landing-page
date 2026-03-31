import { ApplicationProvider } from "@/components/application/ApplicationContext";
import { ApplicationModal } from "@/components/application/ApplicationModal";
import { LandingExperienceTracker } from "@/components/shared/LandingExperienceTracker";
import { StickyMobileCta } from "@/components/shared/StickyMobileCta";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

import { HeroSection } from "@/components/landing/HeroSection";
import { SocialProofSection } from "@/components/landing/SocialProofSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { WhatsIncludedSection } from "@/components/landing/WhatsIncludedSection";
import { ScopeBoundariesSection } from "@/components/landing/ScopeBoundariesSection";
import { WhyDifferentSection } from "@/components/landing/WhyDifferentSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { FinalCtaSection } from "@/components/landing/FinalCtaSection";

export default function LandingPage() {
  return (
    <ApplicationProvider>
      {/* Analytics tracker (client, renders nothing) */}
      <LandingExperienceTracker />

      {/* Application modal */}
      <ApplicationModal />

      {/* Sticky mobile CTA */}
      <StickyMobileCta />

      <main className="flex flex-col min-h-screen pb-20 md:pb-0">
        {/* Hero — no animation wrapper, loads immediately */}
        <HeroSection />

        <div className="section-divider mx-6" />

        <AnimatedSection>
          <SocialProofSection />
        </AnimatedSection>

        <div className="section-divider mx-6" />

        <AnimatedSection>
          <HowItWorksSection />
        </AnimatedSection>

        <div className="section-divider mx-6" />

        <AnimatedSection>
          <WhatsIncludedSection />
        </AnimatedSection>

        <div className="section-divider mx-6" />

        <AnimatedSection>
          <ScopeBoundariesSection />
        </AnimatedSection>

        <div className="section-divider mx-6" />

        <AnimatedSection>
          <WhyDifferentSection />
        </AnimatedSection>

        <div className="section-divider mx-6" />

        <AnimatedSection>
          <PricingSection />
        </AnimatedSection>

        <div className="section-divider mx-6" />

        <AnimatedSection>
          <FaqSection />
        </AnimatedSection>

        <div className="section-divider mx-6" />

        <FinalCtaSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-[rgba(201,168,124,0.08)] py-10 px-6 text-center">
        <p className="text-[#9A8B7A] text-sm">
          © {new Date().getFullYear()} Living Stone Solutions. All rights reserved.
        </p>
      </footer>
    </ApplicationProvider>
  );
}

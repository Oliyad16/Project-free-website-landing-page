import { ApplicationModalTrigger } from "@/components/application/ApplicationModal";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { HeroCarousel } from "@/components/landing/HeroCarousel";
import { Shield, Zap, Users, Award } from "lucide-react";
import Image from "next/image";

const TRUST_SIGNALS = [
  { icon: Shield, text: "Human-supervised builds" },
  { icon: Zap,    text: "Fast turnaround" },
  { icon: Users,  text: "Small business focused" },
  { icon: Award,  text: "No upfront cost" },
];

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-24 overflow-hidden"
    >
      {/* Subtle radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full animate-glow-pulse z-0"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,168,124,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">

        {/* Logo */}
        <div className="relative size-28 rounded-full bg-[#0a0b10] ring-1 ring-[rgba(201,168,124,0.2)] shadow-[0_0_32px_rgba(201,168,124,0.12)] flex items-center justify-center overflow-hidden">
          <Image
            src="/logo/logo.png"
            alt="Living Stone Solutions"
            width={112}
            height={112}
            className="object-contain scale-[0.88]"
            priority
          />
        </div>

        {/* Eyebrow */}
        <SectionLabel>Living Stone Solutions</SectionLabel>

        {/* Headline */}
        <h1
          className="font-heading font-semibold leading-[0.92] tracking-tight text-gradient-champagne"
          style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
        >
          Your Business Deserves
          <br />
          a Website That Works
        </h1>

        {/* Subheadline */}
        <p className="text-[#9A8B7A] max-w-xl mx-auto leading-relaxed text-lg">
          Professionally crafted for your business, with real human oversight.
          <br className="hidden sm:block" />
          <span className="text-[#F5EFE0]"> Upgrade only when you&apos;re ready to grow.</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <ApplicationModalTrigger
            trackEvent="hero_cta_click"
            className="btn-champagne h-14 px-9 rounded-2xl text-base font-semibold shadow-lg"
          >
            Apply for Your Free Website
          </ApplicationModalTrigger>

          <a
            href="#how-it-works"
            data-track-event="secondary_cta_click"
            className="h-14 px-8 rounded-2xl border border-[rgba(201,168,124,0.25)] text-[#C9A87C] text-base font-medium hover:border-[rgba(201,168,124,0.5)] hover:bg-[rgba(201,168,124,0.06)] transition-all"
          >
            See How It Works
          </a>
        </div>

        {/* Trust strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
          {TRUST_SIGNALS.map(({ icon: Icon, text }) => (
            <span
              key={text}
              className="flex items-center gap-2 text-xs text-[#9A8B7A] border border-[rgba(201,168,124,0.12)] bg-[rgba(17,21,32,0.6)] rounded-full px-4 py-2"
            >
              <Icon className="size-3 text-[#C9A87C]" />
              {text}
            </span>
          ))}
        </div>

        {/* Website portfolio carousel */}
        <div className="mt-12 w-full max-w-2xl">
          <p className="text-[#9A8B7A] text-xs uppercase tracking-widest mb-5 text-center">
            Examples of what we build
          </p>
          <HeroCarousel />
        </div>

      </div>
    </section>
  );
}

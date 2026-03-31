import { ApplicationModalTrigger } from "@/components/application/ApplicationModal";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { Shield, Zap, Users, Award } from "lucide-react";

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
      {/* Animated background paths */}
      <BackgroundPaths />

      {/* Soft radial glow behind content */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full animate-glow-pulse"
        style={{
          background: "radial-gradient(ellipse, rgba(201,168,124,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
        {/* Logo */}
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

        {/* Floating browser mockup */}
        <div className="mt-12 w-full max-w-2xl animate-float-slow">
          <div className="rounded-2xl border border-[rgba(201,168,124,0.15)] bg-[#111520] shadow-2xl overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(201,168,124,0.1)] bg-[#0e1219]">
              <span className="size-3 rounded-full bg-[#e05252] opacity-60" />
              <span className="size-3 rounded-full bg-[#C9A87C] opacity-60" />
              <span className="size-3 rounded-full bg-[#4A6DB5] opacity-60" />
              <div className="flex-1 mx-4 h-6 rounded-md bg-[rgba(201,168,124,0.06)] border border-[rgba(201,168,124,0.1)] flex items-center px-3">
                <span className="text-[10px] text-[#9A8B7A] font-mono">yourbusiness.com</span>
              </div>
            </div>
            {/* Fake page content */}
            <div className="p-6 space-y-4">
              <div className="h-8 w-2/3 rounded-lg bg-[rgba(201,168,124,0.08)]" />
              <div className="h-3 w-full rounded bg-[rgba(255,255,255,0.04)]" />
              <div className="h-3 w-5/6 rounded bg-[rgba(255,255,255,0.04)]" />
              <div className="h-3 w-3/4 rounded bg-[rgba(255,255,255,0.04)]" />
              <div className="flex gap-3 mt-6">
                <div className="h-10 w-36 rounded-xl bg-[rgba(201,168,124,0.2)]" />
                <div className="h-10 w-28 rounded-xl bg-[rgba(43,74,143,0.15)] border border-[rgba(74,109,181,0.2)]" />
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(201,168,124,0.07)]" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

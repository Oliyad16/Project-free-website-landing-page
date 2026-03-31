import { ApplicationModalTrigger } from "@/components/application/ApplicationModal";
import { Shield, Zap, Award } from "lucide-react";

const REASSURANCES = [
  { icon: Shield, text: "No upfront build cost" },
  { icon: Zap,    text: "3–5 day turnaround" },
  { icon: Award,  text: "Human-supervised quality" },
];

export function FinalCtaSection() {
  return (
    <section id="final-cta" className="py-32 px-6 relative overflow-hidden">
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className="w-[700px] h-[400px] rounded-full animate-glow-pulse"
          style={{
            background: "radial-gradient(ellipse, rgba(201,168,124,0.1) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-10 text-center">
        <div className="flex flex-col items-center gap-5">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C9A87C]">
            Ready to start?
          </span>
          <h2
            className="font-heading font-semibold leading-tight text-[#F5EFE0]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Your business deserves a website
            <br />
            <span className="text-gradient-champagne">that actually looks credible.</span>
          </h2>
          <p className="text-[#9A8B7A] max-w-sm text-base leading-relaxed">
            Join the businesses that got a professional website — at no upfront cost — and started winning more customers.
          </p>
        </div>

        <ApplicationModalTrigger
          trackEvent="final_cta_click"
          className="btn-champagne h-16 px-12 rounded-2xl text-lg font-semibold shadow-2xl"
        >
          Apply for Your Free Website
        </ApplicationModalTrigger>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {REASSURANCES.map(({ icon: Icon, text }) => (
            <span key={text} className="flex items-center gap-2 text-sm text-[#9A8B7A]">
              <Icon className="size-4 text-[#C9A87C]" />
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

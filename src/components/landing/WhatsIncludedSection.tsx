import { ApplicationModalTrigger } from "@/components/application/ApplicationModal";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Check } from "lucide-react";

const INCLUDED = [
  "Up to 5 pages (Home, About, Services, Contact, Gallery)",
  "Mobile-friendly, responsive design",
  "Contact form setup",
  "Clean, business-focused layout",
  "Basic on-page SEO structure",
  "Fast-loading, modern code",
  "Human-supervised build — not just auto-generated",
];

export function WhatsIncludedSection() {
  return (
    <section id="whats-included" className="py-24 px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-16">

        <div className="text-center flex flex-col items-center gap-4">
          <SectionLabel>What you get</SectionLabel>
          <h2 className="font-heading text-4xl md:text-5xl text-[#F5EFE0] font-semibold leading-tight">
            Everything you need to look credible
          </h2>
          <p className="text-[#9A8B7A] max-w-md text-base">
            No stripped-down templates. A real website built specifically for your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 w-full">
          {INCLUDED.map((item) => (
            <div
              key={item}
              className="glass-card rounded-xl px-5 py-4 flex items-start gap-4"
            >
              <div className="size-6 rounded-full bg-[rgba(74,109,181,0.15)] border border-[rgba(74,109,181,0.3)] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="size-3.5 text-[#4A6DB5]" />
              </div>
              <p className="text-[#F5EFE0] text-sm leading-relaxed">{item}</p>
            </div>
          ))}
        </div>

        <div className="text-center flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <p className="font-heading text-3xl text-gradient-champagne font-semibold">
              All included. Free.
            </p>
            <p className="text-[#9A8B7A] text-sm">Upgrade to hosting and growth tools only when you need them.</p>
          </div>
          <ApplicationModalTrigger
            trackEvent="included_cta_click"
            className="btn-champagne h-12 px-8 rounded-xl text-sm font-semibold"
          >
            Apply for Your Free Website
          </ApplicationModalTrigger>
        </div>
      </div>
    </section>
  );
}

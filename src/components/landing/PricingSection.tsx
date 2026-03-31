import { ApplicationModalTrigger } from "@/components/application/ApplicationModal";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "$29",
    period: "/month",
    desc: "Hosting, SSL, and essential support.",
    features: [
      "Managed hosting & SSL",
      "99.9% uptime guarantee",
      "Email support",
      "Monthly backups",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    id: "growth",
    name: "Growth",
    price: "$49",
    period: "/month",
    desc: "SEO tools, analytics, and priority support.",
    features: [
      "Everything in Starter",
      "SEO optimization tools",
      "Google Analytics setup",
      "Priority support",
      "Quarterly site review",
    ],
    cta: "Get Started",
    featured: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$79",
    period: "/month",
    desc: "Everything plus monthly hands-on updates.",
    features: [
      "Everything in Growth",
      "Monthly content updates",
      "Performance monitoring",
      "Dedicated account manager",
      "Conversion review",
    ],
    cta: "Get Started",
    featured: false,
  },
] as const;

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-16">

        <div className="text-center flex flex-col items-center gap-4">
          <SectionLabel>Pricing</SectionLabel>
          <h2 className="font-heading text-4xl md:text-5xl text-[#F5EFE0] font-semibold leading-tight">
            Start free. Upgrade when you&apos;re ready.
          </h2>
          <p className="text-[#9A8B7A] max-w-md text-base">
            Your website is built and delivered for free. Hosting and growth tools are optional — upgrade only when it makes sense for you.
          </p>
        </div>

        {/* Free tier callout */}
        <div className="w-full max-w-2xl rounded-2xl border border-[rgba(201,168,124,0.2)] bg-[rgba(201,168,124,0.04)] p-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="font-heading text-2xl text-[#F5EFE0] font-semibold">Free Website Build</p>
            <p className="text-[#9A8B7A] text-sm mt-1">Up to 5 pages, human-supervised, mobile-friendly.</p>
          </div>
          <span className="font-heading text-3xl text-gradient-champagne font-bold">$0</span>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-5 w-full">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "rounded-2xl p-7 flex flex-col gap-6 relative transition-all",
                plan.featured
                  ? "bg-[#171c2a] border-2 border-[#C9A87C] shadow-[0_0_40px_rgba(201,168,124,0.15)]"
                  : "glass-card"
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[11px] bg-[#C9A87C] text-[#0a0b10] px-3 py-1 rounded-full font-bold uppercase tracking-wide whitespace-nowrap">
                  Most Popular
                </span>
              )}

              <div>
                <p className="text-[#9A8B7A] text-xs uppercase tracking-widest mb-2">{plan.name}</p>
                <div className="flex items-end gap-1">
                  <span className="font-heading text-5xl text-[#F5EFE0] font-semibold leading-none">
                    {plan.price}
                  </span>
                  <span className="text-[#9A8B7A] text-sm mb-1">{plan.period}</span>
                </div>
                <p className="text-[#9A8B7A] text-sm mt-2">{plan.desc}</p>
              </div>

              <ul className="flex flex-col gap-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-[#F5EFE0]">
                    <Check className="size-4 text-[#4A6DB5] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <ApplicationModalTrigger
                defaultPlan={plan.id}
                trackEvent="pricing_cta_click"
                className={cn(
                  "mt-auto h-11 rounded-xl text-sm font-semibold transition-all",
                  plan.featured
                    ? "btn-champagne"
                    : "border border-[rgba(201,168,124,0.25)] text-[#C9A87C] hover:border-[rgba(201,168,124,0.5)] hover:bg-[rgba(201,168,124,0.06)]"
                )}
              >
                {plan.cta}
              </ApplicationModalTrigger>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

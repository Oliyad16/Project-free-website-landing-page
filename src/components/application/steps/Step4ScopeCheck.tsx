"use client";

import { useApplication } from "@/components/application/ApplicationContext";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const OUT_OF_SCOPE = [
  "custom_marketplace",
  "large_ecommerce",
  "advanced_backend",
  "mobile_app",
];

const PLANS: Array<{
  id: "starter" | "growth" | "pro";
  name: string;
  price: string;
  desc: string;
  featured?: boolean;
}> = [
  {
    id: "starter",
    name: "Starter",
    price: "$29/mo",
    desc: "Hosting, SSL, and basic support",
  },
  {
    id: "growth",
    name: "Growth",
    price: "$49/mo",
    desc: "SEO tools, analytics, priority support",
    featured: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$79/mo",
    desc: "Everything + monthly updates",
  },
];

export function Step4ScopeCheck({
  onNext,
  onBack,
}: {
  onNext: () => Promise<void>;
  onBack: () => void;
}) {
  const { state, updateField } = useApplication();
  const { form, loading } = state;

  const isOutOfScope = OUT_OF_SCOPE.includes(form.businessType);
  const isValid = form.scopeChoice !== "";

  return (
    <div className="flex flex-col gap-6 px-6 py-4">
      <div>
        <h2 className="font-heading text-3xl text-[#F5EFE0] mb-1">
          Let&apos;s confirm your project scope
        </h2>
        <p className="text-[#9A8B7A] text-sm">
          Our free build is designed for small business websites — up to 5 pages.
        </p>
      </div>

      {isOutOfScope && (
        <div className="rounded-xl border border-[rgba(201,168,124,0.3)] bg-[rgba(201,168,124,0.06)] p-4 text-sm text-[#C9A87C]">
          Based on your business type, your project may need a custom quote. We&apos;ll
          reach out with a tailored proposal after you submit.
        </div>
      )}

      {/* Scope choice */}
      <div className="flex flex-col gap-3">
        <p className="text-sm text-[#9A8B7A] font-medium">Which best describes your project?</p>
        {[
          {
            value: "standard",
            label: "Standard website",
            sub: "Up to 5 pages — home, about, services, contact, gallery",
          },
          {
            value: "custom",
            label: "Custom or larger project",
            sub: "More pages, special features, or unsure",
          },
        ].map((opt) => (
          <button
            key={opt.value}
            onClick={() => updateField("scopeChoice", opt.value as "standard" | "custom")}
            className={cn(
              "text-left rounded-xl border p-4 transition-all",
              form.scopeChoice === opt.value
                ? "border-[#C9A87C] bg-[rgba(201,168,124,0.08)]"
                : "border-[rgba(201,168,124,0.12)] hover:border-[rgba(201,168,124,0.3)]"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[#F5EFE0] font-medium text-sm">{opt.label}</p>
                <p className="text-[#9A8B7A] text-xs mt-0.5">{opt.sub}</p>
              </div>
              {form.scopeChoice === opt.value && (
                <CheckCircle2 className="size-5 text-[#C9A87C] flex-shrink-0 mt-0.5" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Plan interest */}
      <div className="flex flex-col gap-3">
        <p className="text-sm text-[#9A8B7A] font-medium">
          Interested in hosting &amp; growth plans? (optional)
        </p>
        <div className="grid grid-cols-3 gap-2">
          {PLANS.map((plan) => (
            <button
              key={plan.id}
              onClick={() => updateField("planInterest", plan.id)}
              className={cn(
                "text-center rounded-xl border p-3 transition-all",
                form.planInterest === plan.id
                  ? "border-[#C9A87C] bg-[rgba(201,168,124,0.08)]"
                  : "border-[rgba(201,168,124,0.12)] hover:border-[rgba(201,168,124,0.25)]",
                plan.featured ? "relative" : ""
              )}
            >
              {plan.featured && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] bg-[#C9A87C] text-[#0a0b10] px-2 py-0.5 rounded-full font-semibold whitespace-nowrap">
                  Popular
                </span>
              )}
              <p className="text-[#F5EFE0] text-xs font-semibold">{plan.name}</p>
              <p className="text-[#C9A87C] text-sm font-mono mt-0.5">{plan.price}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mt-2">
        <button
          onClick={onBack}
          className="h-12 w-12 rounded-xl border border-[rgba(201,168,124,0.2)] flex items-center justify-center text-[#9A8B7A] hover:text-[#C9A87C] hover:border-[rgba(201,168,124,0.5)] transition-colors flex-shrink-0"
        >
          <ArrowLeft className="size-4" />
        </button>
        <button
          onClick={onNext}
          disabled={!isValid || loading}
          className="btn-champagne flex-1 h-12 rounded-xl flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

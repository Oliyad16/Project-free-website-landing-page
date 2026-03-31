"use client";

import { useApplication } from "@/components/application/ApplicationContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight } from "lucide-react";

const BUSINESS_TYPES = [
  { value: "service_local",       label: "Local Service Business" },
  { value: "restaurant_cafe",     label: "Restaurant / Café" },
  { value: "retail_shop",         label: "Retail Shop" },
  { value: "health_wellness",     label: "Health & Wellness" },
  { value: "creative_freelance",  label: "Creative / Freelancer" },
  { value: "professional_services", label: "Professional Services" },
  { value: "nonprofit",           label: "Non-Profit / Organization" },
  { value: "real_estate",         label: "Real Estate" },
  { value: "education",           label: "Education / Coaching" },
  { value: "custom_marketplace",  label: "Marketplace / Platform" },
  { value: "large_ecommerce",     label: "Large eCommerce Store" },
  { value: "mobile_app",          label: "Mobile App" },
  { value: "other",               label: "Other" },
];

export function Step1BusinessBasics({
  onNext,
}: {
  onNext: () => Promise<void>;
}) {
  const { state, updateField } = useApplication();
  const { form, loading } = state;

  const isValid = form.businessName.trim() !== "" && form.businessType !== "";

  return (
    <div className="flex flex-col gap-6 px-6 py-4">
      <div>
        <h2 className="font-heading text-3xl text-[#F5EFE0] mb-1">
          Tell us about your business
        </h2>
        <p className="text-[#9A8B7A] text-sm">
          This helps us tailor your website to what you actually need.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="businessName">Business name</Label>
          <Input
            id="businessName"
            placeholder="e.g. Sunrise Barbershop"
            value={form.businessName}
            onChange={(e) => updateField("businessName", e.target.value)}
            autoFocus
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="businessType">Type of business</Label>
          <Select
            value={form.businessType}
            onValueChange={(v) => v && updateField("businessType", v)}
          >
            <SelectTrigger id="businessType">
              <SelectValue placeholder="Select your business type" />
            </SelectTrigger>
            <SelectContent>
              {BUSINESS_TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!isValid || loading}
        className="btn-champagne mt-2 h-12 rounded-xl flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue <ArrowRight className="size-4" />
      </button>
    </div>
  );
}

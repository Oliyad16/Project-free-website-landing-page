"use client";

import { useApplication } from "@/components/application/ApplicationContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Send } from "lucide-react";

export function Step5ContactDetails({
  onSubmit,
  onBack,
}: {
  onSubmit: () => Promise<void>;
  onBack: () => void;
}) {
  const { state, updateField } = useApplication();
  const { form, loading } = state;

  const isValid =
    form.contactName.trim() !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail);

  return (
    <div className="flex flex-col gap-6 px-6 py-4">
      <div>
        <h2 className="font-heading text-3xl text-[#F5EFE0] mb-1">
          Where can we send your website plan?
        </h2>
        <p className="text-[#9A8B7A] text-sm">
          We&apos;ll review your application and follow up within 24 hours.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="contactName">Your name</Label>
          <Input
            id="contactName"
            placeholder="Full name"
            value={form.contactName}
            onChange={(e) => updateField("contactName", e.target.value)}
            autoFocus
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="contactEmail">Email address</Label>
          <Input
            id="contactEmail"
            type="email"
            placeholder="you@yourbusiness.com"
            value={form.contactEmail}
            onChange={(e) => updateField("contactEmail", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="contactPhone">
            Phone number{" "}
            <span className="text-[#9A8B7A] font-normal">(optional)</span>
          </Label>
          <Input
            id="contactPhone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={form.contactPhone}
            onChange={(e) => updateField("contactPhone", e.target.value)}
          />
        </div>
      </div>

      <p className="text-[10px] text-[#9A8B7A]">
        By submitting, you agree to be contacted about your website project. No spam, ever.
      </p>

      <div className="flex gap-3 mt-1">
        <button
          onClick={onBack}
          className="h-12 w-12 rounded-xl border border-[rgba(201,168,124,0.2)] flex items-center justify-center text-[#9A8B7A] hover:text-[#C9A87C] hover:border-[rgba(201,168,124,0.5)] transition-colors flex-shrink-0"
        >
          <ArrowLeft className="size-4" />
        </button>
        <button
          onClick={onSubmit}
          disabled={!isValid || loading}
          className="btn-champagne flex-1 h-12 rounded-xl flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="size-4 border-2 border-[#0a0b10]/30 border-t-[#0a0b10] rounded-full animate-spin" />
          ) : (
            <>
              Submit Application <Send className="size-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

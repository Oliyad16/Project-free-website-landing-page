"use client";

import { useApplication } from "@/components/application/ApplicationContext";
import { CheckCircle2, Calendar } from "lucide-react";

export function Step6Confirmation({ onClose }: { onClose: () => void }) {
  const { state } = useApplication();
  const isCustom = state.form.scopeChoice === "custom";

  return (
    <div className="flex flex-col items-center gap-6 px-6 py-8 text-center">
      <div className="size-20 rounded-full bg-[rgba(74,109,181,0.12)] border border-[rgba(74,109,181,0.3)] flex items-center justify-center">
        <CheckCircle2 className="size-10 text-[#4A6DB5]" />
      </div>

      <div>
        <h2 className="font-heading text-4xl text-[#F5EFE0] mb-2">
          {isCustom ? "Your request is in." : "Your application is in."}
        </h2>
        <p className="text-[#9A8B7A] text-sm max-w-xs mx-auto leading-relaxed">
          {isCustom
            ? "Your project sounds like it needs a custom approach. Our team will review your details and reach out within 24 hours with a tailored proposal."
            : "We'll review your application and get back to you within 24 hours with a plan for your free website. Check your inbox soon."}
        </p>
      </div>

      <div className="w-full rounded-xl border border-[rgba(201,168,124,0.15)] bg-[rgba(17,21,32,0.6)] p-4 flex items-center gap-4">
        <Calendar className="size-5 text-[#C9A87C] flex-shrink-0" />
        <div className="text-left">
          <p className="text-[#F5EFE0] text-sm font-medium">What happens next</p>
          <p className="text-[#9A8B7A] text-xs mt-0.5">
            {isCustom
              ? "You'll receive a custom quote within 24 hours."
              : "We'll begin building your website within 3–5 business days."}
          </p>
        </div>
      </div>

      <button
        onClick={onClose}
        className="h-11 px-8 rounded-xl border border-[rgba(201,168,124,0.25)] text-[#C9A87C] text-sm font-medium hover:border-[rgba(201,168,124,0.5)] hover:bg-[rgba(201,168,124,0.06)] transition-all"
      >
        Close
      </button>
    </div>
  );
}

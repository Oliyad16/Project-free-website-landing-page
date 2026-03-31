"use client";

import { useApplication } from "@/components/application/ApplicationContext";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight } from "lucide-react";

const GOAL_EXAMPLES = [
  "Get more local customers to call me",
  "Show off my portfolio and attract clients",
  "Let people book appointments online",
  "Build credibility and look professional",
];

export function Step2WebsiteGoal({
  onNext,
  onBack,
}: {
  onNext: () => Promise<void>;
  onBack: () => void;
}) {
  const { state, updateField } = useApplication();
  const { form, loading } = state;

  const isValid = form.websiteGoal.trim().length > 10;

  return (
    <div className="flex flex-col gap-6 px-6 py-4">
      <div>
        <h2 className="font-heading text-3xl text-[#F5EFE0] mb-1">
          What should your website achieve?
        </h2>
        <p className="text-[#9A8B7A] text-sm">
          Describe the main goal. Be as specific as you like.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {GOAL_EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => updateField("websiteGoal", ex)}
              className="text-xs px-3 py-1.5 rounded-full border border-[rgba(201,168,124,0.2)] text-[#9A8B7A] hover:border-[rgba(201,168,124,0.5)] hover:text-[#C9A87C] transition-colors"
            >
              {ex}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="websiteGoal">Your goal</Label>
          <Textarea
            id="websiteGoal"
            placeholder="e.g. I want people to find me on Google and call to book a haircut..."
            value={form.websiteGoal}
            onChange={(e) => updateField("websiteGoal", e.target.value)}
            className="min-h-[120px]"
            autoFocus
          />
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

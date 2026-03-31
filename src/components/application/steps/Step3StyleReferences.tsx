"use client";

import { useApplication } from "@/components/application/ApplicationContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, ImagePlus } from "lucide-react";
import posthog from "posthog-js";

export function Step3StyleReferences({
  onNext,
  onBack,
}: {
  onNext: () => Promise<void>;
  onBack: () => void;
}) {
  const { state, updateField } = useApplication();
  const { form, loading } = state;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const names = files.map((f) => f.name);
    updateField("inspirationFiles", names);
    if (names.length > 0) {
      posthog.capture("inspiration_image_uploaded", { file_count: names.length });
    }
  }

  return (
    <div className="flex flex-col gap-6 px-6 py-4">
      <div>
        <h2 className="font-heading text-3xl text-[#F5EFE0] mb-1">
          Share examples you like
        </h2>
        <p className="text-[#9A8B7A] text-sm">
          All optional — but the more you share, the better we can tailor your design.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="referenceLinks">Website links you admire</Label>
          <Textarea
            id="referenceLinks"
            placeholder="Paste website URLs, one per line..."
            value={form.referenceLinks}
            onChange={(e) => updateField("referenceLinks", e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="styleNotes">Style notes or preferences</Label>
          <Textarea
            id="styleNotes"
            placeholder="e.g. Clean and minimal, dark colours, professional..."
            value={form.styleNotes}
            onChange={(e) => updateField("styleNotes", e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Inspiration images (optional)</Label>
          <label
            htmlFor="inspirationFiles"
            className="flex items-center gap-3 h-11 px-4 rounded-lg border border-[rgba(201,168,124,0.2)] bg-[rgba(17,21,32,0.8)] text-[#9A8B7A] text-sm cursor-pointer hover:border-[rgba(201,168,124,0.4)] transition-colors"
          >
            <ImagePlus className="size-4 text-[#C9A87C]" />
            {form.inspirationFiles.length > 0
              ? `${form.inspirationFiles.length} file${form.inspirationFiles.length > 1 ? "s" : ""} selected`
              : "Upload screenshots or images"}
          </label>
          <input
            id="inspirationFiles"
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={handleFileChange}
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
          disabled={loading}
          className="btn-champagne flex-1 h-12 rounded-xl flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

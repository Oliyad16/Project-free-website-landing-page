import { SectionLabel } from "@/components/shared/SectionLabel";
import { X, Check } from "lucide-react";

const ROWS = [
  {
    label: "Build quality",
    generic: "Auto-generated from templates",
    livingstone: "Human-supervised, tailored to your business",
  },
  {
    label: "Strategic design",
    generic: "Generic layout, no business context",
    livingstone: "Structured for conversions and trust",
  },
  {
    label: "Process",
    generic: "DIY, figure it out yourself",
    livingstone: "Guided from application to approval",
  },
  {
    label: "Support",
    generic: "Help docs and chat bots",
    livingstone: "Real people who know your site",
  },
];

export function WhyDifferentSection() {
  return (
    <section id="why-different" className="py-24 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-16">

        <div className="text-center flex flex-col items-center gap-4">
          <SectionLabel>Why we&apos;re different</SectionLabel>
          <h2 className="font-heading text-4xl md:text-5xl text-[#F5EFE0] font-semibold leading-tight">
            Not just AI-generated.
            <br />
            <span className="text-gradient-champagne">Supervised by real people.</span>
          </h2>
          <p className="text-[#9A8B7A] max-w-md text-base">
            Anyone can generate a generic site. We build something you can actually be proud of.
          </p>
        </div>

        {/* Comparison table */}
        <div className="w-full rounded-2xl border border-[rgba(201,168,124,0.12)] overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 bg-[#111520]">
            <div className="px-6 py-4 text-xs uppercase tracking-widest text-[#9A8B7A]" />
            <div className="px-6 py-4 text-xs uppercase tracking-widest text-[#9A8B7A] border-l border-[rgba(201,168,124,0.08)]">
              Generic AI Tools
            </div>
            <div className="px-6 py-4 text-xs uppercase tracking-widest text-[#C9A87C] border-l border-[rgba(201,168,124,0.08)]">
              Living Stone Solutions
            </div>
          </div>

          {/* Rows */}
          {ROWS.map(({ label, generic, livingstone }, idx) => (
            <div
              key={label}
              className={`grid grid-cols-3 border-t border-[rgba(201,168,124,0.08)] ${
                idx % 2 === 0 ? "bg-[rgba(17,21,32,0.4)]" : "bg-transparent"
              }`}
            >
              <div className="px-6 py-5">
                <p className="text-[#F5EFE0] text-sm font-medium">{label}</p>
              </div>
              <div className="px-6 py-5 border-l border-[rgba(201,168,124,0.08)] flex items-start gap-3">
                <X className="size-4 text-[#e05252] flex-shrink-0 mt-0.5" />
                <p className="text-[#9A8B7A] text-sm">{generic}</p>
              </div>
              <div className="px-6 py-5 border-l border-[rgba(201,168,124,0.08)] flex items-start gap-3 bg-[rgba(201,168,124,0.03)]">
                <Check className="size-4 text-[#4A6DB5] flex-shrink-0 mt-0.5" />
                <p className="text-[#F5EFE0] text-sm">{livingstone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

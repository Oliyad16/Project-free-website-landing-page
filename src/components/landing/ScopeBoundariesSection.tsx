import { SectionLabel } from "@/components/shared/SectionLabel";
import { X, ArrowRight } from "lucide-react";

const OUT_OF_SCOPE = [
  "Custom marketplaces or multi-vendor platforms",
  "Large eCommerce stores (100+ products)",
  "Mobile apps or native software",
  "Advanced custom backends or APIs",
];

export function ScopeBoundariesSection() {
  return (
    <section id="scope-boundaries" className="py-24 px-6">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-12">

        <div className="text-center flex flex-col items-center gap-4">
          <SectionLabel>Best fit</SectionLabel>
          <h2 className="font-heading text-4xl md:text-5xl text-[#F5EFE0] font-semibold leading-tight">
            Built for small business websites
          </h2>
          <p className="text-[#9A8B7A] max-w-md text-base">
            Our free build is purpose-designed for straightforward, professional websites.
            Some projects need a different approach.
          </p>
        </div>

        <div className="w-full glass-card rounded-2xl p-8 flex flex-col gap-6">
          <p className="text-[#9A8B7A] text-sm uppercase tracking-widest font-semibold">
            Not suited for
          </p>
          <div className="flex flex-col gap-3">
            {OUT_OF_SCOPE.map((item) => (
              <div key={item} className="flex items-center gap-4">
                <div className="size-5 rounded-full bg-[rgba(224,82,82,0.12)] border border-[rgba(224,82,82,0.2)] flex items-center justify-center flex-shrink-0">
                  <X className="size-3 text-[#e05252]" />
                </div>
                <p className="text-[#9A8B7A] text-sm">{item}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[rgba(201,168,124,0.1)]">
            <p className="text-[#F5EFE0] text-sm mb-4">
              Have a bigger or more complex project in mind?
            </p>
            <a
              href="#final-cta"
              data-track-event="custom_quote_cta_click"
              className="inline-flex items-center gap-2 text-[#C9A87C] text-sm font-medium hover:gap-3 transition-all"
            >
              Request a custom quote <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

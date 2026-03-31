import { SectionLabel } from "@/components/shared/SectionLabel";
import { ClipboardList, Layers, TrendingUp } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Tell us about your business",
    desc: "Fill out a short application. Share your goal, style preferences, and any reference sites you like. Takes less than 5 minutes.",
  },
  {
    number: "02",
    icon: Layers,
    title: "We build your website",
    desc: "Our team — with human supervision at every step — builds your tailored website. You review and approve before it goes live.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Upgrade when you&apos;re ready to grow",
    desc: "Your site is yours from day one. When you want hosting, SEO tools, or ongoing support, upgrade to a plan that fits.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-16">

        <div className="text-center flex flex-col items-center gap-4">
          <SectionLabel>3 simple steps</SectionLabel>
          <h2 className="font-heading text-4xl md:text-5xl text-[#F5EFE0] font-semibold leading-tight">
            From application to live site
          </h2>
          <p className="text-[#9A8B7A] max-w-md text-base">
            We&apos;ve designed this to be effortless on your end.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 w-full relative">
          {/* Connecting line desktop */}
          <div
            aria-hidden
            className="hidden md:block absolute top-10 left-1/4 right-1/4 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,124,0.3), transparent)" }}
          />

          {STEPS.map(({ number, icon: Icon, title, desc }) => (
            <div
              key={number}
              className="glass-card rounded-2xl p-7 flex flex-col gap-5 relative"
            >
              <div className="flex items-start justify-between">
                <div className="size-12 rounded-xl bg-[rgba(201,168,124,0.08)] border border-[rgba(201,168,124,0.15)] flex items-center justify-center">
                  <Icon className="size-5 text-[#C9A87C]" />
                </div>
                <span className="font-mono text-5xl font-bold text-[rgba(201,168,124,0.1)] leading-none select-none">
                  {number}
                </span>
              </div>
              <div>
                <h3
                  className="font-heading text-xl text-[#F5EFE0] font-semibold mb-2"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
                <p
                  className="text-[#9A8B7A] text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: desc }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

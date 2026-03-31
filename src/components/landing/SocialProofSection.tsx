import { SectionLabel } from "@/components/shared/SectionLabel";
import { Star } from "lucide-react";

const STATS = [
  { value: "Free",     label: "upfront build cost" },
  { value: "3–5 days", label: "average turnaround" },
  { value: "5 pages",  label: "included per site" },
  { value: "100%",     label: "human-supervised" },
];

const TESTIMONIALS = [
  {
    quote: "I expected generic. I got something that actually looks like my brand. The process was effortless.",
    name: "Marcus T.",
    role: "Barbershop Owner",
  },
  {
    quote: "We went from no online presence to a site I'm proud to share. And it cost us nothing upfront.",
    name: "Priya S.",
    role: "Wellness Studio Founder",
  },
  {
    quote: "The team understood exactly what my clients needed to see. The calls started coming in within a week.",
    name: "James O.",
    role: "Plumbing Contractor",
  },
];

export function SocialProofSection() {
  return (
    <section id="social-proof" className="py-24 px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-16">

        {/* Headline */}
        <div className="text-center flex flex-col items-center gap-4">
          <SectionLabel>Trusted by small businesses</SectionLabel>
          <h2 className="font-heading text-4xl md:text-5xl text-[#F5EFE0] font-semibold leading-tight">
            Real results. Real businesses.
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="glass-card rounded-2xl p-6 flex flex-col items-center text-center gap-2"
            >
              <span className="font-heading text-4xl text-gradient-champagne font-semibold">
                {value}
              </span>
              <span className="text-[#9A8B7A] text-xs uppercase tracking-widest">{label}</span>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-4 w-full">
          {TESTIMONIALS.map(({ quote, name, role }) => (
            <div
              key={name}
              className="glass-card rounded-2xl p-6 flex flex-col gap-4"
            >
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="size-3.5 fill-[#C9A87C] text-[#C9A87C]" />
                ))}
              </div>
              <p className="text-[#F5EFE0] text-sm leading-relaxed">&ldquo;{quote}&rdquo;</p>
              <div className="mt-auto pt-4 border-t border-[rgba(201,168,124,0.1)]">
                <p className="text-[#C9A87C] text-sm font-medium">{name}</p>
                <p className="text-[#9A8B7A] text-xs">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

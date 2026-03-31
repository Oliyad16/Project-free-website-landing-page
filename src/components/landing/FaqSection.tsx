import { SectionLabel } from "@/components/shared/SectionLabel";
import { ChevronRight } from "lucide-react";

const FAQS = [
  {
    q: "Why is the website free?",
    a: "We build your website at no charge as a way to demonstrate our quality and build a long-term relationship. If you need hosting, SEO tools, or ongoing updates, we offer affordable monthly plans. The build is our investment in showing you what we can do.",
  },
  {
    q: "Is this really built by people — not just AI?",
    a: "Every site goes through human supervision. We use tools to accelerate the build, but a real person reviews the structure, copy, and design before it reaches you. It&apos;s not a one-click output.",
  },
  {
    q: "What exactly is included in the free website?",
    a: "Up to 5 pages (typically Home, About, Services, Contact, and one more of your choice), a mobile-friendly design, a contact form, clean on-page SEO structure, and fast-loading code.",
  },
  {
    q: "How long does it take?",
    a: "Most websites are delivered within 3–5 business days from when we receive all your information. Complex projects may take a little longer.",
  },
  {
    q: "Who is this for?",
    a: "Small businesses, local service providers, freelancers, and founders who need a professional online presence without spending thousands upfront. If you have a straightforward website need, this is built for you.",
  },
  {
    q: "What if I need more than the free scope?",
    a: "If your project requires more pages, custom features, or advanced functionality, we&apos;ll put together a custom quote for you. You can request that directly through the application.",
  },
  {
    q: "Do I have to subscribe to a plan?",
    a: "No. You can receive your free website and choose not to subscribe. If you want us to host it, we offer plans starting at $29/month. You can also host it yourself elsewhere.",
  },
  {
    q: "Can I request changes after delivery?",
    a: "Yes. We offer a round of revisions after delivery. Ongoing updates and monthly content changes are available on our Growth and Pro plans.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-16">

        <div className="text-center flex flex-col items-center gap-4">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="font-heading text-4xl md:text-5xl text-[#F5EFE0] font-semibold leading-tight">
            Common questions
          </h2>
        </div>

        <div className="w-full flex flex-col gap-2">
          {FAQS.map(({ q, a }) => (
            <details
              key={q}
              className="group glass-card rounded-xl overflow-hidden"
              data-track-event="faq_opened"
              data-track-label={q}
            >
              <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none text-[#F5EFE0] text-sm font-medium hover:text-[#C9A87C] transition-colors">
                {q}
                <ChevronRight className="size-4 text-[#9A8B7A] flex-shrink-0 transition-transform duration-200 group-open:rotate-90" />
              </summary>
              <div className="px-6 pb-5 text-[#9A8B7A] text-sm leading-relaxed border-t border-[rgba(201,168,124,0.08)] pt-4"
                dangerouslySetInnerHTML={{ __html: a }}
              />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

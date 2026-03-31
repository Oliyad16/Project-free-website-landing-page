"use client";

import Image from "next/image";
import { Carousel } from "@/components/ui/carousel";

const PORTFOLIO_SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    alt: "Modern restaurant website",
    label: "Restaurant & Dining",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    alt: "Professional services website",
    label: "Professional Services",
  },
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    alt: "Local business website",
    label: "Local Business",
  },
  {
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    alt: "Retail shop website",
    label: "Retail & E-commerce",
  },
  {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
    alt: "Consulting firm website",
    label: "Consulting & Coaching",
  },
];

function SlideCard({
  src,
  alt,
  label,
}: {
  src: string;
  alt: string;
  label: string;
}) {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-[rgba(201,168,124,0.18)] bg-[#111520] shadow-[0_4px_32px_rgba(0,0,0,0.5)] group">
      {/* Browser chrome bar */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0d1019] border-b border-[rgba(201,168,124,0.1)]">
        <span className="size-2.5 rounded-full bg-[rgba(201,168,124,0.25)]" />
        <span className="size-2.5 rounded-full bg-[rgba(201,168,124,0.15)]" />
        <span className="size-2.5 rounded-full bg-[rgba(201,168,124,0.1)]" />
        <div className="ml-3 flex-1 h-5 rounded-md bg-[rgba(201,168,124,0.06)] border border-[rgba(201,168,124,0.08)]" />
      </div>

      {/* Screenshot */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 80vw, 576px"
        />
        {/* Overlay shimmer */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,11,16,0.55)] via-transparent to-transparent" />
      </div>

      {/* Label */}
      <div className="absolute bottom-3 left-4">
        <span className="text-xs font-medium text-[#C9A87C] bg-[rgba(10,11,16,0.75)] backdrop-blur-sm border border-[rgba(201,168,124,0.2)] rounded-full px-3 py-1">
          {label}
        </span>
      </div>
    </div>
  );
}

export function HeroCarousel() {
  const slides = PORTFOLIO_SLIDES.map((slide) => (
    <SlideCard key={slide.src} {...slide} />
  ));

  return (
    <Carousel
      slides={slides}
      options={{ loop: true, align: "center" }}
    />
  );
}

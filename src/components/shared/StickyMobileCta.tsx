"use client";

import { useApplication } from "@/components/application/ApplicationContext";

export function StickyMobileCta() {
  const { state, open } = useApplication();

  if (state.isOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden px-4 pb-4 pt-3 bg-gradient-to-t from-[#0a0b10] to-transparent">
      <button
        onClick={() => open()}
        data-track-event="sticky_cta_click"
        className="w-full h-14 rounded-2xl btn-champagne flex items-center justify-center text-base font-semibold shadow-lg"
      >
        Apply for Your Free Website
      </button>
    </div>
  );
}

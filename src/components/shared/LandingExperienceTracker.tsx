"use client";

import { useEffect, useRef } from "react";
import posthog from "posthog-js";

const SCROLL_MILESTONES = [25, 50, 75, 100];

const SECTION_EVENTS: Array<{ id: string; event: string }> = [
  { id: "social-proof",     event: "social_proof_view" },
  { id: "how-it-works",     event: "how_it_works_view" },
  { id: "whats-included",   event: "whats_included_view" },
  { id: "scope-boundaries", event: "scope_boundaries_view" },
  { id: "why-different",    event: "why_different_view" },
  { id: "pricing",          event: "pricing_view" },
  { id: "faq",              event: "faq_view" },
  { id: "final-cta",        event: "final_cta_view" },
];

export function LandingExperienceTracker() {
  const firedScrollRef = useRef<Set<number>>(new Set());
  const firedSectionsRef = useRef<Set<string>>(new Set());

  // Persist visitor session to DB on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        utmSource: params.get("utm_source") ?? undefined,
        utmMedium: params.get("utm_medium") ?? undefined,
        utmCampaign: params.get("utm_campaign") ?? undefined,
        referrer: document.referrer || undefined,
      }),
    }).catch(() => {});
  }, []);

  // Scroll depth tracking
  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.round((scrollTop / docHeight) * 100);

      for (const milestone of SCROLL_MILESTONES) {
        if (pct >= milestone && !firedScrollRef.current.has(milestone)) {
          firedScrollRef.current.add(milestone);
          posthog.capture(`scroll_${milestone}`);
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section visibility tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const eventName = (entry.target as HTMLElement).dataset.trackSection;
            if (eventName && !firedSectionsRef.current.has(eventName)) {
              firedSectionsRef.current.add(eventName);
              posthog.capture(eventName);
            }
          }
        }
      },
      { threshold: 0.3 }
    );

    for (const { id, event } of SECTION_EVENTS) {
      const el = document.getElementById(id);
      if (el) {
        el.dataset.trackSection = event;
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, []);

  // Delegated click tracking via data-track-event
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("[data-track-event]") as HTMLElement | null;
      if (!target) return;
      const eventName = target.dataset.trackEvent;
      const label = target.dataset.trackLabel;
      if (eventName) {
        posthog.capture(eventName, label ? { label } : undefined);
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // FAQ toggle tracking
  useEffect(() => {
    function onToggle(e: Event) {
      const target = e.target as HTMLDetailsElement;
      if (target.tagName !== "DETAILS") return;
      const eventName = target.dataset.trackEvent;
      const label = target.dataset.trackLabel;
      if (eventName && target.open) {
        posthog.capture(eventName, label ? { question: label } : undefined);
      }
    }

    document.addEventListener("toggle", onToggle, true);
    return () => document.removeEventListener("toggle", onToggle, true);
  }, []);

  return null;
}

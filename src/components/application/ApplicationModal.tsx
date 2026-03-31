"use client";

import { useEffect, useRef } from "react";
import posthog from "posthog-js";
import { useApplication } from "@/components/application/ApplicationContext";
import { ProgressBar } from "@/components/application/ProgressBar";
import { Step1BusinessBasics } from "@/components/application/steps/Step1BusinessBasics";
import { Step2WebsiteGoal } from "@/components/application/steps/Step2WebsiteGoal";
import { Step3StyleReferences } from "@/components/application/steps/Step3StyleReferences";
import { Step4ScopeCheck } from "@/components/application/steps/Step4ScopeCheck";
import { Step5ContactDetails } from "@/components/application/steps/Step5ContactDetails";
import { Step6Confirmation } from "@/components/application/steps/Step6Confirmation";
import { X } from "lucide-react";

const TOTAL_STEPS = 6;

export function ApplicationModal() {
  const { state, close, nextStep, prevStep, setLeadId, setSubmitted, setLoading } = useApplication();
  const { isOpen, step, leadId, submitted } = state;
  const latestStepRef = useRef(step);

  useEffect(() => {
    latestStepRef.current = step;
  }, [step]);

  // Start a new lead when modal opens
  useEffect(() => {
    if (!isOpen || state.leadId) return;

    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "start" }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.leadId) {
          setLeadId(data.leadId);
          posthog.capture("application_started", { leadId: data.leadId });
        }
      })
      .catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Abandon tracking on unmount / close
  useEffect(() => {
    return () => {
      if (submitted || !leadId) return;
      const payload = JSON.stringify({
        action: "abandon",
        leadId,
        step: latestStepRef.current,
      });
      navigator.sendBeacon(
        "/api/leads",
        new Blob([payload], { type: "application/json" })
      );
      posthog.capture("application_abandoned", { leadId, step: latestStepRef.current });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leadId, submitted]);

  // Post a step save
  async function saveStep(stepNum: number, data: Record<string, unknown> = {}) {
    if (!leadId) return;
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "step", leadId, step: stepNum, data }),
    });
    posthog.capture(`application_step_${stepNum}_completed`, { leadId, step: stepNum });
  }

  // Submit the application
  async function handleSubmit() {
    if (!leadId) return;
    setLoading(true);
    try {
      const { form } = state;
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "submit",
          leadId,
          data: {
            contactName: form.contactName,
            contactEmail: form.contactEmail,
            contactPhone: form.contactPhone,
          },
        }),
      });
      posthog.capture("application_submitted", { leadId });
      setSubmitted();
    } finally {
      setLoading(false);
    }
  }

  // Step-specific next handlers
  async function handleStep1Next() {
    await saveStep(1, { businessName: state.form.businessName, businessType: state.form.businessType });
    nextStep();
  }
  async function handleStep2Next() {
    await saveStep(2, { websiteGoal: state.form.websiteGoal });
    nextStep();
  }
  async function handleStep3Next() {
    await saveStep(3, {
      referenceLinks: state.form.referenceLinks,
      styleNotes: state.form.styleNotes,
      inspirationFiles: state.form.inspirationFiles,
    });
    nextStep();
  }
  async function handleStep4Next() {
    await saveStep(4, { scopeChoice: state.form.scopeChoice, planInterest: state.form.planInterest });
    nextStep();
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Apply for your free website"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => !submitted && close()}
      />

      {/* Panel */}
      <div className="relative w-full max-w-lg bg-[#111520] rounded-2xl shadow-2xl border border-[rgba(201,168,124,0.12)] overflow-hidden animate-rise-fade">
        {/* Close button */}
        {!submitted && (
          <button
            onClick={close}
            className="absolute top-4 right-4 z-10 size-8 rounded-lg flex items-center justify-center text-[#9A8B7A] hover:text-[#F5EFE0] hover:bg-[rgba(255,255,255,0.06)] transition-colors"
          >
            <X className="size-4" />
          </button>
        )}

        {/* Progress bar (steps 1–5 only) */}
        {step <= 5 && !submitted && (
          <ProgressBar step={step} totalSteps={TOTAL_STEPS - 1} />
        )}

        {/* Step content */}
        <div className="pb-6">
          {step === 1 && <Step1BusinessBasics onNext={handleStep1Next} />}
          {step === 2 && <Step2WebsiteGoal onNext={handleStep2Next} onBack={prevStep} />}
          {step === 3 && <Step3StyleReferences onNext={handleStep3Next} onBack={prevStep} />}
          {step === 4 && <Step4ScopeCheck onNext={handleStep4Next} onBack={prevStep} />}
          {step === 5 && <Step5ContactDetails onSubmit={handleSubmit} onBack={prevStep} />}
          {(step === 6 || submitted) && <Step6Confirmation onClose={close} />}
        </div>
      </div>
    </div>
  );
}

// Lightweight trigger button used inside server components
export function ApplicationModalTrigger({
  children,
  defaultPlan,
  className,
  trackEvent,
}: {
  children: React.ReactNode;
  defaultPlan?: string;
  className?: string;
  trackEvent?: string;
}) {
  const { open } = useApplication();
  return (
    <button
      onClick={() => open(defaultPlan)}
      className={className}
      data-track-event={trackEvent}
    >
      {children}
    </button>
  );
}

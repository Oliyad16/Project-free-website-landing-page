import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leads, eventLog } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getRefCode, getSessionId } from "@/lib/tracking";
import { captureServerEvent } from "@/lib/posthog";

function normalizeLeadData(data?: Record<string, unknown>) {
  const known: Record<string, unknown> = {};
  const metadata: Record<string, unknown> = {};

  if (!data) return { known, metadata };

  if (typeof data.businessName === "string") known.businessName = data.businessName.trim();
  if (typeof data.businessType === "string") known.businessType = data.businessType.trim();
  if (typeof data.websiteGoal === "string") known.websiteGoal = data.websiteGoal.trim();
  if (typeof data.scopeChoice === "string") known.scopeChoice = data.scopeChoice;
  if (typeof data.contactName === "string") known.contactName = data.contactName.trim();
  if (typeof data.contactEmail === "string") known.contactEmail = data.contactEmail.trim();
  if (typeof data.contactPhone === "string") known.contactPhone = data.contactPhone.trim();
  if (
    typeof data.planInterest === "string" &&
    ["starter", "growth", "pro"].includes(data.planInterest)
  ) {
    known.planInterest = data.planInterest as "starter" | "growth" | "pro";
  }

  for (const [key, value] of Object.entries(data)) {
    if ([
      "businessName", "businessType", "websiteGoal", "scopeChoice",
      "contactName", "contactEmail", "contactPhone", "planInterest",
    ].includes(key)) continue;
    metadata[key] = value;
  }

  return { known, metadata };
}

async function getMergedMetadata(leadId: string, metadata: Record<string, unknown>) {
  if (Object.keys(metadata).length === 0) return undefined;

  const existingLead = await db.query.leads.findFirst({
    where: eq(leads.id, leadId),
    columns: { formData: true },
  });

  const current =
    existingLead?.formData &&
    typeof existingLead.formData === "object" &&
    !Array.isArray(existingLead.formData)
      ? (existingLead.formData as Record<string, unknown>)
      : {};

  return { ...current, ...metadata };
}

// POST /api/leads
export async function POST(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie");
  const sessionId = getSessionId(cookieHeader) ?? undefined;
  const affiliateCode = getRefCode(cookieHeader) ?? undefined;

  let body: {
    action: "start" | "step" | "submit" | "abandon";
    leadId?: string;
    step?: number;
    data?: Record<string, unknown>;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const { action, leadId, step, data } = body;

  try {
    // ── start ──────────────────────────────────────────────────────────────
    if (action === "start") {
      const [newLead] = await db
        .insert(leads)
        .values({
          sessionId: sessionId ?? undefined,
          affiliateCode,
          status: "draft",
          currentStep: 1,
          lastCompletedStep: 0,
        })
        .returning({ id: leads.id });

      await db.insert(eventLog).values({
        eventName: "application_started",
        sessionId: sessionId ?? undefined,
        leadId: newLead.id,
        affiliateCode,
        step: 1,
      });

      await captureServerEvent(sessionId ?? newLead.id, "application_started", {
        leadId: newLead.id,
        affiliateCode,
      });

      return NextResponse.json({ leadId: newLead.id });
    }

    if (!leadId) {
      return NextResponse.json({ error: "leadId required" }, { status: 400 });
    }

    // ── step ───────────────────────────────────────────────────────────────
    if (action === "step" && step != null) {
      const { known, metadata } = normalizeLeadData(data);
      const mergedMeta = await getMergedMetadata(leadId, metadata);

      await db
        .update(leads)
        .set({
          ...known,
          currentStep: step + 1,
          lastCompletedStep: step,
          ...(mergedMeta ? { formData: mergedMeta } : {}),
          updatedAt: new Date(),
        })
        .where(eq(leads.id, leadId));

      const eventName = `application_step_${step}_completed`;

      await db.insert(eventLog).values({
        eventName,
        sessionId: sessionId ?? undefined,
        leadId,
        affiliateCode,
        step,
        metadata: { ...known, ...metadata },
      });

      await captureServerEvent(sessionId ?? leadId, eventName, {
        leadId,
        step,
        affiliateCode,
      });

      return NextResponse.json({ ok: true });
    }

    // ── submit ─────────────────────────────────────────────────────────────
    if (action === "submit") {
      const { known, metadata } = normalizeLeadData(data);
      const mergedMeta = await getMergedMetadata(leadId, metadata);

      await db
        .update(leads)
        .set({
          ...known,
          status: "submitted",
          submittedAt: new Date(),
          lastCompletedStep: 5,
          ...(mergedMeta ? { formData: mergedMeta } : {}),
          updatedAt: new Date(),
        })
        .where(eq(leads.id, leadId));

      await db.insert(eventLog).values({
        eventName: "application_submitted",
        sessionId: sessionId ?? undefined,
        leadId,
        affiliateCode,
        step: 5,
      });

      await captureServerEvent(sessionId ?? leadId, "application_submitted", {
        leadId,
        affiliateCode,
      });

      return NextResponse.json({ ok: true });
    }

    // ── abandon ────────────────────────────────────────────────────────────
    if (action === "abandon") {
      await db
        .update(leads)
        .set({
          status: "abandoned",
          abandonedAt: new Date(),
          ...(step != null ? { currentStep: step } : {}),
          updatedAt: new Date(),
        })
        .where(eq(leads.id, leadId));

      await db.insert(eventLog).values({
        eventName: "application_abandoned",
        sessionId: sessionId ?? undefined,
        leadId,
        affiliateCode,
        step: step ?? undefined,
      });

      await captureServerEvent(sessionId ?? leadId, "application_abandoned", {
        leadId,
        step,
        affiliateCode,
      });

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "unknown action" }, { status: 400 });
  } catch (err) {
    console.error("[leads] error:", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}

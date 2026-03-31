import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { eventLog } from "@/lib/db/schema";
import { getRefCode, getSessionId, getDeviceType } from "@/lib/tracking";
import { captureServerEvent } from "@/lib/posthog";

export async function POST(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie");
  const sessionId = getSessionId(cookieHeader) ?? undefined;
  const affiliateCode = getRefCode(cookieHeader) ?? undefined;
  const userAgent = request.headers.get("user-agent") ?? "";
  const deviceType = getDeviceType(userAgent);

  let body: {
    eventName: string;
    leadId?: string;
    step?: number;
    metadata?: Record<string, unknown>;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const { eventName, leadId, step, metadata } = body;

  if (!eventName) {
    return NextResponse.json({ error: "eventName required" }, { status: 400 });
  }

  try {
    await db.insert(eventLog).values({
      eventName,
      sessionId: sessionId ?? undefined,
      leadId: leadId ?? undefined,
      affiliateCode,
      step: step ?? undefined,
      deviceType,
      metadata: metadata ?? undefined,
    });

    await captureServerEvent(sessionId ?? "anonymous", eventName, {
      leadId,
      affiliateCode,
      step,
      deviceType,
      ...metadata,
    });
  } catch (err) {
    console.error("[events] error:", err);
  }

  return NextResponse.json({ ok: true });
}

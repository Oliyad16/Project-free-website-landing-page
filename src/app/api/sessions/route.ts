import { NextRequest, NextResponse } from "next/server";
import { getRefCode, getSessionId, getDeviceType } from "@/lib/tracking";
import { ensureVisitorSession } from "@/lib/session";
import { captureServerEvent } from "@/lib/posthog";

export async function POST(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie");
  const sessionId = getSessionId(cookieHeader);
  const affiliateCode = getRefCode(cookieHeader) ?? undefined;
  const userAgent = request.headers.get("user-agent") ?? "";
  const deviceType = getDeviceType(userAgent);

  if (!sessionId) {
    return NextResponse.json({ ok: false, error: "no session" }, { status: 400 });
  }

  let body: Record<string, string> = {};
  try {
    body = await request.json();
  } catch {
    // body is optional
  }

  try {
    await ensureVisitorSession({
      sessionId,
      affiliateCode,
      utmSource: body.utmSource,
      utmMedium: body.utmMedium,
      utmCampaign: body.utmCampaign,
      deviceType,
      referrer: body.referrer,
    });

    await captureServerEvent(sessionId, "landing_page_view", {
      affiliateCode,
      deviceType,
      utmSource: body.utmSource,
      utmMedium: body.utmMedium,
      utmCampaign: body.utmCampaign,
      referrer: body.referrer,
    });
  } catch (err) {
    console.error("[sessions] error:", err);
  }

  return NextResponse.json({ ok: true });
}

import { db } from "@/lib/db";
import { visitorSessions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/**
 * Upsert a visitor_sessions row for the given cookie session ID.
 * Call this on first meaningful interaction (page load, ref click, lead start).
 * Returns the session UUID to use as FK on leads/events.
 */
export async function ensureVisitorSession(opts: {
  sessionId: string;
  affiliateCode?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  deviceType?: string;
  referrer?: string;
}): Promise<string> {
  const existing = await db.query.visitorSessions.findFirst({
    where: eq(visitorSessions.id, opts.sessionId),
    columns: { id: true },
  });

  if (existing) {
    await db
      .update(visitorSessions)
      .set({ lastSeenAt: new Date() })
      .where(eq(visitorSessions.id, opts.sessionId));
    return opts.sessionId;
  }

  await db
    .insert(visitorSessions)
    .values({
      id: opts.sessionId,
      affiliateCode: opts.affiliateCode,
      utmSource: opts.utmSource,
      utmMedium: opts.utmMedium,
      utmCampaign: opts.utmCampaign,
      deviceType: opts.deviceType,
      referrer: opts.referrer,
    })
    .onConflictDoNothing();

  return opts.sessionId;
}

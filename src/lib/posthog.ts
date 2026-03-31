// Server-side PostHog — lazily initialized to avoid build-time errors

let posthogServer: import("posthog-node").PostHog | null = null;

async function getPostHogServer() {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return null;
  if (!posthogServer) {
    const { PostHog } = await import("posthog-node");
    posthogServer = new PostHog(key, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
      flushAt: 20,
      flushInterval: 10000,
    });
  }
  return posthogServer;
}

/**
 * Capture a server-side event to PostHog.
 * distinctId should be userId if known, or sessionId for anonymous.
 */
export async function captureServerEvent(
  distinctId: string,
  event: string,
  properties?: Record<string, unknown>
) {
  const ph = await getPostHogServer();
  if (!ph) return;
  ph.capture({ distinctId, event, properties });
}

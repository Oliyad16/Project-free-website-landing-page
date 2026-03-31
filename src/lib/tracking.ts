import crypto from "crypto";

const DAILY_SALT = process.env.IP_HASH_SALT ?? "default-salt-change-me";

/**
 * Hash an IP address using SHA-256 + daily rotating salt.
 * Safe to store: cannot be reversed to reveal original IP.
 */
export function hashIp(ip: string): string {
  const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  return crypto
    .createHash("sha256")
    .update(`${ip}:${date}:${DAILY_SALT}`)
    .digest("hex");
}

/**
 * Extract a visitor session ID from request cookies.
 */
export function getSessionId(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/la_sid=([^;]+)/);
  return match ? match[1] : null;
}

/**
 * Extract referral code from request cookies.
 */
export function getRefCode(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/la_ref=([^;]+)/);
  return match ? match[1] : null;
}

/**
 * Detect device type from User-Agent string.
 */
export function getDeviceType(userAgent: string): "mobile" | "tablet" | "desktop" {
  if (/Mobile|Android|iPhone/i.test(userAgent)) return "mobile";
  if (/iPad|Tablet/i.test(userAgent)) return "tablet";
  return "desktop";
}

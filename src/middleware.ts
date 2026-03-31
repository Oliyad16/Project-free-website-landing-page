import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "la_sid"; // visitor session id
const ATTR_COOKIE = "la_ref";   // affiliate attribution code (30-day)

export async function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const response = NextResponse.next();

  // ── Ensure visitor session ID exists ─────────────────────────────────────
  if (!request.cookies.get(SESSION_COOKIE)) {
    const sessionId = crypto.randomUUID();
    response.cookies.set(SESSION_COOKIE, sessionId, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 90, // 90 days
      path: "/",
    });
  }

  // ── Capture referral code from query param ────────────────────────────────
  const refCode = searchParams.get("ref");
  if (refCode && !request.cookies.get(ATTR_COOKIE)) {
    response.cookies.set(ATTR_COOKIE, refCode, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30-day attribution window
      path: "/",
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

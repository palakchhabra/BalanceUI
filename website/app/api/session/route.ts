import { NextRequest, NextResponse } from "next/server";
import { getSessionId, getUserEmail, setUserEmail } from "@/lib/cookies";
import { getSession, setSession } from "@/lib/kv";

/**
 * GET /api/session - Get current session data
 */
export async function GET(request: NextRequest) {
  try {
    const sessionId = await getSessionId();
    const email = await getUserEmail();
    const session = await getSession(sessionId);

    // Update last activity
    if (session) {
      await setSession(sessionId, {
        email: email || undefined,
        userAgent: request.headers.get("user-agent") || undefined,
      });
    } else {
      // Create new session
      await setSession(sessionId, {
        email: email || undefined,
        userAgent: request.headers.get("user-agent") || undefined,
      });
    }

    return NextResponse.json({
      sessionId,
      email: email || null,
      session: session || {
        sessionId,
        email,
        createdAt: Date.now(),
        lastActivity: Date.now(),
      },
    });
  } catch (error) {
    console.error("Error in GET /api/session:", error);
    return NextResponse.json(
      { error: "Failed to get session" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/session - Update session with email
 */
export async function POST(request: NextRequest) {
  try {
    const sessionId = await getSessionId();
    const body = await request.json();
    const { email } = body;

    if (email && typeof email === "string" && email.includes("@")) {
      await setUserEmail(email);
      await setSession(sessionId, {
        email,
        userAgent: request.headers.get("user-agent") || undefined,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in POST /api/session:", error);
    return NextResponse.json(
      { error: "Failed to update session" },
      { status: 500 }
    );
  }
}


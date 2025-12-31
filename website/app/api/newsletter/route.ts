import { NextRequest, NextResponse } from "next/server";
import { getSessionId, getUserEmail, setUserEmail } from "@/lib/cookies";
import { getSession, setSession } from "@/lib/kv";
import { storeMetric } from "@/lib/kv";

/**
 * POST /api/newsletter - Subscribe to newsletter
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    const sessionId = await getSessionId();
    
    // Store email in cookies and session
    await setUserEmail(email);
    await setSession(sessionId, {
      email,
      userAgent: request.headers.get("user-agent") || undefined,
    });

    // Track newsletter subscription metric
    await storeMetric({
      type: "custom",
      name: "newsletter_subscription",
      value: email,
      sessionId,
      email,
      userAgent: request.headers.get("user-agent") || undefined,
      page: request.headers.get("referer") || undefined,
      metadata: {
        source: "newsletter_form",
      },
    });

    return NextResponse.json({ 
      success: true,
      message: "Successfully subscribed to newsletter!" 
    });
  } catch (error) {
    console.error("Error in POST /api/newsletter:", error);
    return NextResponse.json(
      { error: "Failed to subscribe to newsletter" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/newsletter - Check subscription status
 */
export async function GET(request: NextRequest) {
  try {
    const sessionId = await getSessionId();
    const email = await getUserEmail();
    const session = await getSession(sessionId);

    return NextResponse.json({
      subscribed: !!email,
      email: email || null,
      sessionId,
    });
  } catch (error) {
    console.error("Error in GET /api/newsletter:", error);
    return NextResponse.json(
      { error: "Failed to check subscription status" },
      { status: 500 }
    );
  }
}


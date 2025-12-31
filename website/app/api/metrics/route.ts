import { NextRequest, NextResponse } from "next/server";
import { getSessionId, getUserEmail } from "@/lib/cookies";
import { storeMetric, getMetricsByDate, getMetricsByType, getMetricsBySession, getMetricsByUser, type MetricType } from "@/lib/kv";
import { isCookieAllowed } from "@/lib/cookies-client";

/**
 * POST /api/metrics - Track a metric event
 */
export async function POST(request: NextRequest) {
  try {

    const body = await request.json();
    const { type, name, value, metadata, page } = body;

    if (!type || !name) {
      return NextResponse.json(
        { error: "Type and name are required" },
        { status: 400 }
      );
    }

    const sessionId = await getSessionId();
    const email = await getUserEmail();
    const userAgent = request.headers.get("user-agent") || undefined;

    // Store metric
    await storeMetric({
      type: type as MetricType,
      name,
      value,
      metadata,
      sessionId,
      email: email || undefined,
      userAgent,
      page: page || request.headers.get("referer") || undefined,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in POST /api/metrics:", error);
    return NextResponse.json(
      { error: "Failed to track metric" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/metrics - Get metrics (with optional filters)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const type = searchParams.get("type") as MetricType | null;
    const sessionId = searchParams.get("sessionId");
    const email = searchParams.get("email");

    let metrics = [];

    if (email) {
      metrics = await getMetricsByUser(email);
    } else if (sessionId) {
      metrics = await getMetricsBySession(sessionId);
    } else if (type && date) {
      metrics = await getMetricsByType(type, date);
    } else if (date) {
      metrics = await getMetricsByDate(date);
    } else {
      // Default to today's date
      const today = new Date().toISOString().split("T")[0];
      metrics = await getMetricsByDate(today);
    }

    return NextResponse.json({ metrics });
  } catch (error) {
    console.error("Error in GET /api/metrics:", error);
    return NextResponse.json(
      { error: "Failed to get metrics" },
      { status: 500 }
    );
  }
}


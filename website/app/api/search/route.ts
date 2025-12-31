import { NextRequest, NextResponse } from "next/server";
import { getSessionId, getUserEmail } from "@/lib/cookies";
import { addSearchToHistory, getSearchHistory } from "@/lib/kv";

/**
 * POST /api/search - Track a search query
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, page } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    const sessionId = await getSessionId();
    const email = await getUserEmail();
    const identifier = email || sessionId;

    // Store in KV
    await addSearchToHistory(identifier, query, page);

    // Get updated history
    const history = await getSearchHistory(identifier);

    // Update cookie (for client-side access)
    if (typeof window === "undefined") {
      // Server-side: we'll let the client update the cookie
      return NextResponse.json({
        success: true,
        history: history.map((h) => h.query),
      });
    }

    return NextResponse.json({
      success: true,
      history: history.map((h) => h.query),
    });
  } catch (error) {
    console.error("Error in POST /api/search:", error);
    return NextResponse.json(
      { error: "Failed to track search" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/search - Get search history
 */
export async function GET(request: NextRequest) {
  try {
    const sessionId = await getSessionId();
    const email = await getUserEmail();
    const identifier = email || sessionId;

    const history = await getSearchHistory(identifier);

    return NextResponse.json({
      history: history.map((h) => ({
        query: h.query,
        timestamp: h.timestamp,
        page: h.page,
      })),
    });
  } catch (error) {
    console.error("Error in GET /api/search:", error);
    return NextResponse.json(
      { error: "Failed to get search history" },
      { status: 500 }
    );
  }
}


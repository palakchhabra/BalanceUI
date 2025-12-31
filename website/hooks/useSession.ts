"use client";

import { useState, useEffect } from "react";
import { isCookieAllowed } from "@/lib/cookies-client";

export interface SessionInfo {
  sessionId: string | null;
  email: string | null;
}

export function useSession() {
  const [session, setSession] = useState<SessionInfo>({
    sessionId: null,
    email: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      try {
        const response = await fetch("/api/session");
        const data = await response.json();
        setSession({
          sessionId: data.sessionId,
          email: data.email,
        });
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, []);

  const updateEmail = async (email: string) => {
    // Check if functional cookies are allowed (for storing user email)
    if (!isCookieAllowed("functional")) {
      console.log("Email storage disabled: functional cookies not allowed");
      return;
    }

    try {
      const response = await fetch("/api/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSession((prev) => ({ ...prev, email }));
      }
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  return {
    session,
    loading,
    updateEmail,
  };
}


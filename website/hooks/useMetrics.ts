"use client";

import { useCallback } from "react";
import { useSession } from "./useSession";
import { isCookieAllowed } from "@/lib/cookies-client";
import type { MetricType } from "@/lib/kv";

export interface TrackMetricOptions {
  type?: MetricType;
  name: string;
  value?: string | number;
  metadata?: Record<string, any>;
  page?: string;
}

/**
 * Hook for tracking metrics
 */
export function useMetrics() {
  const { session } = useSession();

  const track = useCallback(
    async (options: TrackMetricOptions) => {
      // Check if analytics cookies are allowed
      if (!isCookieAllowed("analytics")) {
        console.info("Analytics cookies not allowed, skipping metric tracking.");
        return;
      }

      try {
        const { type = "custom", name, value, metadata, page } = options;

        await fetch("/api/metrics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type,
            name,
            value,
            metadata: {
              ...metadata,
              sessionId: session?.sessionId,
              email: session?.email,
            },
            page: page || window.location.pathname,
          }),
        });
      } catch (error) {
        console.error("Error tracking metric:", error);
      }
    },
    [session]
  );

  const trackPageView = useCallback(
    (pageName?: string) => {
      return track({
        type: "page_view",
        name: "page_view",
        value: pageName || window.location.pathname,
        metadata: {
          url: window.location.href,
          referrer: document.referrer,
        },
      });
    },
    [track]
  );

  const trackComponentView = useCallback(
    (componentName: string, metadata?: Record<string, any>) => {
      return track({
        type: "component_view",
        name: `component_view:${componentName}`,
        metadata,
      });
    },
    [track]
  );

  const trackInteraction = useCallback(
    (componentName: string, action: string, metadata?: Record<string, any>) => {
      return track({
        type: "component_interaction",
        name: `interaction:${componentName}:${action}`,
        metadata,
      });
    },
    [track]
  );

  const trackButtonClick = useCallback(
    (buttonName: string, metadata?: Record<string, any>) => {
      return track({
        type: "button_click",
        name: `button_click:${buttonName}`,
        metadata,
      });
    },
    [track]
  );

  const trackLinkClick = useCallback(
    (linkUrl: string, linkText?: string) => {
      return track({
        type: "link_click",
        name: "link_click",
        value: linkUrl,
        metadata: {
          linkText,
        },
      });
    },
    [track]
  );

  const trackFormSubmit = useCallback(
    (formName: string, success: boolean, metadata?: Record<string, any>) => {
      return track({
        type: "form_submit",
        name: `form_submit:${formName}`,
        value: success ? 1 : 0,
        metadata: {
          success,
          ...metadata,
        },
      });
    },
    [track]
  );

  const trackError = useCallback(
    (errorName: string, errorMessage: string, metadata?: Record<string, any>) => {
      return track({
        type: "error",
        name: `error:${errorName}`,
        value: errorMessage,
        metadata,
      });
    },
    [track]
  );

  return {
    track,
    trackPageView,
    trackComponentView,
    trackInteraction,
    trackButtonClick,
    trackLinkClick,
    trackFormSubmit,
    trackError,
  };
}


"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useMetrics } from "@/hooks/useMetrics";

/**
 * Internal component that uses useSearchParams
 */
function MetricsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { trackPageView } = useMetrics();

  useEffect(() => {
    // Track page view on route change
    const page = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    trackPageView(page);
  }, [pathname, searchParams, trackPageView]);

  return null;
}

/**
 * Provider component that automatically tracks page views
 */
export function MetricsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <MetricsTracker />
      </Suspense>
      {children}
    </>
  );
}


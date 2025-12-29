import type { CSSProperties } from "react";

export const shimmerStyle: CSSProperties = {
  background:
    "linear-gradient(90deg, var(--bu-soft) 25%, var(--bu-border) 37%, var(--bu-soft) 63%)",
  backgroundSize: "400% 100%",
  animation: "bu-shimmer 1.2s ease infinite",
  borderRadius: "var(--bu-radius-sm)",
};

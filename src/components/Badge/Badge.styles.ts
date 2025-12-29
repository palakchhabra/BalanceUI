import type { CSSProperties } from "react";

export const badgeStyle = (variant: string): CSSProperties => ({
  display: "inline-flex",
  alignItems: "center",
  padding: "2px 8px",
  borderRadius: "var(--bu-radius-full)",
  fontSize: 12,
  fontWeight: 500,
  background:
    variant === "danger"
      ? "var(--bu-danger)"
      : variant === "soft"
      ? "var(--bu-soft)"
      : "var(--bu-primary)",
  color:
    variant === "soft"
      ? "var(--bu-fg)"
      : "white",
});

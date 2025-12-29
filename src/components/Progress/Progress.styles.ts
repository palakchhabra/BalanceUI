import type { CSSProperties } from "react";
import type { BalanceVariant } from "../../types/variant";

const VARIANT_COLOR: Record<BalanceVariant, string> = {
  solid: "var(--bu-primary)",
  soft: "var(--bu-soft)",
  ghost: "var(--bu-muted)",
  outline: "var(--bu-border)",
  bare: "var(--bu-border)",
  danger: "var(--bu-danger)",
};

export const containerStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  height: 6,
  borderRadius: 999,
  background: "var(--bu-border)",
  overflow: "hidden",
};

export const fillStyle = (
  percent: number,
  variant: BalanceVariant
): CSSProperties => ({
  position: "absolute",
  inset: 0,
  width: `${percent}%`,
  background: VARIANT_COLOR[variant],
  transition: "width 200ms ease",
});

export const shimmerStyle = (variant: BalanceVariant): CSSProperties => ({
  position: "absolute",
  inset: 0,
  background: `
    linear-gradient(
      90deg,
      transparent 0%,
      rgba(255,255,255,0.35) 50%,
      transparent 100%
    ),
    ${VARIANT_COLOR[variant]}
  `,
  backgroundSize: "200% 100%",
  animation: "bu-shimmer 1.2s infinite linear",
});

export const valueLabelStyle: CSSProperties = {
  marginTop: 6,
  fontSize: 12,
  fontWeight: 500,
  color: "var(--bu-fg)",
};

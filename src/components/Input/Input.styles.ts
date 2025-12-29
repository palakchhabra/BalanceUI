import type { CSSProperties } from "react";

export const inputStyle = (variant: string): CSSProperties => {
  const baseStyle: CSSProperties = {
    width: "100%",
    height: "var(--bu-control-height-md)",
    padding: "0 12px",
    fontSize: "var(--bu-font-size-md, 14px)",
    fontFamily: "var(--bu-font-family)",
    borderRadius: "var(--bu-radius-md)",
    outline: "none",
    transition: 
      "box-shadow var(--bu-transition-fast), " +
      "background-color var(--bu-transition-fast), " +
      "border-color var(--bu-transition-fast)",
    color: "var(--bu-fg)",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
  };

  if (variant === "solid") {
    return {
      ...baseStyle,
      background: "var(--bu-surface-variant, rgba(0, 0, 0, 0.05))",
      color: "var(--bu-fg)",
      border: "1px solid var(--bu-border)",
      boxShadow: "none",
    };
  } else if (variant === "soft") {
    return {
      ...baseStyle,
      background: "var(--bu-soft)",
      border: "1px solid transparent",
      boxShadow: "none",
    };
  } else {
    // outline (default)
    return {
      ...baseStyle,
      background: "var(--bu-surface)",
      border: "1px solid var(--bu-border)",
      boxShadow: "none",
    };
  }
};


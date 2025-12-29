import type { CSSProperties } from "react";

export const inputWrapperStyle = (fullWidth: boolean): CSSProperties => ({
  width: fullWidth ? "100%" : "auto",
  position: "relative",
});

export const labelStyle = (floating: boolean, hasError: boolean): CSSProperties => ({
  position: "absolute",
  left: "12px",
  top: floating ? "8px" : "50%",
  transform: floating ? "none" : "translateY(-50%)",
  fontSize: floating ? "var(--bu-font-size-xs, 11px)" : "var(--bu-font-size-md, 14px)",
  color: hasError ? "var(--bu-error, #d32f2f)" : "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
  pointerEvents: "none",
  transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
  backgroundColor: floating ? "var(--bu-surface, #ffffff)" : "transparent",
  padding: floating ? "0 4px" : "0",
  zIndex: 1,
  lineHeight: 1,
});

export const adornmentStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
  fontSize: "var(--bu-font-size-md, 14px)",
};

export const inputStyle = (
  variant: string,
  hasFloatingLabel: boolean = false,
  hasStartAdornment: boolean = false,
  hasEndAdornment: boolean = false
): CSSProperties => {
  const baseStyle: CSSProperties = {
    width: "100%",
    height: hasFloatingLabel ? "56px" : "var(--bu-control-height-md, 40px)",
    paddingTop: hasFloatingLabel ? "20px" : "0",
    paddingBottom: hasFloatingLabel ? "8px" : "0",
    paddingLeft: hasStartAdornment ? "8px" : "12px",
    paddingRight: hasEndAdornment ? "8px" : "12px",
    fontSize: "var(--bu-font-size-md, 14px)",
    fontFamily: "var(--bu-font-family)",
    borderRadius: "var(--bu-radius-md, 4px)",
    outline: "none",
    transition: 
      "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1), " +
      "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), " +
      "border-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
    color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    border: "1px solid var(--bu-border, rgba(0, 0, 0, 0.12))",
  };

  if (variant === "solid") {
    return {
      ...baseStyle,
      background: "var(--bu-surface-variant, rgba(0, 0, 0, 0.05))",
      border: "1px solid var(--bu-border, rgba(0, 0, 0, 0.12))",
      boxShadow: "none",
    };
  } else if (variant === "soft") {
    return {
      ...baseStyle,
      background: "var(--bu-soft, rgba(0, 0, 0, 0.04))",
      border: "1px solid transparent",
      boxShadow: "none",
    };
  } else {
    // outline (default) - Material Design standard
    return {
      ...baseStyle,
      background: "var(--bu-surface, #ffffff)",
      border: "1px solid var(--bu-border, rgba(0, 0, 0, 0.12))",
      boxShadow: "none",
    };
  }
};


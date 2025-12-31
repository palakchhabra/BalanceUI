import type { CSSProperties } from "react";

export const inputWrapperStyle = (fullWidth: boolean): CSSProperties => ({
  width: fullWidth ? "100%" : "auto",
  position: "relative",
});

export const labelStyle = (
  floating: boolean, 
  hasError: boolean, 
  variant?: string,
  hasStartAdornment?: boolean
): CSSProperties => {
  const isFilledOrStandard = variant === "filled" || variant === "standard";
  
  // Calculate left position to align with input text padding
  // Account for startAdornment width (40px) + padding (8px) = 48px
  let leftPosition: string;
  if (isFilledOrStandard) {
    // Filled and Standard: label starts after adornment if present
    leftPosition = hasStartAdornment ? "40px" : "0";
  } else {
    // Outlined: label aligns with input text padding
    leftPosition = hasStartAdornment ? "48px" : "12px";
  }
  
  return {
    position: "absolute",
    left: leftPosition,
    top: floating ? "0" : "50%",
    transform: floating ? "translateY(-50%)" : "translateY(-50%)",
    fontSize: floating ? "var(--bu-font-size-xs, 12px)" : "var(--bu-font-size-md, 16px)",
    color: hasError ? "var(--bu-error, #d32f2f)" : floating ? "var(--bu-primary, #1976d2)" : "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
    pointerEvents: "none",
    transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
    backgroundColor: floating && !isFilledOrStandard ? "var(--bu-surface, #ffffff)" : "transparent",
    padding: floating && !isFilledOrStandard ? "0 4px" : "0",
    zIndex: 3,
    lineHeight: 1,
    whiteSpace: "nowrap",
    maxWidth: isFilledOrStandard 
      ? hasStartAdornment 
        ? "calc(100% - 40px)" 
        : "100%"
      : hasStartAdornment 
        ? "calc(100% - 56px)" 
        : "calc(100% - 24px)",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
};

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
  hasEndAdornment: boolean = false,
  isNumberType: boolean = false
): CSSProperties => {
  const baseStyle: CSSProperties = {
    width: "100%",
    height: hasFloatingLabel ? "56px" : "var(--bu-control-height-md, 40px)",
    paddingTop: hasFloatingLabel ? "16px" : "0",
    paddingBottom: hasFloatingLabel ? "16px" : "0",
    paddingLeft: hasStartAdornment ? "48px" : "12px",
    paddingRight: hasEndAdornment ? "48px" : (isNumberType ? "32px" : "12px"),
    fontSize: "var(--bu-font-size-md, 16px)",
    fontFamily: "var(--bu-font-family)",
    outline: "none",
    transition: 
      "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1), " +
      "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), " +
      "border-color 150ms cubic-bezier(0.4, 0, 0.2, 1), " +
      "border-bottom-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
    color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
  };

  if (variant === "outlined") {
    // Outlined variant - border around input
    return {
      ...baseStyle,
      background: "var(--bu-surface, #ffffff)",
      border: "1px solid var(--bu-border, rgba(0, 0, 0, 0.23))",
      borderRadius: "var(--bu-radius-sm, 4px)",
      boxShadow: "none",
    };
  } else if (variant === "filled") {
    // Filled variant - filled background with border at bottom
    return {
      ...baseStyle,
      background: "var(--bu-surface-variant, rgba(0, 0, 0, 0.05))",
      border: "none",
      borderBottom: "1px solid var(--bu-border, rgba(0, 0, 0, 0.42))",
      borderRadius: "var(--bu-radius-sm, 4px) var(--bu-radius-sm, 4px) 0 0",
      boxShadow: "none",
      paddingLeft: hasStartAdornment ? "40px" : "12px",
      paddingRight: hasEndAdornment ? "40px" : (isNumberType ? "32px" : "12px"),
      paddingTop: hasFloatingLabel ? "20px" : "8px",
      paddingBottom: hasFloatingLabel ? "4px" : "8px",
    };
  } else {
    // Standard variant - no border, just underline
    return {
      ...baseStyle,
      background: "transparent",
      border: "none",
      borderBottom: "1px solid var(--bu-border, rgba(0, 0, 0, 0.42))",
      borderRadius: "0",
      boxShadow: "none",
      paddingLeft: hasStartAdornment ? "40px" : "0",
      paddingRight: hasEndAdornment ? "40px" : (isNumberType ? "32px" : "0"),
      paddingTop: hasFloatingLabel ? "20px" : "8px",
      paddingBottom: hasFloatingLabel ? "4px" : "8px",
    };
  }
};


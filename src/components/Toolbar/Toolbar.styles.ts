import { ToolbarVariant } from "./Toolbar.types";

export const toolbarStyle = (
  variant: ToolbarVariant,
  orientation: "horizontal" | "vertical"
) => {
  const flexDirection = orientation === "vertical" ? "column" : "row";
  return {
  display: "flex",
  flexDirection: flexDirection as "row" | "column",
  alignItems: "center",
  gap: "0.25rem",
  padding: "0.5rem",
  borderRadius: "var(--bu-radius-md, 0.375rem)",
  backgroundColor:
    variant === "solid"
      ? "var(--bu-surface-variant, rgba(0, 0, 0, 0.05))"
      : variant === "soft"
      ? "var(--bu-surface-variant, rgba(0, 0, 0, 0.02))"
      : "transparent",
  border:
    variant === "outline"
      ? "1px solid var(--bu-border, rgba(0, 0, 0, 0.23))"
      : "none",
} as React.CSSProperties;
};

export const toolbarItemStyle = (
  size: "sm" | "md" | "lg",
  active: boolean,
  disabled: boolean
) => {
  const sizeMap = {
    sm: { padding: "0.375rem 0.75rem", fontSize: "0.75rem", minHeight: "32px", minWidth: "32px" },
    md: { padding: "0.5rem 1rem", fontSize: "0.875rem", minHeight: "40px", minWidth: "40px" },
    lg: { padding: "0.75rem 1.25rem", fontSize: "1rem", minHeight: "48px", minWidth: "48px" },
  };

  return {
    ...sizeMap[size],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    border: "none",
    borderRadius: "var(--bu-radius-md, 0.375rem)",
    backgroundColor: active
      ? "var(--bu-primary-light, rgba(25, 118, 210, 0.1))"
      : "transparent",
    color: active
      ? "var(--bu-primary, #1976d2)"
      : "var(--bu-fg, #000)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
    fontFamily: "var(--bu-font-family, system-ui)",
    boxSizing: "border-box" as const,
    width: "auto",
  } as React.CSSProperties;
};

export const dividerStyle = (orientation: "horizontal" | "vertical") => ({
  width: orientation === "horizontal" ? "1px" : "100%",
  height: orientation === "horizontal" ? "1.5rem" : "1px",
  backgroundColor: "var(--bu-border, rgba(0, 0, 0, 0.23))",
  margin: orientation === "horizontal" ? "0 0.25rem" : "0.25rem 0",
} as React.CSSProperties);

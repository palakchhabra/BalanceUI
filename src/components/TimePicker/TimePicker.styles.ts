import { TimePickerVariant } from "./TimePicker.types";

export const timePickerStyle = (variant: TimePickerVariant) => ({
  width: "100%",
  padding: "0.5rem 0.75rem",
  fontSize: "0.875rem",
  fontFamily: "var(--bu-font-family, system-ui)",
  borderRadius: "var(--bu-radius-md, 0.375rem)",
  border: "1px solid",
  borderColor:
    variant === "outline"
      ? "var(--bu-border, rgba(0, 0, 0, 0.23))"
      : "transparent",
  backgroundColor:
    variant === "solid"
      ? "var(--bu-surface-variant, rgba(0, 0, 0, 0.05))"
      : variant === "soft"
      ? "var(--bu-surface-variant, rgba(0, 0, 0, 0.02))"
      : "transparent",
  color: "var(--bu-fg, #000)",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  outline: "none",
} as React.CSSProperties);

export const timePickerDropdownStyle = {
  position: "absolute" as const,
  top: "100%",
  left: 0,
  right: 0,
  marginTop: "0.25rem",
  zIndex: 1000,
  backgroundColor: "var(--bu-surface, #fff)",
  borderRadius: "var(--bu-radius-md, 0.375rem)",
  boxShadow:
    "0px 2px 8px rgba(0, 0, 0, 0.15), 0px 0px 1px rgba(0, 0, 0, 0.1)",
  padding: "0.5rem",
  minWidth: "200px",
  maxHeight: "300px",
  overflowY: "auto" as const,
} as React.CSSProperties;

export const timeListStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "0.25rem",
  width: "100%",
} as React.CSSProperties;

export const timeItemStyle = (isSelected: boolean) => ({
  padding: "0.5rem 0.75rem",
  borderRadius: "var(--bu-radius-md, 0.375rem)",
  cursor: "pointer",
  backgroundColor: isSelected
    ? "var(--bu-primary, #1976d2)"
    : "transparent",
  color: isSelected ? "#fff" : "var(--bu-fg, #000)",
  transition: "all 0.15s ease",
  fontSize: "0.875rem",
  width: "100%",
  boxSizing: "border-box" as const,
} as React.CSSProperties);

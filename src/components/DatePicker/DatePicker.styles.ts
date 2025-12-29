import { DatePickerVariant } from "./DatePicker.types";

export const datePickerStyle = (variant: DatePickerVariant) => ({
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
  "&:hover": {
    borderColor:
      variant === "outline"
        ? "var(--bu-primary, #1976d2)"
        : "var(--bu-border-hover, rgba(0, 0, 0, 0.4))",
  },
  "&:focus": {
    borderColor: "var(--bu-primary, #1976d2)",
    boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.1)",
  },
  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
} as React.CSSProperties);

export const calendarStyle = {
  position: "absolute" as const,
  top: "100%",
  left: 0,
  marginTop: "0.25rem",
  zIndex: 1000,
  backgroundColor: "var(--bu-surface, #fff)",
  borderRadius: "var(--bu-radius-md, 0.375rem)",
  boxShadow:
    "0px 2px 8px rgba(0, 0, 0, 0.15), 0px 0px 1px rgba(0, 0, 0, 0.1)",
  padding: "1rem",
  minWidth: "280px",
  maxWidth: "320px",
} as React.CSSProperties;

export const calendarHeaderStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "1rem",
} as React.CSSProperties;

export const calendarGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "0.25rem",
} as React.CSSProperties;

export const dayCellStyle = (isSelected: boolean, isToday: boolean, isDisabled: boolean) => ({
  padding: "0.5rem",
  textAlign: "center" as const,
  borderRadius: "var(--bu-radius-md, 0.375rem)",
  cursor: isDisabled ? "not-allowed" : "pointer",
  backgroundColor: isSelected
    ? "var(--bu-primary, #1976d2)"
    : isToday
    ? "var(--bu-surface-variant, rgba(0, 0, 0, 0.05))"
    : "transparent",
  color: isSelected
    ? "#fff"
    : isToday
    ? "var(--bu-primary, #1976d2)"
    : "var(--bu-fg, #000)",
  opacity: isDisabled ? 0.4 : 1,
  transition: "all 0.15s ease",
  "&:hover": !isDisabled && !isSelected
    ? {
        backgroundColor: "var(--bu-surface-variant, rgba(0, 0, 0, 0.05))",
      }
    : {},
} as React.CSSProperties);

export const rangeCellStyle = (inRange: boolean, isStart: boolean, isEnd: boolean) => ({
  backgroundColor: inRange ? "var(--bu-primary-light, rgba(25, 118, 210, 0.1))" : "transparent",
  borderRadius: isStart ? "var(--bu-radius-md, 0.375rem) 0 0 var(--bu-radius-md, 0.375rem)" : isEnd ? "0 var(--bu-radius-md, 0.375rem) var(--bu-radius-md, 0.375rem) 0" : "0",
} as React.CSSProperties);


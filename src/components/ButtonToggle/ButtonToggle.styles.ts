import { ButtonToggleVariant } from "./ButtonToggle.types";

export const buttonToggleGroupStyle = (fullWidth: boolean) => ({
  display: "inline-flex",
  width: fullWidth ? "100%" : "auto",
  gap: 0,
  borderRadius: "var(--bu-radius-md, 0.375rem)",
  overflow: "hidden",
  border: "1px solid",
  borderColor: "var(--bu-border, rgba(0, 0, 0, 0.23))",
} as React.CSSProperties);

export const buttonToggleItemStyle = (
  variant: ButtonToggleVariant,
  size: "sm" | "md" | "lg",
  isSelected: boolean,
  disabled: boolean,
  isFirst: boolean,
  isLast: boolean
) => {
  const sizeMap = {
    sm: { padding: "0.375rem 0.75rem", fontSize: "0.75rem" },
    md: { padding: "0.5rem 1rem", fontSize: "0.875rem" },
    lg: { padding: "0.75rem 1.5rem", fontSize: "1rem" },
  };

  const sizeConfig = sizeMap[size];

  return {
    ...sizeConfig,
    border: "none",
    borderRight: isLast ? "none" : "1px solid var(--bu-border, rgba(0, 0, 0, 0.23))",
    borderRadius: 0,
    backgroundColor: isSelected
      ? variant === "solid"
        ? "var(--bu-primary, #1976d2)"
        : variant === "soft"
        ? "var(--bu-primary-light, rgba(25, 118, 210, 0.1))"
        : "var(--bu-surface-variant, rgba(0, 0, 0, 0.05))"
      : "transparent",
    color: isSelected
      ? variant === "solid"
        ? "#fff"
        : "var(--bu-primary, #1976d2)"
      : "var(--bu-fg, #000)",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    opacity: disabled ? 0.5 : 1,
    fontFamily: "var(--bu-font-family, system-ui)",
    fontWeight: isSelected ? 500 : 400,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    flex: 1,
    outline: "none",
  } as React.CSSProperties;
};


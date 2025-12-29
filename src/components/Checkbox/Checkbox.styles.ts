import { CheckboxVariant, CheckboxProps } from "./Checkbox.types";

export const checkboxSizeMap = {
  sm: { size: "1rem", iconSize: "0.625rem" },
  md: { size: "1.25rem", iconSize: "0.75rem" },
  lg: { size: "1.5rem", iconSize: "0.875rem" },
};

export const checkboxStyle = (
  variant: CheckboxVariant,
  size: "sm" | "md" | "lg",
  checked: boolean,
  disabled: boolean,
  indeterminate: boolean
) => {
  const sizeConfig = checkboxSizeMap[size];
  const isActive = checked || indeterminate;

  return {
    width: sizeConfig.size,
    height: sizeConfig.size,
    borderRadius: "var(--bu-radius-sm, 0.25rem)",
    border: "2px solid",
    borderColor: isActive
      ? "var(--bu-primary, #1976d2)"
      : variant === "outline"
      ? "var(--bu-border, rgba(0, 0, 0, 0.23))"
      : "var(--bu-border, rgba(0, 0, 0, 0.23))",
    backgroundColor: isActive
      ? "var(--bu-primary, #1976d2)"
      : variant === "solid"
      ? "var(--bu-surface-variant, rgba(0, 0, 0, 0.05))"
      : variant === "soft"
      ? "var(--bu-surface-variant, rgba(0, 0, 0, 0.02))"
      : "transparent",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative" as const,
    opacity: disabled ? 0.5 : 1,
    flexShrink: 0,
  } as React.CSSProperties;
};

export const checkboxIconStyle = (size: "sm" | "md" | "lg") => {
  const sizeConfig = checkboxSizeMap[size];
  return {
    width: sizeConfig.iconSize,
    height: sizeConfig.iconSize,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties;
};


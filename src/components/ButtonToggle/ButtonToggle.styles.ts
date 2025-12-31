import { ButtonToggleVariant } from "./ButtonToggle.types";

export const buttonToggleGroupStyle = (fullWidth: boolean) => ({
  display: "inline-flex",
  width: fullWidth ? "100%" : "auto",
  gap: 0,
  borderRadius: "var(--bu-radius-md, 4px)",
  overflow: "hidden",
  border: "1px solid",
  borderColor: "var(--bu-border, rgba(0, 0, 0, 0.23))",
  background: "var(--bu-surface, #ffffff)",
  boxShadow: "none",
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
    sm: { padding: "6px 12px", fontSize: "0.75rem", minHeight: "32px" },
    md: { padding: "8px 16px", fontSize: "0.875rem", minHeight: "40px" },
    lg: { padding: "12px 24px", fontSize: "1rem", minHeight: "48px" },
  };

  const sizeConfig = sizeMap[size];

  // Material Design styling - each variant has distinct styling
  let backgroundColor: string;
  let color: string;
  let border: string | undefined;

  if (isSelected) {
    if (variant === "solid") {
      // Solid: Filled background with white text
      backgroundColor = "var(--bu-primary, #1976d2)";
      color = "var(--bu-on-primary, #ffffff)";
      border = undefined;
    } else if (variant === "soft") {
      // Soft: Light background with primary color text
      backgroundColor = "var(--bu-primary-light, rgba(25, 118, 210, 0.12))";
      color = "var(--bu-primary, #1976d2)";
      border = undefined;
    } else {
      // Outline: Transparent background with primary border and text
      backgroundColor = "transparent";
      color = "var(--bu-primary, #1976d2)";
      // For outline, we use a thicker border to make it stand out
      border = "2px solid var(--bu-primary, #1976d2)";
    }
  } else {
    // Unselected: All variants have transparent background
    backgroundColor = "transparent";
    color = "var(--bu-fg, rgba(0, 0, 0, 0.87))";
    border = undefined;
  }

  return {
    ...sizeConfig,
    border: border || "none",
    borderRadius: 0,
    backgroundColor,
    color,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1), border-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
    opacity: disabled ? 0.38 : 1,
    fontFamily: "var(--bu-font-family, 'Roboto', system-ui)",
    fontWeight: isSelected ? 500 : 400,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    flex: 1,
    outline: "none",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    minWidth: 0,
    boxSizing: "border-box",
  } as React.CSSProperties;
};


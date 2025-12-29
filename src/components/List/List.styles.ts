export const listStyle = {
  width: "100%",
  backgroundColor: "var(--bu-surface, #fff)",
  borderRadius: "var(--bu-radius-md, 0.375rem)",
  overflow: "hidden",
} as React.CSSProperties;

export const listItemStyle = (
  variant: "default" | "dense" | "comfortable",
  selected: boolean,
  disabled: boolean
) => {
  const paddingMap = {
    default: { padding: "1rem" },
    dense: { padding: "0.5rem 1rem" },
    comfortable: { padding: "1.5rem" },
  };

  return {
    ...paddingMap[variant],
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    cursor: disabled ? "not-allowed" : "pointer",
    backgroundColor: selected
      ? "var(--bu-primary-light, rgba(25, 118, 210, 0.08))"
      : "transparent",
    transition: "background-color 0.15s ease",
    opacity: disabled ? 0.5 : 1,
    borderBottom: "1px solid var(--bu-border, rgba(0, 0, 0, 0.1))",
  } as React.CSSProperties;
};

export const listItemContentStyle = {
  flex: 1,
  minWidth: 0,
} as React.CSSProperties;

export const listItemPrimaryStyle = {
  fontSize: "0.875rem",
  fontWeight: 500,
  color: "var(--bu-fg, #000)",
  marginBottom: "0.25rem",
} as React.CSSProperties;

export const listItemSecondaryStyle = {
  fontSize: "0.75rem",
  color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
} as React.CSSProperties;


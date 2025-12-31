export const overlayStyle = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 999,
  animation: "balanceui-fade-in 0.2s ease-out",
} as React.CSSProperties;

export const bottomSheetStyle = (size: "sm" | "md" | "lg" | "full", open: boolean) => {
  const heightMap = {
    sm: "40vh",
    md: "60vh",
    lg: "80vh",
    full: "95vh",
  };

  return {
    position: "fixed" as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: heightMap[size],
    maxHeight: heightMap[size],
    backgroundColor: "var(--bu-surface, #fff)",
    borderTopLeftRadius: "var(--bu-radius-lg, 0.5rem)",
    borderTopRightRadius: "var(--bu-radius-lg, 0.5rem)",
    boxShadow: "0px -4px 20px rgba(0, 0, 0, 0.15)",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column" as const,
    transform: open ? "translateY(0)" : "translateY(100%)",
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    overflow: "hidden" as const,
  } as React.CSSProperties;
};

export const handleStyle = {
  width: "3rem",
  height: "0.25rem",
  backgroundColor: "var(--bu-border, rgba(0, 0, 0, 0.2))",
  borderRadius: "var(--bu-radius-full, 9999px)",
  margin: "0.75rem auto",
  cursor: "grab",
} as React.CSSProperties;

export const headerStyle = {
  padding: "1rem 1.5rem",
  borderBottom: "1px solid var(--bu-border, rgba(0, 0, 0, 0.1))",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
} as React.CSSProperties;

export const contentStyle = {
  flex: 1,
  overflowY: "auto" as const,
  padding: "1.5rem",
} as React.CSSProperties;


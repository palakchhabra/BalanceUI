export const tabListStyle = {
  display: "flex",
  borderBottom: "1px solid var(--bu-border)",
};

export const tabStyle = (active?: boolean) => ({
  padding: "10px 16px",
  cursor: "pointer",
  borderBottom: active
    ? "2px solid var(--bu-primary)"
    : "2px solid transparent",
  color: active
    ? "var(--bu-primary)"
    : "var(--bu-fg)",
});

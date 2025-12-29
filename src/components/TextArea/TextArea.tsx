export const TextArea = ({
  style,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      {...props}
      style={{
        width: "100%",
        padding: 12,
        borderRadius: "var(--bu-radius-md)",
        border: "1px solid var(--bu-border)",
        background: "var(--bu-surface)",
        color: "var(--bu-fg)",
        resize: "vertical",
        ...style,
      }}
    />
  );
};

import { shimmerStyle } from "./Shimmer.base";
import "./Shimmer.css";

export type ShimmerVariant = "text" | "circular" | "rectangular" | "rounded" | "avatar" | "card" | "list";

export interface ShimmerProps {
  variant?: ShimmerVariant;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  count?: number; // For multiple shimmer items
}

export const Shimmer = ({
  variant = "rectangular",
  width,
  height,
  className,
  style,
  count = 1,
}: ShimmerProps) => {
  const baseStyle: React.CSSProperties = {
    ...shimmerStyle,
    ...style,
  };

  const variantStyles: Record<ShimmerVariant, React.CSSProperties> = {
    text: {
      ...baseStyle,
      height: height || "1rem",
      width: width || "100%",
      borderRadius: "var(--bu-radius-sm, 0.25rem)",
    },
    circular: {
      ...baseStyle,
      width: width || "3rem",
      height: height || width || "3rem",
      borderRadius: "50%",
    },
    rectangular: {
      ...baseStyle,
      width: width || "100%",
      height: height || "3rem",
      borderRadius: "var(--bu-radius-sm, 0.25rem)",
    },
    rounded: {
      ...baseStyle,
      width: width || "100%",
      height: height || "3rem",
      borderRadius: "var(--bu-radius-md, 0.375rem)",
    },
    avatar: {
      ...baseStyle,
      width: width || "2.5rem",
      height: height || width || "2.5rem",
      borderRadius: "50%",
    },
    card: {
      ...baseStyle,
      width: width || "100%",
      height: height || "12rem",
      borderRadius: "var(--bu-radius-md, 0.375rem)",
    },
    list: {
      ...baseStyle,
      width: width || "100%",
      height: height || "4rem",
      borderRadius: "var(--bu-radius-sm, 0.25rem)",
    },
  };

  if (count > 1) {
    return (
      <div className={`balanceui-shimmer-group ${className || ""}`} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={`balanceui-shimmer balanceui-shimmer-${variant}`}
            style={variantStyles[variant]}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`balanceui-shimmer balanceui-shimmer-${variant} ${className || ""}`}
      style={variantStyles[variant]}
    />
  );
};


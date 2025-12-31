import { shimmerStyle } from "./Shimmer.base";
import "./Shimmer.css";

export interface ShimmerElementProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ShimmerElement = ({
  width = "100%",
  height = "1rem",
  borderRadius = "var(--bu-radius-md, 4px)",
  className,
  style,
}: ShimmerElementProps) => {
  const baseShimmerStyle: React.CSSProperties = {
    ...shimmerStyle,
    width,
    height,
    borderRadius,
    ...style,
  };

  return (
    <div
      className={`balanceui-shimmer ${className || ""}`}
      style={baseShimmerStyle}
    />
  );
};


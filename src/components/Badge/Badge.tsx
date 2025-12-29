import { BadgeProps } from "./Badge.types";
import "./Badge.css";

export const Badge = ({
  variant = "solid",
  children,
  className,
  style,
}: BadgeProps) => {
  return (
    <span 
      className={`balanceui-badge variant-${variant} ${className || ""}`}
      style={style}
    >
      {children}
    </span>
  );
};

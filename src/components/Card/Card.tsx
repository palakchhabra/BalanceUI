import { useState } from "react";
import { CardProps } from "./Card.types";
import "./Card.css";

export const Card = ({
  children,
  variant = "elevated",
  elevation = 1,
  gradient,
  className,
  style,
  onClick,
  hoverable = false,
  onMouseEnter,
  onMouseLeave,
}: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isClickable = onClick !== undefined || hoverable;

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(false);
    onMouseLeave?.(e);
  };

  // Build gradient style if gradient variant is used
  const gradientStyle = variant === "gradient" && gradient
    ? {
        background: `linear-gradient(${
          gradient.direction === "to-right" ? "90deg"
          : gradient.direction === "to-bottom" ? "180deg"
          : gradient.direction === "to-left" ? "270deg"
          : gradient.direction === "to-top" ? "0deg"
          : gradient.direction === "to-bottom-right" ? "135deg"
          : gradient.direction === "to-top-left" ? "315deg"
          : "180deg"
        }, ${gradient.from}, ${gradient.to})`,
      }
    : {};

  return (
    <div
      className={`balanceui-card balanceui-card-${variant} ${
        variant === "elevated" ? `balanceui-card-elevation-${elevation}` : ""
      } ${isClickable ? "balanceui-card-clickable" : ""} ${
        isHovered ? "balanceui-card-hovered" : ""
      } ${className || ""}`}
      style={{
        ...gradientStyle,
        ...style,
      }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (isClickable && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {children}
    </div>
  );
};

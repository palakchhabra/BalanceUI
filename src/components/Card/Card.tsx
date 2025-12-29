import { CardProps } from "./Card.types";
import "./Card.css";

export const Card = ({
  children,
  variant = "elevated",
  elevation = 1,
  className,
  style,
  onClick,
}: CardProps) => {
  return (
    <div
      className={`balanceui-card balanceui-card-${variant} balanceui-card-elevation-${elevation} ${className || ""}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
};


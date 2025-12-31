export interface CardProps {
  children: React.ReactNode;
  variant?: "elevated" | "outlined" | "filled" | "flat" | "gradient";
  elevation?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  gradient?: {
    from: string;
    to: string;
    direction?: "to-right" | "to-bottom" | "to-left" | "to-top" | "to-bottom-right" | "to-top-left";
  };
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  hoverable?: boolean;
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

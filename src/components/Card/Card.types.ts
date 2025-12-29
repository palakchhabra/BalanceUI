export interface CardProps {
  children: React.ReactNode;
  variant?: "elevated" | "outlined" | "filled";
  elevation?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}


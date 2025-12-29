export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface IconProps {
  name?: string;
  size?: IconSize;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode; // For custom SVG content
}


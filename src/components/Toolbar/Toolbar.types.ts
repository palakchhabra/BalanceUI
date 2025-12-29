export type ToolbarVariant = "solid" | "soft" | "outline";

export interface ToolbarItem {
  id: string;
  label?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  divider?: boolean;
}

export interface ToolbarProps {
  variant?: ToolbarVariant;
  items: ToolbarItem[];
  className?: string;
  style?: React.CSSProperties;
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "vertical";
}


export type DrawerPlacement = "left" | "right" | "top" | "bottom";
export type DrawerScrollMode = "content" | "page";
export type DrawerVariant = "default" | "elevated" | "outlined" | "filled";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;

  placement?: DrawerPlacement;
  size?: number | string;
  variant?: DrawerVariant;

  scrollMode?: DrawerScrollMode;
  lockScroll?: boolean;

  children: React.ReactNode;

  className?: string;
  style?: React.CSSProperties;
  showHandle?: boolean;
  title?: string;
}

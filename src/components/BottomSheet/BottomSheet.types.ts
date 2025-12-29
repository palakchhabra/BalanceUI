export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg" | "full";
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  lockScroll?: boolean;
  className?: string;
  style?: React.CSSProperties;
  showHandle?: boolean;
}


export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  size?: ModalSize;
  ariaLabel?: string;
  ariaLabelledBy?: string;
}

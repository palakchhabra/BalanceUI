export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

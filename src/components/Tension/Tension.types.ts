export type TensionMode = 'elastic' | 'snap' | 'free'

export interface TensionProps {
  value: number;
  onChange: (value: number) => void;

  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;

  className?: string;
  style?: React.CSSProperties;
}

export interface PageSizeSelectorProps {
  value: number;
  options?: number[];
  onChange: (size: number) => void;
  label?: string;
  showLabel?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

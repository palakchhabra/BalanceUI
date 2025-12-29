export interface PageSizeSelectorProps {
  value: number;
  options?: number[];
  onChange: (size: number) => void;

  className?: string;
  style?: React.CSSProperties;
}

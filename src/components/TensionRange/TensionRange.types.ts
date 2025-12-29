export type TensionRangeValue = [number, number];

export interface TensionRangeProps {
  value: TensionRangeValue;
  onChange: (value: TensionRangeValue) => void;

  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;

  className?: string;
  style?: React.CSSProperties;
}

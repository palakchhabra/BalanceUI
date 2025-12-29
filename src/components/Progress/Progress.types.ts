import type { BalanceVariant } from "../../types/variant";

export interface ProgressProps {
  value?: number;
  min?: number;
  max?: number;

  showValue?: boolean;
  indeterminate?: boolean;

  variant?: BalanceVariant | "success" | "warning";
  type?: "linear" | "circular";
  size?: "thin" | "md" | "thick";

  className?: string;
  style?: React.CSSProperties;
}

import type { BalanceVariant } from "../../types/variant";
import { forwardRef } from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "style"> {
  variant?: Extract<BalanceVariant, "solid" | "soft" | "outline">;
  style?: React.CSSProperties;
}

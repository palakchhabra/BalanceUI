import type { BalanceVariant } from "../../types/variant";

export interface BadgeProps {
  variant?: Extract<BalanceVariant, "solid" | "soft" | "outline"> | "danger" | "success" | "warning";
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

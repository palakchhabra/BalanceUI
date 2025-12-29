import type { BalanceVariant } from "../../types/variant";
import { ProgressProps } from "./Progress.types";
import "./Progress.css";

export const Progress = ({
  value,
  min = 0,
  max = 100,
  showValue = false,
  indeterminate = false,
  variant = "solid",
  type = "linear",
  size = "md",
  className,
  style,
}: ProgressProps) => {
  const clamped =
    value !== undefined
      ? Math.min(max, Math.max(min, value))
      : 0;

  const percent =
    value !== undefined
      ? ((clamped - min) / (max - min)) * 100
      : 0;

  if (type === "circular") {
    const radius = 28;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    return (
      <div className={`balanceui-progress-circular ${className || ""}`} style={style}>
        <svg viewBox="0 0 64 64">
          <circle
            className="balanceui-progress-circular-track"
            cx="32"
            cy="32"
            r={radius}
          />
          {!indeterminate && (
            <circle
              className="balanceui-progress-circular-fill"
              cx="32"
              cy="32"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{
                stroke: variant === "solid" ? "var(--bu-primary)" :
                       variant === "danger" ? "var(--bu-danger)" :
                       variant === "success" ? "var(--bu-success)" :
                       variant === "warning" ? "var(--bu-warning)" : "var(--bu-primary)",
              }}
            />
          )}
        </svg>
        {showValue && !indeterminate && (
          <div className="balanceui-progress-value" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            {Math.round(percent)}%
          </div>
        )}
      </div>
    );
  }

  const sizeClass = size === "thin" ? "variant-linear-thin" : 
                   size === "thick" ? "variant-linear-thick" : 
                   "variant-linear";

  return (
    <div className={className} style={style}>
      <div
        role="progressbar"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : clamped}
        aria-busy={indeterminate}
        className={`balanceui-progress ${sizeClass}`}
      >
        {indeterminate ? (
          <div className={`balanceui-progress-indeterminate variant-${variant}`} />
        ) : (
          <div 
            className={`balanceui-progress-fill variant-${variant}`}
            style={{ width: `${percent}%` }}
          />
        )}
      </div>

      {showValue && !indeterminate && (
        <div className="balanceui-progress-value">
          {Math.round(percent)}%
        </div>
      )}
    </div>
  );
};

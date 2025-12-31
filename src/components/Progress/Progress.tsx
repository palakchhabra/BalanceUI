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
    const offset = indeterminate ? 0 : circumference - (percent / 100) * circumference;

    return (
      <div className={`balanceui-progress-circular ${className || ""}`} style={style}>
        <svg viewBox="0 0 64 64">
          <circle
            className="balanceui-progress-circular-track"
            cx="32"
            cy="32"
            r={radius}
            fill="none"
          />
          {indeterminate ? (
            <circle
              className={`balanceui-progress-circular-fill variant-${variant}`}
              cx="32"
              cy="32"
              r={radius}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * 0.25}
              style={{
                strokeDasharray: `${circumference * 0.25} ${circumference * 0.75}`,
                animation: "bu-spin 1.4s linear infinite",
              }}
            />
          ) : (
            <circle
              className={`balanceui-progress-circular-fill variant-${variant}`}
              cx="32"
              cy="32"
              r={radius}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          )}
        </svg>
        {showValue && !indeterminate && (
          <div className="balanceui-progress-value">
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
    <div className={className || ""} style={{ width: "100%", ...style }}>
      <div
        role="progressbar"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : clamped}
        aria-busy={indeterminate}
        className={`balanceui-progress ${sizeClass}`}
        style={{ width: "100%", position: "relative" }}
      >
        {indeterminate ? (
          <div className={`balanceui-progress-indeterminate variant-${variant}`} />
        ) : (
          <div 
            className={`balanceui-progress-fill variant-${variant}`}
            style={{ 
              width: `${percent}%`, 
              display: "block", 
              minWidth: percent > 0 ? "2px" : "0",
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%"
            }}
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

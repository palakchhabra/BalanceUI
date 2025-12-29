import { useState } from "react";
import {
  containerStyle,
  trackStyle,
  knobStyle,
} from "./Toggle.styles";
import { ToggleProps } from "./Toggle.types";
import "./Toggle.css";

export const Toggle = ({
  checked,
  onChange,
  disabled = false,
  style,
  className,
}: ToggleProps) => {
  const [active, setActive] = useState(false);

  return (
    <div
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      className={`balanceui-toggle ${className || ""}`}
      style={{
        ...containerStyle,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        ...style,
      }}
      onClick={() => {
        if (!disabled) onChange(!checked);
      }}
      onKeyDown={(e) => {
        if (disabled) return;

        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onChange(!checked);
        }
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      {/* TRACK */}
      <div style={trackStyle(checked)} />

      {/* KNOB */}
      <div style={knobStyle(checked, active)} />
    </div>
  );
};

import { useRef, useCallback, useState } from "react";
import {
  containerStyle,
  trackStyle,
  filledTrackStyle,
  knobStyle,
  valueLabelStyle,
} from "./Tension.styles";
import { TensionProps } from "./Tension.types";

export const Tension = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  style,
  className,
}: TensionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const percent = ((value - min) / (max - min)) * 100;

  const updateFromClientX = useCallback(
    (clientX: number) => {
      if (!ref.current || disabled) return;

      const rect = ref.current.getBoundingClientRect();
      const ratio = (clientX - rect.left) / rect.width;

      const clamped = Math.min(1, Math.max(0, ratio));
      const raw = min + clamped * (max - min);
      const snapped = Math.round(raw / step) * step;

      onChange(Math.min(max, Math.max(min, snapped)));
    },
    [min, max, step, disabled, onChange]
  );

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (disabled) return;

    setActive(true);
    updateFromClientX(e.clientX);

    const onMove = (ev: PointerEvent) =>
      updateFromClientX(ev.clientX);

    const onUp = () => {
      setActive(false);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...containerStyle,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        ...style,
      }}
      tabIndex={disabled ? -1 : 0}
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-disabled={disabled}
      onPointerDown={onPointerDown}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onKeyDown={(e) => {
        if (disabled) return;

        let next = value;

        switch (e.key) {
          case "ArrowRight":
          case "ArrowUp":
            next += step;
            break;
          case "ArrowLeft":
          case "ArrowDown":
            next -= step;
            break;
          case "Home":
            next = min;
            break;
          case "End":
            next = max;
            break;
          default:
            return;
        }

        e.preventDefault();
        onChange(Math.min(max, Math.max(min, next)));
      }}
    >
      {/* Value label */}
      <div style={valueLabelStyle(percent)}>{value}</div>

      {/* Track */}
      <div style={trackStyle} />
      <div style={filledTrackStyle(percent)} />

      {/* Knob */}
      <div style={knobStyle(percent, active)} />
    </div>
  );
};

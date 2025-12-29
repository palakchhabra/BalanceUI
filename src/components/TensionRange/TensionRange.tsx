import { useRef, useCallback, useState } from "react";
import {
  containerStyle,
  trackStyle,
  rangeTrackStyle,
  knobStyle,
  valueLabelStyle,
} from "./TensionRange.styles";
import { TensionRangeProps } from "./TensionRange.types";

type ActiveKnob = "min" | "max" | null;

export const TensionRange = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  style,
  className,
}: TensionRangeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<ActiveKnob>(null);

  const [minValue, maxValue] = value;

  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = ((maxValue - min) / (max - min)) * 100;

  const valueFromClientX = useCallback(
    (clientX: number) => {
      if (!ref.current) return min;

      const rect = ref.current.getBoundingClientRect();
      const ratio = (clientX - rect.left) / rect.width;

      const clampedRatio = Math.min(1, Math.max(0, ratio));
      const raw = min + clampedRatio * (max - min);

      return Math.round(raw / step) * step;
    },
    [min, max, step]
  );

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (disabled || !ref.current) return;

    const clickValue = valueFromClientX(e.clientX);

    const distToMin = Math.abs(clickValue - minValue);
    const distToMax = Math.abs(clickValue - maxValue);

    const knob: ActiveKnob =
      distToMin <= distToMax ? "min" : "max";

    setActive(knob);

    const update = (x: number) => {
      const v = valueFromClientX(x);

      if (knob === "min") {
        onChange([
          Math.min(v, maxValue),
          maxValue,
        ]);
      } else {
        onChange([
          minValue,
          Math.max(v, minValue),
        ]);
      }
    };

    update(e.clientX);

    const onMove = (ev: PointerEvent) => update(ev.clientX);
    const onUp = () => {
      setActive(null);
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
      onPointerDown={onPointerDown}
    >
      {/* VALUE LABELS */}
      <div style={valueLabelStyle(minPercent)}>{minValue}</div>
      <div style={valueLabelStyle(maxPercent)}>{maxValue}</div>

      {/* TRACK */}
      <div style={trackStyle} />
      <div style={rangeTrackStyle(minPercent, maxPercent)} />

      {/* KNOBS */}
      <div style={knobStyle(minPercent, active === "min")} />
      <div style={knobStyle(maxPercent, active === "max")} />
    </div>
  );
};

import type { CSSProperties } from "react";

export const containerStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  height: 32,
  minWidth: 200,
};

export const trackStyle: CSSProperties = {
  position: "absolute",
  top: "50%",
  left: 0,
  right: 0,
  transform: "translateY(-50%)",
  height: 2,
  background: "var(--bu-border)",
};

export const rangeTrackStyle = (
  leftPercent: number,
  rightPercent: number
): CSSProperties => ({
  position: "absolute",
  top: "50%",
  left: `${leftPercent}%`,
  width: `${rightPercent - leftPercent}%`,
  transform: "translateY(-50%)",
  height: 2,
  background: "var(--bu-primary)",
});

export const knobStyle = (
  percent: number,
  active: boolean
): CSSProperties => ({
  position: "absolute",
  top: "50%",
  left: `${percent}%`,
  transform: "translate(-50%, -50%)",

  width: 10,
  height: 10,
  borderRadius: "50%",
  background: "var(--bu-primary)",

  boxShadow: active
    ? "0 0 0 3px rgba(255,255,255,0.9)"
    : "none",

  transition: "box-shadow 120ms ease",
});

export const valueLabelStyle = (percent: number): CSSProperties => ({
  position: "absolute",
  top: 4,
  left: `${percent}%`,
  transform: "translate(-50%, -100%)",
  fontSize: 12,
  fontWeight: 500,
  color: "var(--bu-fg)",
  pointerEvents: "none",
  opacity: 0.85,
});

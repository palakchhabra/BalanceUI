import type { CSSProperties } from "react";
import type { StepperOrientation } from "./Stepper.types";

export const containerStyle = (
  orientation: StepperOrientation
): CSSProperties => ({
  display: "flex",
  flexDirection: orientation === "vertical" ? "column" : "row",
  gap: 24,
});

export const stepStyle = (
  active: boolean,
  completed: boolean,
  error?: boolean
): CSSProperties => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  cursor: "pointer",
  color: error
    ? "var(--bu-danger)"
    : active
    ? "var(--bu-primary)"
    : completed
    ? "var(--bu-success)"
    : "var(--bu-muted)",
});

export const circleStyle = (
  active: boolean,
  completed: boolean,
  error?: boolean
): CSSProperties => ({
  width: 28,
  height: 28,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 13,
  background: completed
    ? "var(--bu-success)"
    : active
    ? "var(--bu-primary)"
    : "transparent",
  color:
    completed || active ? "white" : "var(--bu-muted)",
  border: error
    ? "2px solid var(--bu-danger)"
    : "2px solid var(--bu-border)",
});

export const connectorStyle = (
  orientation: StepperOrientation,
  completed: boolean
): CSSProperties => ({
  flex: orientation === "horizontal" ? 1 : undefined,
  height: orientation === "horizontal" ? 2 : 24,
  width: orientation === "horizontal" ? undefined : 2,
  background: completed
    ? "var(--bu-success)"
    : "var(--bu-border)",
  marginLeft: orientation === "vertical" ? 13 : 0,
});

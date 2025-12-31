import React from "react";

export type TimelinePosition = "left" | "right" | "alternate";
export type TimelineDotVariant = "filled" | "outlined";
export type TimelineDotColor = "primary" | "secondary" | "success" | "error" | "warning" | "info" | "grey";

export interface TimelineProps {
  children: React.ReactNode;
  position?: TimelinePosition;
  className?: string;
  style?: React.CSSProperties;
}

export interface TimelineItemProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface TimelineSeparatorProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface TimelineDotProps {
  variant?: TimelineDotVariant;
  color?: TimelineDotColor;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface TimelineConnectorProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface TimelineContentProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface TimelineOppositeContentProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}


import React from "react";
import { TimelineProps, TimelineItemProps, TimelineSeparatorProps, TimelineDotProps, TimelineConnectorProps, TimelineContentProps, TimelineOppositeContentProps, TimelinePosition } from "./Timeline.types";
import "./Timeline.css";

export const Timeline = ({
  children,
  position = "right",
  className,
  style,
}: TimelineProps) => {
  return (
    <ul
      className={`balanceui-timeline balanceui-timeline-position-${position} ${className || ""}`}
      style={style}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            index,
            position,
            isLast: index === React.Children.count(children) - 1,
          });
        }
        return child;
      })}
    </ul>
  );
};

export const TimelineItem = ({
  children,
  className,
  style,
  index,
  position,
  isLast,
}: TimelineItemProps & { index?: number; position?: TimelinePosition; isLast?: boolean }) => {
  return (
    <li
      className={`balanceui-timeline-item ${position === "alternate" && index !== undefined && index % 2 === 1 ? "balanceui-timeline-item-alternate-right" : ""} ${className || ""}`}
      style={style}
    >
      {children}
    </li>
  );
};

export const TimelineSeparator = ({
  children,
  className,
  style,
}: TimelineSeparatorProps) => {
  return (
    <div
      className={`balanceui-timeline-separator ${className || ""}`}
      style={style}
    >
      {children}
    </div>
  );
};

export const TimelineDot = ({
  variant = "filled",
  color = "primary",
  children,
  className,
  style,
}: TimelineDotProps) => {
  return (
    <div
      className={`balanceui-timeline-dot balanceui-timeline-dot-${variant} balanceui-timeline-dot-${color} ${className || ""}`}
      style={style}
    >
      {children}
    </div>
  );
};

export const TimelineConnector = ({
  className,
  style,
}: TimelineConnectorProps) => {
  return (
    <div
      className={`balanceui-timeline-connector ${className || ""}`}
      style={style}
    />
  );
};

export const TimelineContent = ({
  children,
  className,
  style,
}: TimelineContentProps) => {
  return (
    <div
      className={`balanceui-timeline-content ${className || ""}`}
      style={style}
    >
      {children}
    </div>
  );
};

export const TimelineOppositeContent = ({
  children,
  className,
  style,
}: TimelineOppositeContentProps) => {
  return (
    <div
      className={`balanceui-timeline-opposite-content ${className || ""}`}
      style={style}
    >
      {children}
    </div>
  );
};


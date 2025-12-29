import { IconProps, IconSize } from "./Icon.types";
import "./Icon.css";

const sizeMap: Record<IconSize, string> = {
  xs: "0.75rem",
  sm: "1rem",
  md: "1.25rem",
  lg: "1.5rem",
  xl: "2rem",
};

// Common icon set - you can extend this
const iconMap: Record<string, React.ReactNode> = {
  // Navigation
  home: (
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="currentColor" />
  ),
  menu: (
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor" />
  ),
  close: (
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor" />
  ),
  // Actions
  check: (
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor" />
  ),
  add: (
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor" />
  ),
  delete: (
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor" />
  ),
  edit: (
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor" />
  ),
  // Arrows
  arrow_back: (
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor" />
  ),
  arrow_forward: (
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" fill="currentColor" />
  ),
  // More icons can be added here
};

export const Icon = ({
  name,
  size = "md",
  color,
  className,
  style,
  children,
}: IconProps) => {
  const iconContent = name ? iconMap[name] : children;

  if (!iconContent) {
    return null;
  }

  const iconSize = sizeMap[size];

  return (
    <svg
      className={`balanceui-icon ${className || ""}`}
      style={{
        width: iconSize,
        height: iconSize,
        color: color || "currentColor",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        ...style,
      }}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {iconContent}
    </svg>
  );
};


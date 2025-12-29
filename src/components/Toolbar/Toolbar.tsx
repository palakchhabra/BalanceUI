import { ToolbarProps } from "./Toolbar.types";
import { toolbarStyle, toolbarItemStyle, dividerStyle } from "./Toolbar.styles";
import "./Toolbar.css";

export const Toolbar = ({
  variant = "outline",
  items,
  className,
  style,
  size = "md",
  orientation = "horizontal",
}: ToolbarProps) => {
  return (
    <div
      className={`balanceui-toolbar ${className || ""}`}
      style={{ ...toolbarStyle(variant, orientation), ...style }}
      role="toolbar"
      aria-orientation={orientation}
    >
      {items.map((item, index) => {
        if (item.divider) {
          return (
            <div
              key={`divider-${index}`}
              style={dividerStyle(orientation)}
              className="balanceui-toolbar-divider"
              role="separator"
            />
          );
        }

        return (
          <button
            key={item.id}
            type="button"
            onClick={item.onClick}
            disabled={item.disabled}
            style={toolbarItemStyle(size, item.active || false, item.disabled || false)}
            className={`balanceui-toolbar-item ${item.active ? "balanceui-toolbar-active" : ""}`}
            aria-pressed={item.active}
            aria-label={item.label || item.id}
          >
            {item.icon && (
              <span className="balanceui-toolbar-icon">{item.icon}</span>
            )}
            {item.label && (
              <span className="balanceui-toolbar-label">{item.label}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};


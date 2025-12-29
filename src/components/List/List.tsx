import { ListProps } from "./List.types";
import { listStyle, listItemStyle, listItemContentStyle, listItemPrimaryStyle, listItemSecondaryStyle } from "./List.styles";
import "./List.css";

export const List = ({
  items,
  variant = "default",
  className,
  style,
  onItemClick,
}: ListProps) => {
  return (
    <div
      className={`balanceui-list ${className || ""}`}
      style={{ ...listStyle, ...style }}
      role="list"
    >
      {items.map((item, index) => (
        <div
          key={item.id}
          onClick={() => {
            if (!item.disabled) {
              item.onClick?.();
              onItemClick?.(item);
            }
          }}
          style={listItemStyle(variant, item.selected || false, item.disabled || false)}
          className={`balanceui-list-item ${item.selected ? "balanceui-list-selected" : ""} ${item.disabled ? "balanceui-list-disabled" : ""}`}
          role="listitem"
          aria-selected={item.selected}
          aria-disabled={item.disabled}
        >
          {item.avatar && (
            <div className="balanceui-list-avatar">{item.avatar}</div>
          )}
          {item.icon && !item.avatar && (
            <div className="balanceui-list-icon">{item.icon}</div>
          )}
          <div style={listItemContentStyle} className="balanceui-list-content">
            <div style={listItemPrimaryStyle} className="balanceui-list-primary">
              {item.primary}
            </div>
            {item.secondary && (
              <div style={listItemSecondaryStyle} className="balanceui-list-secondary">
                {item.secondary}
              </div>
            )}
          </div>
          {item.action && (
            <div className="balanceui-list-action">{item.action}</div>
          )}
          {item.divider && index < items.length - 1 && (
            <div
              style={{
                position: "absolute" as const,
                bottom: 0,
                left: 0,
                right: 0,
                height: "1px",
                backgroundColor: "var(--bu-border, rgba(0, 0, 0, 0.1))",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};


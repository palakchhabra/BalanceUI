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
            <div className="balanceui-list-action" onClick={(e) => e.stopPropagation()}>
              {item.action}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};


import { Icon } from "../Icon";
import "./Sidebar.css";

export interface SidebarItemProps {
  label?: string;
  icon?: string | React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const SidebarItem = ({
  label,
  icon,
  active = false,
  onClick,
  children,
  className,
  style,
}: SidebarItemProps) => {
  const itemClasses = [
    "balanceui-sidebar-item",
    active ? "balanceui-sidebar-item-active" : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  const iconElement =
    typeof icon === "string" ? (
      <Icon name={icon} size="md" className="balanceui-sidebar-item-icon" />
    ) : icon ? (
      <span className="balanceui-sidebar-item-icon">{icon}</span>
    ) : null;

  return (
    <div
      className={itemClasses}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      style={style}
    >
      {iconElement}
      {label && <span className="balanceui-sidebar-item-label">{label}</span>}
      {children}
    </div>
  );
};

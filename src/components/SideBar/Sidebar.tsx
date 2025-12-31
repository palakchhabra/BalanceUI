import { SidebarProps } from "./Sidebar.types";
import "./Sidebar.css";

export const Sidebar = ({
  width = 240,
  collapsed,
  children,
  className,
  style,
}: SidebarProps) => {
  const sidebarClasses = [
    "balanceui-sidebar",
    collapsed ? "balanceui-sidebar-collapsed" : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <aside
      className={sidebarClasses}
      style={{
        width: collapsed ? 64 : width,
        ...style,
      }}
    >
      {children}
    </aside>
  );
};

import { SidebarProps } from "./Sidebar.types";
import { sidebarStyle } from "./Sidebar.styles";

export const Sidebar = ({
  width = 240,
  collapsed,
  children,
}: SidebarProps) => {
  return (
    <aside style={sidebarStyle(width, collapsed)}>
      {children}
    </aside>
  );
};

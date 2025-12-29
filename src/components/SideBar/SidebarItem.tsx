import { itemStyle } from "./Sidebar.styles";

export const SidebarItem = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div style={itemStyle} onClick={onClick}>
      {children}
    </div>
  );
};

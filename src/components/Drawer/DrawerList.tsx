import { List } from "../List/List";
import { ListItem } from "../List/List.types";
import { Icon } from "../Icon/Icon";
import "./DrawerList.css";

export interface DrawerListItem {
  id: string;
  label: string;
  icon?: string;
  secondary?: string;
  onClick?: () => void;
  disabled?: boolean;
  selected?: boolean;
  divider?: boolean;
}

export interface DrawerListProps {
  items: DrawerListItem[];
  onItemClick?: (item: DrawerListItem) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const DrawerList = ({
  items,
  onItemClick,
  className,
  style,
}: DrawerListProps) => {
  const listItems: ListItem[] = items.map((item) => ({
    id: item.id,
    primary: item.label,
    secondary: item.secondary,
    icon: item.icon ? <Icon name={item.icon} size="md" /> : undefined,
    onClick: item.onClick,
    disabled: item.disabled,
    selected: item.selected,
    divider: item.divider,
  }));

  const handleItemClick = (listItem: ListItem) => {
    const drawerItem = items.find((item) => item.id === listItem.id);
    if (drawerItem && onItemClick) {
      onItemClick(drawerItem);
    }
  };

  return (
    <div className={`balanceui-drawer-list ${className || ""}`} style={style}>
      <List items={listItems} onItemClick={handleItemClick} />
    </div>
  );
};


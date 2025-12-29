export interface ListItem {
  id: string;
  primary: string;
  secondary?: string;
  avatar?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  selected?: boolean;
  divider?: boolean;
}

export interface ListProps {
  items: ListItem[];
  variant?: "default" | "dense" | "comfortable";
  className?: string;
  style?: React.CSSProperties;
  onItemClick?: (item: ListItem) => void;
}


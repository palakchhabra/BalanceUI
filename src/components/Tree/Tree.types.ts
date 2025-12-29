export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

export interface TreeProps {
  data: TreeNode[];
  expanded?: Set<string>;
  onToggle?: (id: string) => void;
  selected?: Set<string>;
  onSelect?: (id: string, checked: boolean) => void;
  showCheckbox?: boolean;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

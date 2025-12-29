export type SortDirection = "asc" | "desc";

export interface Column<T> {
  id: string;
  header: string;
  accessor?: keyof T;
  width?: number;
  render?: (row: T) => React.ReactNode;
}

export interface SortingConfig {
  mode: "client" | "server";
  sort?: {
    columnId: string;
    direction: SortDirection;
  };
  onChange: (sort: SortingConfig["sort"]) => void;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];

  loading?: boolean;
  sorting?: SortingConfig;

  stickyColumns?: number[];
  height?: number;

  className?: string;
  style?: React.CSSProperties;

  // Enhanced features
  selectable?: boolean;
  selectedRows?: T[];
  onSelectionChange?: (selectedRows: T[]) => void;
  getRowId?: (row: T, index: number) => string | number;
  showRecordCount?: boolean;
  recordCountLabel?: string;
}

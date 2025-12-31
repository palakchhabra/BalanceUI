export type SortDirection = "asc" | "desc";

export interface Column<T> {
  id: string;
  header: string;
  accessor?: keyof T;
  width?: number;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: "text" | "select" | "date" | "number";
  filterOptions?: { label: string; value: string | number }[];
}

export interface SortingConfig {
  mode: "client" | "server";
  sort?: {
    columnId: string;
    direction: SortDirection;
  };
  onChange: (sort: SortingConfig["sort"]) => void;
}

export interface PaginationConfig {
  mode: "client" | "server";
  page: number;
  pageSize: number;
  total?: number; // Required for server mode
  onChange: (page: number, pageSize: number) => void;
  showPageSizeSelector?: boolean;
  pageSizeOptions?: number[];
}

export interface FilterConfig {
  [columnId: string]: string | number | null;
}

export interface AutoRefreshConfig {
  enabled: boolean;
  interval: number; // in milliseconds
  onRefresh: () => void | Promise<void>;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];

  loading?: boolean;
  sorting?: SortingConfig;
  pagination?: PaginationConfig;
  filters?: FilterConfig;
  onFilterChange?: (filters: FilterConfig) => void;

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
  emptyMessage?: string;
  autoRefresh?: AutoRefreshConfig;
}

export interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;

  siblingCount?: number;   // pages around current
  boundaryCount?: number;  // start/end pages

  onChange: (page: number) => void;

  className?: string;
  style?: React.CSSProperties;
}

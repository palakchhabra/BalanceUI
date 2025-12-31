import { useMemo, useCallback, useState, useEffect, useRef } from "react";
import { Icon } from "../Icon/Icon";
import {
  tableWrapperStyle,
  scrollContainerStyle,
  tableStyle,
  thStyle,
  tdStyle,
  stickyCellStyle,
  emptyStyle,
} from "./DataTable.styles";
import { DataTableProps } from "./DataTable.types";
import { sortData, filterData } from "./DataTable.utils";
import { ShimmerTable } from "../Shimmer/ShimmerTable";
import { Checkbox } from "../Checkbox/Checkbox";
import { Pagination } from "../Pagination/Pagination";
import { PageSizeSelector } from "../PageSizeSelector/PageSizeSelector";
import "./DataTable.css";

const ROW_HEIGHT = 42;
const HEADER_HEIGHT = 44;
const OVERSCAN = 10;

export const DataTable = <T,>({
  columns,
  data,
  loading,
  sorting,
  pagination,
  filters,
  onFilterChange,
  stickyColumns = [],
  height,
  className,
  style,
  selectable = false,
  selectedRows: controlledSelectedRows,
  onSelectionChange,
  getRowId = (row: T, index: number) => index,
  showRecordCount = false,
  recordCountLabel = "Records",
  emptyMessage = "No data",
  autoRefresh,
}: DataTableProps<T>) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [internalSelectedRows, setInternalSelectedRows] = useState<T[]>([]);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const isControlled = controlledSelectedRows !== undefined;
  const selectedRows = isControlled ? controlledSelectedRows : internalSelectedRows;

  // Apply filters (client-side only)
  const filteredRows = useMemo(() => {
    if (filters && Object.keys(filters).length > 0 && pagination?.mode === "client") {
      return filterData(data, filters, columns);
    }
    return data;
  }, [data, filters, columns, pagination?.mode]);

  // Apply sorting (client-side only)
  const sortedRows = useMemo(() => {
    if (sorting?.mode === "client" && sorting.sort) {
      return sortData(filteredRows, sorting.sort, columns);
    }
    return filteredRows;
  }, [filteredRows, sorting, columns]);

  // Apply pagination (client-side only)
  const paginatedRows = useMemo(() => {
    if (pagination?.mode === "client") {
      const start = (pagination.page - 1) * pagination.pageSize;
      const end = start + pagination.pageSize;
      return sortedRows.slice(start, end);
    }
    return sortedRows;
  }, [sortedRows, pagination]);

  // For display, use paginated rows if client-side pagination, otherwise use sorted rows
  const displayRows = pagination?.mode === "client" ? paginatedRows : sortedRows;
  const totalRows = pagination?.mode === "client" ? sortedRows.length : (pagination?.total ?? sortedRows.length);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const handleSort = useCallback(
    (columnId: string) => {
      if (!sorting) return;
      sorting.onChange({
        columnId,
        direction:
          sorting.sort?.columnId === columnId &&
          sorting.sort?.direction === "asc"
            ? "desc"
            : "asc",
      });
    },
    [sorting]
  );

  const shouldVirtualize = useMemo(
    () => height !== undefined && displayRows.length > 100,
    [height, displayRows.length]
  );

  const visibleRange = useMemo(() => {
    if (!shouldVirtualize || displayRows.length === 0) {
      return { start: 0, end: displayRows.length };
    }

    const start = Math.max(
      0,
      Math.floor((scrollTop - HEADER_HEIGHT) / ROW_HEIGHT) - OVERSCAN
    );
    const end = Math.min(
      displayRows.length,
      Math.ceil(
        (scrollTop + (height || 0) - HEADER_HEIGHT) / ROW_HEIGHT
      ) + OVERSCAN
    );

    return { start, end };
  }, [scrollTop, height, displayRows.length, shouldVirtualize]);

  const visibleRows = useMemo(
    () => displayRows.slice(visibleRange.start, visibleRange.end),
    [displayRows, visibleRange.start, visibleRange.end]
  );

  const totalHeight = useMemo(
    () => displayRows.length * ROW_HEIGHT,
    [displayRows.length]
  );

  const offsetY = useMemo(
    () => visibleRange.start * ROW_HEIGHT,
    [visibleRange.start]
  );

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollTop;
    }
  }, []);

  // Auto-refresh logic
  useEffect(() => {
    if (autoRefresh?.enabled && autoRefresh.interval > 0) {
      // Set initial refresh time
      setLastRefreshed(new Date());
      
      // Set up interval
      refreshIntervalRef.current = setInterval(async () => {
        try {
          await autoRefresh.onRefresh();
          setLastRefreshed(new Date());
        } catch (error) {
          console.error("Auto-refresh error:", error);
        }
      }, autoRefresh.interval);

      return () => {
        if (refreshIntervalRef.current) {
          clearInterval(refreshIntervalRef.current);
        }
      };
    } else {
      // Clear interval if disabled
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
    }
  }, [autoRefresh?.enabled, autoRefresh?.interval, autoRefresh?.onRefresh]);

  // Format last refreshed time
  const formatLastRefreshed = useCallback((date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    
    if (seconds < 10) return "Just now";
    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    return date.toLocaleTimeString();
  }, []);

  const getSortClass = useCallback(
    (columnId: string) => {
      if (!sorting?.sort || sorting.sort.columnId !== columnId) {
        return "sortable";
      }
      return sorting.sort.direction === "asc" ? "sort-asc" : "sort-desc";
    },
    [sorting]
  );

  const handleSelectAll = useCallback(() => {
    const allSelected = selectedRows.length === sortedRows.length;
    const newSelection = allSelected ? [] : [...sortedRows];
    if (!isControlled) {
      setInternalSelectedRows(newSelection);
    }
    onSelectionChange?.(newSelection);
  }, [selectedRows, sortedRows, isControlled, onSelectionChange]);

  const handleSelectRow = useCallback((row: T) => {
    const rowId = getRowId(row, sortedRows.indexOf(row));
    const isSelected = selectedRows.some((r) => getRowId(r, sortedRows.indexOf(r)) === rowId);
    const newSelection = isSelected
      ? selectedRows.filter((r) => getRowId(r, sortedRows.indexOf(r)) !== rowId)
      : [...selectedRows, row];
    
    if (!isControlled) {
      setInternalSelectedRows(newSelection);
    }
    onSelectionChange?.(newSelection);
  }, [selectedRows, sortedRows, getRowId, isControlled, onSelectionChange]);

  const isRowSelected = useCallback((row: T) => {
    const rowId = getRowId(row, sortedRows.indexOf(row));
    return selectedRows.some((r) => getRowId(r, sortedRows.indexOf(r)) === rowId);
  }, [selectedRows, sortedRows, getRowId]);

  const isAllSelected = useMemo(() => {
    return sortedRows.length > 0 && selectedRows.length === sortedRows.length;
  }, [sortedRows.length, selectedRows.length]);

  const isIndeterminate = useMemo(() => {
    return selectedRows.length > 0 && selectedRows.length < sortedRows.length;
  }, [selectedRows.length, sortedRows.length]);

  if (loading) {
    return (
      <div
        className={`balanceui-datatable-wrapper ${className || ""}`}
        style={{ ...tableWrapperStyle(height), ...style }}
      >
        <div className="balanceui-datatable-scroll-container" style={scrollContainerStyle}>
          <ShimmerTable columns={columns.length} rows={5} />
        </div>
      </div>
    );
  }

  if (displayRows.length === 0 && !loading) {
    return (
      <div
        className={`balanceui-datatable-wrapper ${className || ""}`}
        style={{ ...tableWrapperStyle(height), ...style }}
      >
        <div className="balanceui-datatable-scroll-container" style={scrollContainerStyle}>
          <div className="balanceui-datatable-empty" style={emptyStyle}>
            {emptyMessage}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`balanceui-datatable-wrapper ${className || ""}`}
      style={{ 
        ...tableWrapperStyle(height), 
        ...style,
        boxShadow: "var(--bu-elevation-4)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--bu-elevation-6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--bu-elevation-4)";
      }}
    >
      {(showRecordCount || autoRefresh?.enabled) && (
        <div
          style={{
            padding: "0.75rem 1rem",
            borderBottom: "1px solid var(--bu-border, rgba(0, 0, 0, 0.1))",
            fontSize: "0.875rem",
            color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
            backgroundColor: "var(--bu-surface-variant, rgba(0, 0, 0, 0.02))",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            {showRecordCount && (
              <span>
                {recordCountLabel}: {totalRows}
                {selectable && selectedRows.length > 0 && (
                  <span style={{ marginLeft: "0.5rem", color: "var(--bu-primary, #1976d2)" }}>
                    ({selectedRows.length} selected)
                  </span>
                )}
              </span>
            )}
            {pagination?.showPageSizeSelector && pagination && (
              <PageSizeSelector
                value={pagination.pageSize}
                options={pagination.pageSizeOptions || [10, 20, 50, 100]}
                onChange={(newPageSize) => pagination.onChange(1, newPageSize)}
                label="Items per page:"
              />
            )}
          </div>
          {autoRefresh?.enabled && lastRefreshed && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.75rem",
                color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
              }}
            >
              <Icon name="refresh" size="sm" />
              <span>Last refreshed: {formatLastRefreshed(lastRefreshed)}</span>
            </div>
          )}
        </div>
      )}
      <div
        ref={scrollContainerRef}
        className="balanceui-datatable-scroll-container"
        style={scrollContainerStyle}
        onScroll={handleScroll}
      >
        <table className="balanceui-datatable-table" style={tableStyle}>
          <thead className="balanceui-datatable-thead">
            <tr>
              {selectable && (
                <th
                  style={{
                    ...thStyle,
                    width: "3rem",
                    minWidth: "3rem",
                    maxWidth: "3rem",
                    textAlign: "center",
                  }}
                >
                  <Checkbox
                    checked={isAllSelected}
                    indeterminate={isIndeterminate}
                    onChange={handleSelectAll}
                    size="sm"
                  />
                </th>
              )}
              {columns.map((col, i) => (
                <th
                  key={col.id}
                  className={`balanceui-datatable-th ${
                    sorting && col.sortable !== false ? `sortable ${getSortClass(col.id)}` : ""
                  } ${
                    stickyColumns.includes(i)
                      ? "balanceui-datatable-sticky balanceui-datatable-sticky-left"
                      : ""
                  }`}
                  style={{
                    ...thStyle,
                    cursor: sorting && col.sortable !== false ? "pointer" : "default",
                    ...(stickyColumns.includes(i) ? stickyCellStyle(0) : {}),
                    ...(col.width 
                      ? { width: `${col.width}px`, minWidth: `${col.width}px`, maxWidth: `${col.width}px` } 
                      : { width: `${100 / columns.length}%` }),
                  }}
                  onClick={() => sorting && col.sortable !== false && handleSort(col.id)}
                >
                  <span style={{ flex: 1 }}>{col.header}</span>
                  {sorting && col.sortable !== false && (
                    <span className="balanceui-datatable-th-sort-icon">
                      {getSortClass(col.id) === "sort-asc" ? (
                        <Icon name="arrow_up" size="sm" />
                      ) : getSortClass(col.id) === "sort-desc" ? (
                        <Icon name="arrow_down" size="sm" />
                      ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px", alignItems: "center" }}>
                          <Icon name="arrow_up" size="xs" style={{ opacity: 0.3, lineHeight: 0 }} />
                          <Icon name="arrow_down" size="xs" style={{ opacity: 0.3, lineHeight: 0, marginTop: "-4px" }} />
                        </div>
                      )}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {shouldVirtualize ? (
              <>
                {offsetY > 0 && (
                  <tr>
                    <td
                      colSpan={columns.length}
                      style={{ height: offsetY, padding: 0, border: 0, lineHeight: 0 }}
                    />
                  </tr>
                )}
                {visibleRows.map((row, ri) => {
                  const actualIndex = visibleRange.start + ri;
                  const rowId = getRowId(row, actualIndex);
                  return (
                    <tr
                      key={rowId}
                      className="balanceui-datatable-virtual-row"
                      style={{ height: ROW_HEIGHT }}
                    >
                      {selectable && (
                        <td
                          style={{
                            ...tdStyle,
                            width: "3rem",
                            minWidth: "3rem",
                            maxWidth: "3rem",
                            textAlign: "center",
                          }}
                        >
                          <Checkbox
                            checked={isRowSelected(row)}
                            onChange={() => handleSelectRow(row)}
                            size="sm"
                          />
                        </td>
                      )}
                      {columns.map((col, ci) => (
                        <td
                          key={col.id}
                          className={
                            stickyColumns.includes(ci)
                              ? "balanceui-datatable-sticky balanceui-datatable-sticky-left"
                              : ""
                          }
                          style={{
                            ...tdStyle,
                            ...(stickyColumns.includes(ci)
                              ? stickyCellStyle(0)
                              : {}),
                            ...(col.width 
                              ? { width: `${col.width}px`, minWidth: `${col.width}px`, maxWidth: `${col.width}px` } 
                              : { width: `${100 / columns.length}%` }),
                          }}
                        >
                          {col.render
                            ? col.render(row)
                            : col.accessor
                            ? (row as any)[col.accessor]
                            : null}
                        </td>
                      ))}
                    </tr>
                  );
                })}
                {totalHeight - offsetY - visibleRows.length * ROW_HEIGHT > 0 && (
                  <tr>
                    <td
                      colSpan={columns.length}
                      style={{
                        height: totalHeight - offsetY - visibleRows.length * ROW_HEIGHT,
                        padding: 0,
                        border: 0,
                        lineHeight: 0,
                      }}
                    />
                  </tr>
                )}
              </>
            ) : (
              displayRows.map((row, ri) => {
                const rowId = getRowId(row, ri);
                return (
                <tr key={rowId}>
                  {selectable && (
                    <td
                      style={{
                        ...tdStyle,
                        width: "3rem",
                        minWidth: "3rem",
                        maxWidth: "3rem",
                        textAlign: "center",
                      }}
                    >
                      <Checkbox
                        checked={isRowSelected(row)}
                        onChange={() => handleSelectRow(row)}
                        size="sm"
                      />
                    </td>
                  )}
                  {columns.map((col, ci) => (
                    <td
                      key={col.id}
                      className={
                        stickyColumns.includes(ci)
                          ? "balanceui-datatable-sticky balanceui-datatable-sticky-left"
                          : ""
                      }
                      style={{
                        ...tdStyle,
                        ...(stickyColumns.includes(ci)
                          ? stickyCellStyle(0)
                          : {}),
                        ...(col.width ? { width: col.width, minWidth: col.width, maxWidth: col.width } : {}),
                      }}
                    >
                      {col.render
                        ? col.render(row)
                        : col.accessor
                        ? (row as any)[col.accessor]
                        : null}
                    </td>
                  ))}
                </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {pagination && (
        <div
          style={{
            padding: "0.75rem 1rem",
            borderTop: "1px solid var(--bu-border, rgba(0, 0, 0, 0.1))",
            backgroundColor: "var(--bu-surface-variant, rgba(0, 0, 0, 0.02))",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <Pagination
            page={pagination.page}
            pageSize={pagination.pageSize}
            total={totalRows}
            onChange={(newPage) => pagination.onChange(newPage, pagination.pageSize)}
          />
          {!pagination.showPageSizeSelector && (
            <div style={{ fontSize: "0.875rem", color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
              Showing {((pagination.page - 1) * pagination.pageSize) + 1} to {Math.min(pagination.page * pagination.pageSize, totalRows)} of {totalRows}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

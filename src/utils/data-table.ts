/**
 * DataTable utility functions
 */

/**
 * Sort data array based on column configuration
 * 
 * Sorts an array of data objects based on a column ID and sort direction.
 * Returns the original array if no sort configuration is provided or if
 * the column is not found.
 * 
 * @template T - The type of data objects
 * @param {T[]} data - Array of data objects to sort
 * @param {{ columnId: string, direction: "asc" | "desc" }} sort - Sort configuration (optional)
 * @param {any[]} columns - Array of column definitions with id and accessor properties (optional)
 * @returns {T[]} Sorted array (or original array if no sort applied)
 * 
 * @example
 * ```typescript
 * const data = [{ name: 'Bob', age: 30 }, { name: 'Alice', age: 25 }];
 * const columns = [{ id: 'name', accessor: 'name' }, { id: 'age', accessor: 'age' }];
 * 
 * sortData(data, { columnId: 'age', direction: 'asc' }, columns);
 * // [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }]
 * ```
 */
export const sortData = <T,>(
  data: T[],
  sort?: { columnId: string; direction: "asc" | "desc" },
  columns?: any[]
) => {
  if (!sort) return data;

  const col = columns?.find((c) => c.id === sort.columnId);
  if (!col?.accessor) return data;

  return [...data].sort((a: any, b: any) => {
    const x = a[col.accessor];
    const y = b[col.accessor];
    if (x === y) return 0;
    return sort.direction === "asc"
      ? x > y ? 1 : -1
      : x < y ? 1 : -1;
  });
};

/**
 * Filter data array based on filter values
 * 
 * Filters an array of data objects based on filter values for specific columns.
 * Uses case-insensitive string matching. Empty or null filter values are ignored.
 * 
 * @template T - The type of data objects
 * @param {T[]} data - Array of data objects to filter
 * @param {Record<string, string | number | null>} filters - Object with column IDs as keys and filter values as values
 * @param {any[]} columns - Array of column definitions with id and accessor properties (optional)
 * @returns {T[]} Filtered array
 * 
 * @example
 * ```typescript
 * const data = [
 *   { name: 'Alice', role: 'admin' },
 *   { name: 'Bob', role: 'user' },
 *   { name: 'Charlie', role: 'admin' }
 * ];
 * const columns = [{ id: 'name', accessor: 'name' }, { id: 'role', accessor: 'role' }];
 * 
 * filterData(data, { name: 'alice', role: 'admin' }, columns);
 * // [{ name: 'Alice', role: 'admin' }]
 * ```
 */
export const filterData = <T,>(
  data: T[],
  filters: Record<string, string | number | null>,
  columns?: any[]
): T[] => {
  if (!filters || Object.keys(filters).length === 0) return data;

  return data.filter((row: any) => {
    return Object.entries(filters).every(([columnId, filterValue]) => {
      if (filterValue === null || filterValue === "" || filterValue === undefined) {
        return true; // No filter applied for this column
      }

      const col = columns?.find((c) => c.id === columnId);
      if (!col) return true;

      const cellValue = col.accessor ? row[col.accessor] : null;
      if (cellValue === null || cellValue === undefined) return false;

      // Simple text filter (case-insensitive)
      const cellStr = String(cellValue).toLowerCase();
      const filterStr = String(filterValue).toLowerCase();
      return cellStr.includes(filterStr);
    });
  });
};


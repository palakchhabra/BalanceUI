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


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


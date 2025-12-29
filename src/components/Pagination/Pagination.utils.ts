export const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => i + start);

export const getPaginationRange = ({
  totalPages,
  page,
  siblingCount,
  boundaryCount,
}: {
  totalPages: number;
  page: number;
  siblingCount: number;
  boundaryCount: number;
}) => {
  const startPages = range(1, boundaryCount);
  const endPages = range(
    Math.max(totalPages - boundaryCount + 1, boundaryCount + 1),
    totalPages
  );

  const siblingsStart = Math.max(
    Math.min(
      page - siblingCount,
      totalPages - boundaryCount - siblingCount * 2 - 1
    ),
    boundaryCount + 2
  );

  const siblingsEnd = Math.min(
    Math.max(
      page + siblingCount,
      boundaryCount + siblingCount * 2 + 2
    ),
    endPages[0] - 2
  );

  const pages: (number | "dots")[] = [];

  pages.push(...startPages);

  if (siblingsStart > boundaryCount + 2) pages.push("dots");

  pages.push(...range(siblingsStart, siblingsEnd));

  if (siblingsEnd < totalPages - boundaryCount - 1) pages.push("dots");

  pages.push(...endPages);

  return pages;
};

/**
 * Pagination utility functions
 */

import { range } from './array';

// Re-export range for backward compatibility
export { range };

/**
 * Generate pagination range with ellipsis
 * 
 * Creates an array of page numbers for pagination display, including:
 * - Boundary pages (first/last pages)
 * - Sibling pages (around current page)
 * - Ellipsis markers ("dots") for gaps
 * 
 * @param {Object} options - Pagination configuration
 * @param {number} options.totalPages - Total number of pages
 * @param {number} options.page - Current page (1-indexed)
 * @param {number} options.siblingCount - Number of sibling pages to show on each side of current page
 * @param {number} options.boundaryCount - Number of pages to show at the start and end
 * @returns {(number | "dots")[]} Array of page numbers and "dots" markers
 * 
 * @example
 * ```typescript
 * getPaginationRange({
 *   totalPages: 10,
 *   page: 5,
 *   siblingCount: 1,
 *   boundaryCount: 1
 * });
 * // [1, "dots", 4, 5, 6, "dots", 10]
 * 
 * getPaginationRange({
 *   totalPages: 5,
 *   page: 2,
 *   siblingCount: 1,
 *   boundaryCount: 1
 * });
 * // [1, 2, 3, 4, 5]
 * ```
 */
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


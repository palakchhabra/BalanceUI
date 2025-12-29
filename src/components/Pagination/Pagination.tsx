import { PaginationProps } from "./Pagination.types";
import {
  containerStyle,
  buttonStyle,
  dotsStyle,
} from "./Pagination.styles";
import { getPaginationRange } from "./Pagination.utils";

export const Pagination = ({
  page,
  pageSize,
  total,
  siblingCount = 1,
  boundaryCount = 1,
  onChange,
  className,
  style,
}: PaginationProps) => {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  const pages = getPaginationRange({
    totalPages,
    page,
    siblingCount,
    boundaryCount,
  });

  return (
    <div
      className={className}
      style={{ ...containerStyle, ...style }}
    >
      {/* Prev */}
      <button
        style={buttonStyle()}
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        ‹
      </button>

      {pages.map((p, i) =>
        p === "dots" ? (
          <span key={i} style={dotsStyle}>
            …
          </span>
        ) : (
          <button
            key={p}
            style={buttonStyle(p === page)}
            onClick={() => onChange(p)}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        style={buttonStyle()}
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        ›
      </button>
    </div>
  );
};

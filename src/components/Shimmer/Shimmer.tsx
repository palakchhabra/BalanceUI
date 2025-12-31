import { shimmerStyle } from "./Shimmer.base";
import "./Shimmer.css";

export type ShimmerPattern = "avatar" | "form" | "table" | "cards" | "list" | "profile" | "article";

export interface ShimmerProps {
  pattern?: ShimmerPattern;
  count?: number; // For cards, list items, etc.
  rows?: number; // For table rows
  columns?: number; // For table columns
  className?: string;
  style?: React.CSSProperties;
}

export const Shimmer = ({
  pattern = "cards",
  count = 3,
  rows = 5,
  columns = 4,
  className,
  style,
}: ShimmerProps) => {
  const baseShimmerStyle: React.CSSProperties = {
    ...shimmerStyle,
  };

  // Avatar Pattern - Avatar with name and description
  if (pattern === "avatar") {
    return (
      <div className={`balanceui-shimmer-pattern balanceui-shimmer-avatar ${className || ""}`} style={style}>
        <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "48px", height: "48px", borderRadius: "50%" }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "60%", height: "16px", borderRadius: "4px" }} />
          <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "40%", height: "14px", borderRadius: "4px" }} />
        </div>
      </div>
    );
  }

  // Form Pattern - Multiple form fields
  if (pattern === "form") {
    return (
      <div className={`balanceui-shimmer-pattern balanceui-shimmer-form ${className || ""}`} style={style}>
        {Array.from({ length: count || 4 }).map((_, index) => (
          <div key={index} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "30%", height: "14px", borderRadius: "4px" }} />
            <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "100%", height: "40px", borderRadius: "4px" }} />
          </div>
        ))}
      </div>
    );
  }

  // Table Pattern
  if (pattern === "table") {
    return (
      <div className={`balanceui-shimmer-pattern balanceui-shimmer-table ${className || ""}`} style={style}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {Array.from({ length: columns }).map((_, c) => (
                <th key={c} style={{ padding: "12px", textAlign: "left" }}>
                  <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "80%", height: "16px", borderRadius: "4px" }} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, r) => (
              <tr key={r}>
                {Array.from({ length: columns }).map((_, c) => (
                  <td key={c} style={{ padding: "12px" }}>
                    <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "90%", height: "14px", borderRadius: "4px" }} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Cards Pattern - Multiple cards (default 3, configurable)
  if (pattern === "cards") {
    return (
      <div className={`balanceui-shimmer-pattern balanceui-shimmer-cards ${className || ""}`} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem", ...style }}>
        {Array.from({ length: count || 3 }).map((_, index) => (
          <div key={index} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Card Image */}
            <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "100%", height: "180px", borderRadius: "8px 8px 0 0" }} />
            {/* Card Content */}
            <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "80%", height: "20px", borderRadius: "4px" }} />
              <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "100%", height: "14px", borderRadius: "4px" }} />
              <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "60%", height: "14px", borderRadius: "4px" }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // List Pattern - List items with avatar
  if (pattern === "list") {
    return (
      <div className={`balanceui-shimmer-pattern balanceui-shimmer-list ${className || ""}`} style={{ display: "flex", flexDirection: "column", gap: "1rem", ...style }}>
        {Array.from({ length: count || 3 }).map((_, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "40px", height: "40px", borderRadius: "50%" }} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "70%", height: "16px", borderRadius: "4px" }} />
              <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "50%", height: "14px", borderRadius: "4px" }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Profile Pattern - Profile page layout
  if (pattern === "profile") {
    return (
      <div className={`balanceui-shimmer-pattern balanceui-shimmer-profile ${className || ""}`} style={style}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
          <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "120px", height: "120px", borderRadius: "50%" }} />
          <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "200px", height: "24px", borderRadius: "4px" }} />
          <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "150px", height: "16px", borderRadius: "4px" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "30%", height: "16px", borderRadius: "4px" }} />
              <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "100%", height: "40px", borderRadius: "4px" }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Article Pattern - Article/blog post layout
  if (pattern === "article") {
    return (
      <div className={`balanceui-shimmer-pattern balanceui-shimmer-article ${className || ""}`} style={style}>
        <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "100%", height: "300px", borderRadius: "8px", marginBottom: "1.5rem" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "80%", height: "32px", borderRadius: "4px" }} />
          <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "100%", height: "16px", borderRadius: "4px" }} />
          <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "100%", height: "16px", borderRadius: "4px" }} />
          <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "90%", height: "16px", borderRadius: "4px" }} />
          <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "100%", height: "16px", borderRadius: "4px" }} />
          <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "85%", height: "16px", borderRadius: "4px" }} />
        </div>
      </div>
    );
  }

  // Default to cards
  return (
    <div className={`balanceui-shimmer-pattern balanceui-shimmer-cards ${className || ""}`} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem", ...style }}>
      {Array.from({ length: count || 3 }).map((_, index) => (
        <div key={index} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "100%", height: "180px", borderRadius: "8px 8px 0 0" }} />
          <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "80%", height: "20px", borderRadius: "4px" }} />
            <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "100%", height: "14px", borderRadius: "4px" }} />
            <div className="balanceui-shimmer" style={{ ...baseShimmerStyle, width: "60%", height: "14px", borderRadius: "4px" }} />
          </div>
        </div>
      ))}
    </div>
  );
};

import { shimmerStyle } from "./Shimmer.base";

export const ShimmerTable = ({
  rows,
  columns,
}: {
  rows: number;
  columns: number;
}) => {
  return (
    <table style={{ width: "100%" }}>
      <tbody>
        {Array.from({ length: rows }).map((_, r) => (
          <tr key={r}>
            {Array.from({ length: columns }).map((_, c) => (
              <td
                key={c}
                style={{
                  padding: 10,
                }}
              >
                <div
                  style={{
                    height: 14,
                    borderRadius: 4,
                    ...shimmerStyle,
                  }}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

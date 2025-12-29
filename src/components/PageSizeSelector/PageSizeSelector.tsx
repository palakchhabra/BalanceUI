import { PageSizeSelectorProps } from "./PageSizeSelector.types";
import { selectorStyle } from "./PageSizeSelector.styles";

export const PageSizeSelector = ({
  value,
  options = [10, 20, 50, 100],
  onChange,
  className,
  style,
}: PageSizeSelectorProps) => {
  return (
    <select
      className={className}
      style={{ ...selectorStyle, ...style }}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o} / page
        </option>
      ))}
    </select>
  );
};

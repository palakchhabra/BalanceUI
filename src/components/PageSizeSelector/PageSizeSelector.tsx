import { PageSizeSelectorProps } from "./PageSizeSelector.types";
import { selectorStyle } from "./PageSizeSelector.styles";
import "./PageSizeSelector.css";

export const PageSizeSelector = ({
  value,
  options = [10, 20, 50, 100],
  onChange,
  label = "Items per page:",
  showLabel = true,
  className,
  style,
}: PageSizeSelectorProps) => {
  return (
    <div className={`balanceui-pagesizeselector-wrapper ${className || ""}`} style={style}>
      {showLabel && (
        <label className="balanceui-pagesizeselector-label">{label}</label>
      )}
      <div className="balanceui-pagesizeselector-container">
        <select
          className="balanceui-pagesizeselector"
          style={selectorStyle}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span className="balanceui-pagesizeselector-arrow">▼</span>
      </div>
    </div>
  );
};

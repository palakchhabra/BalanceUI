import { TabsProps } from "./Tabs.types";
import { tabListStyle, tabStyle } from "./Tabs.styles";

export const Tabs = ({ tabs, value, onChange }: TabsProps) => {
  const active = tabs.find((t) => t.id === value);

  return (
    <>
      <div style={tabListStyle}>
        {tabs.map((t) => (
          <div
            key={t.id}
            style={tabStyle(t.id === value)}
            onClick={() => onChange(t.id)}
          >
            {t.label}
          </div>
        ))}
      </div>

      <div style={{ 
        padding: 16,
      }}>
        {active?.content}
      </div>
    </>
  );
};

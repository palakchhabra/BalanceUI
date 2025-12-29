import { AccordionProps } from "./Accordion.types";
import { headerStyle, contentStyle } from "./Accordion.styles";

export const Accordion = ({
  items,
  openId,
  onChange,
}: AccordionProps) => {
  return (
    <div>
      {items.map((i) => (
        <div key={i.id}>
          <div
            style={headerStyle}
            onClick={() =>
              onChange?.(openId === i.id ? "" : i.id)
            }
          >
            {i.title}
          </div>

          {openId === i.id && (
            <div style={contentStyle}>{i.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

import { AccordionProps } from "./Accordion.types";
import "./Accordion.css";

const ChevronDownIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 10L12 15L17 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Accordion = ({
  items,
  openId,
  onChange,
  allowMultiple = false,
}: AccordionProps) => {
  const isOpen = (id: string) => {
    if (allowMultiple) {
      // For multiple, openId could be an array or comma-separated string
      if (typeof openId === 'string') {
        return openId.split(',').includes(id);
      }
      return false;
    }
    return openId === id;
  };

  const handleToggle = (id: string) => {
    if (!onChange) return;

    if (allowMultiple) {
      const currentOpen = typeof openId === 'string' ? openId.split(',').filter(Boolean) : [];
      const isCurrentlyOpen = currentOpen.includes(id);
      
      if (isCurrentlyOpen) {
        onChange(currentOpen.filter(openId => openId !== id).join(','));
      } else {
        onChange([...currentOpen, id].join(','));
      }
    } else {
      onChange(isOpen(id) ? "" : id);
    }
  };

  return (
    <div className="balanceui-accordion">
      {items.map((item) => {
        const expanded = isOpen(item.id);
        return (
          <div key={item.id} className="balanceui-accordion-item">
            <div
              className="balanceui-accordion-header"
              onClick={() => handleToggle(item.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleToggle(item.id);
                }
              }}
              aria-expanded={expanded}
              aria-controls={`accordion-content-${item.id}`}
            >
              <div className="balanceui-accordion-title">{item.title}</div>
              <div className={`balanceui-accordion-icon ${expanded ? 'expanded' : ''}`}>
                <ChevronDownIcon />
              </div>
            </div>

            <div
              id={`accordion-content-${item.id}`}
              className={`balanceui-accordion-content ${expanded ? 'expanded' : ''}`}
              role="region"
              aria-labelledby={`accordion-header-${item.id}`}
            >
              <div style={{ paddingTop: expanded ? '16px' : '0' }}>
                {item.content}
              </div>
              {item.actions && expanded && (
                <div className="balanceui-accordion-actions">
                  {item.actions}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  actions?: React.ReactNode; // Optional actions section with buttons
}

export interface AccordionProps {
  items: AccordionItem[];
  openId?: string;
  onChange?: (id: string) => void;
  allowMultiple?: boolean; // Allow multiple accordions to be open at once
}

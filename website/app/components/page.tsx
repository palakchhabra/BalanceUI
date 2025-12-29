"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Badge } from "@balanceui/core";

const components = [
  {
    name: "Button",
    description: "Versatile button component with multiple variants and sizes",
    category: "Actions",
    href: "/components/button",
  },
  {
    name: "Input",
    description: "Text input field with validation and error states",
    category: "Forms",
    href: "/components/input",
  },
  {
    name: "Card",
    description: "Container component for displaying content in cards",
    category: "Layout",
    href: "/components/card",
  },
  {
    name: "Modal",
    description: "Dialog component for displaying modal content",
    category: "Overlay",
    href: "/components/modal",
  },
  {
    name: "Dialog",
    description: "Accessible dialog component for user interactions",
    category: "Overlay",
    href: "/components/dialog",
  },
  {
    name: "DataTable",
    description: "Feature-rich table component with sorting and pagination",
    category: "Data Display",
    href: "/components/datatable",
  },
  {
    name: "FormField",
    description: "Complete form field with label, input, and error handling",
    category: "Forms",
    href: "/components/formfield",
  },
  {
    name: "Select",
    description: "Dropdown select component with search and multi-select",
    category: "Forms",
    href: "/components/select",
  },
  {
    name: "MultiSelect",
    description: "Multi-select dropdown with Material Design chips/tags UI",
    category: "Forms",
    href: "/components/multiselect",
  },
  {
    name: "TextArea",
    description: "Multi-line text input component",
    category: "Forms",
    href: "/components/textarea",
  },
  {
    name: "Badge",
    description: "Small status indicator or label component",
    category: "Display",
    href: "/components/badge",
  },
  {
    name: "Toast",
    description: "Notification toast for user feedback",
    category: "Feedback",
    href: "/components/toast",
  },
  {
    name: "Drawer",
    description: "Slide-out panel component",
    category: "Overlay",
    href: "/components/drawer",
  },
  {
    name: "SideBar",
    description: "Sidebar navigation component",
    category: "Navigation",
    href: "/components/sidebar",
  },
  {
    name: "Pagination",
    description: "Pagination controls for navigating through pages",
    category: "Navigation",
    href: "/components/pagination",
  },
  {
    name: "PageSizeSelector",
    description: "Component for selecting items per page",
    category: "Forms",
    href: "/components/pagesizeselector",
  },
  {
    name: "Progress",
    description: "Progress bar and circular progress indicators",
    category: "Feedback",
    href: "/components/progress",
  },
  {
    name: "Shimmer",
    description: "Loading skeleton component with shimmer effect",
    category: "Feedback",
    href: "/components/shimmer",
  },
  {
    name: "Tree",
    description: "Hierarchical tree view component",
    category: "Data Display",
    href: "/components/tree",
  },
  {
    name: "Accordion",
    description: "Collapsible content sections",
    category: "Layout",
    href: "/components/accordion",
  },
  {
    name: "Tabs",
    description: "Tabbed interface component",
    category: "Navigation",
    href: "/components/tabs",
  },
  {
    name: "Stepper",
    description: "Step indicator for multi-step processes",
    category: "Navigation",
    href: "/components/stepper",
  },
  {
    name: "Toggle",
    description: "Toggle switch component",
    category: "Forms",
    href: "/components/toggle",
  },
  {
    name: "Tension",
    description: "Tension control component",
    category: "Forms",
    href: "/components/tension",
  },
  {
    name: "TensionRange",
    description: "Range input for tension values",
    category: "Forms",
    href: "/components/tensionrange",
  },
  {
    name: "DatePicker",
    description: "Date picker with single date and date range selection support",
    category: "Forms",
    href: "/components/datepicker",
  },
  {
    name: "TimePicker",
    description: "Time picker component with 12h/24h format support",
    category: "Forms",
    href: "/components/timepicker",
  },
  {
    name: "Checkbox",
    description: "Animated checkbox component with indeterminate state",
    category: "Forms",
    href: "/components/checkbox",
  },
  {
    name: "BottomSheet",
    description: "Bottom sheet component for mobile-friendly overlays",
    category: "Overlay",
    href: "/components/bottomsheet",
  },
  {
    name: "ButtonToggle",
    description: "Toggle button group component with multiple selection",
    category: "Actions",
    href: "/components/buttontoggle",
  },
  {
    name: "Toolbar",
    description: "Toolbar component with icons and actions",
    category: "Navigation",
    href: "/components/toolbar",
  },
  {
    name: "List",
    description: "List component with avatars, icons, and actions",
    category: "Data Display",
    href: "/components/list",
  },
  {
    name: "Icon",
    description: "Icon component system with common icons",
    category: "Display",
    href: "/components/icon",
  },
  {
    name: "VideoTrimmer",
    description: "Video and audio trimmer component like Instagram",
    category: "Media",
    href: "/components/videotrimmer",
  },
  {
    name: "Theme Preview",
    description: "Preview all components with different themes",
    category: "Display",
    href: "/components/theme-preview",
  },
];

const categories = [
  "All",
  "Actions",
  "Forms",
  "Layout",
  "Overlay",
  "Data Display",
  "Display",
  "Feedback",
  "Navigation",
  "Media",
];

export default function ComponentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredComponents =
    selectedCategory === "All"
      ? components
      : components.filter((component) => component.category === selectedCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:ml-64">
      <div className="mb-8 sm:mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#000000" }}>
          Components
        </h1>
        <p className="mt-3 text-base sm:mt-4 sm:text-lg" style={{ color: "#333333" }}>
          Browse our collection of {components.length} carefully crafted React
          components. Each component is fully typed, accessible, and
          customizable.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2 sm:mb-8">
        {categories.map((category, index) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: "0.5rem 1rem",
              cursor: "pointer",
              fontSize: "0.875rem",
              border: "none",
              background: selectedCategory === category
                ? "var(--bu-primary, #1976d2)"
                : "transparent",
              color: selectedCategory === category
                ? "var(--bu-on-primary, #ffffff)"
                : "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
              borderRadius: "var(--bu-radius-md, 4px)",
              fontWeight: selectedCategory === category ? 500 : 400,
              transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              overflow: "hidden",
              animation: `balanceui-fade-in 200ms cubic-bezier(0.4, 0, 0.2, 1) ${index * 30}ms both`,
            }}
            className="sm:p-2 sm:text-sm"
            onMouseEnter={(e) => {
              if (selectedCategory !== category) {
                e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.04)";
                e.currentTarget.style.color = "var(--bu-fg, rgba(0, 0, 0, 0.87))";
              }
            }}
            onMouseLeave={(e) => {
              if (selectedCategory !== category) {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))";
              }
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredComponents.map((component, index) => (
          <Link
            key={component.href}
            href={component.href}
            className="group"
            style={{
              animation: `balanceui-fade-in 300ms cubic-bezier(0.4, 0, 0.2, 1) ${index * 50}ms both`,
              textDecoration: "none",
            }}
          >
            <Card
              variant="elevated"
              elevation={2}
              hoverable={true}
              style={{
                padding: "clamp(1rem, 2vw, 1.5rem)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 280ms cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
              className="group-hover:elevation-4"
              onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                const target = e.currentTarget;
                target.style.transform = "translateY(-4px)";
                target.style.boxShadow = 
                  "0px 4px 5px -2px rgba(0, 0, 0, 0.2), " +
                  "0px 7px 10px 1px rgba(0, 0, 0, 0.14), " +
                  "0px 2px 16px 1px rgba(0, 0, 0, 0.12)";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                const target = e.currentTarget;
                target.style.transform = "translateY(0)";
                target.style.boxShadow = 
                  "0px 3px 1px -2px rgba(0, 0, 0, 0.2), " +
                  "0px 2px 2px 0px rgba(0, 0, 0, 0.14), " +
                  "0px 1px 5px 0px rgba(0, 0, 0, 0.12)";
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 
                  className="text-base font-semibold sm:text-lg lg:text-xl"
                  style={{ 
                    color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    transition: "color 200ms ease",
                  }}
                >
                  {component.name}
                </h3>
                <Badge
                  variant="soft"
                  style={{
                    fontSize: "0.625rem",
                    padding: "0.125rem 0.375rem",
                    transition: "all 200ms ease",
                  }}
                  className="sm:text-xs sm:p-1"
                >
                  {component.category}
                </Badge>
              </div>
              <p 
                className="mt-2 flex-1 text-xs sm:text-sm"
                style={{ 
                  color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
                  lineHeight: 1.5,
                  transition: "color 200ms ease",
                }}
              >
                {component.description}
              </p>
              <div 
                className="mt-3 text-xs font-medium sm:mt-4 sm:text-sm flex items-center gap-1"
                style={{ 
                  color: "var(--bu-primary, #1976d2)",
                  transition: "all 200ms ease",
                }}
              >
                <span>View Details</span>
                <span 
                  style={{
                    display: "inline-block",
                    transition: "transform 200ms ease",
                  }}
                  className="group-hover:translate-x-1"
                >
                  →
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}


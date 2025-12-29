"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface ComponentItem {
  href: string;
  label: string;
  category?: string;
}

const componentCategories: Record<string, ComponentItem[]> = {
  "Forms": [
    { href: "/components/input", label: "Input" },
    { href: "/components/textarea", label: "Textarea" },
    { href: "/components/select", label: "Select" },
    { href: "/components/multiselect", label: "MultiSelect" },
    { href: "/components/checkbox", label: "Checkbox" },
    { href: "/components/toggle", label: "Toggle" },
    { href: "/components/datepicker", label: "DatePicker" },
    { href: "/components/timepicker", label: "TimePicker" },
    { href: "/components/formfield", label: "FormField" },
  ],
  "Actions": [
    { href: "/components/button", label: "Button" },
    { href: "/components/buttontoggle", label: "ButtonToggle" },
  ],
  "Layout": [
    { href: "/components/card", label: "Card" },
    { href: "/components/list", label: "List" },
    { href: "/components/tabs", label: "Tabs" },
    { href: "/components/accordion", label: "Accordion" },
    { href: "/components/sidebar", label: "Sidebar" },
  ],
  "Feedback": [
    { href: "/components/toast", label: "Toast" },
    { href: "/components/progress", label: "Progress" },
    { href: "/components/shimmer", label: "Shimmer" },
    { href: "/components/badge", label: "Badge" },
  ],
  "Overlays": [
    { href: "/components/dialog", label: "Dialog" },
    { href: "/components/modal", label: "Modal" },
    { href: "/components/drawer", label: "Drawer" },
    { href: "/components/bottomsheet", label: "BottomSheet" },
  ],
  "Data Display": [
    { href: "/components/datatable", label: "DataTable" },
    { href: "/components/tree", label: "Tree" },
    { href: "/components/pagination", label: "Pagination" },
    { href: "/components/pagesizeselector", label: "PageSizeSelector" },
  ],
  "Navigation": [
    { href: "/components/stepper", label: "Stepper" },
    { href: "/components/toolbar", label: "Toolbar" },
  ],
  "Media": [
    { href: "/components/videotrimmer", label: "VideoTrimmer" },
    { href: "/components/icon", label: "Icon" },
  ],
  "Other": [
    { href: "/components/tension", label: "Tension" },
    { href: "/components/tensionrange", label: "TensionRange" },
  ],
};

export function ComponentSidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const sidebarContent = (
    <div className="h-full overflow-y-auto" style={{ backgroundColor: "var(--bu-surface, #ffffff)" }}>
      <div 
        className="p-4 border-b"
        style={{ 
          borderColor: "var(--bu-border, rgba(0, 0, 0, 0.12))",
          backgroundColor: "var(--bu-surface-variant, rgba(0, 0, 0, 0.02))",
        }}
      >
        <h2 
          className="text-sm font-semibold uppercase tracking-wider"
          style={{ 
            color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
            fontWeight: 500,
            letterSpacing: "0.1em",
          }}
        >
          Components
        </h2>
      </div>
      <nav className="p-2">
        {Object.entries(componentCategories).map(([category, items], catIndex) => (
          <div key={category} className="mb-6" style={{ animation: `balanceui-fade-in 200ms cubic-bezier(0.4, 0, 0.2, 1) ${catIndex * 50}ms both` }}>
            <h3 
              className="px-3 py-2 text-xs font-semibold uppercase tracking-wider"
              style={{ 
                color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
                fontWeight: 500,
                letterSpacing: "0.05em",
              }}
            >
              {category}
            </h3>
            <ul className="space-y-1">
              {items.map((item, itemIndex) => {
                const isActive = pathname === item.href;
                return (
                  <li 
                    key={item.href}
                    style={{ animation: `balanceui-slide-in 200ms cubic-bezier(0.4, 0, 0.2, 1) ${(catIndex * 50) + (itemIndex * 20)}ms both` }}
                  >
                    <Link
                      href={item.href}
                      className="block px-3 py-2 text-sm rounded-md transition-all duration-200"
                      style={{
                        color: isActive
                          ? "var(--bu-primary, #1976d2)"
                          : "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
                        backgroundColor: isActive
                          ? "rgba(25, 118, 210, 0.08)"
                          : "transparent",
                        fontWeight: isActive ? 500 : 400,
                        textDecoration: "none",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.04)";
                          e.currentTarget.style.color = "var(--bu-fg, rgba(0, 0, 0, 0.87))";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))";
                        }
                      }}
                    >
                      {isActive && (
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "3px",
                            height: "60%",
                            backgroundColor: "var(--bu-primary, #1976d2)",
                            borderRadius: "0 2px 2px 0",
                            animation: "balanceui-slide-in 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                          }}
                        />
                      )}
                      <span style={{ marginLeft: isActive ? "4px" : "0", transition: "margin-left 200ms ease" }}>
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 z-40"
        style={{
          backgroundColor: "var(--bu-surface, #ffffff)",
          borderRight: "1px solid var(--bu-border, rgba(0, 0, 0, 0.12))",
          boxShadow: "1px 0 2px rgba(0, 0, 0, 0.05)",
        }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 z-50 p-3 bg-gray-900 dark:bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
        aria-label="Open component menu"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Sidebar Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          {/* Sidebar */}
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Components</h2>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                aria-label="Close menu"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}


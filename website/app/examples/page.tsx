"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, Button, Badge, Tabs, Stepper, Icon, Progress, List, Toolbar } from "@balanceui/core";

const examples = [
  {
    title: "Login Form",
    description: "Complete login form with validation using FormField and Button",
    href: "/examples/login-form",
    tags: ["Form", "Validation", "Input"],
  },
  {
    title: "Data Dashboard",
    description: "Dashboard with DataTable, Cards, and Charts",
    href: "/examples/dashboard",
    tags: ["Table", "Cards", "Data"],
  },
  {
    title: "Settings Page",
    description: "Settings interface with Tabs, Toggle, and FormField",
    href: "/examples/settings",
    tags: ["Tabs", "Forms", "Toggle"],
  },
  {
    title: "Product Catalog",
    description: "Product listing with Cards, Pagination, and Filters",
    href: "/examples/catalog",
    tags: ["Cards", "Pagination", "Filter"],
  },
  {
    title: "Multi-step Form",
    description: "Wizard form using Stepper, FormField, and Modal",
    href: "/examples/wizard",
    tags: ["Stepper", "Form", "Modal"],
  },
  {
    title: "Notification Center",
    description: "Toast notifications and Badge components",
    href: "/examples/notifications",
    tags: ["Toast", "Badge", "Feedback"],
  },
  {
    title: "Icon Library",
    description: "Browse and search through all available icons with categories",
    href: "/examples/icons",
    tags: ["Icons", "Search", "Display"],
  },
];

export default function ExamplesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:ml-64">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Icon name="check" size="lg" />
          <h1 className="text-4xl font-bold tracking-tight" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
            Examples
          </h1>
          <Badge variant="success">30+ Examples</Badge>
        </div>
        <p className="mt-4 text-lg" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
          Explore real-world examples and use cases. See how BalanceUI
          components work together to build complete interfaces.
        </p>
        <div className="mt-6">
          <Progress value={85} variant="success" showValue />
        </div>
      </div>

      {/* Toolbar */}
      <div className="mb-8">
        <Toolbar
          items={[
            { id: "1", icon: <Icon name="home" />, label: "All Examples", onClick: () => setActiveTab("all") },
            { id: "2", icon: <Icon name="menu" />, label: "Forms", onClick: () => setActiveTab("forms") },
            { id: "3", icon: <Icon name="check" />, label: "Dashboards", onClick: () => setActiveTab("dashboards") },
          ]}
        />
      </div>

      {/* Stepper */}
      <div className="mb-8">
        <Card variant="elevated" elevation={2} style={{ padding: "1.5rem" }} className="sm:p-8">
          <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
            Browse Examples
          </h3>
          <Stepper
            steps={[
              { id: "step1", label: "Browse" },
              { id: "step2", label: "Select" },
              { id: "step3", label: "Explore" },
            ]}
            activeStep={currentStep}
            onStepClick={setCurrentStep}
          />
        </Card>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {examples.map((example) => (
          <Link key={example.title} href={example.href} className="group">
            <Card
              variant="elevated"
              elevation={2}
              style={{
                padding: "2rem",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "var(--bu-transition-elevation)",
                cursor: "pointer",
              }}
              className="balanceui-hover-elevate"
            >
              <h3 className="text-xl font-semibold" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                {example.title}
              </h3>
              <p className="mt-2 flex-1" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                {example.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {example.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="soft"
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.25rem 0.5rem",
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="mt-4 text-sm font-medium" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                View Example →
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* List Component */}
      <div className="mt-12">
        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }} className="sm:p-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
            Quick Links
          </h2>
          <List
            items={[
              { id: "1", primary: "Component Documentation", secondary: "Browse all component APIs", icon: "home" },
              { id: "2", primary: "Code Examples", secondary: "See components in action", icon: "menu" },
              { id: "3", primary: "Theme Customization", secondary: "Customize the look and feel", icon: "check" },
            ]}
            onItemClick={(item) => window.location.href = item.id === "1" ? "/components" : item.id === "2" ? "/examples" : "/docs/theming"}
          />
        </Card>
      </div>

      <div 
        className="mt-12 rounded-lg p-8"
        style={{
          backgroundColor: "var(--bu-surface-variant, rgba(0, 0, 0, 0.02))",
          borderRadius: "var(--bu-radius-lg, 12px)",
        }}
      >
        <h2 className="text-2xl font-bold" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
          Want to Contribute?
        </h2>
        <p className="mt-4" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
          Have an example you'd like to share? We'd love to see how you're using
          BalanceUI!
        </p>
        <div className="mt-6">
          <Button
            variant="stroke"
            style={{ padding: "0.75rem 1.5rem", fontSize: "1rem" }}
          >
            Submit Example
          </Button>
        </div>
      </div>
    </div>
  );
}


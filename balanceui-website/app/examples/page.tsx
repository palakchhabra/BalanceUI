"use client";

import Link from "next/link";
import { Card, Button, Badge } from "@balanceui/core";

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
];

export default function ExamplesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Examples
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Explore real-world examples and use cases. See how BalanceUI
          components work together to build complete interfaces.
        </p>
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
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              className="group-hover:shadow-lg group-hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {example.title}
              </h3>
              <p className="mt-2 flex-1 text-gray-600 dark:text-gray-400">
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
              <div className="mt-4 text-sm font-medium text-black dark:text-white dark:text-white">
                View Example →
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12 rounded-lg bg-gray-50 p-8 dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Want to Contribute?
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
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


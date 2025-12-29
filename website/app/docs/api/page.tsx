"use client";

import Link from "next/link";
import { Card } from "@balanceui/core";

export default function ApiPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/docs"
          className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          ← Back to Documentation
        </Link>
      </div>

      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          API Reference
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Complete API documentation for all BalanceUI components.
        </p>
      </div>

      <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
        <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
          Component Documentation
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Browse individual component pages for detailed API documentation, props, and examples.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            "Button",
            "Input",
            "Card",
            "Modal",
            "FormField",
            "Select",
            "Badge",
            "Progress",
            "Tabs",
            "Stepper",
            "Toggle",
            "Toast",
          ].map((component) => (
            <Link
              key={component}
              href={`/components/${component.toLowerCase()}`}
              className="text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200"
            >
              {component} →
            </Link>
          ))}
        </div>
      </Card>

      <Card
        variant="elevated"
        elevation={2}
        style={{ padding: "2rem", marginTop: "2rem" }}
      >
        <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
          TypeScript Support
        </h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          All components are fully typed with TypeScript. Types are exported from the main package:
        </p>
        <div className="overflow-x-auto rounded-lg bg-gray-900 p-6">
          <pre className="text-sm text-gray-100">
            <code>{`import type { ButtonProps } from '@balanceui/core'`}</code>
          </pre>
        </div>
      </Card>
    </div>
  );
}


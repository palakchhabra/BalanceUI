"use client";

import Link from "next/link";
import { Card } from "@balanceui/core";

export default function BestPracticesPage() {
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
          Best Practices
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Guidelines and best practices for using BalanceUI effectively.
        </p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Component Composition
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Compose components together to build complex UIs. Use FormField with Input, Card with Button, etc.
          </p>
        </Card>

        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Styling
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            Use the style prop for one-off customizations. For theme-wide changes, override CSS variables.
          </p>
        </Card>

        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Performance
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            BalanceUI supports tree-shaking. Import only the components you need to keep bundle size small.
          </p>
        </Card>

        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Accessibility
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            All components follow WCAG guidelines. Use semantic HTML and proper ARIA attributes when needed.
          </p>
        </Card>
      </div>
    </div>
  );
}


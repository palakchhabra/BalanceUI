"use client";

import Link from "next/link";
import { Card } from "@balanceui/core";

export default function AccessibilityPage() {
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
          Accessibility
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Learn about accessibility features and WCAG compliance in BalanceUI.
        </p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            WCAG Compliance
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            BalanceUI components are designed to meet WCAG 2.1 Level AA standards, including proper keyboard navigation, screen reader support, and color contrast ratios.
          </p>
        </Card>

        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Keyboard Navigation
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            All interactive components support keyboard navigation. Use Tab to navigate, Enter/Space to activate, and Escape to close modals and dialogs.
          </p>
        </Card>

        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Screen Readers
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Components include proper ARIA attributes and semantic HTML to work seamlessly with screen readers.
          </p>
        </Card>

        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Color Contrast
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            All themes are tested to ensure sufficient color contrast ratios for text readability.
          </p>
        </Card>
      </div>
    </div>
  );
}


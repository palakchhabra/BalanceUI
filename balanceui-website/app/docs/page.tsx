"use client";

import Link from "next/link";
import { Card } from "@balanceui/core";

const docsSections = [
  {
    title: "Getting Started",
    description: "Learn how to install and set up BalanceUI in your project",
    href: "/docs/getting-started",
    icon: "🚀",
  },
  {
    title: "Installation",
    description: "Step-by-step installation guide for BalanceUI",
    href: "/docs/installation",
    icon: "📦",
  },
  {
    title: "Theming",
    description: "Customize the look and feel with themes and CSS variables",
    href: "/docs/theming",
    icon: "🎨",
  },
  {
    title: "API Reference",
    description: "Complete API documentation for all components",
    href: "/docs/api",
    icon: "📚",
  },
  {
    title: "Best Practices",
    description: "Guidelines and best practices for using BalanceUI",
    href: "/docs/best-practices",
    icon: "✨",
  },
  {
    title: "Accessibility",
    description: "Learn about accessibility features and WCAG compliance",
    href: "/docs/accessibility",
    icon: "♿",
  },
];

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Documentation
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Everything you need to know about using BalanceUI in your projects.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {docsSections.map((section) => (
          <Link key={section.title} href={section.href} className="group">
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
              <div className="mb-4 text-4xl">{section.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {section.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {section.description}
              </p>
              <div className="mt-4 text-sm font-medium text-black dark:text-white dark:text-white">
                Read More →
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12 rounded-lg bg-gray-100 p-8 dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Quick Start
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          New to BalanceUI? Start here to get up and running quickly.
        </p>
        <div className="mt-6 overflow-x-auto rounded-lg bg-gray-900 p-6">
          <pre className="text-sm text-gray-100">
            <code>{`npm install @balanceui/core

import { Button } from '@balanceui/core'
import '@balanceui/core/theme/clay-graphite.css'

function App() {
  return <Button variant="solid">Click me</Button>
}`}</code>
          </pre>
        </div>
        <Link
          href="/docs/getting-started"
          className="mt-6 inline-block text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200"
        >
          Read the full getting started guide →
        </Link>
      </div>
    </div>
  );
}


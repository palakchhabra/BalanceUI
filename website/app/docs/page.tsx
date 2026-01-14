"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, Tabs, Accordion, Stepper, Badge, Icon, Progress, Button } from "@balanceui/core";

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
  const [activeTab, setActiveTab] = useState("getting-started");
  const [accordionOpenId, setAccordionOpenId] = useState<string | undefined>("1");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Icon name="home" size="lg" />
          <h1 className="text-4xl font-bold tracking-tight" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
            Documentation
          </h1>
          <Badge variant="solid">v1.0.0</Badge>
        </div>
        <p className="mt-4 text-lg" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
          Everything you need to know about using BalanceUI in your projects.
        </p>
        <div className="mt-6">
          <Progress value={75} showValue />
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-8">
        <Tabs
          tabs={[
            { id: "getting-started", label: "Getting Started", content: null },
            { id: "components", label: "Components", content: null },
            { id: "theming", label: "Theming", content: null },
          ]}
          value={activeTab}
          onChange={(id) => setActiveTab(id)}
        />
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
                transition: "var(--bu-transition-elevation)",
                cursor: "pointer",
              }}
              className="balanceui-hover-elevate"
            >
              <div className="mb-4 text-4xl">{section.icon}</div>
              <h3 className="text-xl font-semibold" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                {section.title}
              </h3>
              <p className="mt-2" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                {section.description}
              </p>
              <div className="mt-4 text-sm font-medium" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                Read More →
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Accordion FAQ */}
      <div className="mt-12">
        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }} className="sm:p-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
            Frequently Asked Questions
          </h2>
          <Accordion
            items={[
              {
                id: "1",
                title: "How do I install BalanceUI?",
                content: <p style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                  Install BalanceUI using npm: <code className="bg-gray-100 px-2 py-1 rounded">npm install @balanceui/core</code>
                </p>
              },
              {
                id: "2",
                title: "Is BalanceUI free to use?",
                content: <p style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                  Yes! BalanceUI is completely open source and free to use under the MIT License.
                </p>
              },
              {
                id: "3",
                title: "Does BalanceUI support TypeScript?",
                content: <p style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                  Yes, BalanceUI is built with TypeScript and includes comprehensive type definitions.
                </p>
              },
            ]}
            openId={accordionOpenId}
            onChange={(id) => setAccordionOpenId(id === accordionOpenId ? undefined : id)}
          />
        </Card>
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


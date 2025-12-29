"use client";

import { Card, Badge as BadgeComponent } from "@balanceui/core";
import Link from "next/link";

export default function BadgePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/components"
          className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          ← Back to Components
        </Link>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Badge
          </h1>
          <BadgeComponent variant="solid" style={{ fontSize: "0.875rem" }}>
            Display
          </BadgeComponent>
        </div>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          A small status indicator or label component for displaying information.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              Examples
            </h2>

            <Card variant="elevated" elevation={2} style={{ padding: "2rem", marginBottom: "2rem" }}>
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Variants
              </h3>
              <div className="flex flex-wrap gap-4">
                <BadgeComponent variant="solid">Solid</BadgeComponent>
                <BadgeComponent variant="soft">Soft</BadgeComponent>
                <BadgeComponent variant="outline">Outline</BadgeComponent>
              </div>
            </Card>

            <Card variant="elevated" elevation={2} style={{ padding: "2rem", marginBottom: "2rem" }}>
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Status Badges
              </h3>
              <div className="flex flex-wrap gap-4">
                <BadgeComponent variant="success">Success</BadgeComponent>
                <BadgeComponent variant="warning">Warning</BadgeComponent>
                <BadgeComponent variant="danger">Danger</BadgeComponent>
              </div>
            </Card>

            <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Usage Examples
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-900 dark:text-white">Notifications</span>
                  <BadgeComponent variant="danger">3</BadgeComponent>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-900 dark:text-white">Status:</span>
                  <BadgeComponent variant="success">Active</BadgeComponent>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-900 dark:text-white">Version:</span>
                  <BadgeComponent variant="soft">v1.0.0</BadgeComponent>
                </div>
              </div>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              Usage
            </h2>
            <div className="overflow-x-auto rounded-lg bg-gray-900 p-6">
              <pre className="text-sm text-gray-100">
                <code>{`import { Badge } from '@balanceui/core'

function MyComponent() {
  return (
    <>
      <Badge variant="solid">New</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="danger">3</Badge>
    </>
  )
}`}</code>
              </pre>
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", position: "sticky", top: "6rem" }}>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
              Props
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-gray-900 dark:text-white">variant:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  "solid" | "soft" | "outline" | "success" | "warning" | "danger"
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}


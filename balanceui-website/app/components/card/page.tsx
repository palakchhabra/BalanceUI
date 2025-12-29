"use client";

import { Card, Badge } from "@balanceui/core";
import Link from "next/link";

export default function CardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-6 sm:mb-8">
        <Link
          href="/components"
          className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          ← Back to Components
        </Link>
      </div>

      <div className="mb-8 sm:mb-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Card
          </h1>
          <Badge variant="solid" style={{ fontSize: "0.875rem", alignSelf: "flex-start" }} className="sm:align-self-auto">
            Layout
          </Badge>
        </div>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 sm:mt-4 sm:text-lg">
          A flexible container component for displaying content with elevation and hover effects.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2">
          <section className="mb-8 sm:mb-12">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:mb-6 sm:text-2xl">
              Examples
            </h2>

            <div className="mb-6 grid gap-3 sm:gap-4 sm:grid-cols-2">
              <Card variant="elevated" elevation={1} style={{ padding: "1rem" }} className="sm:p-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white sm:text-base">Elevation 1</h3>
                <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                  Subtle shadow for light elevation
                </p>
              </Card>
              <Card variant="elevated" elevation={2} style={{ padding: "1rem" }} className="sm:p-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white sm:text-base">Elevation 2</h3>
                <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                  Medium shadow for cards
                </p>
              </Card>
              <Card variant="elevated" elevation={3} style={{ padding: "1rem" }} className="sm:p-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white sm:text-base">Elevation 3</h3>
                <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                  Strong shadow for modals
                </p>
              </Card>
              <Card variant="outlined" style={{ padding: "1rem" }} className="sm:p-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white sm:text-base">Outlined</h3>
                <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                  Border only, no shadow
                </p>
              </Card>
            </div>

            <Card
              variant="elevated"
              elevation={2}
              style={{
                padding: "1.5rem",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              className="hover:shadow-lg hover:-translate-y-1 sm:p-8"
            >
              <h3 className="mb-2 text-base font-semibold text-gray-900 dark:text-white sm:text-lg">
                Hover Effect
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 sm:text-base">
                Hover over this card to see the elevation and transform effect
              </p>
            </Card>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:mb-6 sm:text-2xl">
              Usage
            </h2>
            <div className="overflow-x-auto rounded-lg bg-gray-900 p-4 sm:p-6">
              <pre className="text-xs text-gray-100 sm:text-sm">
                <code>{`import { Card } from '@balanceui/core'

function MyComponent() {
  return (
    <Card
      variant="elevated"
      elevation={2}
      style={{ padding: '2rem' }}
      className="hover:shadow-lg hover:-translate-y-1"
    >
      <h3>Card Title</h3>
      <p>Card content goes here</p>
    </Card>
  )
}`}</code>
              </pre>
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", position: "sticky", top: "6rem" }} className="mt-8 lg:mt-0">
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white sm:text-base">
              Props
            </h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <span className="font-medium text-gray-900 dark:text-white">variant:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  "elevated" | "outlined" | "filled"
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">elevation:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">1-8</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}


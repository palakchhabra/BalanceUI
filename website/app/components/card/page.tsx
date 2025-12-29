"use client";

import { Card, Badge } from "@balanceui/core";
import Link from "next/link";

export default function CardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:ml-64">
      <div className="mb-6 sm:mb-8">
        <Link
          href="/components"
          className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          ← Back to Components
        </Link>
      </div>

      <div className="mb-8 sm:mb-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Card</h1>
          <Badge variant="solid" style={{ fontSize: "0.875rem", alignSelf: "flex-start" }} className="sm:align-self-auto">
            Layout
          </Badge>
        </div>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 sm:mt-4 sm:text-lg">
          Material Design card component with multiple variants: elevated, outlined, filled, flat, and gradient.
          Supports elevation levels and interactive states.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2">
          <section className="mb-8 sm:mb-12">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:mb-6 sm:text-2xl">
              Variants
            </h2>

            {/* Elevation Levels */}
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Elevation Levels</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[0, 1, 2, 3, 4, 5].map((elev) => (
                  <Card
                    key={elev}
                    variant="elevated"
                    elevation={elev as 0 | 1 | 2 | 3 | 4 | 5}
                    style={{ padding: "1.25rem" }}
                  >
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Elevation {elev}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {elev === 0
                        ? "No shadow"
                        : elev <= 2
                        ? "Subtle elevation"
                        : elev <= 4
                        ? "Medium elevation"
                        : "High elevation"}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            {/* All Variants */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              <Card variant="elevated" elevation={2} style={{ padding: "1.25rem" }}>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Elevated</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Material Design elevated card with shadow
                </p>
              </Card>

              <Card variant="outlined" style={{ padding: "1.25rem" }}>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Outlined</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Card with border, no shadow
                </p>
              </Card>

              <Card variant="filled" style={{ padding: "1.25rem" }}>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Filled</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Card with subtle background fill
                </p>
              </Card>

              <Card variant="flat" style={{ padding: "1.25rem" }}>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Flat</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  No shadow, no border - minimal style
                </p>
              </Card>

              <Card
                variant="gradient"
                gradient={{
                  from: "#667eea",
                  to: "#764ba2",
                  direction: "to-right",
                }}
                style={{ padding: "1.25rem" }}
                className="sm:col-span-2"
              >
                <h4 className="text-sm font-semibold text-white mb-2">Gradient</h4>
                <p className="text-xs text-white/90">
                  Card with gradient background - perfect for hero sections
                </p>
              </Card>
            </div>

            {/* Clickable Cards */}
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Interactive Cards</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card
                  variant="elevated"
                  elevation={2}
                  hoverable
                  onClick={() => alert("Card clicked!")}
                  style={{ padding: "1.25rem" }}
                >
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Clickable Card
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Hover to see elevation change
                  </p>
                </Card>

                <Card
                  variant="outlined"
                  hoverable
                  onClick={() => alert("Outlined card clicked!")}
                  style={{ padding: "1.25rem" }}
                >
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Interactive Outlined
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Border color changes on hover
                  </p>
                </Card>
              </div>
            </div>

            {/* Example Card Content */}
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Example Content</h3>
              <Card variant="elevated" elevation={2} style={{ padding: "1.5rem" }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Card Title
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Subtitle or description</p>
                  </div>
                  <Badge variant="solid">New</Badge>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  This is an example of a card with rich content. Cards can contain any type of content
                  including text, images, buttons, and more.
                </p>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Action
                  </button>
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </Card>
            </div>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:mb-6 sm:text-2xl">
              Usage
            </h2>
            <div className="overflow-x-auto rounded-lg bg-gray-900 p-4 sm:p-6">
              <pre className="text-xs sm:text-sm text-gray-100">
                <code>{`import { Card } from '@balanceui/core'

// Elevated card
<Card variant="elevated" elevation={2} style={{ padding: '1.5rem' }}>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>

// Outlined card
<Card variant="outlined" style={{ padding: '1.5rem' }}>
  <h3>Outlined Card</h3>
</Card>

// Gradient card
<Card
  variant="gradient"
  gradient={{
    from: '#667eea',
    to: '#764ba2',
    direction: 'to-right'
  }}
  style={{ padding: '1.5rem' }}
>
  <h3>Gradient Card</h3>
</Card>

// Clickable card
<Card
  variant="elevated"
  elevation={2}
  hoverable
  onClick={() => console.log('Clicked!')}
  style={{ padding: '1.5rem' }}
>
  <h3>Clickable Card</h3>
</Card>`}</code>
              </pre>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:mb-6 sm:text-2xl">
              Props
            </h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Prop
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Type
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Default
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                  <tr>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      variant
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      "elevated" | "outlined" | "filled" | "flat" | "gradient"
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      "elevated"
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Card visual style variant
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      elevation
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      1
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Shadow elevation level (for elevated variant)
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      gradient
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {`{ from: string, to: string, direction?: string }`}
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      undefined
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Gradient configuration (for gradient variant)
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      hoverable
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      boolean
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      false
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Enable hover elevation effect
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      onClick
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      () =&gt; void
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      undefined
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Click handler for interactive cards
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <Card
            variant="elevated"
            elevation={2}
            style={{ padding: "1.25rem", position: "sticky", top: "6rem" }}
            className="hidden lg:block"
          >
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#variants"
                  className="text-sm text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200 transition-colors"
                >
                  Variants
                </a>
              </li>
              <li>
                <a
                  href="#usage"
                  className="text-sm text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200 transition-colors"
                >
                  Usage
                </a>
              </li>
              <li>
                <a
                  href="#props"
                  className="text-sm text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200 transition-colors"
                >
                  Props
                </a>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

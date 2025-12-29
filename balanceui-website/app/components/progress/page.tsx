"use client";

import { Card, Badge, Progress } from "@balanceui/core";
import Link from "next/link";

export default function ProgressPage() {
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
            Progress
          </h1>
          <Badge variant="solid" style={{ fontSize: "0.875rem", alignSelf: "flex-start" }} className="sm:align-self-auto">
            Feedback
          </Badge>
        </div>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 sm:mt-4 sm:text-lg">
          Progress bar and circular progress indicators for showing loading states and completion percentages.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2">
          <section className="mb-8 sm:mb-12">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:mb-6 sm:text-2xl">
              Examples
            </h2>

            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Linear Progress
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">30%</div>
                  <Progress value={30} />
                </div>
                <div>
                  <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">60%</div>
                  <Progress value={60} />
                </div>
                <div>
                  <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">90%</div>
                  <Progress value={90} />
                </div>
              </div>
            </Card>

            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Variants
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">Solid (30%)</div>
                  <Progress value={30} variant="solid" />
                </div>
                <div>
                  <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">Success (60%)</div>
                  <Progress value={60} variant="success" />
                </div>
                <div>
                  <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">Warning (80%)</div>
                  <Progress value={80} variant="warning" />
                </div>
                <div>
                  <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">Danger (90%)</div>
                  <Progress value={90} variant="danger" />
                </div>
              </div>
            </Card>

            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Sizes
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">Thin</div>
                  <Progress value={50} size="thin" />
                </div>
                <div>
                  <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">Medium</div>
                  <Progress value={50} size="md" />
                </div>
                <div>
                  <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">Thick</div>
                  <Progress value={50} size="thick" />
                </div>
              </div>
            </Card>

            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                With Value
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <Progress value={65} showValue />
              </div>
            </Card>

            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Indeterminate
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <Progress indeterminate />
              </div>
            </Card>

            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem" }} className="sm:p-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Circular Progress
              </h3>
              <div className="flex flex-wrap gap-6">
                <div className="flex flex-col items-center gap-2">
                  <Progress value={30} type="circular" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">30%</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Progress value={60} type="circular" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">60%</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Progress value={90} type="circular" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">90%</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Progress indeterminate type="circular" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Loading</span>
                </div>
              </div>
            </Card>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:mb-6 sm:text-2xl">
              Usage
            </h2>
            <div className="overflow-x-auto rounded-lg bg-gray-900 p-4 sm:p-6">
              <pre className="text-xs text-gray-100 sm:text-sm">
                <code>{`import { Progress } from '@balanceui/core'

function MyComponent() {
  return (
    <>
      {/* Linear progress */}
      <Progress value={65} variant="solid" showValue />
      
      {/* Circular progress */}
      <Progress value={75} type="circular" />
      
      {/* Indeterminate */}
      <Progress indeterminate />
    </>
  )
}`}</code>
              </pre>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:mb-6 sm:text-2xl">
              Props
            </h2>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle sm:px-0">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 sm:px-6 sm:py-3">
                          Prop
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 sm:px-6 sm:py-3">
                          Type
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 sm:px-6 sm:py-3">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                      <tr>
                        <td className="whitespace-nowrap px-3 py-3 text-xs font-medium text-gray-900 dark:text-white sm:px-6 sm:text-sm">
                          value
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          number
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          Progress value (0-100)
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-3 py-3 text-xs font-medium text-gray-900 dark:text-white sm:px-6 sm:text-sm">
                          variant
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          "solid" | "soft" | "danger" | "success" | "warning"
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          Progress variant style
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-3 py-3 text-xs font-medium text-gray-900 dark:text-white sm:px-6 sm:text-sm">
                          type
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          "linear" | "circular"
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          Progress type (default: "linear")
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-3 py-3 text-xs font-medium text-gray-900 dark:text-white sm:px-6 sm:text-sm">
                          size
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          "thin" | "md" | "thick"
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          Progress size (default: "md")
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-3 py-3 text-xs font-medium text-gray-900 dark:text-white sm:px-6 sm:text-sm">
                          showValue
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          boolean
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          Show percentage value (default: false)
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-3 py-3 text-xs font-medium text-gray-900 dark:text-white sm:px-6 sm:text-sm">
                          indeterminate
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          boolean
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          Show indeterminate/animated progress (default: false)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", position: "sticky", top: "6rem" }} className="mt-8 lg:mt-0">
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white sm:text-base">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#examples" className="text-xs text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200 sm:text-sm">
                  Examples
                </a>
              </li>
              <li>
                <a href="#usage" className="text-xs text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200 sm:text-sm">
                  Usage
                </a>
              </li>
              <li>
                <a href="#props" className="text-xs text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200 sm:text-sm">
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


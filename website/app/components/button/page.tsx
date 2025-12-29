"use client";

import { Button, Card, Badge } from "@balanceui/core";
import Link from "next/link";

export default function ButtonPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:ml-64">
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
            Button
          </h1>
          <Badge variant="solid" style={{ fontSize: "0.875rem", alignSelf: "flex-start" }} className="sm:align-self-auto">
            Actions
          </Badge>
        </div>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 sm:mt-4 sm:text-lg">
          A versatile button component with multiple variants, sizes, and
          customization options. Perfect for actions, navigation, and user
          interactions.
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
                Variants
              </h3>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <Button variant="solid">Solid</Button>
                <Button variant="stroke">Stroke</Button>
                <Button variant="soft">Soft</Button>
                <Button variant="bare">Bare</Button>
              </div>
            </Card>

            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Sizes
              </h3>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <Button variant="solid" size="sm">
                  Small
                </Button>
                <Button variant="solid" size="md">
                  Medium
                </Button>
                <Button variant="solid" size="lg">
                  Large
                </Button>
              </div>
            </Card>

            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                States
              </h3>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <Button variant="solid">Normal</Button>
                <Button variant="solid" disabled>
                  Disabled
                </Button>
              </div>
            </Card>

            <Card style={{ padding: "1.5rem" }} className="sm:p-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Rounded Corners
              </h3>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <Button variant="solid" rounded="md">
                  Medium
                </Button>
                <Button variant="solid" rounded="full">
                  Full
                </Button>
              </div>
            </Card>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:mb-6 sm:text-2xl">
              Usage
            </h2>
            <div className="overflow-x-auto rounded-lg bg-gray-900 p-4 sm:p-6">
              <pre className="text-xs text-gray-100 sm:text-sm">
                <code>{`import { Button } from '@balanceui/core'

function MyComponent() {
  return (
    <>
      <Button variant="solid">Primary Action</Button>
      <Button variant="stroke">Secondary Action</Button>
      <Button variant="bare">Tertiary Action</Button>
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
                          Default
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 sm:px-6 sm:py-3">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                      <tr>
                        <td className="whitespace-nowrap px-3 py-3 text-xs font-medium text-gray-900 dark:text-white sm:px-6 sm:text-sm">
                          variant
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          <span className="block sm:inline">"bare" | "stroke" | "solid" | "soft" | "float" | "glyph" | "pulse" | "pulse-mini" | "pulse-extend"</span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          undefined
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          Button style variant
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-3 py-3 text-xs font-medium text-gray-900 dark:text-white sm:px-6 sm:text-sm">
                          size
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          "sm" | "md" | "lg"
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          "md"
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          Button size
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-3 py-3 text-xs font-medium text-gray-900 dark:text-white sm:px-6 sm:text-sm">
                          rounded
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          "md" | "full"
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          "md"
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          Border radius
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-3 py-3 text-xs font-medium text-gray-900 dark:text-white sm:px-6 sm:text-sm">
                          disabled
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          boolean
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          false
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          Disable the button
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
                <Link
                  href="#examples"
                  className="text-xs text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200 sm:text-sm"
                >
                  Examples
                </Link>
              </li>
              <li>
                <Link
                  href="#usage"
                  className="text-xs text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200 sm:text-sm"
                >
                  Usage
                </Link>
              </li>
              <li>
                <Link
                  href="#props"
                  className="text-xs text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200 sm:text-sm"
                >
                  Props
                </Link>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}


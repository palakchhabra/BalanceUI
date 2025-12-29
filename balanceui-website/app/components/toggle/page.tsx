"use client";

import { Card, Badge, Toggle } from "@balanceui/core";
import Link from "next/link";
import { useState } from "react";

export default function TogglePage() {
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);

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
            Toggle
          </h1>
          <Badge variant="solid" style={{ fontSize: "0.875rem", alignSelf: "flex-start" }} className="sm:align-self-auto">
            Forms
          </Badge>
        </div>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 sm:mt-4 sm:text-lg">
          A toggle switch component for binary on/off states. Perfect for settings and preferences.
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
                Basic Toggle
              </h3>
              <div className="flex items-center gap-3 sm:gap-4">
                <Toggle checked={checked} onChange={setChecked} />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {checked ? "ON" : "OFF"}
                </span>
              </div>
            </Card>

            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                States
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <Toggle checked={checked2} onChange={setChecked2} />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Checked</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <Toggle checked={checked3} onChange={setChecked3} />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Unchecked</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <Toggle checked={true} onChange={() => {}} disabled />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Disabled (checked)</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <Toggle checked={false} onChange={() => {}} disabled />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Disabled (unchecked)</span>
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
                <code>{`import { Toggle } from '@balanceui/core'
import { useState } from 'react'

function MyComponent() {
  const [checked, setChecked] = useState(false)
  
  return (
    <Toggle
      checked={checked}
      onChange={setChecked}
    />
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
                          checked
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          boolean
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          Whether the toggle is checked
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-3 py-3 text-xs font-medium text-gray-900 dark:text-white sm:px-6 sm:text-sm">
                          onChange
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          (checked: boolean) =&gt; void
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          Callback when toggle state changes
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-3 py-3 text-xs font-medium text-gray-900 dark:text-white sm:px-6 sm:text-sm">
                          disabled
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          boolean
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          Disable the toggle
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


"use client";

import { useState } from "react";
import { DatePicker, Card, Badge, FormField } from "@balanceui/core";
import Link from "next/link";

export default function DatePickerPage() {
  const [singleDate, setSingleDate] = useState<Date | null>(null);
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);

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
            DatePicker
          </h1>
          <Badge variant="solid" style={{ fontSize: "0.875rem" }}>
            Forms
          </Badge>
        </div>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          A flexible date picker component with support for single date selection
          and date range selection. Perfect for forms, filters, and date-based
          interactions.
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
                Single Date Selection
              </h3>
              <div className="space-y-4">
                <FormField label="Select a date">
                  <DatePicker
                    mode="single"
                    value={singleDate}
                    onChange={(date: Date | null) => setSingleDate(date)}
                    placeholder="Choose a date"
                    style={{ width: "100%" }}
                  />
                </FormField>
                {singleDate && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Selected: {singleDate.toLocaleDateString()}
                  </p>
                )}
              </div>
            </Card>

            <Card variant="elevated" elevation={2} style={{ padding: "2rem", marginBottom: "2rem" }}>
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Date Range Selection
              </h3>
              <div className="space-y-4">
                <FormField label="Select a date range">
                  <DatePicker
                    mode="range"
                    placeholder="Select start and end date"
                    style={{ width: "100%" }}
                    onRangeChange={(start: Date | null, end: Date | null) => {
                      setRangeStart(start);
                      setRangeEnd(end);
                    }}
                  />
                </FormField>
                {rangeStart && rangeEnd && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Range: {rangeStart.toLocaleDateString()} - {rangeEnd.toLocaleDateString()}
                  </p>
                )}
                {rangeStart && !rangeEnd && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Start: {rangeStart.toLocaleDateString()} - Select end date
                  </p>
                )}
              </div>
            </Card>

            <Card variant="elevated" elevation={2} style={{ padding: "2rem", marginBottom: "2rem" }}>
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Variants
              </h3>
              <div className="space-y-4">
                <FormField label="Outline Variant">
                  <DatePicker
                    variant="outline"
                    placeholder="Outline style"
                    style={{ width: "100%" }}
                  />
                </FormField>
                <FormField label="Solid Variant">
                  <DatePicker
                    variant="solid"
                    placeholder="Solid style"
                    style={{ width: "100%" }}
                  />
                </FormField>
                <FormField label="Soft Variant">
                  <DatePicker
                    variant="soft"
                    placeholder="Soft style"
                    style={{ width: "100%" }}
                  />
                </FormField>
              </div>
            </Card>

            <Card variant="elevated" elevation={2} style={{ padding: "2rem", marginBottom: "2rem" }}>
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                With Min/Max Dates
              </h3>
              <div className="space-y-4">
                <FormField label="Date with restrictions">
                  <DatePicker
                    placeholder="Select date (past 30 days to future 30 days)"
                    minDate={new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
                    maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                    style={{ width: "100%" }}
                  />
                </FormField>
              </div>
            </Card>

            <Card variant="elevated" elevation={2} style={{ padding: "2rem", marginBottom: "2rem" }}>
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Custom Date Format
              </h3>
              <div className="space-y-4">
                <FormField label="Custom format (YYYY-MM-DD)">
                  <DatePicker
                    format="YYYY-MM-DD"
                    placeholder="Select date"
                    style={{ width: "100%" }}
                  />
                </FormField>
              </div>
            </Card>

            <Card variant="elevated" elevation={2} style={{ padding: "2rem", marginBottom: "2rem" }}>
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                States
              </h3>
              <div className="space-y-4">
                <FormField label="Disabled DatePicker">
                  <DatePicker
                    disabled
                    placeholder="Disabled"
                    style={{ width: "100%" }}
                  />
                </FormField>
                <FormField label="With Error">
                  <DatePicker
                    error="This field is required"
                    placeholder="Select date"
                    style={{ width: "100%" }}
                  />
                </FormField>
                <FormField label="With Helper Text">
                  <DatePicker
                    helperText="Please select a valid date"
                    placeholder="Select date"
                    style={{ width: "100%" }}
                  />
                </FormField>
              </div>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              Usage
            </h2>
            <div className="overflow-x-auto rounded-lg bg-gray-900 p-6">
              <pre className="text-sm text-gray-100">
                <code>{`import { DatePicker } from '@balanceui/core'

// Single date selection
function SingleDateExample() {
  const [date, setDate] = useState<Date | null>(null);
  
  return (
    <DatePicker
      mode="single"
      value={date}
      onChange={setDate}
      placeholder="Select date"
    />
  )
}

// Date range selection
function DateRangeExample() {
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  
  return (
    <DatePicker
      mode="range"
      placeholder="Select date range"
      onRangeChange={(start, end) => {
        setStart(start);
        setEnd(end);
      }}
    />
  )
}`}</code>
              </pre>
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              Props
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Prop
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Default
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      mode
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      "single" | "range"
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      "single"
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Selection mode: single date or date range
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      value
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Date | null
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      undefined
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Selected date (for single mode)
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      onChange
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      (date: Date | null) =&gt; void
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      undefined
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Callback when date changes (single mode)
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      onRangeChange
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      (start: Date | null, end: Date | null) =&gt; void
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      undefined
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Callback when date range changes (range mode)
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      variant
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      "solid" | "soft" | "outline"
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      "outline"
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Visual style variant
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      minDate
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Date
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      undefined
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Minimum selectable date
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      maxDate
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Date
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      undefined
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Maximum selectable date
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      format
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      string
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      undefined
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Custom date format (e.g., "YYYY-MM-DD")
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      placeholder
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      string
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      "Select date"
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Placeholder text
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      disabled
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      boolean
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      false
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Disable the date picker
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", position: "sticky", top: "6rem" }}>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#examples"
                  className="text-sm text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200"
                >
                  Examples
                </Link>
              </li>
              <li>
                <Link
                  href="#usage"
                  className="text-sm text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200"
                >
                  Usage
                </Link>
              </li>
              <li>
                <Link
                  href="#props"
                  className="text-sm text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200"
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


"use client";

import { Card, Badge, Button, ToastProvider, useToast } from "@balanceui/core";
import Link from "next/link";

function ToastExamples() {
  const toast = useToast();

  return (
    <>
      <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
        <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
          Toast Variants
        </h3>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <Button variant="solid" onClick={() => toast.notify({ message: "Success message", variant: "success" })}>
            Success
          </Button>
          <Button variant="solid" onClick={() => toast.notify({ message: "Error message", variant: "error" })}>
            Error
          </Button>
          <Button variant="solid" onClick={() => toast.notify({ message: "Info message", variant: "info" })}>
            Info
          </Button>
          <Button variant="solid" onClick={() => toast.notify({ message: "Warning message", variant: "warning" })}>
            Warning
          </Button>
        </div>
      </Card>

      <Card variant="elevated" elevation={2} style={{ padding: "1.5rem" }} className="sm:p-8">
        <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
          Custom Duration
        </h3>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <Button variant="solid" onClick={() => toast.notify({ message: "This toast lasts 5 seconds", duration: 5000 })}>
            Long Duration
          </Button>
          <Button variant="solid" onClick={() => toast.notify({ message: "This toast lasts 1 second", duration: 1000 })}>
            Short Duration
          </Button>
        </div>
      </Card>
    </>
  );
}

export default function ToastPage() {
  return (
    <ToastProvider>
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
              Toast
            </h1>
            <Badge variant="solid" style={{ fontSize: "0.875rem", alignSelf: "flex-start" }} className="sm:align-self-auto">
              Feedback
            </Badge>
          </div>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-400 sm:mt-4 sm:text-lg">
            Notification toast component for user feedback. Supports multiple variants and custom durations.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <section className="mb-8 sm:mb-12">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:mb-6 sm:text-2xl">
                Examples
              </h2>
              <ToastExamples />
            </section>

            <section className="mb-8 sm:mb-12">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:mb-6 sm:text-2xl">
                Usage
              </h2>
              <div className="overflow-x-auto rounded-lg bg-gray-900 p-4 sm:p-6">
                <pre className="text-xs text-gray-100 sm:text-sm">
                  <code>{`import { ToastProvider, useToast, Button } from '@balanceui/core'

function App() {
  return (
    <ToastProvider>
      <MyComponent />
    </ToastProvider>
  )
}

function MyComponent() {
  const toast = useToast()
  
  return (
    <Button onClick={() => toast.notify({ 
      message: 'Success!', 
      variant: 'success' 
    })}>
      Show Toast
    </Button>
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
                            message
                          </td>
                          <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                            string
                          </td>
                          <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                            Toast message text
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-nowrap px-3 py-3 text-xs font-medium text-gray-900 dark:text-white sm:px-6 sm:text-sm">
                            variant
                          </td>
                          <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                            "success" | "error" | "info" | "warning"
                          </td>
                          <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                            Toast variant style
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-nowrap px-3 py-3 text-xs font-medium text-gray-900 dark:text-white sm:px-6 sm:text-sm">
                            duration
                          </td>
                          <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                            number
                          </td>
                          <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                            Duration in milliseconds (default: 3000)
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
    </ToastProvider>
  );
}


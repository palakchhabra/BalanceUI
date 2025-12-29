"use client";

import { Card, Badge, Input, FormField } from "@balanceui/core";
import Link from "next/link";

export default function InputPage() {
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
            Input
          </h1>
          <Badge variant="solid" style={{ fontSize: "0.875rem", alignSelf: "flex-start" }} className="sm:align-self-auto">
            Forms
          </Badge>
        </div>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 sm:mt-4 sm:text-lg">
          A versatile text input component with validation, error states, and focus handling.
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
                Basic Input
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <Input placeholder="Enter text..." style={{ width: "100%" }} />
                <Input
                  placeholder="Disabled input"
                  disabled
                  style={{ width: "100%" }}
                />
              </div>
            </Card>

            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Input Types
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <Input type="email" placeholder="Email" style={{ width: "100%" }} />
                <Input type="password" placeholder="Password" style={{ width: "100%" }} />
                <Input type="number" placeholder="Number" style={{ width: "100%" }} />
                <Input type="tel" placeholder="Phone" style={{ width: "100%" }} />
              </div>
            </Card>

            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem" }} className="sm:p-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                With FormField
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <FormField label="Email" required>
                  <Input type="email" placeholder="Enter your email" style={{ width: "100%" }} />
                </FormField>
                <FormField label="Password" error="Password is required" required>
                  <Input type="password" placeholder="Enter password" style={{ width: "100%" }} />
                </FormField>
              </div>
            </Card>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:mb-6 sm:text-2xl">
              Usage
            </h2>
            <div className="overflow-x-auto rounded-lg bg-gray-900 p-4 sm:p-6">
              <pre className="text-xs text-gray-100 sm:text-sm">
                <code>{`import { Input, FormField } from '@balanceui/core'

function MyForm() {
  return (
    <FormField label="Email" error="Invalid email">
      <Input
        type="email"
        placeholder="Enter your email"
        style={{ width: '100%' }}
      />
    </FormField>
  )
}`}</code>
              </pre>
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
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}


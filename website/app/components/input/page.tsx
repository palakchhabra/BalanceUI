"use client";

import { Card, Badge, Input, FormField, Tension } from "@balanceui/core";
import Link from "next/link";
import { useState } from "react";

export default function InputPage() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [tensionValue, setTensionValue] = useState(50);

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
          Material Design-inspired input component with floating labels, validation, and error states.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2">
          <section id="examples" className="mb-8 sm:mb-12">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:mb-6 sm:text-2xl">
              Examples
            </h2>

            {/* Floating Labels */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Floating Labels (Material Design)
              </h3>
              <div className="space-y-4 sm:space-y-6">
                <Input
                  label="Name"
                  floatingLabel
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  placeholder="Enter your name"
                />
                <Input
                  label="Email"
                  type="email"
                  floatingLabel
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  placeholder="Enter your email"
                />
                <Input
                  label="Password"
                  type="password"
                  floatingLabel
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  placeholder="Enter password"
                />
                <Input
                  label="Disabled Field"
                  floatingLabel
                  disabled
                  defaultValue="Disabled value"
                />
              </div>
            </Card>

            {/* Email Validation */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Email Validation (Auto-disappears on valid)
              </h3>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                The error message automatically disappears when a valid email is entered.
              </p>
              <div className="space-y-4 sm:space-y-6">
                <Input
                  label="Email Address"
                  type="email"
                  floatingLabel
                  helperText="Enter a valid email address"
                  placeholder="example@email.com"
                />
                <Input
                  label="Email with Error"
                  type="email"
                  floatingLabel
                  error="Please enter a valid email address"
                  defaultValue="invalid-email"
                />
              </div>
            </Card>

            {/* Basic Input */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Basic Input (No Floating Label)
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <Input placeholder="Enter text..." />
                <Input
                  placeholder="Disabled input"
                  disabled
                />
                <Input
                  placeholder="Read-only input"
                  readOnly
                  defaultValue="Read-only value"
                />
              </div>
            </Card>

            {/* Input Types */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Input Types
              </h3>
              <div className="space-y-4 sm:space-y-6">
                <Input
                  label="Email"
                  type="email"
                  floatingLabel
                  helperText="We'll never share your email"
                />
                <Input
                  label="Password"
                  type="password"
                  floatingLabel
                />
                <Input
                  label="Number"
                  type="number"
                  floatingLabel
                  helperText="Enter a number"
                />
                <Input
                  label="Phone"
                  type="tel"
                  floatingLabel
                  placeholder="+1 (555) 000-0000"
                />
                <Input
                  label="URL"
                  type="url"
                  floatingLabel
                  placeholder="https://example.com"
                />
              </div>
            </Card>

            {/* Variants */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Variants
              </h3>
              <div className="space-y-4 sm:space-y-6">
                <Input
                  label="Outline (Default)"
                  variant="outline"
                  floatingLabel
                  defaultValue="Outline variant"
                />
                <Input
                  label="Solid"
                  variant="solid"
                  floatingLabel
                  defaultValue="Solid variant"
                />
                <Input
                  label="Soft"
                  variant="soft"
                  floatingLabel
                  defaultValue="Soft variant"
                />
              </div>
            </Card>

            {/* With Adornments */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                With Adornments
              </h3>
              <div className="space-y-4 sm:space-y-6">
                <Input
                  label="Search"
                  floatingLabel
                  startAdornment={<span>🔍</span>}
                  placeholder="Search..."
                />
                <Input
                  label="Price"
                  type="number"
                  floatingLabel
                  startAdornment={<span>$</span>}
                  placeholder="0.00"
                />
                <Input
                  label="Website"
                  type="url"
                  floatingLabel
                  startAdornment={<span>🌐</span>}
                  endAdornment={<span>✓</span>}
                  placeholder="https://"
                />
              </div>
            </Card>

            {/* Error States */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Error States
              </h3>
              <div className="space-y-4 sm:space-y-6">
                <Input
                  label="Email"
                  type="email"
                  floatingLabel
                  error="This email is already taken"
                  defaultValue="test@example.com"
                />
                <Input
                  label="Password"
                  type="password"
                  floatingLabel
                  error="Password must be at least 8 characters"
                  defaultValue="123"
                />
                <Input
                  label="Required Field"
                  floatingLabel
                  error={true}
                  placeholder="This field is required"
                />
              </div>
            </Card>

            {/* With FormField */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                With FormField (Legacy Support)
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <FormField label="Email" required helperText="Enter your email address">
                  <Input type="email" placeholder="Enter your email" />
                </FormField>
                <FormField label="Password" error="Password is required" required>
                  <Input type="password" placeholder="Enter password" />
                </FormField>
              </div>
            </Card>

            {/* Tension Usage */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem" }} className="sm:p-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Tension Usage (Input with Tension Control)
              </h3>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Use Input component with Tension slider for precise value control.
              </p>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <Input
                    label="Tension Value"
                    type="number"
                    floatingLabel
                    value={tensionValue.toString()}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      if (val >= 0 && val <= 100) {
                        setTensionValue(val);
                      }
                    }}
                    min={0}
                    max={100}
                    helperText="Enter a value between 0 and 100"
                  />
                </div>
                <div>
                  <Tension
                    value={tensionValue}
                    onChange={setTensionValue}
                    min={0}
                    max={100}
                    step={1}
                  />
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Current tension value: <strong>{tensionValue}</strong>
                </div>
              </div>
            </Card>
          </section>

          <section id="usage" className="mb-8 sm:mb-12">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:mb-6 sm:text-2xl">
              Usage
            </h2>

            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Floating Label Input
              </h3>
              <div className="overflow-x-auto rounded-lg bg-gray-900 p-4 sm:p-6">
                <pre className="text-xs text-gray-100 sm:text-sm">
                  <code>{`import { Input } from '@balanceui/core'

function MyForm() {
  return (
    <Input
      label="Email"
      type="email"
      floatingLabel
      helperText="Enter your email address"
      placeholder="example@email.com"
    />
  )
}`}</code>
                </pre>
              </div>
            </Card>

            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                With Validation
              </h3>
              <div className="overflow-x-auto rounded-lg bg-gray-900 p-4 sm:p-6">
                <pre className="text-xs text-gray-100 sm:text-sm">
                  <code>{`import { Input } from '@balanceui/core'

function MyForm() {
  const [email, setEmail] = useState("")
  
  return (
    <Input
      label="Email"
      type="email"
      floatingLabel
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      error={email && !email.includes('@') ? 'Invalid email' : undefined}
      helperText="Email validation auto-disappears on valid input"
    />
  )
}`}</code>
                </pre>
              </div>
            </Card>

            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem" }} className="sm:p-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                With Adornments
              </h3>
              <div className="overflow-x-auto rounded-lg bg-gray-900 p-4 sm:p-6">
                <pre className="text-xs text-gray-100 sm:text-sm">
                  <code>{`import { Input } from '@balanceui/core'

function MyForm() {
  return (
    <Input
      label="Price"
      type="number"
      floatingLabel
      startAdornment={<span>$</span>}
      endAdornment={<span>USD</span>}
      placeholder="0.00"
    />
  )
}`}</code>
                </pre>
              </div>
            </Card>
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


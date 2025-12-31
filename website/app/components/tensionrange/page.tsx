"use client";

import { Card, Badge, TensionRange, Input, FormField } from "@balanceui/core";
import Link from "next/link";
import { useState } from "react";

export default function TensionRangePage() {
  const [value, setValue] = useState<[number, number]>([20, 80]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:ml-64">
      <div className="mb-6 sm:mb-8">
        <Link
          href="/components"
          className="text-sm transition-colors duration-200"
          style={{
            color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--bu-primary, #1976d2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))";
          }}
        >
          ← Back to Components
        </Link>
      </div>
      <div className="mb-8 sm:mb-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <h1
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{
              color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
              fontWeight: 400,
              letterSpacing: "-0.02em",
            }}
          >
            TensionRange
          </h1>
          <Badge variant="solid" style={{ fontSize: "0.875rem", alignSelf: "flex-start" }} className="sm:align-self-auto">
            Forms
          </Badge>
        </div>
        <p
          className="mt-3 text-base sm:mt-4 sm:text-lg"
          style={{
            color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
            lineHeight: 1.6,
          }}
        >
          Material Design range input component for selecting tension value ranges with dual controls.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2">
          <section id="examples" className="mb-8 sm:mb-12">
            <h2
              className="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl"
              style={{
                color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                fontWeight: 500,
              }}
            >
              Examples
            </h2>

            {/* Basic TensionRange */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3
                className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg"
                style={{
                  color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                  fontWeight: 500,
                }}
              >
                Basic Range Control
              </h3>
              <div className="space-y-4">
                <TensionRange
                  value={value}
                  onChange={setValue}
                  min={minValue}
                  max={maxValue}
                />
                <div className="flex items-center gap-4">
                  <FormField label="Min Value">
                    <Input
                      type="number"
                      value={value[0].toString()}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        if (val >= minValue && val <= value[1]) {
                          setValue([val, value[1]]);
                        }
                      }}
                      min={minValue}
                      max={value[1]}
                      style={{ width: "120px" }}
                    />
                  </FormField>
                  <FormField label="Max Value">
                    <Input
                      type="number"
                      value={value[1].toString()}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 100;
                        if (val >= value[0] && val <= maxValue) {
                          setValue([value[0], val]);
                        }
                      }}
                      min={value[0]}
                      max={maxValue}
                      style={{ width: "120px" }}
                    />
                  </FormField>
                </div>
                <div className="text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                  Range: {value[0]} - {value[1]} (Total: {maxValue - minValue})
                </div>
              </div>
            </Card>

            {/* Custom Range */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem" }} className="sm:p-8">
              <h3
                className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg"
                style={{
                  color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                  fontWeight: 500,
                }}
              >
                Custom Range Configuration
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Min Range">
                    <Input
                      type="number"
                      value={minValue.toString()}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setMinValue(val);
                        if (value[0] < val) setValue([val, value[1]]);
                      }}
                    />
                  </FormField>
                  <FormField label="Max Range">
                    <Input
                      type="number"
                      value={maxValue.toString()}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 100;
                        setMaxValue(val);
                        if (value[1] > val) setValue([value[0], val]);
                      }}
                    />
                  </FormField>
                </div>
                <TensionRange
                  value={value}
                  onChange={setValue}
                  min={minValue}
                  max={maxValue}
                />
              </div>
            </Card>
          </section>

          <section id="usage" className="mb-8 sm:mb-12">
            <h2
              className="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl"
              style={{
                color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                fontWeight: 500,
              }}
            >
              Usage
            </h2>
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem" }} className="sm:p-8">
              <h3
                className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg"
                style={{
                  color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                  fontWeight: 500,
                }}
              >
                Basic Usage
              </h3>
              <div className="overflow-x-auto rounded-lg bg-gray-900 p-4 sm:p-6">
                <pre className="text-xs text-gray-100 sm:text-sm">
                  <code>{`import { TensionRange } from '@balanceui/core'
import { useState } from 'react'

function MyComponent() {
  const [value, setValue] = useState<[number, number]>([20, 80])
  
  return (
    <TensionRange
      value={value}
      onChange={setValue}
      min={0}
      max={100}
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
            <h3
              className="mb-4 text-sm font-semibold sm:text-base"
              style={{
                color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                fontWeight: 500,
              }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#examples"
                  className="text-xs sm:text-sm transition-colors duration-200"
                  style={{
                    color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--bu-primary, #1976d2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))";
                  }}
                >
                  Examples
                </a>
              </li>
              <li>
                <a
                  href="#usage"
                  className="text-xs sm:text-sm transition-colors duration-200"
                  style={{
                    color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--bu-primary, #1976d2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))";
                  }}
                >
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

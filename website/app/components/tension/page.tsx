"use client";

import { Card, Badge, Tension, Input } from "@balanceui/core";
import Link from "next/link";
import { useState } from "react";

export default function TensionPage() {
  const [value, setValue] = useState(50);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const [stepValue, setStepValue] = useState(1);

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
            Tension
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
          Material Design tension control component for adjusting tension values with smooth animations.
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

            {/* Basic Tension */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 
                className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg"
                style={{ 
                  color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                  fontWeight: 500,
                }}
              >
                Basic Tension Control
              </h3>
              <div className="space-y-4">
                <Tension
                  value={value}
                  onChange={setValue}
                  min={minValue}
                  max={maxValue}
                  step={stepValue}
                />
                <div className="flex items-center gap-4">
                  <Input
                    label="Value"
                    type="number"
                    floatingLabel
                    value={value.toString()}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      if (val >= minValue && val <= maxValue) {
                        setValue(val);
                      }
                    }}
                    min={minValue}
                    max={maxValue}
                    style={{ width: "120px" }}
                  />
                  <div className="text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                    Range: {minValue} - {maxValue}
                  </div>
                </div>
              </div>
            </Card>

            {/* Tension with Custom Range */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
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
                <div className="grid grid-cols-3 gap-4">
                  <Input
                    label="Min"
                    type="number"
                    floatingLabel
                    value={minValue.toString()}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      setMinValue(val);
                      if (value < val) setValue(val);
                    }}
                  />
                  <Input
                    label="Max"
                    type="number"
                    floatingLabel
                    value={maxValue.toString()}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 100;
                      setMaxValue(val);
                      if (value > val) setValue(val);
                    }}
                  />
                  <Input
                    label="Step"
                    type="number"
                    floatingLabel
                    value={stepValue.toString()}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      setStepValue(val);
                    }}
                    min={1}
                  />
                </div>
                <Tension
                  value={value}
                  onChange={setValue}
                  min={minValue}
                  max={maxValue}
                  step={stepValue}
                />
              </div>
            </Card>

            {/* Disabled Tension */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem" }} className="sm:p-8">
              <h3 
                className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg"
                style={{ 
                  color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                  fontWeight: 500,
                }}
              >
                Disabled State
              </h3>
              <Tension
                value={75}
                onChange={() => {}}
                min={0}
                max={100}
                step={1}
                disabled={true}
              />
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
                  <code>{`import { Tension } from '@balanceui/core'
import { useState } from 'react'

function MyComponent() {
  const [value, setValue] = useState(50)
  
  return (
    <Tension
      value={value}
      onChange={setValue}
      min={0}
      max={100}
      step={1}
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

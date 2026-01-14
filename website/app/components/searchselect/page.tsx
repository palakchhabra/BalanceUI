"use client";

import { Card, Badge, SearchSelect } from "@balanceui/core";
import Link from "next/link";
import { useState } from "react";

export default function SearchSelectPage() {
  const [selected1, setSelected1] = useState<string[]>([]);
  const [selected2, setSelected2] = useState<string[]>([]);
  const [selected3, setSelected3] = useState<string[]>([]);

  const basicOptions = [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
    { label: "Next.js", value: "nextjs" },
    { label: "Nuxt", value: "nuxt" },
    { label: "Remix", value: "remix" },
  ];

  const groupedOptions = [
    { label: "Button", value: "button", group: "Components" },
    { label: "Input", value: "input", group: "Components" },
    { label: "Card", value: "card", group: "Components" },
    { label: "Modal", value: "modal", group: "Components" },
    { label: "Dashboard", value: "dashboard", group: "Pages" },
    { label: "Settings", value: "settings", group: "Pages" },
    { label: "Profile", value: "profile", group: "Pages" },
    { label: "API", value: "api", group: "Documentation" },
    { label: "Guides", value: "guides", group: "Documentation" },
  ];

  const optionsWithDescription = [
    { label: "Material Design", value: "material", description: "Google's design system" },
    { label: "Ant Design", value: "antd", description: "Enterprise-class UI design language" },
    { label: "Chakra UI", value: "chakra", description: "Simple, modular and accessible" },
    { label: "Mantine", value: "mantine", description: "Full featured React components library" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:ml-64">
      <div className="mb-6 sm:mb-8">
        <Link
          href="/components"
          className="text-sm transition-colors"
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
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
            SearchSelect
          </h1>
          <Badge variant="solid" style={{ fontSize: "0.875rem", alignSelf: "flex-start" }} className="sm:align-self-auto">
            Forms
          </Badge>
        </div>
        <p className="mt-3 text-base sm:mt-4 sm:text-lg" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
          A searchable multi-select component with Material Design styling. Search, filter, and select multiple options with chips/tags display.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2">
          <section className="mb-8 sm:mb-12">
            <h2 className="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
              Examples
            </h2>

            {/* Basic SearchSelect */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                Basic SearchSelect
              </h3>
              <p className="mb-4 text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                Search and select multiple options. Selected items appear as chips.
              </p>
              <SearchSelect
                options={basicOptions}
                value={selected1}
                onChange={setSelected1}
                placeholder="Search frameworks..."
              />
              {selected1.length > 0 && (
                <div className="mt-4 text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                  Selected: {selected1.join(", ")}
                </div>
              )}
            </Card>

            {/* With Max Selection */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                With Max Selection Limit
              </h3>
              <p className="mb-4 text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                Limit the number of selections. Max 3 items can be selected.
              </p>
              <SearchSelect
                options={basicOptions}
                value={selected2}
                onChange={setSelected2}
                placeholder="Select up to 3 frameworks..."
                maxSelected={3}
              />
              {selected2.length > 0 && (
                <div className="mt-4 text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                  Selected ({selected2.length}/3): {selected2.join(", ")}
                </div>
              )}
            </Card>

            {/* With Descriptions */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                With Descriptions
              </h3>
              <p className="mb-4 text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                Options can include descriptions for better context.
              </p>
              <SearchSelect
                options={optionsWithDescription}
                value={selected3}
                onChange={setSelected3}
                placeholder="Search UI libraries..."
              />
            </Card>

            {/* Different Sizes */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                Different Sizes
              </h3>
              <div className="space-y-4">
                <SearchSelect
                  options={basicOptions.slice(0, 5)}
                  placeholder="Small size..."
                  size="sm"
                />
                <SearchSelect
                  options={basicOptions.slice(0, 5)}
                  placeholder="Medium size (default)..."
                  size="md"
                />
                <SearchSelect
                  options={basicOptions.slice(0, 5)}
                  placeholder="Large size..."
                  size="lg"
                />
              </div>
            </Card>

            {/* Variants */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem" }} className="sm:p-8">
              <h3 className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                Variants
              </h3>
              <div className="space-y-4">
                <SearchSelect
                  options={basicOptions.slice(0, 5)}
                  placeholder="Outlined variant..."
                  variant="outlined"
                />
                <SearchSelect
                  options={basicOptions.slice(0, 5)}
                  placeholder="Filled variant..."
                  variant="filled"
                />
              </div>
            </Card>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
              Usage
            </h2>
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem" }} className="sm:p-8">
              <div className="overflow-x-auto rounded-lg p-4" style={{ backgroundColor: "var(--bu-surface-variant, rgba(0, 0, 0, 0.08))" }}>
                <pre className="text-xs" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                  <code>{`import { SearchSelect } from '@balanceui/core'
import { useState } from 'react'

function MyComponent() {
  const [selected, setSelected] = useState([])

  const options = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
  ]

  return (
    <SearchSelect
      options={options}
      value={selected}
      onChange={setSelected}
      placeholder="Search and select..."
      maxSelected={5}
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
            <h3 className="mb-4 text-sm font-semibold sm:text-base" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#examples" className="text-xs sm:text-sm" style={{ color: "var(--bu-primary, #1976d2)", textDecoration: "none" }}>
                  Examples
                </a>
              </li>
              <li>
                <a href="#usage" className="text-xs sm:text-sm" style={{ color: "var(--bu-primary, #1976d2)", textDecoration: "none" }}>
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


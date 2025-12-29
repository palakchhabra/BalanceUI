"use client";

import { Card, Badge, MultiSelect, Button } from "@balanceui/core";
import Link from "next/link";
import { useState } from "react";

export default function MultiSelectPage() {
  const [selected1, setSelected1] = useState<string[]>([]);
  const [selected2, setSelected2] = useState<string[]>([]);
  const [selected3, setSelected3] = useState<string[]>([]);
  const [selected4, setSelected4] = useState<string[]>([]);
  const [selected5, setSelected5] = useState<string[]>([]);

  const basicOptions = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "next", label: "Next.js" },
  ];

  const countryOptions = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "jp", label: "Japan" },
    { value: "cn", label: "China" },
    { value: "in", label: "India" },
    { value: "br", label: "Brazil" },
  ];

  const skillOptions = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "php", label: "PHP" },
    { value: "ruby", label: "Ruby" },
    { value: "swift", label: "Swift" },
  ];

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
            MultiSelect
          </h1>
          <Badge variant="solid" style={{ fontSize: "0.875rem", alignSelf: "flex-start" }} className="sm:align-self-auto">
            Forms
          </Badge>
        </div>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 sm:mt-4 sm:text-lg">
          A multi-select dropdown component with Material Design chips/tags UI. Select multiple options with search, keyboard navigation, and custom rendering support.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2">
          <section id="examples" className="mb-8 sm:mb-12">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:mb-6 sm:text-2xl">
              Examples
            </h2>

            {/* Basic MultiSelect */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Basic MultiSelect
              </h3>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Select multiple options from a list. Selected items appear as chips.
              </p>
              <MultiSelect
                options={basicOptions}
                value={selected1}
                onChange={setSelected1}
                placeholder="Select frameworks..."
              />
              {selected1.length > 0 && (
                <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  Selected: {selected1.join(", ")}
                </div>
              )}
            </Card>

            {/* Searchable MultiSelect */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Searchable MultiSelect
              </h3>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Type to search and filter options in real-time.
              </p>
              <MultiSelect
                options={countryOptions}
                value={selected2}
                onChange={setSelected2}
                placeholder="Search countries..."
                searchable
              />
            </Card>

            {/* With Max Selection */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Maximum Selection Limit
              </h3>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Limit selection to a maximum number of items (e.g., 3 skills).
              </p>
              <MultiSelect
                options={skillOptions}
                value={selected3}
                onChange={setSelected3}
                placeholder="Select up to 3 skills..."
                maxSelected={3}
                searchable
                helperText={`Selected ${selected3.length} of 3 maximum`}
              />
            </Card>

            {/* Sizes */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Sizes
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Small</label>
                  <MultiSelect
                    options={basicOptions}
                    value={selected4}
                    onChange={setSelected4}
                    placeholder="Small size..."
                    size="sm"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Medium (Default)</label>
                  <MultiSelect
                    options={basicOptions}
                    value={selected1}
                    onChange={setSelected1}
                    placeholder="Medium size..."
                    size="md"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Large</label>
                  <MultiSelect
                    options={basicOptions}
                    value={selected5}
                    onChange={setSelected5}
                    placeholder="Large size..."
                    size="lg"
                  />
                </div>
              </div>
            </Card>

            {/* Variants */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Variants
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Outlined (Default)</label>
                  <MultiSelect
                    options={basicOptions}
                    value={selected1}
                    onChange={setSelected1}
                    placeholder="Outlined variant..."
                    variant="outlined"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Filled</label>
                  <MultiSelect
                    options={basicOptions}
                    value={selected2}
                    onChange={setSelected2}
                    placeholder="Filled variant..."
                    variant="filled"
                  />
                </div>
              </div>
            </Card>

            {/* With Error State */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Error State
              </h3>
              <MultiSelect
                options={basicOptions}
                value={selected1}
                onChange={setSelected1}
                placeholder="Select options..."
                error="Please select at least one option"
              />
            </Card>

            {/* Disabled State */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem" }} className="sm:p-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Disabled State
              </h3>
              <MultiSelect
                options={basicOptions}
                value={["react", "vue"]}
                onChange={() => {}}
                placeholder="Disabled..."
                disabled
              />
            </Card>
          </section>

          <section id="usage" className="mb-8 sm:mb-12">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:mb-6 sm:text-2xl">
              Usage
            </h2>
            
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Basic Usage
              </h3>
              <div className="overflow-x-auto rounded-lg bg-gray-900 p-4 sm:p-6">
                <pre className="text-xs text-gray-100 sm:text-sm">
                  <code>{`import { MultiSelect } from '@balanceui/core'
import { useState } from 'react'

function MyForm() {
  const [selected, setSelected] = useState<string[]>([])

  const options = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
  ]

  return (
    <MultiSelect
      options={options}
      value={selected}
      onChange={setSelected}
      placeholder="Select frameworks..."
    />
  )
}`}</code>
                </pre>
              </div>
            </Card>

            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                With Search and Max Selection
              </h3>
              <div className="overflow-x-auto rounded-lg bg-gray-900 p-4 sm:p-6">
                <pre className="text-xs text-gray-100 sm:text-sm">
                  <code>{`import { MultiSelect } from '@balanceui/core'

<MultiSelect
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="Search and select..."
  searchable
  maxSelected={3}
  helperText="Select up to 3 items"
/>`}</code>
                </pre>
              </div>
            </Card>

            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem" }} className="sm:p-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Custom Chip Rendering
              </h3>
              <div className="overflow-x-auto rounded-lg bg-gray-900 p-4 sm:p-6">
                <pre className="text-xs text-gray-100 sm:text-sm">
                  <code>{`<MultiSelect
  options={options}
  value={selected}
  onChange={setSelected}
  renderChip={(option, onRemove) => (
    <span className="custom-chip">
      {option.label}
      <button onClick={onRemove}>×</button>
    </span>
  )}
/>`}</code>
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


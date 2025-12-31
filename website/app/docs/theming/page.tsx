"use client";

import Link from "next/link";
import { Card } from "@balanceui/core";

const themes = [
  { name: "clay-graphite", description: "Warm clay tones with graphite accents" },
  { name: "ink-bone", description: "Soft ink on bone white background" },
  { name: "plum-ash", description: "Rich plum with ash gray tones" },
  { name: "forest-cream", description: "Natural forest green with cream" },
  { name: "mint-charcoal", description: "Fresh mint with charcoal base" },
  { name: "rose-charcoal", description: "Elegant rose with charcoal" },
  { name: "sand-ocean", description: "Warm sand with ocean blue" },
  { name: "slate-lime", description: "Cool slate with lime accents" },
  { name: "sky-white", description: "Bright sky blue with white" },
  { name: "black-white", description: "Classic black and white" },
];

export default function ThemingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/docs"
          className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          ← Back to Documentation
        </Link>
      </div>

      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Theming
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Customize the look and feel of BalanceUI with themes and CSS variables.
        </p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Using Themes
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            BalanceUI comes with multiple pre-built themes. Import the theme you prefer:
          </p>
          <div className="overflow-x-auto rounded-lg bg-gray-900 p-6">
            <pre className="text-sm text-gray-100">
              <code>{`import '@balanceui/core/theme/theme-contract.css'
import '@balanceui/core/theme/clay-graphite.css'`}</code>
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Available Themes
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {themes.map((theme) => (
              <Card
                key={theme.name}
                variant="elevated"
                elevation={2}
                style={{
                  padding: "1.5rem",
                  transition: "var(--bu-transition-elevation)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "var(--bu-elevation-4)";
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--bu-elevation-2)";
                }}
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {theme.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {theme.description}
                </p>
                <div className="mt-4 overflow-x-auto rounded bg-gray-900 p-3">
                  <code className="text-xs text-gray-100">
                    import '@balanceui/core/theme/{theme.name}.css'
                  </code>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            CSS Variables
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            All themes use CSS variables that you can override:
          </p>
          <div className="overflow-x-auto rounded-lg bg-gray-900 p-6">
            <pre className="text-sm text-gray-100">
              <code>{`:root {
  --bu-primary: #2a2a2a;
  --bu-surface: #ffffff;
  --bu-border: #e0d8cf;
  --bu-fg: #2a2a2a;
  /* ... and more */
}`}</code>
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}


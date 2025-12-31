"use client";

import Link from "next/link";
import { Button, Card } from "@balanceui/core";

export default function GettingStartedPage() {
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
          Getting Started
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Welcome to BalanceUI! This guide will help you get up and running in
          just a few minutes.
        </p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Installation
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            Install BalanceUI using npm or yarn:
          </p>
          <div className="overflow-x-auto rounded-lg bg-gray-900 p-6">
            <pre className="text-sm text-gray-100">
              <code>{`npm install @balanceui/core
# or
yarn add @balanceui/core`}</code>
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Basic Setup
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            Import the components and theme CSS in your application:
          </p>
          <div className="overflow-x-auto rounded-lg bg-gray-900 p-6">
            <pre className="text-sm text-gray-100">
              <code>{`import { Button } from '@balanceui/core'
import '@balanceui/core/theme/theme-contract.css'
import '@balanceui/core/theme/sky-white.css'

function App() {
  return <Button variant="solid">Hello World</Button>
}`}</code>
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Choose a Theme
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            BalanceUI comes with multiple pre-built themes. Import the one you
            prefer:
          </p>
          <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1rem" }}>
            <ul className="list-disc space-y-2 pl-6 text-gray-600 dark:text-gray-400">
              <li>sky-white.css</li>
              <li>forest-cream.css</li>
              <li>mint-charcoal.css</li>
              <li>plum-ash.css</li>
              <li>rose-charcoal.css</li>
              <li>sand-ocean.css</li>
              <li>slate-lime.css</li>
              <li>clay-graphite.css</li>
              <li>ink-bone.css</li>
              <li>black-white.css</li>
            </ul>
          </Card>
          <p className="text-gray-600 dark:text-gray-400">
            Learn more about theming in our{" "}
            <Link
              href="/docs/theming"
              className="text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200"
            >
              theming guide
            </Link>
            .
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Your First Component
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            Let's create a simple example with multiple components:
          </p>
          <div className="overflow-x-auto rounded-lg bg-gray-900 p-6">
            <pre className="text-sm text-gray-100">
              <code>{`import { Button, Card, Input } from '@balanceui/core'
import '@balanceui/core/theme/theme-contract.css'
import '@balanceui/core/theme/sky-white.css'

function NewsletterForm() {
  return (
    <Card style={{ padding: '2rem', maxWidth: '400px' }}>
      <h2>Newsletter</h2>
      <Input 
        type="email"
        placeholder="Enter your email" 
        style={{ marginBottom: '1rem' }} 
      />
      <Button variant="solid" style={{ width: '100%' }}>
        Subscribe
      </Button>
    </Card>
  )
}`}</code>
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Next Steps
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card
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
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Explore Components
              </h3>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Browse all available components and see examples
              </p>
              <Link href="/components">
                <Button variant="stroke" size="sm">
                  View Components
                </Button>
              </Link>
            </Card>
            <Card
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
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Check Examples
              </h3>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                See real-world examples and use cases
              </p>
              <Link href="/examples">
                <Button variant="stroke" size="sm">
                  View Examples
                </Button>
              </Link>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}


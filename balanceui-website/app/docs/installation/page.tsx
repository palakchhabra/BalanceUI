"use client";

import Link from "next/link";
import { Card, Button } from "@balanceui/core";

export default function InstallationPage() {
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
          Installation
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Step-by-step guide to install and set up BalanceUI in your project.
        </p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Prerequisites
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            Before installing BalanceUI, make sure you have:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-gray-600 dark:text-gray-400">
            <li>Node.js 18 or higher</li>
            <li>React 18 or higher</li>
            <li>A package manager (npm, yarn, or pnpm)</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Install with npm
          </h2>
          <div className="overflow-x-auto rounded-lg bg-gray-900 p-6">
            <pre className="text-sm text-gray-100">
              <code>{`npm install @balanceui/core`}</code>
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Install with yarn
          </h2>
          <div className="overflow-x-auto rounded-lg bg-gray-900 p-6">
            <pre className="text-sm text-gray-100">
              <code>{`yarn add @balanceui/core`}</code>
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Install with pnpm
          </h2>
          <div className="overflow-x-auto rounded-lg bg-gray-900 p-6">
            <pre className="text-sm text-gray-100">
              <code>{`pnpm add @balanceui/core`}</code>
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Import Styles
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            After installing, import the theme CSS in your application entry point:
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
            Next Steps
          </h2>
          <Card variant="elevated" elevation={2} style={{ padding: "1.5rem" }}>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Now that you've installed BalanceUI, check out the getting started guide to learn how to use the components.
            </p>
            <Link href="/docs/getting-started">
              <Button variant="solid">Get Started</Button>
            </Link>
          </Card>
        </section>
      </div>
    </div>
  );
}


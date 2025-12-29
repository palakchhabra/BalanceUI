"use client";

import { Card, Badge, Accordion } from "@balanceui/core";
import Link from "next/link";
import { useState } from "react";

export default function AccordionPage() {
  const [openId, setOpenId] = useState("");

  const items = [
    {
      id: "1",
      title: "What is BalanceUI?",
      content: "BalanceUI is a comprehensive React component library with beautiful, accessible, and customizable components.",
    },
    {
      id: "2",
      title: "How do I install it?",
      content: "You can install BalanceUI using npm: npm install @balanceui/core",
    },
    {
      id: "3",
      title: "Is it free to use?",
      content: "Yes, BalanceUI is completely free and open source.",
    },
  ];

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
            Accordion
          </h1>
          <Badge variant="solid" style={{ fontSize: "0.875rem", alignSelf: "flex-start" }} className="sm:align-self-auto">
            Layout
          </Badge>
        </div>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 sm:mt-4 sm:text-lg">
          Collapsible content sections for organizing and displaying information in an expandable format.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2">
          <section className="mb-8 sm:mb-12">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:mb-6 sm:text-2xl">
              Examples
            </h2>

            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem" }} className="sm:p-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                Basic Accordion
              </h3>
              <Accordion items={items} openId={openId} onChange={setOpenId} />
            </Card>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:mb-6 sm:text-2xl">
              Usage
            </h2>
            <div className="overflow-x-auto rounded-lg bg-gray-900 p-4 sm:p-6">
              <pre className="text-xs text-gray-100 sm:text-sm">
                <code>{`import { Accordion } from '@balanceui/core'
import { useState } from 'react'

function MyComponent() {
  const [openId, setOpenId] = useState('')
  
  const items = [
    {
      id: '1',
      title: 'Section 1',
      content: 'Content for section 1'
    },
    {
      id: '2',
      title: 'Section 2',
      content: 'Content for section 2'
    }
  ]
  
  return (
    <Accordion
      items={items}
      openId={openId}
      onChange={setOpenId}
    />
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


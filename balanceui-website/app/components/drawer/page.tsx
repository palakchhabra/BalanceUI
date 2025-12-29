"use client";

import { Drawer, Card, Badge, Button } from "@balanceui/core";
import Link from "next/link";
import { useState } from "react";

export default function DrawerPage() {
  const [open, setOpen] = useState(false);
  const [openLeft, setOpenLeft] = useState(false);
  const [openTop, setOpenTop] = useState(false);
  const [openBottom, setOpenBottom] = useState(false);

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
            Drawer
          </h1>
          <Badge variant="solid" style={{ fontSize: "0.875rem", alignSelf: "flex-start" }} className="sm:align-self-auto">
            Overlay
          </Badge>
        </div>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 sm:mt-4 sm:text-lg">
          A slide-out panel component that can be positioned from any side of the screen. Perfect for navigation, filters, and additional content.
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
                Placements
              </h3>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <Button variant="solid" onClick={() => setOpen(true)}>
                  Right Drawer
                </Button>
                <Button variant="solid" onClick={() => setOpenLeft(true)}>
                  Left Drawer
                </Button>
                <Button variant="solid" onClick={() => setOpenTop(true)}>
                  Top Drawer
                </Button>
                <Button variant="solid" onClick={() => setOpenBottom(true)}>
                  Bottom Drawer
                </Button>
              </div>
            </Card>

            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem" }} className="sm:p-8">
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white sm:mb-4 sm:text-lg">
                With Title and Handle
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <Button variant="solid" onClick={() => setOpen(true)}>
                  Open Drawer with Title
                </Button>
              </div>
            </Card>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:mb-6 sm:text-2xl">
              Usage
            </h2>
            <div className="overflow-x-auto rounded-lg bg-gray-900 p-4 sm:p-6">
              <pre className="text-xs text-gray-100 sm:text-sm">
                <code>{`import { Drawer, Button } from '@balanceui/core'
import { useState } from 'react'

function MyComponent() {
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        placement="right"
        size={360}
        title="Drawer Title"
        showHandle
      >
        <div style={{ padding: '1rem' }}>
          Drawer content goes here
        </div>
      </Drawer>
    </>
  )
}`}</code>
              </pre>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:mb-6 sm:text-2xl">
              Props
            </h2>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle sm:px-0">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 sm:px-6 sm:py-3">
                          Prop
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 sm:px-6 sm:py-3">
                          Type
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 sm:px-6 sm:py-3">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                      <tr>
                        <td className="whitespace-nowrap px-3 py-3 text-xs font-medium text-gray-900 dark:text-white sm:px-6 sm:text-sm">
                          open
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          boolean
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          Controls drawer visibility
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-3 py-3 text-xs font-medium text-gray-900 dark:text-white sm:px-6 sm:text-sm">
                          onClose
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          () =&gt; void
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          Callback when drawer should close
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-3 py-3 text-xs font-medium text-gray-900 dark:text-white sm:px-6 sm:text-sm">
                          placement
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          "left" | "right" | "top" | "bottom"
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          Drawer placement (default: "right")
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-3 py-3 text-xs font-medium text-gray-900 dark:text-white sm:px-6 sm:text-sm">
                          size
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          number | string
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          Drawer size in pixels or CSS unit (default: 360)
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-3 py-3 text-xs font-medium text-gray-900 dark:text-white sm:px-6 sm:text-sm">
                          title
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          string
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          Optional drawer title
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-3 py-3 text-xs font-medium text-gray-900 dark:text-white sm:px-6 sm:text-sm">
                          showHandle
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          boolean
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-500 dark:text-gray-400 sm:px-6 sm:text-sm">
                          Show drag handle (default: false)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
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
              <li>
                <a href="#props" className="text-xs text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200 sm:text-sm">
                  Props
                </a>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        placement="right"
        size={360}
        title="Right Drawer"
        showHandle
      >
        <div style={{ padding: "1.5rem" }}>
          <p>This is a drawer from the right side.</p>
          <p>Press ESC to close or click outside.</p>
        </div>
      </Drawer>

      <Drawer
        open={openLeft}
        onClose={() => setOpenLeft(false)}
        placement="left"
        size={360}
      >
        <div style={{ padding: "1.5rem" }}>
          <p>This is a drawer from the left side.</p>
        </div>
      </Drawer>

      <Drawer
        open={openTop}
        onClose={() => setOpenTop(false)}
        placement="top"
        size={200}
      >
        <div style={{ padding: "1.5rem" }}>
          <p>This is a drawer from the top.</p>
        </div>
      </Drawer>

      <Drawer
        open={openBottom}
        onClose={() => setOpenBottom(false)}
        placement="bottom"
        size={300}
        showHandle
      >
        <div style={{ padding: "1.5rem" }}>
          <p>This is a drawer from the bottom.</p>
        </div>
      </Drawer>
    </div>
  );
}


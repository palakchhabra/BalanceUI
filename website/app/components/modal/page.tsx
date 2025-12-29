"use client";

import { useState } from "react";
import { Card, Badge, Button, Modal } from "@balanceui/core";
import Link from "next/link";

export default function ModalPage() {
  const [open, setOpen] = useState(false);
  const [openLarge, setOpenLarge] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/components"
          className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          ← Back to Components
        </Link>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Modal
          </h1>
          <Badge variant="solid" style={{ fontSize: "0.875rem" }}>
            Overlay
          </Badge>
        </div>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          A dialog component for displaying modal content with overlay and escape key support.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              Examples
            </h2>

            <Card variant="elevated" elevation={2} style={{ padding: "2rem", marginBottom: "2rem" }}>
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Basic Modal
              </h3>
              <Button variant="solid" onClick={() => setOpen(true)}>
                Open Modal
              </Button>
              <Modal open={open} onClose={() => setOpen(false)}>
                <div style={{ padding: "2rem", maxWidth: "500px" }}>
                  <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
                    Modal Title
                  </h2>
                  <p className="mb-6 text-gray-600 dark:text-gray-400">
                    This is a basic modal dialog. Click outside or press Escape to close.
                  </p>
                  <div className="flex justify-end gap-4">
                    <Button variant="stroke" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="solid" onClick={() => setOpen(false)}>
                      Confirm
                    </Button>
                  </div>
                </div>
              </Modal>
            </Card>

            <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Large Modal
              </h3>
              <Button variant="solid" onClick={() => setOpenLarge(true)}>
                Open Large Modal
              </Button>
              <Modal open={openLarge} onClose={() => setOpenLarge(false)}>
                <div style={{ padding: "2rem", maxWidth: "800px" }}>
                  <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
                    Large Modal Content
                  </h2>
                  <p className="mb-6 text-gray-600 dark:text-gray-400">
                    This modal has more content and a wider layout. You can include any content
                    you need here, including forms, images, or other components.
                  </p>
                  <div className="flex justify-end gap-4">
                    <Button variant="stroke" onClick={() => setOpenLarge(false)}>
                      Close
                    </Button>
                  </div>
                </div>
              </Modal>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              Usage
            </h2>
            <div className="overflow-x-auto rounded-lg bg-gray-900 p-6">
              <pre className="text-sm text-gray-100">
                <code>{`import { Modal, Button } from '@balanceui/core'
import { useState } from 'react'

function MyComponent() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={{ padding: '2rem' }}>
          <h2>Modal Content</h2>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </div>
      </Modal>
    </>
  )
}`}</code>
              </pre>
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", position: "sticky", top: "6rem" }}>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
              Props
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-gray-900 dark:text-white">open:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">boolean</span>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">onClose:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">{"() => void"}</span>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">closeOnOverlayClick:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">boolean (default: true)</span>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">closeOnEscape:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">boolean (default: true)</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}


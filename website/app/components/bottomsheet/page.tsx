"use client";

import { Card, Badge, BottomSheet, Button } from "@balanceui/core";
import Link from "next/link";
import { useState } from "react";

export default function BottomSheetPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-6 sm:mb-8">
        <Link href="/components" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
          ← Back to Components
        </Link>
      </div>
      <div className="mb-8 sm:mb-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">BottomSheet</h1>
          <Badge variant="solid" style={{ fontSize: "0.875rem", alignSelf: "flex-start" }} className="sm:align-self-auto">
            Overlay
          </Badge>
        </div>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 sm:mt-4 sm:text-lg">
          Bottom sheet component for mobile-friendly overlays and actions.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2">
          <section className="mb-8 sm:mb-12">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:mb-6 sm:text-2xl">Examples</h2>
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem" }} className="sm:p-8">
              <Button variant="solid" onClick={() => setOpen(true)}>
                Open Bottom Sheet
              </Button>
              <BottomSheet open={open} onClose={() => setOpen(false)}>
                <div style={{ padding: "1.5rem" }}>
                  <h3 style={{ marginBottom: "1rem" }}>Bottom Sheet Content</h3>
                  <p>This is the content of the bottom sheet.</p>
                </div>
              </BottomSheet>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}


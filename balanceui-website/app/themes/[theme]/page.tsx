"use client";

import { useEffect } from "react";
import { Button, Card, Badge, Input, FormField, Progress, Toggle } from "@balanceui/core";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { use } from "react";

export default function ThemePreviewPage({ params }: { params: Promise<{ theme: string }> }) {
  const resolvedParams = use(params);
  const { setTheme } = useTheme();
  const theme = resolvedParams.theme;

  // Set the theme when page loads
  useEffect(() => {
    if (theme) {
      setTheme(theme as any);
    }
  }, [theme, setTheme]);

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
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          {theme.charAt(0).toUpperCase() + theme.slice(1).replace(/-/g, " ")} Theme
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Preview of components using the {theme} theme
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="solid">Solid</Button>
            <Button variant="stroke">Stroke</Button>
            <Button variant="soft">Soft</Button>
            <Button variant="bare">Bare</Button>
          </div>
        </Card>

        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Badges</h2>
          <div className="flex flex-wrap gap-4">
            <Badge variant="solid">Solid</Badge>
            <Badge variant="soft">Soft</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
          </div>
        </Card>

        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Form Fields</h2>
          <div className="space-y-4">
            <FormField label="Email">
              <Input type="email" placeholder="Enter email" style={{ width: "100%" }} />
            </FormField>
            <FormField label="Password" error="Password is required">
              <Input type="password" placeholder="Enter password" style={{ width: "100%" }} />
            </FormField>
          </div>
        </Card>

        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Progress & Toggle</h2>
          <div className="space-y-4">
            <Progress value={75} />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Enable notifications</span>
              <Toggle checked={true} onChange={() => {}} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}


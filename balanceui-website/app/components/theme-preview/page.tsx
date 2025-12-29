"use client";

import { useState } from "react";
import { Button, Card, Badge, Input, FormField, Progress, Toggle, Select, Checkbox, DatePicker, TimePicker, Accordion, Stepper, TextArea, ButtonToggle, Icon, Tension, TensionRange, Toolbar, List, Shimmer, Pagination, PageSizeSelector, Dialog, ToastProvider, useToast } from "@balanceui/core";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";

type Theme = 
  | "calm-blue"
  | "salt-pepper"
  | "quiet-luxury"
  | "gothic-noir"
  | "cherry-blossom"
  | "lavender-fields"
  | "beachfront-views"
  | "frozen-lake"
  | "golden-hour"
  | "stone-path"
  | "cappuccino"
  | "coastal-morning"
  | "desert-dusk"
  | "fresh-peach"
  | "minty-fresh"
  | "ocean-tide"
  | "soft-spring"
  | "autumn-leaves"
  | "winter-chill"
  | "summer-breeze"
  | "us-black-white";

const themes: Theme[] = [
  "calm-blue",
  "salt-pepper",
  "quiet-luxury",
  "gothic-noir",
  "cherry-blossom",
  "lavender-fields",
  "beachfront-views",
  "frozen-lake",
  "golden-hour",
  "stone-path",
  "cappuccino",
  "coastal-morning",
  "desert-dusk",
  "fresh-peach",
  "minty-fresh",
  "ocean-tide",
  "soft-spring",
  "autumn-leaves",
  "winter-chill",
  "summer-breeze",
  "us-black-white",
];

function ThemePreviewContent() {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<Theme>(theme);
  const [dialogOpen, setDialogOpen] = useState(false);
  const toast = useToast();

  const handleThemeChange = (newTheme: Theme) => {
    setSelectedTheme(newTheme);
    setTheme(newTheme);
  };

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
          Theme Preview
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Preview components with different themes. Select a theme to see how components look.
        </p>
      </div>

      <Card variant="elevated" elevation={3} style={{ padding: "2rem", marginBottom: "2rem" }}>
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          Select Theme
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
          {themes.map((t) => (
            <button
              key={t}
              onClick={() => handleThemeChange(t)}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                selectedTheme === t
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
              }`}
            >
              {t.replace(/-/g, " ")}
            </button>
          ))}
        </div>
      </Card>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="solid">Solid</Button>
            <Button variant="stroke">Stroke</Button>
            <Button variant="soft">Soft</Button>
            <Button variant="bare">Bare</Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            <Button variant="solid" size="sm">Small</Button>
            <Button variant="solid" size="md">Medium</Button>
            <Button variant="solid" size="lg">Large</Button>
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
            <div>
              <Progress value={75} />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">75% Complete</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Enable notifications</span>
              <Toggle checked={true} onChange={() => {}} />
            </div>
          </div>
        </Card>

        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Card Variants</h2>
          <div className="space-y-4">
            <Card variant="elevated" elevation={1} style={{ padding: "1rem" }}>
              Elevation 1
            </Card>
            <Card variant="elevated" elevation={2} style={{ padding: "1rem" }}>
              Elevation 2
            </Card>
            <Card variant="outlined" style={{ padding: "1rem" }}>
              Outlined
            </Card>
          </div>
        </Card>

        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Select</h2>
          <Select
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
              { value: "3", label: "Option 3" },
            ]}
            placeholder="Select an option"
            style={{ width: "100%" }}
          />
        </Card>

        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Checkbox</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox checked={true} onChange={() => {}} />
              <span className="text-sm text-gray-600 dark:text-gray-400">Checked</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked={false} onChange={() => {}} />
              <span className="text-sm text-gray-600 dark:text-gray-400">Unchecked</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked={true} indeterminate onChange={() => {}} />
              <span className="text-sm text-gray-600 dark:text-gray-400">Indeterminate</span>
            </div>
          </div>
        </Card>

        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Date Pickers</h2>
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Single Date</p>
              <DatePicker
                mode="single"
                placeholder="Select date"
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Date Range</p>
              <DatePicker
                mode="range"
                placeholder="Select date range"
                style={{ width: "100%" }}
              onRangeChange={(start: Date | null, end: Date | null) => {
                console.log("Date range:", start, end);
              }}
              />
            </div>
          </div>
        </Card>

        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Time Picker</h2>
          <TimePicker
            placeholder="Select time"
            style={{ width: "100%" }}
          />
        </Card>

        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">TextArea</h2>
          <TextArea
            placeholder="Enter your message..."
            rows={4}
            style={{ width: "100%" }}
          />
        </Card>

        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Button Toggle</h2>
          <ButtonToggle
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
              { value: "3", label: "Option 3" },
            ]}
            value="1"
            onChange={() => {}}
          />
        </Card>

        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Accordion</h2>
          <Accordion
            items={[
              {
                id: "1",
                title: "Section 1",
                content: "This is the content of section 1",
              },
              {
                id: "2",
                title: "Section 2",
                content: "This is the content of section 2",
              },
            ]}
          />
        </Card>

        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Stepper</h2>
          <Stepper
            activeStep={2}
            steps={[
              { id: "1", label: "Step 1" },
              { id: "2", label: "Step 2" },
              { id: "3", label: "Step 3" },
              { id: "4", label: "Step 4" },
            ]}
          />
        </Card>

        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Icon</h2>
          <div className="flex flex-wrap gap-4">
            <Icon name="heart" size="sm" />
            <Icon name="star" size="md" />
            <Icon name="user" size="lg" />
            <Icon name="settings" size="xl" />
          </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Icon component with various sizes
          </p>
        </Card>

        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Tension Controls</h2>
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Tension</p>
              <Tension
                value={50}
                onChange={(value: number) => console.log("Tension:", value)}
                min={0}
                max={100}
              />
            </div>
            <div>
              <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Tension Range</p>
              <TensionRange
                value={[20, 80]}
                onChange={(values: [number, number]) => console.log("Range:", values)}
                min={0}
                max={100}
              />
            </div>
          </div>
        </Card>

        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Toolbar</h2>
          <Toolbar
            items={[
              { id: "1", label: "Bold" },
              { id: "2", label: "Italic" },
              { id: "3", label: "Underline" },
            ]}
          />
        </Card>

        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">List</h2>
          <List
            items={[
              { id: "1", primary: "Item 1", secondary: "Description 1" },
              { id: "2", primary: "Item 2", secondary: "Description 2" },
              { id: "3", primary: "Item 3", secondary: "Description 3" },
            ]}
            onItemClick={(item) => console.log("Item clicked:", item)}
          />
        </Card>

        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Shimmer</h2>
          <div className="space-y-2">
            <Shimmer width="100%" height="20px" />
            <Shimmer width="80%" height="20px" />
            <Shimmer width="60%" height="20px" />
          </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Loading skeleton with shimmer effect
          </p>
        </Card>

        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Pagination</h2>
          <Pagination
            page={1}
            pageSize={10}
            total={100}
            onChange={(page: number) => console.log("Page:", page)}
          />
        </Card>

        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Page Size Selector</h2>
          <PageSizeSelector
            value={10}
            options={[10, 20, 50, 100]}
            onChange={(size: number) => console.log("Page size:", size)}
          />
        </Card>

        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Dialog</h2>
          <div className="space-y-4">
            <Button variant="solid" onClick={() => setDialogOpen(true)}>
              Open Dialog
            </Button>
            <Dialog
              open={dialogOpen}
              title="Confirm Action"
              onConfirm={() => {
                toast.notify({ message: "Action confirmed!", variant: "success" });
                setDialogOpen(false);
              }}
              onCancel={() => setDialogOpen(false)}
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Click the button to open a confirmation dialog
            </p>
          </div>
        </Card>

        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Toast</h2>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-3">
              <Button variant="solid" onClick={() => toast.notify({ message: "Success message", variant: "success" })}>
                Success
              </Button>
              <Button variant="solid" onClick={() => toast.notify({ message: "Error message", variant: "error" })}>
                Error
              </Button>
              <Button variant="solid" onClick={() => toast.notify({ message: "Info message", variant: "info" })}>
                Info
              </Button>
              <Button variant="solid" onClick={() => toast.notify({ message: "Warning message", variant: "warning" })}>
                Warning
              </Button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Click buttons to show toast notifications
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function ThemePreviewPage() {
  return (
    <ToastProvider>
      <ThemePreviewContent />
    </ToastProvider>
  );
}


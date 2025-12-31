"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  Button,
  Badge,
  Modal,
  Dialog,
  BottomSheet,
  Tension,
  TensionRange,
  DatePicker,
  TimePicker,
  TextArea,
  Icon,
  Toolbar,
  Progress,
  Stepper,
} from "@balanceui/core";

export default function ShowcasePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [tensionValue, setTensionValue] = useState(50);
  const [tensionRange, setTensionRange] = useState<[number, number]>([25, 75]);
  const [dateValue, setDateValue] = useState<Date | null>(null);
  const [timeValue, setTimeValue] = useState<Date | null>(null);
  const [textareaValue, setTextareaValue] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [progressValue, setProgressValue] = useState(65);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:ml-64">
      <div className="mb-8">
        <Link
          href="/examples"
          className="text-sm transition-colors"
          style={{
            color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--bu-primary, #1976d2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))";
          }}
        >
          ← Back to Examples
        </Link>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Icon name="check" size="xl" />
          <h1 className="text-4xl font-bold tracking-tight" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
            Component Showcase
          </h1>
          <Badge variant="solid">All Components</Badge>
        </div>
        <p className="mt-4 text-lg" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
          Interactive showcase of all BalanceUI components in action.
        </p>
        <div className="mt-6 space-y-4">
          <div>
            <div className="mb-2 flex justify-between text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
              <span>Progress: {progressValue}%</span>
              <span>Linear</span>
            </div>
            <Progress value={progressValue} variant="solid" showValue />
          </div>
          <div className="flex gap-4 items-center">
            <Progress value={30} type="circular" showValue />
            <Progress value={60} type="circular" showValue />
            <Progress value={90} type="circular" showValue />
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="stroke" onClick={() => setProgressValue(Math.max(0, progressValue - 10))}>
              -10%
            </Button>
            <Button size="sm" variant="stroke" onClick={() => setProgressValue(Math.min(100, progressValue + 10))}>
              +10%
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Overlays */}
        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }} className="sm:p-8">
          <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
            Overlays
          </h2>
          <div className="space-y-4">
            <Button variant="solid" onClick={() => setModalOpen(true)}>
              Open Modal
            </Button>
            <Button variant="solid" onClick={() => setDialogOpen(true)}>
              Open Dialog
            </Button>
            <Button variant="solid" onClick={() => setBottomSheetOpen(true)}>
              Open Bottom Sheet
            </Button>
          </div>
        </Card>

        {/* Controls */}
        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }} className="sm:p-8">
          <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
            Controls
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                Tension: {tensionValue}
              </label>
              <Tension value={tensionValue} onChange={setTensionValue} />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                Range: {tensionRange[0]} - {tensionRange[1]}
              </label>
              <TensionRange value={tensionRange} onChange={setTensionRange} />
            </div>
          </div>
        </Card>

        {/* Date & Time */}
        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }} className="sm:p-8">
          <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
            Date & Time Pickers
          </h2>
          <div className="space-y-4">
            <DatePicker
              value={dateValue}
              onChange={setDateValue}
              placeholder="Select date"
            />
            <TimePicker
              value={timeValue}
              onChange={(time) => setTimeValue(time)}
              placeholder="Select time"
            />
          </div>
        </Card>

        {/* Text Area */}
        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }} className="sm:p-8">
          <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
            Text Area
          </h2>
          <TextArea
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            placeholder="Enter your message..."
            rows={6}
          />
        </Card>
      </div>

      {/* Stepper */}
      <div className="mt-8">
        <Card variant="elevated" elevation={2} style={{ padding: "2rem" }} className="sm:p-8">
          <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
            Stepper
          </h2>
          <Stepper
            steps={[
              { id: "step1", label: "Step 1" },
              { id: "step2", label: "Step 2" },
              { id: "step3", label: "Step 3" },
              { id: "step4", label: "Step 4" },
            ]}
            activeStep={currentStep}
            onStepClick={setCurrentStep}
          />
          <div className="mt-6 flex gap-2">
            <Button variant="stroke" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0}>
              Previous
            </Button>
            <Button variant="solid" onClick={() => setCurrentStep(Math.min(3, currentStep + 1))} disabled={currentStep === 3}>
              Next
            </Button>
          </div>
        </Card>
      </div>

      {/* Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <div style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
          <h2 className="text-xl font-semibold mb-4">Modal Example</h2>
          <p className="mb-4">This is a modal dialog using the Modal component.</p>
          <p className="mb-4">It can contain any content you want.</p>
          <div className="flex justify-end gap-2">
            <Button variant="stroke" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="solid" onClick={() => setModalOpen(false)}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>

      {/* Dialog */}
      <Dialog
        open={dialogOpen}
        title="Dialog Example"
        onConfirm={() => {
          setDialogOpen(false);
          alert("Confirmed!");
        }}
        onCancel={() => setDialogOpen(false)}
      />

      {/* Bottom Sheet */}
      <BottomSheet
        open={bottomSheetOpen}
        onClose={() => setBottomSheetOpen(false)}
        title="Bottom Sheet Example"
      >
        <div style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
          <p className="mb-4">This is a bottom sheet component.</p>
          <p className="mb-4">Perfect for mobile interfaces!</p>
          <Button variant="solid" onClick={() => setBottomSheetOpen(false)} style={{ width: "100%" }}>
            Close
          </Button>
        </div>
      </BottomSheet>
    </div>
  );
}


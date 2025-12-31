"use client";

import { useState } from "react";
import { Card, Badge, Button, ToastProvider, useToast } from "@balanceui/core";
import Link from "next/link";

function NotificationDemo() {
  const toast = useToast();

  return (
    <div className="space-y-4">
      <Button
        variant="solid"
        onClick={() => toast.notify({ message: "Success! Operation completed.", variant: "success" })}
      >
        Show Success Toast
      </Button>
      <Button
        variant="solid"
        onClick={() => toast.notify({ message: "Warning: Please check your input.", variant: "warning" })}
      >
        Show Warning Toast
      </Button>
      <Button
        variant="solid"
        onClick={() => toast.notify({ message: "Error: Something went wrong.", variant: "error" })}
      >
        Show Error Toast
      </Button>
      <Button
        variant="solid"
        onClick={() => toast.notify({ message: "Info: Here's some information.", variant: "info" })}
      >
        Show Info Toast
      </Button>
    </div>
  );
}

export default function NotificationsExample() {
  return (
    <ToastProvider>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:ml-64">
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
          <h1 className="text-4xl font-bold tracking-tight" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
            Notification Center Example
          </h1>
          <p className="mt-4 text-lg" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
            Toast notifications and Badge components for user feedback.
          </p>
        </div>

        <Card variant="elevated" elevation={3} style={{ padding: "2rem" }}>
          <h2 className="mb-6 text-2xl font-semibold" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
            Toast Notifications
          </h2>
          <NotificationDemo />
        </Card>

        <Card
          variant="elevated"
          elevation={2}
          style={{ padding: "2rem", marginTop: "2rem" }}
        >
          <h2 className="mb-6 text-2xl font-semibold" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
            Badge Examples
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-lg font-medium" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                Basic Variants
              </h3>
              <div className="flex flex-wrap gap-4">
                <Badge variant="solid">Solid</Badge>
                <Badge variant="soft">Soft</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-medium" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                Status Variants
              </h3>
              <div className="flex flex-wrap gap-4">
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-medium" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                Notification Badges
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>Inbox</span>
                  <Badge variant="danger">5</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>Messages</span>
                  <Badge variant="warning">12</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>Alerts</span>
                  <Badge variant="success">New</Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </ToastProvider>
  );
}


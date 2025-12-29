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
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/examples"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            ← Back to Examples
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Notification Center Example
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Toast notifications and Badge components for user feedback.
          </p>
        </div>

        <Card variant="elevated" elevation={3} style={{ padding: "2rem" }}>
          <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            Toast Notifications
          </h2>
          <NotificationDemo />
        </Card>

        <Card
          variant="elevated"
          elevation={2}
          style={{ padding: "2rem", marginTop: "2rem" }}
        >
          <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            Badge Examples
          </h2>
          <div className="flex flex-wrap gap-4">
            <Badge variant="solid">Solid</Badge>
            <Badge variant="soft">Soft</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
          </div>
        </Card>
      </div>
    </ToastProvider>
  );
}


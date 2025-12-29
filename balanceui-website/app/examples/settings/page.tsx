"use client";

import { useState } from "react";
import { Card, Toggle, Tabs, Button, Input, FormField } from "@balanceui/core";
import Link from "next/link";

export default function SettingsExample() {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    {
      id: "general",
      label: "General",
      content: (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            General Settings
          </h2>
          
          <FormField label="Display Name">
            <Input
              placeholder="Enter your display name"
              defaultValue="John Doe"
              style={{ width: "100%" }}
            />
          </FormField>

          <FormField label="Email">
            <Input
              type="email"
              placeholder="Enter your email"
              defaultValue="john@example.com"
              style={{ width: "100%" }}
            />
          </FormField>

          <div className="flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Dark Mode
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Enable dark mode for better viewing in low light
              </p>
            </div>
            <Toggle
              checked={darkMode}
              onChange={setDarkMode}
            />
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <Button variant="stroke">Cancel</Button>
            <Button variant="solid">Save Changes</Button>
          </div>
        </div>
      ),
    },
    {
      id: "notifications",
      label: "Notifications",
      content: (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Notification Settings
          </h2>

          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-6 dark:border-gray-700">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Push Notifications
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Receive push notifications on your device
                </p>
              </div>
              <Toggle
                checked={notifications}
                onChange={setNotifications}
              />
            </div>

            <div className="flex items-center justify-between border-b border-gray-200 pb-6 dark:border-gray-700">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Email Alerts
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Receive important updates via email
                </p>
              </div>
              <Toggle
                checked={emailAlerts}
                onChange={setEmailAlerts}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  SMS Notifications
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Receive SMS notifications for critical updates
                </p>
              </div>
              <Toggle checked={false} onChange={() => {}} />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <Button variant="stroke">Cancel</Button>
            <Button variant="solid">Save Changes</Button>
          </div>
        </div>
      ),
    },
    {
      id: "privacy",
      label: "Privacy",
      content: (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Privacy Settings
          </h2>

          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-6 dark:border-gray-700">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Profile Visibility
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Make your profile visible to other users
                </p>
              </div>
              <Toggle checked={true} onChange={() => {}} />
            </div>

            <div className="flex items-center justify-between border-b border-gray-200 pb-6 dark:border-gray-700">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Data Collection
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Allow us to collect anonymous usage data
                </p>
              </div>
              <Toggle checked={false} onChange={() => {}} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Third-party Sharing
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Allow sharing data with trusted partners
                </p>
              </div>
              <Toggle checked={false} onChange={() => {}} />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <Button variant="stroke">Cancel</Button>
            <Button variant="solid">Save Changes</Button>
          </div>
        </div>
      ),
    },
  ];

  return (
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
          Settings Page Example
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          A settings interface using Tabs, Toggle, and FormField components.
        </p>
      </div>

      <Card variant="elevated" elevation={3} style={{ padding: "2rem" }}>
        <Tabs
          tabs={tabs}
          value={activeTab}
          onChange={setActiveTab}
        />
      </Card>
    </div>
  );
}


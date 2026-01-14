"use client";

import { useState } from "react";
import { Card, Toggle, Tabs, Button, Input, FormField, TextArea, DatePicker, TimePicker, Select, MultiSelect, Checkbox } from "@balanceui/core";
import Link from "next/link";

export default function SettingsExample() {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [dataCollection, setDataCollection] = useState(false);
  const [thirdPartySharing, setThirdPartySharing] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [dateValue, setDateValue] = useState<Date | null>(null);
  const [timeValue, setTimeValue] = useState<Date | null>(null);
  const [textareaValue, setTextareaValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [multiSelectValue, setMultiSelectValue] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const tabs = [
    {
      id: "general",
      label: "General",
      content: (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
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

          <FormField label="Bio">
            <TextArea
              placeholder="Tell us about yourself"
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              rows={4}
              style={{ width: "100%" }}
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Date of Birth">
              <DatePicker
                value={dateValue}
                onChange={setDateValue}
                placeholder="Select date"
              />
            </FormField>
            <FormField label="Preferred Time">
              <TimePicker
                value={timeValue}
                onChange={setTimeValue}
                placeholder="Select time"
              />
            </FormField>
          </div>

          <FormField label="Country">
            <Select
              value={selectValue}
              onChange={(val) => setSelectValue(val)}
              options={[
                { value: "us", label: "United States" },
                { value: "uk", label: "United Kingdom" },
                { value: "ca", label: "Canada" },
              ]}
              placeholder="Select a country"
            />
          </FormField>

          <FormField label="Skills" helperText="Select multiple skills">
            <MultiSelect
              value={multiSelectValue}
              onChange={setMultiSelectValue}
              options={[
                { value: "react", label: "React" },
                { value: "typescript", label: "TypeScript" },
                { value: "node", label: "Node.js" },
                { value: "python", label: "Python" },
              ]}
              placeholder="Select skills"
            />
          </FormField>

          <div className="flex items-center gap-4">
            <Checkbox
              checked={checkedItems.includes("terms")}
              onChange={(checked) => {
                setCheckedItems(checked ? [...checkedItems, "terms"] : checkedItems.filter(i => i !== "terms"));
              }}
            />
            <span style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>I agree to the terms and conditions</span>
          </div>

          <div 
            className="flex items-center justify-between border-t pt-6"
            style={{
              borderColor: "var(--bu-border, rgba(0, 0, 0, 0.12))",
            }}
          >
            <div>
              <h3 className="text-sm font-medium" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                Dark Mode
              </h3>
              <p className="mt-1 text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
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
          <h2 className="text-xl font-semibold" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
            Notification Settings
          </h2>

          <div className="space-y-6">
            <div 
              className="flex items-center justify-between border-b pb-6"
              style={{
                borderColor: "var(--bu-border, rgba(0, 0, 0, 0.12))",
              }}
            >
              <div>
                <h3 className="text-sm font-medium" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                  Push Notifications
                </h3>
                <p className="mt-1 text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                  Receive push notifications on your device
                </p>
              </div>
              <Toggle
                checked={notifications}
                onChange={setNotifications}
              />
            </div>

            <div 
              className="flex items-center justify-between border-b pb-6"
              style={{
                borderColor: "var(--bu-border, rgba(0, 0, 0, 0.12))",
              }}
            >
              <div>
                <h3 className="text-sm font-medium" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                  Email Alerts
                </h3>
                <p className="mt-1 text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
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
                <h3 className="text-sm font-medium" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                  SMS Notifications
                </h3>
                <p className="mt-1 text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                  Receive SMS notifications for critical updates
                </p>
              </div>
              <Toggle checked={smsNotifications} onChange={setSmsNotifications} />
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
          <h2 className="text-xl font-semibold" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
            Privacy Settings
          </h2>

          <div className="space-y-6">
            <div 
              className="flex items-center justify-between border-b pb-6"
              style={{
                borderColor: "var(--bu-border, rgba(0, 0, 0, 0.12))",
              }}
            >
              <div>
                <h3 className="text-sm font-medium" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                  Profile Visibility
                </h3>
                <p className="mt-1 text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                  Make your profile visible to other users
                </p>
              </div>
              <Toggle checked={profileVisibility} onChange={setProfileVisibility} />
            </div>

            <div 
              className="flex items-center justify-between border-b pb-6"
              style={{
                borderColor: "var(--bu-border, rgba(0, 0, 0, 0.12))",
              }}
            >
              <div>
                <h3 className="text-sm font-medium" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                  Data Collection
                </h3>
                <p className="mt-1 text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                  Allow us to collect anonymous usage data
                </p>
              </div>
              <Toggle checked={dataCollection} onChange={setDataCollection} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                  Third-party Sharing
                </h3>
                <p className="mt-1 text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                  Allow sharing data with trusted partners
                </p>
              </div>
              <Toggle checked={thirdPartySharing} onChange={setThirdPartySharing} />
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
          className="text-sm transition-colors"
          style={{ 
            color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--bu-fg, rgba(0, 0, 0, 0.87))";
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
          Settings Page Example
        </h1>
        <p className="mt-4 text-lg" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
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


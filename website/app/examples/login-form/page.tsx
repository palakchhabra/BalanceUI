"use client";

import { useState } from "react";
import { Button, Card, Input, FormField, TextArea, Checkbox, Badge, Icon, Progress } from "@balanceui/core";
import Link from "next/link";

export default function NewsletterFormExample() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<{ email?: string; name?: string }>({});
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [subscriptionProgress, setSubscriptionProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; name?: string } = {};

    if (!name) {
      newErrors.name = "Name is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSubscriptionStatus(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      });

      if (response.ok) {
        setSubscriptionStatus("success");
        setEmail("");
        setName("");
        setCheckedItems([]);
        setSubscriptionProgress(0);
        setTimeout(() => {
          setSubscriptionStatus(null);
        }, 3000);
      } else {
        setSubscriptionStatus("error");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      setSubscriptionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
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
          Newsletter Subscription Form
        </h1>
        <p className="mt-4 text-lg" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
          A complete newsletter subscription form with validation using FormField, Input, and Button components.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card variant="elevated" elevation={3} style={{ padding: "2rem" }}>
          <h2 className="mb-6 text-2xl font-semibold" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
            Subscribe to Newsletter
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Name"
              error={errors.name}
              required
            >
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: undefined });
                  const progress = (name ? 33 : 0) + (email ? 33 : 0) + (checkedItems.includes("terms") ? 34 : 0);
                  setSubscriptionProgress(Math.min(100, progress));
                }}
                style={{ width: "100%" }}
              />
            </FormField>

            <FormField
              label="Email"
              error={errors.email}
              required
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                  const progress = (name ? 33 : 0) + (email ? 33 : 0) + (checkedItems.includes("terms") ? 34 : 0);
                  setSubscriptionProgress(Math.min(100, progress));
                }}
                style={{ width: "100%" }}
              />
            </FormField>

            <div className="flex items-start">
              <Checkbox
                checked={checkedItems.includes("terms")}
                onChange={(checked) => {
                  if (checked) {
                    setCheckedItems([...checkedItems, "terms"]);
                  } else {
                    setCheckedItems(checkedItems.filter((item) => item !== "terms"));
                  }
                  const progress = (name ? 33 : 0) + (email ? 33 : 0) + (checked ? 34 : 0);
                  setSubscriptionProgress(Math.min(100, progress));
                }}
              />
              <label className="ml-2 text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                I agree to receive updates and marketing emails from BalanceUI
              </label>
            </div>

            {subscriptionStatus === "success" && (
              <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: "var(--bu-success, #4caf50)", color: "var(--bu-on-success, #ffffff)" }}>
                ✓ Successfully subscribed! Check your email for confirmation.
              </div>
            )}
            {subscriptionStatus === "error" && (
              <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: "var(--bu-error, #f44336)", color: "var(--bu-on-error, #ffffff)" }}>
                ✗ Failed to subscribe. Please try again.
              </div>
            )}

            <Button
              variant="solid"
              size="lg"
              type="submit"
              style={{ width: "100%", padding: "0.75rem" }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>

            <div className="text-center text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
              We respect your privacy. Unsubscribe at any time.
            </div>
          </form>
        </Card>

        <div>
          <Card variant="elevated" elevation={2} style={{ padding: "2rem", marginBottom: "2rem" }}>
            <div className="flex items-center gap-2 mb-4">
              <Icon name="check" />
              <h3 className="text-lg font-semibold" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                Features
              </h3>
            </div>
            <ul className="space-y-2" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
              <li className="flex items-center gap-2">
                <Icon name="check" size="sm" />
                <span>Form validation with error messages</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="check" size="sm" />
                <span>Email format validation</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="check" size="sm" />
                <span>Real-time error clearing</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="check" size="sm" />
                <span>Terms and conditions checkbox</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="check" size="sm" />
                <span>Accessible form fields</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="check" size="sm" />
                <span>Success/error feedback</span>
              </li>
            </ul>
            <div className="mt-6">
              <div className="mb-2 text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                Form Completion: {subscriptionProgress}%
              </div>
              <Progress value={subscriptionProgress} variant={subscriptionProgress === 100 ? "success" : "solid"} />
            </div>
          </Card>

          <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
            <h3 className="mb-4 text-lg font-semibold" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
              Code Example
            </h3>
            <div 
              className="overflow-x-auto rounded-lg p-4"
              style={{
                backgroundColor: "var(--bu-surface-variant, rgba(0, 0, 0, 0.08))",
                borderRadius: "var(--bu-radius-md, 10px)",
              }}
            >
              <pre className="text-xs" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                <code>{`import { Button, Input, FormField, Checkbox } from '@balanceui/core'

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name })
    })
    // Handle response...
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormField label="Name" error={errors.name}>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormField>
      <FormField label="Email" error={errors.email}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormField>
      <Button variant="solid" type="submit">
        Subscribe
      </Button>
    </form>
  )
}`}</code>
              </pre>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}


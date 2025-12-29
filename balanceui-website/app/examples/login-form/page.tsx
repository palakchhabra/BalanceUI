"use client";

import { useState } from "react";
import { Button, Card, Input, FormField } from "@balanceui/core";
import Link from "next/link";

export default function LoginFormExample() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    alert("Login successful!");
  };

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
          Login Form Example
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          A complete login form with validation using FormField, Input, and Button components.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card variant="elevated" elevation={3} style={{ padding: "2rem" }}>
          <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
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
                }}
                style={{ width: "100%" }}
              />
            </FormField>

            <FormField
              label="Password"
              error={errors.password}
              required
            >
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: undefined });
                }}
                style={{ width: "100%" }}
              />
            </FormField>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-sm text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200"
              >
                Forgot password?
              </a>
            </div>

            <Button
              variant="solid"
              size="lg"
              type="submit"
              style={{ width: "100%", padding: "0.75rem" }}
            >
              Sign In
            </Button>

            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200"
              >
                Sign up
              </a>
            </div>
          </form>
        </Card>

        <div>
          <Card variant="elevated" elevation={2} style={{ padding: "2rem", marginBottom: "2rem" }}>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Features
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>✅ Form validation with error messages</li>
              <li>✅ Email format validation</li>
              <li>✅ Password length validation</li>
              <li>✅ Real-time error clearing</li>
              <li>✅ Accessible form fields</li>
              <li>✅ Responsive design</li>
            </ul>
          </Card>

          <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Code Example
            </h3>
            <div className="overflow-x-auto rounded-lg bg-gray-900 p-4">
              <pre className="text-xs text-gray-100">
                <code>{`import { Button, Input, FormField } from '@balanceui/core'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})

  return (
    <form onSubmit={handleSubmit}>
      <FormField label="Email" error={errors.email}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormField>
      <Button variant="solid" type="submit">
        Sign In
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


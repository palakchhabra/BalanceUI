"use client";

import Link from "next/link";
import { Button, Card, Badge } from "@balanceui/core";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="text-center">
            <Badge
              variant="solid"
              style={{
                marginBottom: "1.5rem",
                fontSize: "0.875rem",
                padding: "0.5rem 1rem",
              }}
            >
              v1.0.0 Now Available
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Build Beautiful UIs
              <br />
              <span className="bg-gradient-to-r from-black to-gray-800 bg-clip-text text-transparent dark:from-white dark:to-gray-200">
                Faster Than Ever
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300 sm:mt-6 sm:text-lg sm:leading-8">
              BalanceUI is a modern, accessible React component library built
              with TypeScript. Get started in minutes with pre-built components
              that follow best practices.
            </p>
            <div className="mt-6">
              <Badge
                variant="soft"
                style={{
                  fontSize: "0.875rem",
                  padding: "0.5rem 1rem",
                }}
              >
                🔓 Open Source - MIT License
              </Badge>
            </div>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row">
              <Link href="/components" className="w-full sm:w-auto">
                <Button
                  variant="solid"
                  size="lg"
                  style={{ 
                    padding: "0.75rem 1.5rem", 
                    fontSize: "0.875rem",
                    width: "100%",
                  }}
                  className="sm:w-auto"
                >
                  Explore Components
                </Button>
              </Link>
              <Link href="/docs" className="w-full sm:w-auto">
                <Button
                  variant="stroke"
                  size="lg"
                  style={{ 
                    padding: "0.75rem 1.5rem", 
                    fontSize: "0.875rem",
                    width: "100%",
                  }}
                  className="sm:w-auto"
                >
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-24" style={{ backgroundColor: "#ffffff" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl lg:text-4xl">
              Why Choose BalanceUI?
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-400 sm:mt-4 sm:text-lg">
              Everything you need to build modern, accessible user interfaces
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:mt-16 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card
              variant="elevated"
              elevation={2}
              style={{
                padding: "1.5rem",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
              }}
              className="hover:shadow-lg hover:-translate-y-1 sm:p-8"
            >
              <div className="mb-3 text-3xl sm:mb-4 sm:text-4xl">🎨</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white sm:text-xl">
                Beautiful Design
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 sm:text-base">
                Carefully crafted components with modern design principles and
                attention to detail.
              </p>
            </Card>

            <Card
              variant="elevated"
              elevation={2}
              style={{
                padding: "1.5rem",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
              }}
              className="hover:shadow-lg hover:-translate-y-1 sm:p-8"
            >
              <div className="mb-3 text-3xl sm:mb-4 sm:text-4xl">♿</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white sm:text-xl">
                Fully Accessible
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 sm:text-base">
                Built with accessibility in mind, following WCAG guidelines for
                inclusive design.
              </p>
            </Card>

            <Card
              variant="elevated"
              elevation={2}
              style={{
                padding: "1.5rem",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
              }}
              className="hover:shadow-lg hover:-translate-y-1 sm:p-8"
            >
              <div className="mb-3 text-3xl sm:mb-4 sm:text-4xl">⚡</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white sm:text-xl">
                TypeScript First
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 sm:text-base">
                Full TypeScript support with comprehensive type definitions for
                better developer experience.
              </p>
            </Card>

            <Card
              variant="elevated"
              elevation={2}
              style={{
                padding: "1.5rem",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
              }}
              className="hover:shadow-lg hover:-translate-y-1 sm:p-8"
            >
              <div className="mb-3 text-3xl sm:mb-4 sm:text-4xl">🎯</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white sm:text-xl">
                Customizable
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 sm:text-base">
                Easy to customize with CSS variables and theme support. Make it
                your own.
              </p>
            </Card>

            <Card
              variant="elevated"
              elevation={2}
              style={{
                padding: "1.5rem",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
              }}
              className="hover:shadow-lg hover:-translate-y-1 sm:p-8"
            >
              <div className="mb-3 text-3xl sm:mb-4 sm:text-4xl">📦</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white sm:text-xl">
                Tree Shakeable
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 sm:text-base">
                Import only what you need. Optimized bundle size with tree
                shaking support.
              </p>
            </Card>

            <Card
              variant="elevated"
              elevation={2}
              style={{
                padding: "1.5rem",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
              }}
              className="hover:shadow-lg hover:-translate-y-1 sm:p-8"
            >
              <div className="mb-3 text-3xl sm:mb-4 sm:text-4xl">🚀</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white sm:text-xl">
                Production Ready
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 sm:text-base">
                Battle-tested components ready for production use in real-world
                applications.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-12 sm:py-16 lg:py-24" style={{ backgroundColor: "#ffffff" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card
            variant="elevated"
            elevation={3}
            style={{
              padding: "1.5rem",
            }}
            className="sm:p-8"
          >
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              Quick Start
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-400 sm:mt-4 sm:text-lg">
              Get started with BalanceUI in just a few steps
            </p>

            <div className="mt-6 overflow-x-auto rounded-lg bg-gray-900 p-4 sm:mt-8 sm:p-6">
              <pre className="text-xs text-gray-100 sm:text-sm">
                <code>{`npm install @balanceui/core

import { Button } from '@balanceui/core'
import '@balanceui/core/theme/sky-white.css'

function App() {
  return <Button variant="solid">Hello World</Button>
}`}</code>
              </pre>
            </div>

            <div className="mt-6 sm:mt-8">
              <Link href="/docs" className="inline-block w-full sm:w-auto">
                <Button
                  variant="solid"
                  size="lg"
                  style={{ 
                    padding: "0.75rem 1.5rem", 
                    fontSize: "0.875rem",
                    width: "100%",
                  }}
                  className="sm:w-auto"
                >
                  Read Full Documentation
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Open Source Section */}
      <section className="py-12 sm:py-16 lg:py-24" style={{ backgroundColor: "#ffffff" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card
            variant="elevated"
            elevation={2}
            style={{
              padding: "2rem",
            }}
            className="sm:p-8"
          >
            <div className="text-center">
              <div className="mb-4 text-4xl">🔓</div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                Open Source & Free
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 dark:text-gray-400 sm:text-lg">
                BalanceUI is completely open source and free to use. Released under the MIT License,
                you can use it in any project, commercial or personal, without restrictions.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full sm:w-auto"
                >
                  <Button
                    variant="solid"
                    size="lg"
                    style={{ 
                      padding: "0.75rem 1.5rem", 
                      fontSize: "0.875rem",
                      width: "100%",
                    }}
                    className="sm:w-auto"
                  >
                    View on GitHub
                  </Button>
                </a>
                <Link href="/license" className="inline-block w-full sm:w-auto">
                  <Button
                    variant="stroke"
                    size="lg"
                    style={{ 
                      padding: "0.75rem 1.5rem", 
                      fontSize: "0.875rem",
                      width: "100%",
                    }}
                    className="sm:w-auto"
                  >
                    View License
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <Link href="/license" className="hover:text-gray-900 dark:hover:text-white">
                  License
                </Link>
                <span>•</span>
                <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white">
                  Privacy Policy
                </Link>
                <span>•</span>
                <Link href="/terms" className="hover:text-gray-900 dark:hover:text-white">
                  Terms of Service
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Components Preview */}
      <section className="py-12 sm:py-16 lg:py-24" style={{ backgroundColor: "#ffffff" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl lg:text-4xl">
              Explore Our Components
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-400 sm:mt-4 sm:text-lg">
              Over 30+ carefully crafted components ready to use
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Button",
              "Input",
              "Card",
              "Modal",
              "DataTable",
              "FormField",
              "Toast",
              "Tabs",
              "Badge",
              "Select",
              "Checkbox",
              "Toggle",
              "Progress",
              "DatePicker",
              "TimePicker",
              "Accordion",
              "Stepper",
              "Drawer",
              "BottomSheet",
              "Tree",
              "VideoTrimmer",
              "Icon",
              "List",
              "Toolbar",
            ].map((component) => (
              <Link
                key={component}
                href={`/components/${component.toLowerCase()}`}
                className="group"
              >
                <Card
                  variant="elevated"
                  elevation={2}
                  style={{
                    padding: "1rem",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  className="group-hover:shadow-lg group-hover:-translate-y-1 sm:p-6"
                >
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white sm:text-base">
                    {component}
                  </h3>
                  <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                    View component details and examples
                  </p>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center sm:mt-8">
            <Link href="/components" className="inline-block w-full sm:w-auto">
              <Button
                variant="stroke"
                size="lg"
                style={{ 
                  padding: "0.75rem 1.5rem", 
                  fontSize: "0.875rem",
                  width: "100%",
                }}
                className="sm:w-auto"
              >
                View All Components
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

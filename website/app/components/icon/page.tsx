"use client";

import { Card, Badge, Icon } from "@balanceui/core";
import Link from "next/link";

const iconCategories = {
  "Common": ["home", "user", "settings", "search", "menu", "close", "check", "arrow-right"],
  "Navigation": ["chevron-left", "chevron-right", "chevron-up", "chevron-down", "arrow-up", "arrow-down"],
  "Actions": ["edit", "delete", "save", "download", "upload", "share", "heart", "star"],
  "Communication": ["mail", "phone", "message", "notification", "bell"],
};

export default function IconPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:ml-64">
      <div className="mb-6 sm:mb-8">
        <Link
          href="/components"
          className="text-sm transition-colors duration-200"
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
          ← Back to Components
        </Link>
      </div>
      <div className="mb-8 sm:mb-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <h1 
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ 
              color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
              fontWeight: 400,
              letterSpacing: "-0.02em",
            }}
          >
            Icon
          </h1>
          <Badge variant="solid" style={{ fontSize: "0.875rem", alignSelf: "flex-start" }} className="sm:align-self-auto">
            Display
          </Badge>
        </div>
        <p 
          className="mt-3 text-base sm:mt-4 sm:text-lg"
          style={{ 
            color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
            lineHeight: 1.6,
          }}
        >
          Material Design icon component system with common icons for use throughout your application.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2">
          <section id="examples" className="mb-8 sm:mb-12">
            <h2 
              className="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl"
              style={{ 
                color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                fontWeight: 500,
              }}
            >
              Examples
            </h2>

            {/* Icon Sizes */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 
                className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg"
                style={{ 
                  color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                  fontWeight: 500,
                }}
              >
                Icon Sizes
              </h3>
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex flex-col items-center gap-2">
                  <Icon name="home" size="sm" />
                  <span className="text-xs" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>Small</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Icon name="home" size="md" />
                  <span className="text-xs" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>Medium</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Icon name="home" size="lg" />
                  <span className="text-xs" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>Large</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Icon name="home" size="xl" />
                  <span className="text-xs" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>Extra Large</span>
                </div>
              </div>
            </Card>

            {/* Icon Categories */}
            {Object.entries(iconCategories).map(([category, icons]) => (
              <Card key={category} variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
                <h3 
                  className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg"
                  style={{ 
                    color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                    fontWeight: 500,
                  }}
                >
                  {category} Icons
                </h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                  {icons.map((iconName) => (
                    <div key={iconName} className="flex flex-col items-center gap-2">
                      <Icon name={iconName as any} size="md" />
                      <span className="text-xs text-center" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                        {iconName}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </section>

          <section id="usage" className="mb-8 sm:mb-12">
            <h2 
              className="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl"
              style={{ 
                color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                fontWeight: 500,
              }}
            >
              Usage
            </h2>
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem" }} className="sm:p-8">
              <h3 
                className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg"
                style={{ 
                  color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                  fontWeight: 500,
                }}
              >
                Basic Usage
              </h3>
              <div className="overflow-x-auto rounded-lg bg-gray-900 p-4 sm:p-6">
                <pre className="text-xs text-gray-100 sm:text-sm">
                  <code>{`import { Icon } from '@balanceui/core'

function MyComponent() {
  return (
    <>
      <Icon name="home" size="md" />
      <Icon name="user" size="lg" />
      <Icon name="settings" size="sm" />
    </>
  )
}`}</code>
                </pre>
              </div>
            </Card>
          </section>
        </div>

        <div className="lg:col-span-1">
          <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", position: "sticky", top: "6rem" }} className="mt-8 lg:mt-0">
            <h3 
              className="mb-4 text-sm font-semibold sm:text-base"
              style={{ 
                color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                fontWeight: 500,
              }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#examples" 
                  className="text-xs sm:text-sm transition-colors duration-200"
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
                  Examples
                </a>
              </li>
              <li>
                <a 
                  href="#usage" 
                  className="text-xs sm:text-sm transition-colors duration-200"
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
                  Usage
                </a>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

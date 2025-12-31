"use client";

import { Card, Badge, Shimmer } from "@balanceui/core";
import Link from "next/link";

export default function ShimmerPage() {
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
            Shimmer
          </h1>
          <Badge variant="solid" style={{ fontSize: "0.875rem", alignSelf: "flex-start" }} className="sm:align-self-auto">
            Feedback
          </Badge>
        </div>
        <p 
          className="mt-3 text-base sm:mt-4 sm:text-lg"
          style={{ 
            color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
            lineHeight: 1.6,
          }}
        >
          Material Design loading skeleton component with shimmer effect for better loading states.
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

            {/* Text Shimmer */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 
                className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg"
                style={{ 
                  color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                  fontWeight: 500,
                }}
              >
                Text Loading
              </h3>
              <div className="space-y-3">
                <Shimmer width="100%" height="20px" />
                <Shimmer width="80%" height="20px" />
                <Shimmer width="60%" height="20px" />
              </div>
            </Card>

            {/* Card Shimmer */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 
                className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg"
                style={{ 
                  color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                  fontWeight: 500,
                }}
              >
                Card Loading
              </h3>
              <Shimmer variant="card" width="100%" height="200px" />
            </Card>

            {/* Avatar Shimmer */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 
                className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg"
                style={{ 
                  color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                  fontWeight: 500,
                }}
              >
                Avatar Loading
              </h3>
              <div className="flex items-center gap-4">
                <Shimmer variant="circular" width="48px" height="48px" />
                <div className="flex-1 space-y-2">
                  <Shimmer width="60%" height="16px" />
                  <Shimmer width="40%" height="14px" />
                </div>
              </div>
            </Card>

            {/* List Item Shimmer */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem" }} className="sm:p-8">
              <h3 
                className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg"
                style={{ 
                  color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                  fontWeight: 500,
                }}
              >
                List Item Loading
              </h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Shimmer variant="circular" width="40px" height="40px" />
                    <div className="flex-1 space-y-2">
                      <Shimmer width="70%" height="16px" />
                      <Shimmer width="50%" height="14px" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
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
                  <code>{`import { Shimmer } from '@balanceui/core'

function LoadingState() {
  return (
    <div>
      <Shimmer width="100%" height="20px" />
      <Shimmer width="80%" height="20px" />
      <Shimmer variant="card" width="100%" height="200px" />
      <Shimmer variant="circular" width="48px" height="48px" />
    </div>
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

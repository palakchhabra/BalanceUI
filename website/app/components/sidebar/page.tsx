"use client";

import { Card, Badge, Sidebar, Button } from "@balanceui/core";
import Link from "next/link";
import { useState } from "react";

export default function SideBarPage() {
  const [collapsed, setCollapsed] = useState(false);

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
            Sidebar
          </h1>
          <Badge variant="solid" style={{ fontSize: "0.875rem", alignSelf: "flex-start" }} className="sm:align-self-auto">
            Navigation
          </Badge>
        </div>
        <p 
          className="mt-3 text-base sm:mt-4 sm:text-lg"
          style={{ 
            color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
            lineHeight: 1.6,
          }}
        >
          Material Design sidebar navigation component for organizing navigation links.
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

            {/* Basic Sidebar */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 
                className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg"
                style={{ 
                  color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                  fontWeight: 500,
                }}
              >
                Basic Sidebar
              </h3>
              <div style={{ position: "relative", minHeight: "300px", border: "1px solid var(--bu-border, rgba(0, 0, 0, 0.12))", borderRadius: "var(--bu-radius-md, 4px)" }}>
                <Sidebar width={240} collapsed={collapsed}>
                  <div style={{ padding: "1rem" }}>
                    <div className="mb-4">
                      <h4 
                        className="text-sm font-semibold mb-2"
                        style={{ 
                          color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                        }}
                      >
                        Navigation
                      </h4>
                      <nav className="space-y-1">
                        {["Home", "Dashboard", "Settings", "Profile"].map((item) => (
                          <div
                            key={item}
                            className="px-3 py-2 rounded-md cursor-pointer transition-colors"
                            style={{
                              color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
                              backgroundColor: "transparent",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.04)";
                              e.currentTarget.style.color = "var(--bu-fg, rgba(0, 0, 0, 0.87))";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "transparent";
                              e.currentTarget.style.color = "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))";
                            }}
                          >
                            {item}
                          </div>
                        ))}
                      </nav>
                    </div>
                  </div>
                </Sidebar>
                <div style={{ marginLeft: collapsed ? "64px" : "240px", padding: "1rem", transition: "margin-left 200ms ease" }}>
                  <Button variant="stroke" size="sm" onClick={() => setCollapsed(!collapsed)}>
                    {collapsed ? "Expand" : "Collapse"}
                  </Button>
                </div>
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
                  <code>{`import { Sidebar } from '@balanceui/core'

function MyLayout() {
  const [collapsed, setCollapsed] = useState(false)
  
  return (
    <Sidebar width={240} collapsed={collapsed}>
      <nav>
        {/* Navigation items */}
      </nav>
    </Sidebar>
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

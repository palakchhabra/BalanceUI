"use client";

import { useState } from "react";
import { Card, Badge, Button, Progress } from "@balanceui/core";
import Link from "next/link";

const sampleData = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "Active", progress: 75 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Active", progress: 90 },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "Inactive", progress: 45 },
  { id: 4, name: "Alice Williams", email: "alice@example.com", status: "Active", progress: 60 },
];

export default function DashboardExample() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const filteredData = selectedStatus === "all" 
    ? sampleData 
    : sampleData.filter(item => item.status.toLowerCase() === selectedStatus.toLowerCase());

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:ml-64">
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
          Dashboard Example
        </h1>
        <p className="mt-4 text-lg" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
          A complete dashboard with cards, data table, and progress indicators.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          variant="elevated"
          elevation={2}
          style={{
            padding: "1.5rem",
            transition: "var(--bu-transition-elevation)",
            cursor: "pointer",
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "var(--bu-elevation-4)";
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "var(--bu-elevation-2)";
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>Total Users</p>
              <p className="mt-1 text-3xl font-bold" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>1,234</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
          <div className="mt-4">
            <Badge variant="success">+12%</Badge>
            <span className="ml-2 text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
              from last month
            </span>
          </div>
        </Card>

        <Card
          variant="elevated"
          elevation={2}
          style={{
            padding: "1.5rem",
            transition: "var(--bu-transition-elevation)",
            cursor: "pointer",
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "var(--bu-elevation-4)";
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "var(--bu-elevation-2)";
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>Revenue</p>
              <p className="mt-1 text-3xl font-bold" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>$45,678</p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
          <div className="mt-4">
            <Badge variant="success">+8%</Badge>
            <span className="ml-2 text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
              from last month
            </span>
          </div>
        </Card>

        <Card
          variant="elevated"
          elevation={2}
          style={{
            padding: "1.5rem",
            transition: "var(--bu-transition-elevation)",
            cursor: "pointer",
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "var(--bu-elevation-4)";
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "var(--bu-elevation-2)";
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>Orders</p>
              <p className="mt-1 text-3xl font-bold" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>567</p>
            </div>
            <div className="text-4xl">📦</div>
          </div>
          <div className="mt-4">
            <Badge variant="warning">-3%</Badge>
            <span className="ml-2 text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
              from last month
            </span>
          </div>
        </Card>

        <Card
          variant="elevated"
          elevation={2}
          style={{
            padding: "1.5rem",
            transition: "var(--bu-transition-elevation)",
            cursor: "pointer",
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "var(--bu-elevation-4)";
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "var(--bu-elevation-2)";
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>Conversion</p>
              <p className="mt-1 text-3xl font-bold" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>3.24%</p>
            </div>
            <div className="text-4xl">📊</div>
          </div>
          <div className="mt-4">
            <Badge variant="success">+0.5%</Badge>
            <span className="ml-2 text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
              from last month
            </span>
          </div>
        </Card>
      </div>

      {/* Progress Section */}
      <Card
        variant="elevated"
        elevation={2}
        style={{ padding: "2rem", marginBottom: "2rem" }}
      >
        <h2 className="mb-6 text-2xl font-semibold" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
          Project Progress
        </h2>
        <div className="space-y-4">
          {filteredData.map((item) => (
            <div key={item.id}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                  {item.name}
                </span>
                <span className="text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                  {item.progress}%
                </span>
              </div>
              <Progress value={item.progress} />
            </div>
          ))}
        </div>
      </Card>

      {/* Data Table */}
      <Card variant="elevated" elevation={2} style={{ padding: "2rem" }}>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
            Users
          </h2>
          <div className="flex gap-2">
            <Button
              variant={selectedStatus === "all" ? "solid" : "stroke"}
              size="sm"
              onClick={() => setSelectedStatus("all")}
            >
              All
            </Button>
            <Button
              variant={selectedStatus === "active" ? "solid" : "stroke"}
              size="sm"
              onClick={() => setSelectedStatus("active")}
            >
              Active
            </Button>
            <Button
              variant={selectedStatus === "inactive" ? "solid" : "stroke"}
              size="sm"
              onClick={() => setSelectedStatus("inactive")}
            >
              Inactive
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table 
            className="min-w-full divide-y"
            style={{
              borderColor: "var(--bu-border, rgba(0, 0, 0, 0.12))",
            }}
          >
            <thead 
              style={{
                backgroundColor: "var(--bu-surface-variant, rgba(0, 0, 0, 0.02))",
              }}
            >
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}
                >
                  Name
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}
                >
                  Email
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}
                >
                  Status
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}
                >
                  Progress
                </th>
              </tr>
            </thead>
            <tbody 
              className="divide-y"
              style={{
                backgroundColor: "var(--bu-surface, #ffffff)",
                borderColor: "var(--bu-border, rgba(0, 0, 0, 0.12))",
              }}
            >
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                    {item.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                    {item.email}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <Badge
                      variant={item.status === "Active" ? "success" : "soft"}
                    >
                      {item.status}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <div className="w-24">
                      <Progress value={item.progress} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}


"use client";

import { Card, Badge, Tree } from "@balanceui/core";
import Link from "next/link";
import { useState } from "react";

export default function TreePage() {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set());

  const treeData = [
    {
      id: "1",
      label: "Documents",
      children: [
        { id: "1-1", label: "Project A" },
        { id: "1-2", label: "Project B" },
        {
          id: "1-3",
          label: "Project C",
          children: [
            { id: "1-3-1", label: "File 1.pdf" },
            { id: "1-3-2", label: "File 2.docx" },
          ],
        },
      ],
    },
    {
      id: "2",
      label: "Pictures",
      children: [
        { id: "2-1", label: "Vacation" },
        { id: "2-2", label: "Family" },
      ],
    },
    {
      id: "3",
      label: "Music",
      children: [
        { id: "3-1", label: "Artists" },
        { id: "3-2", label: "Albums" },
      ],
    },
  ];

  const handleToggle = (nodeId: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const handleSelect = (nodeId: string, checked: boolean) => {
    setSelectedNodes((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(nodeId);
      } else {
        newSet.delete(nodeId);
      }
      return newSet;
    });
  };

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
            Tree
          </h1>
          <Badge variant="solid" style={{ fontSize: "0.875rem", alignSelf: "flex-start" }} className="sm:align-self-auto">
            Data Display
          </Badge>
        </div>
        <p 
          className="mt-3 text-base sm:mt-4 sm:text-lg"
          style={{ 
            color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
            lineHeight: 1.6,
          }}
        >
          Material Design hierarchical tree view component for displaying nested data structures.
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

            {/* Basic Tree */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "1.5rem" }} className="sm:p-8 sm:mb-8">
              <h3 
                className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg"
                style={{ 
                  color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                  fontWeight: 500,
                }}
              >
                Basic Tree
              </h3>
              <Tree
                data={treeData}
                expanded={expandedNodes}
                selected={selectedNodes}
                onToggle={handleToggle}
                onSelect={handleSelect}
              />
            </Card>

            {/* Tree with Checkboxes */}
            <Card variant="elevated" elevation={2} style={{ padding: "1.5rem" }} className="sm:p-8">
              <h3 
                className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg"
                style={{ 
                  color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                  fontWeight: 500,
                }}
              >
                Tree with Checkboxes
              </h3>
              <p 
                className="mb-4 text-sm"
                style={{ 
                  color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
                }}
              >
                Selected nodes: {selectedNodes.size > 0 ? Array.from(selectedNodes).join(", ") : "None"}
              </p>
              <Tree
                data={treeData}
                expanded={expandedNodes}
                selected={selectedNodes}
                onToggle={handleToggle}
                onSelect={handleSelect}
                showCheckbox={true}
              />
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
                  <code>{`import { Tree } from '@balanceui/core'
import { useState } from 'react'

const treeData = [
  {
    id: '1',
    label: 'Documents',
    children: [
      { id: '1-1', label: 'File 1' },
      { id: '1-2', label: 'File 2' }
    ]
  }
]

function MyTree() {
  const [expanded, setExpanded] = useState([])
  const [selected, setSelected] = useState([])
  
  return (
    <Tree
      data={treeData}
      expandedNodes={expanded}
      selectedNodes={selected}
      onToggle={setExpanded}
      onSelect={setSelected}
      showCheckboxes={true}
    />
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

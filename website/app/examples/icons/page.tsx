"use client";

import { useState, useMemo } from "react";
import { Card, Badge, Icon, Input, FormField } from "@balanceui/core";
import Link from "next/link";

// Icon Library with Categories
interface IconInfo {
  name: string;
  category: string;
  keywords: string[];
}

const iconCategories: Record<string, IconInfo[]> = {
  Navigation: [
    { name: "home", category: "Navigation", keywords: ["home", "house", "main", "dashboard"] },
    { name: "menu", category: "Navigation", keywords: ["menu", "hamburger", "nav", "list"] },
    { name: "arrow_back", category: "Navigation", keywords: ["back", "arrow", "left", "previous"] },
    { name: "arrow_forward", category: "Navigation", keywords: ["forward", "arrow", "right", "next"] },
  ],
  Actions: [
    { name: "check", category: "Actions", keywords: ["check", "done", "complete", "success", "tick"] },
    { name: "add", category: "Actions", keywords: ["add", "plus", "create", "new"] },
    { name: "delete", category: "Actions", keywords: ["delete", "remove", "trash", "bin"] },
    { name: "edit", category: "Actions", keywords: ["edit", "pencil", "modify", "update"] },
    { name: "refresh", category: "Actions", keywords: ["refresh", "reload", "update", "sync"] },
  ],
  "User & Account": [
    { name: "user", category: "User & Account", keywords: ["user", "person", "profile", "account"] },
    { name: "account_circle", category: "User & Account", keywords: ["account", "circle", "profile", "avatar"] },
    { name: "settings", category: "User & Account", keywords: ["settings", "gear", "config", "preferences"] },
  ],
  Communication: [
    { name: "email", category: "Communication", keywords: ["email", "mail", "message", "inbox"] },
    { name: "notification", category: "Communication", keywords: ["notification", "bell", "alert", "reminder"] },
    { name: "chat", category: "Communication", keywords: ["chat", "message", "conversation", "talk"] },
    { name: "share", category: "Communication", keywords: ["share", "send", "forward", "social"] },
  ],
  "Media & Files": [
    { name: "image", category: "Media & Files", keywords: ["image", "photo", "picture", "gallery"] },
    { name: "video", category: "Media & Files", keywords: ["video", "movie", "play", "film"] },
    { name: "file", category: "Media & Files", keywords: ["file", "document", "paper", "page"] },
    { name: "folder", category: "Media & Files", keywords: ["folder", "directory", "collection", "archive"] },
  ],
  "Status & Feedback": [
    { name: "star", category: "Status & Feedback", keywords: ["star", "favorite", "rating", "bookmark"] },
    { name: "favorite", category: "Status & Feedback", keywords: ["favorite", "heart", "like", "love"] },
    { name: "download", category: "Status & Feedback", keywords: ["download", "save", "get", "export"] },
    { name: "upload", category: "Status & Feedback", keywords: ["upload", "send", "post", "import"] },
  ],
  Search: [
    { name: "search", category: "Search", keywords: ["search", "find", "lookup", "magnify"] },
    { name: "close", category: "Search", keywords: ["close", "cancel", "clear", "remove", "x"] },
  ],
};

const allIcons: IconInfo[] = Object.values(iconCategories).flat();

function searchIcons(query: string): IconInfo[] {
  const lowerQuery = query.toLowerCase();
  return allIcons.filter(
    (icon) =>
      icon.name.toLowerCase().includes(lowerQuery) ||
      icon.keywords.some((keyword) => keyword.toLowerCase().includes(lowerQuery)) ||
      icon.category.toLowerCase().includes(lowerQuery)
  );
}

export default function IconsExamplePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredIcons = useMemo(() => {
    if (searchQuery.trim()) {
      return searchIcons(searchQuery);
    }
    if (selectedCategory === "All") {
      return allIcons;
    }
    return iconCategories[selectedCategory] || [];
  }, [searchQuery, selectedCategory]);

  const categories = ["All", ...Object.keys(iconCategories)];

  const copyToClipboard = (iconName: string) => {
    navigator.clipboard.writeText(`<Icon name="${iconName}" />`);
    // You could add a toast notification here
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-6 sm:mb-8">
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

      <div className="mb-8 sm:mb-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
            Icon Library
          </h1>
          <Badge variant="solid" style={{ fontSize: "0.875rem", alignSelf: "flex-start" }} className="sm:align-self-auto">
            {allIcons.length} Icons
          </Badge>
        </div>
        <p className="mt-3 text-base sm:mt-4 sm:text-lg" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
          Browse and search through all available icons. Click any icon to copy its code.
        </p>
      </div>

      {/* Search and Filter */}
      <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginBottom: "2rem" }} className="sm:p-8">
        <div className="mb-4">
          <FormField label="Search Icons">
            <Input
              type="text"
              placeholder="Search by name, keyword, or category..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value) setSelectedCategory("All");
              }}
              style={{ width: "100%" }}
            />
          </FormField>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setSearchQuery("");
              }}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "var(--bu-radius-md, 10px)",
                border: "1px solid var(--bu-border, rgba(0, 0, 0, 0.12))",
                backgroundColor:
                  selectedCategory === category
                    ? "var(--bu-primary, #1976d2)"
                    : "var(--bu-surface, #ffffff)",
                color:
                  selectedCategory === category
                    ? "var(--bu-on-primary, #ffffff)"
                    : "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                cursor: "pointer",
                transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                fontSize: "0.875rem",
                fontWeight: selectedCategory === category ? 600 : 400,
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.backgroundColor = "var(--bu-surface-variant, rgba(0, 0, 0, 0.04))";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.backgroundColor = "var(--bu-surface, #ffffff)";
                }
              }}
            >
              {category}
              {category !== "All" && (
                <span style={{ marginLeft: "0.5rem", opacity: 0.7 }}>
                  ({iconCategories[category]?.length || 0})
                </span>
              )}
            </button>
          ))}
        </div>
      </Card>

      {/* Results Count */}
      <div className="mb-4 text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
        Showing {filteredIcons.length} {filteredIcons.length === 1 ? "icon" : "icons"}
        {searchQuery && ` for "${searchQuery}"`}
      </div>

      {/* Icons Grid */}
      {filteredIcons.length === 0 ? (
        <Card variant="elevated" elevation={2} style={{ padding: "3rem", textAlign: "center" }}>
          <p style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
            No icons found. Try a different search term or category.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredIcons.map((iconInfo: IconInfo) => (
            <Card
              key={iconInfo.name}
              variant="elevated"
              elevation={2}
              style={{
                padding: "1.5rem",
                cursor: "pointer",
                transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              className="balanceui-hover-elevate"
              onClick={() => copyToClipboard(iconInfo.name)}
            >
              <div className="flex flex-col items-center gap-3">
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "var(--bu-surface-variant, rgba(0, 0, 0, 0.04))",
                    borderRadius: "var(--bu-radius-md, 10px)",
                  }}
                >
                  <Icon name={iconInfo.name} size="lg" />
                </div>
                <div className="text-center w-full">
                  <div
                    className="font-semibold mb-1"
                    style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))", fontSize: "0.875rem" }}
                  >
                    {iconInfo.name}
                  </div>
                  <Badge
                    variant="soft"
                    style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem" }}
                  >
                    {iconInfo.category}
                  </Badge>
                </div>
                <div
                  className="text-xs text-center mt-1"
                  style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}
                >
                  Click to copy code
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Usage Example */}
      <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", marginTop: "2rem" }} className="sm:p-8">
        <h3 className="mb-4 text-lg font-semibold" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
          Usage Example
        </h3>
        <div
          className="overflow-x-auto rounded-lg p-4"
          style={{ backgroundColor: "var(--bu-surface-variant, rgba(0, 0, 0, 0.08))" }}
        >
          <pre className="text-xs" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
            <code>{`import { Icon } from '@balanceui/core'

// Basic usage
<Icon name="home" />

// With size
<Icon name="search" size="lg" />

// With custom color
<Icon name="star" color="#ff9800" />`}</code>
          </pre>
        </div>
      </Card>
    </div>
  );
}


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Drawer } from "@balanceui/core";
import { ThemeSelector } from "./ThemeSelector";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/components", label: "Components" },
  { href: "/docs", label: "Documentation" },
  { href: "/examples", label: "Examples" },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav 
        className="sticky top-0 z-50 w-full"
        style={{
          backgroundColor: "var(--bu-surface, #ffffff)",
          borderBottom: "1px solid var(--bu-border, rgba(0, 0, 0, 0.12))",
          boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
          transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center space-x-2 text-xl font-medium transition-all duration-200"
                style={{
                  color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.87";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span className="text-2xl" style={{ transition: "transform 200ms ease" }}>⚖️</span>
                <span style={{ fontWeight: 500, letterSpacing: "-0.01em" }}>BalanceUI</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-200"
                    style={{
                      color: isActive 
                        ? "var(--bu-primary, #1976d2)" 
                        : "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
                      backgroundColor: isActive 
                        ? "rgba(25, 118, 210, 0.08)" 
                        : "transparent",
                      textDecoration: "none",
                      position: "relative",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.04)";
                        e.currentTarget.style.color = "var(--bu-fg, rgba(0, 0, 0, 0.87))";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))";
                      }
                    }}
                  >
                    {item.label}
                    {isActive && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "24px",
                          height: "2px",
                          backgroundColor: "var(--bu-primary, #1976d2)",
                          borderRadius: "2px 2px 0 0",
                          animation: "balanceui-nav-indicator 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      />
                    )}
                  </Link>
                );
              })}
              <div className="ml-2">
                <ThemeSelector />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="inline-flex items-center justify-center rounded-md p-2 transition-all duration-200"
                style={{
                  color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.04)";
                  e.currentTarget.style.color = "var(--bu-fg, rgba(0, 0, 0, 0.87))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))";
                }}
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <style jsx>{`
          @keyframes balanceui-nav-indicator {
            from {
              width: 0;
              opacity: 0;
            }
            to {
              width: 24px;
              opacity: 1;
            }
          }
        `}</style>
      </nav>

      {/* Mobile Drawer */}
      <Drawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        placement="right"
        size={280}
        title="Menu"
        showHandle={true}
      >
        <div className="flex flex-col space-y-1 p-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 text-base font-medium rounded-md transition-all duration-200 ${
                  isActive
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 mt-4">
            <ThemeSelector />
          </div>
        </div>
      </Drawer>
    </>
  );
}

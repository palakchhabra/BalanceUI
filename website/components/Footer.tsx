import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="border-t"
      style={{
        borderColor: "var(--bu-border, rgba(0, 0, 0, 0.12))",
        backgroundColor: "var(--bu-surface, #ffffff)",
        boxShadow: "0px -2px 4px -1px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2" style={{ marginBottom: "1rem" }}>
              <span className="text-2xl" style={{ transition: "transform 200ms ease" }}>⚖️</span>
              <span 
                className="text-xl font-medium"
                style={{ 
                  color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                  letterSpacing: "-0.01em",
                }}
              >
                BalanceUI
              </span>
            </div>
            <p 
              className="text-sm leading-relaxed"
              style={{ 
                color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
                lineHeight: 1.6,
              }}
            >
              A modern, accessible React component library built with TypeScript
              and Material Design principles.
            </p>
          </div>

          {/* Resources Section */}
          <div>
            <h3 
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ 
                color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                fontWeight: 500,
                letterSpacing: "0.1em",
                marginBottom: "1rem",
              }}
            >
              Resources
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/docs", label: "Documentation" },
                { href: "/components", label: "Components" },
                { href: "/examples", label: "Examples" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-all duration-200 inline-block"
                    style={{
                      color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--bu-primary, #1976d2)";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Section */}
          <div>
            <h3 
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ 
                color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                fontWeight: 500,
                letterSpacing: "0.1em",
                marginBottom: "1rem",
              }}
            >
              Community
            </h3>
            <ul className="space-y-2">
              {[
                { href: "https://github.com", label: "GitHub" },
                { href: "https://twitter.com", label: "Twitter" },
                { href: "https://discord.com", label: "Discord" },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-all duration-200 inline-block"
                    style={{
                      color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--bu-primary, #1976d2)";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ 
                color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                fontWeight: 500,
                letterSpacing: "0.1em",
                marginBottom: "1rem",
              }}
            >
              Legal
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/license", label: "License" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-all duration-200 inline-block"
                    style={{
                      color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--bu-primary, #1976d2)";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div 
          className="mt-8 border-t pt-6 sm:mt-10 sm:pt-8"
          style={{ 
            borderColor: "var(--bu-border, rgba(0, 0, 0, 0.12))",
          }}
        >
          <p 
            className="text-center text-sm"
            style={{ 
              color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
            }}
          >
            © {currentYear} BalanceUI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}


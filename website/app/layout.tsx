import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@balanceui/core/theme/theme-contract.css";
import "@balanceui/core/theme/calm-blue.css";
import "@balanceui/core/theme/salt-pepper.css";
import "@balanceui/core/theme/quiet-luxury.css";
import "@balanceui/core/theme/gothic-noir.css";
import "@balanceui/core/theme/cherry-blossom.css";
import "@balanceui/core/theme/lavender-fields.css";
import "@balanceui/core/theme/beachfront-views.css";
import "@balanceui/core/theme/frozen-lake.css";
import "@balanceui/core/theme/golden-hour.css";
import "@balanceui/core/theme/stone-path.css";
import "@balanceui/core/theme/cappuccino.css";
import "@balanceui/core/theme/coastal-morning.css";
import "@balanceui/core/theme/desert-dusk.css";
import "@balanceui/core/theme/fresh-peach.css";
import "@balanceui/core/theme/minty-fresh.css";
import "@balanceui/core/theme/ocean-tide.css";
import "@balanceui/core/theme/soft-spring.css";
import "@balanceui/core/theme/autumn-leaves.css";
import "@balanceui/core/theme/winter-chill.css";
import "@balanceui/core/theme/summer-breeze.css";
import "@balanceui/core/theme/us-black-white.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BalanceUI - Modern React Component Library | Open Source UI Components",
    template: "%s | BalanceUI",
  },
  description:
    "BalanceUI is a free, open-source React component library built with TypeScript. Features 30+ accessible, customizable UI components with modern design principles. MIT Licensed.",
  keywords: [
    "React",
    "Component Library",
    "UI Components",
    "Design System",
    "React Components",
    "TypeScript",
    "Accessible Components",
    "Open Source",
    "MIT License",
    "React UI",
    "Component Framework",
    "UI Kit",
    "React Design System",
    "TypeScript Components",
    "Accessible React",
    "Modern UI",
    "React Library",
  ],
  authors: [{ name: "BalanceUI Team" }],
  creator: "BalanceUI",
  publisher: "BalanceUI",
  metadataBase: new URL("https://balanceui.com"),
  applicationName: "BalanceUI",
  category: "Technology",
  classification: "React Component Library",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://balanceui.com",
    siteName: "BalanceUI",
    title: "BalanceUI - Modern React Component Library | Open Source UI Components",
    description:
      "Free, open-source React component library with 30+ accessible, customizable UI components. Built with TypeScript and modern design principles. MIT Licensed.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BalanceUI - Modern React Component Library",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BalanceUI - Modern React Component Library | Open Source",
    description:
      "Free, open-source React component library with 30+ accessible UI components. Built with TypeScript. MIT Licensed.",
    images: ["/og-image.png"],
    creator: "@balanceui",
    site: "@balanceui",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://balanceui.com",
    languages: {
      "en-US": "https://balanceui.com",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: [
      { url: "/favicon.ico", sizes: "180x180", type: "image/x-icon" },
    ],
    shortcut: "/favicon.ico",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "theme-color": "#000000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`} style={{ backgroundColor: "#ffffff", color: "#000000" }}>
        <ThemeProvider>
          <StructuredData />
          <Navigation />
          <main className="min-h-screen" style={{ backgroundColor: "#ffffff", color: "#000000" }}>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

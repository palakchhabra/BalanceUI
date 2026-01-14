"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Button, 
  Card, 
  Badge, 
  Icon, 
  Toolbar, 
  Tabs, 
  Accordion, 
  Stepper, 
  Checkbox, 
  ButtonToggle, 
  Tree, 
  List,
  Progress,
  Input,
  FormField,
  Select,
  Toast,
  ToastProvider,
  useToast
} from "@balanceui/core";

function HomeContent() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [accordionOpenId, setAccordionOpenId] = useState<string | undefined>("1");
  const [currentStep, setCurrentStep] = useState(0);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [selectedToggle, setSelectedToggle] = useState<string>("left");
  const [expandedTree, setExpandedTree] = useState<Set<string>>(new Set(["1", "1-1"]));
  const [selectedTree, setSelectedTree] = useState<Set<string>>(new Set());
  const [progressValue, setProgressValue] = useState(65);
  const [selectValue, setSelectValue] = useState("option1");
  const { notify } = useToast();

  const treeData = [
    {
      id: "1",
      label: "Components",
      children: [
        {
          id: "1-1",
          label: "Layout",
          children: [
            { id: "1-1-1", label: "Grid" },
            { id: "1-1-2", label: "Flex" },
          ],
        },
      ],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative overflow-hidden" 
        style={{ 
          backgroundColor: "var(--bu-surface, #ffffff)",
          position: "relative",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="text-center">
            <Badge
              variant="solid"
              style={{
                marginBottom: "1.5rem",
                fontSize: "0.875rem",
                padding: "0.5rem 1rem",
                animation: "balanceui-fade-in 600ms cubic-bezier(0.4, 0, 0.2, 1) 200ms both",
              }}
            >
              v1.0.0 Now Available
            </Badge>
            <h1 
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
              style={{
                color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                animation: "balanceui-fade-in 800ms cubic-bezier(0.4, 0, 0.2, 1) 400ms both",
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
              }}
            >
              Build Beautiful UIs
              <br />
              <span 
                style={{
                  background: "linear-gradient(135deg, var(--bu-primary, #1976d2) 0%, var(--bu-primary-dark, #1565c0) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "inline-block",
                }}
              >
                Faster Than Ever
              </span>
            </h1>
            <p 
              className="mx-auto mt-4 max-w-2xl text-base leading-7 sm:mt-6 sm:text-lg sm:leading-8"
              style={{
                color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
                animation: "balanceui-fade-in 800ms cubic-bezier(0.4, 0, 0.2, 1) 600ms both",
              }}
            >
              BalanceUI is a modern, accessible React component library built
              with TypeScript. Get started in minutes with pre-built components
              that follow best practices.
            </p>
            <div className="mt-6" style={{ animation: "balanceui-fade-in 800ms cubic-bezier(0.4, 0, 0.2, 1) 800ms both" }}>
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
            <div 
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row"
              style={{ animation: "balanceui-fade-in 800ms cubic-bezier(0.4, 0, 0.2, 1) 1000ms both" }}
            >
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
      <section className="py-12 sm:py-16 lg:py-24" style={{ backgroundColor: "var(--bu-surface, #ffffff)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 
              className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
              style={{
                color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                animation: "balanceui-fade-in 600ms cubic-bezier(0.4, 0, 0.2, 1) 200ms both",
              }}
            >
              Why Choose BalanceUI?
            </h2>
            <p 
              className="mt-3 text-base sm:mt-4 sm:text-lg"
              style={{
                color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
                animation: "balanceui-fade-in 600ms cubic-bezier(0.4, 0, 0.2, 1) 400ms both",
              }}
            >
              Everything you need to build modern, accessible user interfaces
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:mt-16 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "🎨", title: "Beautiful Design", description: "Carefully crafted components with modern design principles and attention to detail." },
              { icon: "♿", title: "Fully Accessible", description: "Built with accessibility in mind, following WCAG guidelines for inclusive design." },
              { icon: "⚡", title: "TypeScript First", description: "Full TypeScript support with comprehensive type definitions for better developer experience." },
              { icon: "🎯", title: "Customizable", description: "Easy to customize with CSS variables and theme support. Make it your own." },
              { icon: "📦", title: "Tree Shakeable", description: "Import only what you need. Optimized bundle size with tree shaking support." },
              { icon: "🚀", title: "Production Ready", description: "Battle-tested components ready for production use in real-world applications." },
            ].map((feature, index) => (
              <Card
                key={feature.title}
                variant="elevated"
                elevation={2}
                style={{
                  padding: "1.5rem",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "var(--bu-transition-elevation)",
                  cursor: "pointer",
                  animation: `balanceui-fade-in 600ms cubic-bezier(0.4, 0, 0.2, 1) ${600 + (index * 100)}ms both`,
                }}
                className="sm:p-8 balanceui-hover-elevate"
              >
              <div className="mb-3 text-3xl sm:mb-4 sm:text-4xl">{feature.icon}</div>
                <h3 
                  className="text-lg font-semibold sm:text-xl"
                  style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="mt-2 text-sm sm:text-base"
                  style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}
                >
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-12 sm:py-16 lg:py-24" style={{ backgroundColor: "var(--bu-surface, #ffffff)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card
            variant="elevated"
            elevation={3}
            style={{
              padding: "1.5rem",
            }}
            className="sm:p-8"
          >
            <h2 
              className="text-2xl font-bold tracking-tight sm:text-3xl"
              style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}
            >
              Quick Start
            </h2>
            <p 
              className="mt-3 text-base sm:mt-4 sm:text-lg"
              style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}
            >
              Get started with BalanceUI in just a few steps
            </p>

            <div className="mt-6 overflow-x-auto rounded-lg p-4 sm:mt-8 sm:p-6" style={{ backgroundColor: "var(--bu-surface-variant, rgba(0, 0, 0, 0.05))", border: "1px solid var(--bu-border, rgba(0, 0, 0, 0.12))" }}>
              <pre className="text-xs sm:text-sm" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))", margin: 0 }}>
                <code style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>{`npm install @balanceui/core

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
      <section className="py-12 sm:py-16 lg:py-24" style={{ backgroundColor: "var(--bu-surface, #ffffff)" }}>
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
              <h2 
                className="text-2xl font-bold tracking-tight sm:text-3xl"
                style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}
              >
                Open Source & Free
              </h2>
              <p 
                className="mx-auto mt-4 max-w-2xl text-base sm:text-lg"
                style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}
              >
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
              <div 
                className="mt-8 flex flex-wrap justify-center gap-4 text-sm"
                style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}
              >
                <Link 
                  href="/license" 
                  className="transition-colors"
                  style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--bu-fg, rgba(0, 0, 0, 0.87))";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))";
                  }}
                >
                  License
                </Link>
                <span>•</span>
                <Link 
                  href="/privacy" 
                  className="transition-colors"
                  style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--bu-fg, rgba(0, 0, 0, 0.87))";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))";
                  }}
                >
                  Privacy Policy
                </Link>
                <span>•</span>
                <Link 
                  href="/terms" 
                  className="transition-colors"
                  style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--bu-fg, rgba(0, 0, 0, 0.87))";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))";
                  }}
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Components Preview */}
      <section className="py-12 sm:py-16 lg:py-24" style={{ backgroundColor: "var(--bu-surface, #ffffff)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 
              className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
              style={{
                color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                animation: "balanceui-fade-in 600ms cubic-bezier(0.4, 0, 0.2, 1) 200ms both",
              }}
            >
              Explore Our Components
            </h2>
            <p 
              className="mt-3 text-base sm:mt-4 sm:text-lg"
              style={{
                color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
                animation: "balanceui-fade-in 600ms cubic-bezier(0.4, 0, 0.2, 1) 400ms both",
              }}
            >
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
            ].map((component, index) => (
              <Link
                key={component}
                href={`/components/${component.toLowerCase()}`}
                className="group"
                style={{
                  animation: `balanceui-fade-in 400ms cubic-bezier(0.4, 0, 0.2, 1) ${600 + (index * 30)}ms both`,
                }}
              >
                <Card
                  variant="elevated"
                  elevation={2}
                  style={{
                    padding: "1rem",
                    transition: "var(--bu-transition-elevation)",
                    cursor: "pointer",
                  }}
                  className="sm:p-6 balanceui-hover-elevate"
                >
                  <h3 
                    className="text-sm font-semibold sm:text-base"
                    style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}
                  >
                    {component}
                  </h3>
                  <p 
                    className="mt-2 text-xs sm:text-sm"
                    style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}
                  >
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

      {/* Interactive Components Showcase */}
      <section className="py-12 sm:py-16 lg:py-24" style={{ backgroundColor: "var(--bu-surface, #ffffff)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
              style={{
                color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                animation: "balanceui-fade-in 600ms cubic-bezier(0.4, 0, 0.2, 1) 200ms both",
              }}
            >
              Interactive Components Showcase
            </h2>
            <p 
              className="mt-3 text-base sm:mt-4 sm:text-lg"
              style={{
                color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
                animation: "balanceui-fade-in 600ms cubic-bezier(0.4, 0, 0.2, 1) 400ms both",
              }}
            >
              Try out our components in action
            </p>
          </div>

          <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-6 lg:space-y-8">
              {/* Toolbar */}
              <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", minHeight: "120px" }} className="sm:p-6">
                <h3 className="text-base font-semibold mb-4" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))", marginBottom: "1rem" }}>
                  Toolbar
                </h3>
                <Toolbar
                  items={[
                    { id: "1", icon: <Icon name="home" />, label: "Home", onClick: () => notify({ message: "Home clicked", variant: "info" }) },
                    { id: "2", icon: <Icon name="menu" />, label: "Menu", onClick: () => notify({ message: "Menu clicked", variant: "info" }) },
                    { id: "3", icon: <Icon name="check" />, label: "Done", onClick: () => notify({ message: "Done!", variant: "success" }) },
                  ]}
                />
              </Card>

              {/* Tabs */}
              <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", minHeight: "200px" }} className="sm:p-6">
                <h3 className="text-base font-semibold mb-4" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))", marginBottom: "1rem" }}>
                  Tabs
                </h3>
                <Tabs
                  tabs={[
                    { id: "tab1", label: "Overview", content: <p style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>Overview content goes here</p> },
                    { id: "tab2", label: "Features", content: <p style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>Features content goes here</p> },
                    { id: "tab3", label: "Pricing", content: <p style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>Pricing content goes here</p> },
                  ]}
                  value={activeTab}
                  onChange={(id) => setActiveTab(id)}
                />
              </Card>

              {/* Stepper */}
              <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", minHeight: "200px" }} className="sm:p-6">
                <h3 className="text-base font-semibold mb-4" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))", marginBottom: "1rem" }}>
                  Stepper
                </h3>
                <Stepper
                  steps={[
                    { id: "step1", label: "Step 1" },
                    { id: "step2", label: "Step 2" },
                    { id: "step3", label: "Step 3" },
                  ]}
                  activeStep={currentStep}
                />
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="stroke"
                    size="sm"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="solid"
                    size="sm"
                    onClick={() => setCurrentStep(Math.min(2, currentStep + 1))}
                    disabled={currentStep === 2}
                  >
                    Next
                  </Button>
                </div>
              </Card>

              {/* Checkbox & ButtonToggle */}
              <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", minHeight: "180px" }} className="sm:p-6">
                <h3 className="text-base font-semibold mb-4" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))", marginBottom: "1rem" }}>
                  Checkbox & ButtonToggle
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={checkedItems.includes("option1")}
                      onChange={(checked) => {
                        setCheckedItems(checked ? [...checkedItems, "option1"] : checkedItems.filter(i => i !== "option1"));
                      }}
                    />
                    <span style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>Option 1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={checkedItems.includes("option2")}
                      onChange={(checked) => {
                        setCheckedItems(checked ? [...checkedItems, "option2"] : checkedItems.filter(i => i !== "option2"));
                      }}
                    />
                    <span style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>Option 2</span>
                  </div>
                  <div className="mt-4">
                    <ButtonToggle
                      value={selectedToggle}
                      onChange={(val) => setSelectedToggle(typeof val === "string" ? val : val[0])}
                      options={[
                        { value: "left", label: "Left" },
                        { value: "center", label: "Center" },
                        { value: "right", label: "Right" },
                      ]}
                    />
                  </div>
                </div>
              </Card>

              {/* Form Inputs */}
              <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", minHeight: "200px" }} className="sm:p-6">
                <h3 className="text-base font-semibold mb-4" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))", marginBottom: "1rem" }}>
                  Form Inputs
                </h3>
                <div className="space-y-4">
                  <FormField label="Email" helperText="Enter your email address">
                    <Input
                      type="email"
                      placeholder="you@example.com"
                    />
                  </FormField>
                  <FormField label="Select Option">
                    <Select
                      value={selectValue}
                      onChange={(val) => setSelectValue(val)}
                      options={[
                        { value: "option1", label: "Option 1" },
                        { value: "option2", label: "Option 2" },
                        { value: "option3", label: "Option 3" },
                      ]}
                    />
                  </FormField>
                </div>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6 lg:space-y-8">
              {/* Accordion */}
              <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", minHeight: "250px" }} className="sm:p-6">
                <h3 className="text-base font-semibold mb-4" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))", marginBottom: "1rem" }}>
                  Accordion
                </h3>
                <Accordion
                  items={[
                    {
                      id: "1",
                      title: "What is BalanceUI?",
                      content: <p style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                        BalanceUI is a modern, accessible React component library built with TypeScript and Material Design principles.
                      </p>
                    },
                    {
                      id: "2",
                      title: "How do I get started?",
                      content: <p style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                        Install the package and import the components you need. Check out our getting started guide for more details.
                      </p>
                    },
                    {
                      id: "3",
                      title: "Is it free to use?",
                      content: <p style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                        Yes! BalanceUI is completely open source and free to use under the MIT License.
                      </p>
                    },
                  ]}
                  openId={accordionOpenId}
                  onChange={(id) => setAccordionOpenId(id === accordionOpenId ? undefined : id)}
                />
              </Card>

              {/* Tree */}
              <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", minHeight: "250px" }} className="sm:p-6">
                <h3 className="text-base font-semibold mb-4" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))", marginBottom: "1rem" }}>
                  Tree View
                </h3>
                <div style={{ padding: "0.5rem 0" }}>
                  <Tree
                    data={treeData}
                    expanded={expandedTree}
                    onToggle={(id) => {
                      const newExpanded = new Set(expandedTree);
                      if (newExpanded.has(id)) {
                        newExpanded.delete(id);
                      } else {
                        newExpanded.add(id);
                      }
                      setExpandedTree(newExpanded);
                    }}
                    selected={selectedTree}
                    onSelect={(id, checked) => {
                      const newSelected = new Set(selectedTree);
                      if (checked) {
                        newSelected.add(id);
                      } else {
                        newSelected.delete(id);
                      }
                      setSelectedTree(newSelected);
                    }}
                  />
                </div>
              </Card>

              {/* List */}
              <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", minHeight: "200px" }} className="sm:p-6">
                <h3 className="text-base font-semibold mb-4" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))", marginBottom: "1rem" }}>
                  List
                </h3>
                <List
                  items={[
                    { id: "1", primary: "List Item 1", secondary: "Secondary text", icon: <Icon name="home" />, divider: true },
                    { id: "2", primary: "List Item 2", secondary: "With description", icon: <Icon name="menu" />, divider: true },
                    { id: "3", primary: "List Item 3", secondary: "Clickable item", icon: <Icon name="check" /> },
                  ]}
                  onItemClick={(item) => notify({ message: `Clicked: ${item.primary}`, variant: "info" })}
                />
              </Card>

              {/* Progress */}
              <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", minHeight: "200px" }} className="sm:p-6">
                <h3 className="text-base font-semibold mb-4" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))", marginBottom: "1rem" }}>
                  Progress
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex justify-between text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                      <span>Progress: {progressValue}%</span>
                      <span>Linear</span>
                    </div>
                    <Progress value={progressValue} showValue />
                  </div>
                  <div>
                    <div className="mb-2 text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                      Circular
                    </div>
                    <div className="flex gap-4">
                      <Progress value={30} type="circular" showValue />
                      <Progress value={60} type="circular" showValue />
                      <Progress value={90} type="circular" showValue />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="stroke" onClick={() => setProgressValue(Math.max(0, progressValue - 10))}>
                      -10%
                    </Button>
                    <Button size="sm" variant="stroke" onClick={() => setProgressValue(Math.min(100, progressValue + 10))}>
                      +10%
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Icons & Badges */}
              <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", minHeight: "150px" }} className="sm:p-6">
                <h3 className="text-base font-semibold mb-4" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))", marginBottom: "1rem" }}>
                  Icons & Badges
                </h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Icon name="home" size="lg" />
                  <Icon name="menu" size="lg" />
                  <Icon name="check" size="lg" />
                  <Icon name="add" size="lg" />
                  <Badge variant="solid">New</Badge>
                  <Badge variant="success">Active</Badge>
                  <Badge variant="warning">Pending</Badge>
                  <Badge variant="danger">Error</Badge>
                </div>
              </Card>

              {/* Toast Trigger */}
              <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", minHeight: "150px" }} className="sm:p-6">
                <h3 className="text-base font-semibold mb-4" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))", marginBottom: "1rem" }}>
                  Toast Notifications
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="solid"
                    size="sm"
                    onClick={() => notify({ message: "Success! Operation completed.", variant: "success" })}
                  >
                    Success Toast
                  </Button>
                  <Button
                    variant="solid"
                    size="sm"
                    onClick={() => notify({ message: "Warning: Please check your input.", variant: "warning" })}
                  >
                    Warning Toast
                  </Button>
                  <Button
                    variant="solid"
                    size="sm"
                    onClick={() => notify({ message: "Error: Something went wrong.", variant: "error" })}
                  >
                    Error Toast
                  </Button>
                  <Button
                    variant="solid"
                    size="sm"
                    onClick={() => notify({ message: "Info: Here's some information.", variant: "info" })}
                  >
                    Info Toast
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function Home() {
  return (
    <ToastProvider>
      <HomeContent />
    </ToastProvider>
  );
}

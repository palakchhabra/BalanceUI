"use client";

import { useState } from "react";
import { Card, Button, Stepper, Input, FormField, Modal } from "@balanceui/core";
import Link from "next/link";

const steps = [
  { id: "1", label: "Personal Info", description: "Enter your personal details" },
  { id: "2", label: "Account Setup", description: "Create your account credentials" },
  { id: "3", label: "Review", description: "Review and confirm" },
];

export default function WizardExample() {
  const [activeStep, setActiveStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleNext = () => {
    // Validation for each step
    if (activeStep === 0) {
      if (!formData.firstName || !formData.lastName) {
        alert("Please fill in all required fields");
        return;
      }
    } else if (activeStep === 1) {
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        alert("Please fill in all required fields");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
    } else if (activeStep === 2) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        alert("Please complete all required fields");
        return;
      }
    }

    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      setShowModal(true);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:ml-64">
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
          Multi-step Form Example
        </h1>
        <p className="mt-4 text-lg" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
          A wizard form using Stepper, FormField, and Modal components.
        </p>
      </div>

      <Card variant="elevated" elevation={3} style={{ padding: "2rem" }}>
        <Stepper
          steps={steps}
          activeStep={activeStep}
          onStepClick={(index) => {
            if (index <= activeStep) setActiveStep(index);
          }}
          style={{ marginBottom: "3rem" }}
        />

        <div className="min-h-[400px]">
          {activeStep === 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                Personal Information
              </h2>
              <FormField label="First Name" required>
                <Input
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  style={{ width: "100%" }}
                />
              </FormField>
              <FormField label="Last Name" required>
                <Input
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  style={{ width: "100%" }}
                />
              </FormField>
            </div>
          )}

          {activeStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                Account Setup
              </h2>
              <FormField label="Email" required>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  style={{ width: "100%" }}
                />
              </FormField>
              <FormField label="Password" required>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  style={{ width: "100%" }}
                />
              </FormField>
              <FormField label="Confirm Password" required>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  style={{ width: "100%" }}
                />
              </FormField>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                Review Your Information
              </h2>
              <Card variant="outlined" style={{ padding: "1.5rem" }}>
                <div className="space-y-4">
                  <div 
                    className="flex items-start justify-between border-b pb-3"
                    style={{
                      borderColor: "var(--bu-border, rgba(0, 0, 0, 0.12))",
                    }}
                  >
                    <span className="text-sm font-medium" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                      First Name:
                    </span>
                    <span className="text-sm" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                      {formData.firstName || "Not provided"}
                    </span>
                  </div>
                  <div 
                    className="flex items-start justify-between border-b pb-3"
                    style={{
                      borderColor: "var(--bu-border, rgba(0, 0, 0, 0.12))",
                    }}
                  >
                    <span className="text-sm font-medium" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                      Last Name:
                    </span>
                    <span className="text-sm" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                      {formData.lastName || "Not provided"}
                    </span>
                  </div>
                  <div 
                    className="flex items-start justify-between border-b pb-3"
                    style={{
                      borderColor: "var(--bu-border, rgba(0, 0, 0, 0.12))",
                    }}
                  >
                    <span className="text-sm font-medium" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                      Email:
                    </span>
                    <span className="text-sm" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                      {formData.email || "Not provided"}
                    </span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-sm font-medium" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                      Password:
                    </span>
                    <span className="text-sm" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
                      {formData.password ? "••••••••" : "Not provided"}
                    </span>
                  </div>
                </div>
              </Card>
              {(!formData.firstName || !formData.lastName || !formData.email || !formData.password) && (
                <div 
                  className="rounded-md p-4"
                  style={{
                    backgroundColor: "var(--bu-warning, #f57c00)",
                    borderRadius: "var(--bu-radius-md, 10px)",
                    opacity: 0.1,
                  }}
                >
                  <div style={{ backgroundColor: "transparent" }}>
                    <p className="text-sm" style={{ color: "var(--bu-warning, #f57c00)" }}>
                      Please complete all required fields before submitting.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div 
          className="mt-8 flex justify-between border-t pt-6"
          style={{
            borderColor: "var(--bu-border, rgba(0, 0, 0, 0.12))",
          }}
        >
          <Button
            variant="stroke"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          <Button variant="solid" onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </div>
      </Card>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div style={{ padding: "2rem" }}>
          <h2 className="mb-4 text-2xl font-semibold" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
            Success!
          </h2>
          <p className="mb-6" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
            Your account has been created successfully.
          </p>
          <Button variant="solid" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
}


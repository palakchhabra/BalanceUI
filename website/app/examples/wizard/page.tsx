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
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/examples"
          className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          ← Back to Examples
        </Link>
      </div>

      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Multi-step Form Example
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
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
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
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
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
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
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Review Your Information
              </h2>
              <Card variant="outlined" style={{ padding: "1.5rem" }}>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Name:
                    </span>{" "}
                    <span className="text-sm text-gray-900 dark:text-white">
                      {formData.firstName} {formData.lastName}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Email:
                    </span>{" "}
                    <span className="text-sm text-gray-900 dark:text-white">
                      {formData.email}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
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
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Success!
          </h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
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


export type StepperOrientation = "horizontal" | "vertical";

export interface Step {
  id: string;
  label: string;
  description?: string;
  icon?: string | React.ReactNode; // Icon name (string) or custom ReactNode
}

export interface StepperProps {
  steps: Step[];
  activeStep: number;

  orientation?: StepperOrientation;
  variant?: "solid" | "dotted";
  onStepClick?: (index: number) => void;

  errorSteps?: number[];

  className?: string;
  style?: React.CSSProperties;
}

import { StepperProps } from "./Stepper.types";
import { Icon } from "../Icon";
import "./Stepper.css";

export const Stepper = ({
  steps,
  activeStep,
  orientation = "horizontal",
  variant = "solid",
  onStepClick,
  errorSteps = [],
  className,
  style,
}: StepperProps) => {
  // Find the first error step index
  const firstErrorIndex = errorSteps.length > 0 ? Math.min(...errorSteps) : -1;
  // Steps after the first error should be disabled
  const isStepDisabled = (index: number) => {
    if (firstErrorIndex === -1) return false;
    return index > firstErrorIndex;
  };

  const renderCircleContent = (step: StepperProps["steps"][0], index: number, completed: boolean, error: boolean) => {
    if (completed) {
      return null; // Completed shows checkmark via CSS ::after
    }
    
    if (error) {
      return "✕";
    }

    // If step has an icon, render it
    if (step.icon) {
      if (typeof step.icon === "string") {
        return <Icon name={step.icon} size="sm" />;
      }
      return step.icon; // Custom ReactNode
    }

    // Default: show step number
    return index + 1;
  };

  return (
    <div
      className={`balanceui-stepper balanceui-stepper-container ${orientation === "vertical" ? "vertical" : ""} ${className || ""}`}
      style={style}
    >
      {steps.map((step, index) => {
        const active = index === activeStep;
        const completed = index < activeStep && !errorSteps.includes(index);
        const error = errorSteps.includes(index);
        const inactive = !active && !completed && !error;
        const disabled = isStepDisabled(index);
        const hasErrorBefore = firstErrorIndex !== -1 && index > firstErrorIndex;

        return (
          <div
            key={step.id}
            className="balanceui-stepper-step-wrapper"
          >
            <div
              className={`balanceui-stepper-step ${active ? "active" : ""} ${completed ? "completed" : ""} ${error ? "error" : ""} ${inactive ? "inactive" : ""} ${disabled ? "disabled" : ""} ${step.icon ? "with-icon" : ""}`}
              onClick={() => !disabled && onStepClick?.(index)}
              style={{ cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1 }}
            >
              <div
                className={`balanceui-stepper-circle ${active ? "active" : ""} ${completed ? "completed" : ""} ${error ? "error" : ""} ${inactive ? "inactive" : ""} ${disabled ? "disabled" : ""} ${step.icon ? "with-icon" : ""}`}
              >
                {renderCircleContent(step, index, completed, error)}
              </div>

              <div className="balanceui-stepper-content">
                <div className="balanceui-stepper-label">{step.label}</div>
                {step.description && (
                  <div className="balanceui-stepper-description">
                    {step.description}
                  </div>
                )}
              </div>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`balanceui-stepper-connector ${variant === "dotted" ? "dotted" : ""} ${completed ? "completed" : ""} ${error || hasErrorBefore ? "error" : ""}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

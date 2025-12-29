import { StepperProps } from "./Stepper.types";
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
  return (
    <div
      className={`balanceui-stepper balanceui-stepper-container ${orientation === "vertical" ? "vertical" : ""} ${className || ""}`}
      style={style}
    >
      {steps.map((step, index) => {
        const active = index === activeStep;
        const completed = index < activeStep;
        const error = errorSteps.includes(index);
        const inactive = !active && !completed && !error;

        return (
          <div
            key={step.id}
            className="balanceui-stepper-step-wrapper"
          >
            <div
              className={`balanceui-stepper-step ${active ? "active" : ""} ${completed ? "completed" : ""} ${error ? "error" : ""} ${inactive ? "inactive" : ""}`}
              onClick={() => onStepClick?.(index)}
            >
              <div
                className={`balanceui-stepper-circle ${active ? "active" : ""} ${completed ? "completed" : ""} ${error ? "error" : ""} ${inactive ? "inactive" : ""}`}
              >
                {!completed && (error ? "✕" : index + 1)}
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
                className={`balanceui-stepper-connector ${variant === "dotted" ? "dotted" : ""} ${completed ? "completed" : ""}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Stepper } from './Stepper';

const mockSteps = [
  { id: '1', label: 'Step 1', description: 'First step' },
  { id: '2', label: 'Step 2', description: 'Second step' },
  { id: '3', label: 'Step 3', description: 'Third step' },
];

describe('Stepper', () => {
  it('renders all steps', () => {
    render(<Stepper steps={mockSteps} activeStep={0} />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('highlights active step', () => {
    render(<Stepper steps={mockSteps} activeStep={1} />);
    const step2 = screen.getByText('Step 2').closest('.balanceui-stepper-step');
    expect(step2).toHaveClass('active');
  });

  it('marks completed steps', () => {
    render(<Stepper steps={mockSteps} activeStep={2} />);
    const step1 = screen.getByText('Step 1').closest('.balanceui-stepper-step');
    expect(step1).toHaveClass('completed');
  });

  it('calls onStepClick when step is clicked', () => {
    const handleStepClick = vi.fn();
    render(<Stepper steps={mockSteps} activeStep={0} onStepClick={handleStepClick} />);
    const step2 = screen.getByText('Step 2');
    fireEvent.click(step2);
    expect(handleStepClick).toHaveBeenCalledWith(1);
  });

  it('renders in vertical orientation', () => {
    const { container } = render(
      <Stepper steps={mockSteps} activeStep={0} orientation="vertical" />
    );
    const stepper = container.querySelector('.balanceui-stepper-container');
    expect(stepper).toHaveClass('vertical');
  });

  it('displays error state for error steps', () => {
    render(<Stepper steps={mockSteps} activeStep={1} errorSteps={[0]} />);
    const step1 = screen.getByText('Step 1').closest('.balanceui-stepper-step');
    expect(step1).toHaveClass('error');
  });

  it('shows checkmark for completed steps', () => {
    render(<Stepper steps={mockSteps} activeStep={2} />);
    const step1Circle = screen.getByText('Step 1')
      .closest('.balanceui-stepper-step')
      ?.querySelector('.balanceui-stepper-circle');
    expect(step1Circle).toHaveClass('completed');
  });

  it('handles empty steps array', () => {
    const { container } = render(<Stepper steps={[]} activeStep={0} />);
    expect(container).toBeInTheDocument();
  });
});


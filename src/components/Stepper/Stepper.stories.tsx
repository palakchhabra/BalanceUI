import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    activeStep: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const steps = [
  { id: '1', label: 'Account', description: 'Create your account' },
  { id: '2', label: 'Profile', description: 'Complete your profile' },
  { id: '3', label: 'Verification', description: 'Verify your email' },
  { id: '4', label: 'Complete', description: 'You are all set!' },
];

export const Default: Story = {
  args: {
    steps,
    activeStep: 0,
  },
};

export const Step2: Story = {
  args: {
    steps,
    activeStep: 1,
  },
};

export const Step3: Story = {
  args: {
    steps,
    activeStep: 2,
  },
};

export const Completed: Story = {
  args: {
    steps,
    activeStep: 3,
  },
};

export const Vertical: Story = {
  args: {
    steps,
    activeStep: 1,
    orientation: 'vertical',
  },
};

export const WithErrors: Story = {
  args: {
    steps,
    activeStep: 2,
    errorSteps: [1],
  },
};

export const Interactive: Story = {
  args: {
    steps,
    activeStep: 0,
    onStepClick: (index) => {
      console.log('Step clicked:', index);
    },
  },
};

export const DottedVariant: Story = {
  args: {
    steps,
    activeStep: 1,
    variant: 'dotted',
  },
};

export const DottedCompleted: Story = {
  args: {
    steps,
    activeStep: 3,
    variant: 'dotted',
  },
};

export const VariantsComparison: Story = {
  render: () => {
    const steps = [
      { id: '1', label: 'Step 1', description: 'First step' },
      { id: '2', label: 'Step 2', description: 'Second step' },
      { id: '3', label: 'Step 3', description: 'Third step' },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <div style={{ marginBottom: '12px', fontWeight: 600 }}>Solid Line Variant</div>
          <Stepper steps={steps} activeStep={1} variant="solid" />
        </div>
        <div>
          <div style={{ marginBottom: '12px', fontWeight: 600 }}>Dotted Line Variant</div>
          <Stepper steps={steps} activeStep={1} variant="dotted" />
        </div>
      </div>
    );
  },
};


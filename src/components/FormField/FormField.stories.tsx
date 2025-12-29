import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';
import { Input } from '../Input/Input';
import { DatePicker } from '../DatePicker/DatePicker';
import { Select } from '../Select/Select';
import { TextArea } from '../TextArea/TextArea';

const meta: Meta<typeof FormField> = {
  title: 'Components/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A form field wrapper component that provides label, error handling, helper text, and accessibility features for form inputs.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the field',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the input',
    },
    error: {
      control: 'text',
      description: 'Error message displayed below the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the field is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: () => (
    <FormField>
      <Input placeholder="Enter text" />
    </FormField>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <FormField label="Email">
      <Input type="email" placeholder="Enter your email" />
    </FormField>
  ),
  parameters: {
    docs: {
      description: {
        story: 'FormField with a label above the input.',
      },
    },
  },
};

export const Required: Story = {
  render: () => (
    <FormField label="Email" required>
      <Input type="email" placeholder="Enter your email" />
    </FormField>
  ),
  parameters: {
    docs: {
      description: {
        story: 'FormField marked as required with an asterisk indicator.',
      },
    },
  },
};

export const WithHelperText: Story = {
  render: () => (
    <FormField label="Password" helperText="Must be at least 8 characters">
      <Input type="password" placeholder="Enter password" />
    </FormField>
  ),
  parameters: {
    docs: {
      description: {
        story: 'FormField with helper text to provide guidance to users.',
      },
    },
  },
};

export const WithError: Story = {
  render: () => (
    <FormField label="Email" error="This field is required">
      <Input type="email" placeholder="Enter your email" />
    </FormField>
  ),
  parameters: {
    docs: {
      description: {
        story: 'FormField displaying an error message. Error takes priority over helper text.',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <FormField label="Email" disabled>
      <Input type="email" placeholder="Enter your email" />
    </FormField>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled FormField that cannot be interacted with.',
      },
    },
  },
};

export const WithDatePicker: Story = {
  render: () => (
    <FormField label="Birth Date" required>
      <DatePicker placeholder="Select date" />
    </FormField>
  ),
  parameters: {
    docs: {
      description: {
        story: 'FormField wrapping a DatePicker component.',
      },
    },
  },
};

export const WithSelect: Story = {
  render: () => (
    <FormField label="Country" required>
      <Select
        options={[
          { value: 'us', label: 'United States' },
          { value: 'uk', label: 'United Kingdom' },
          { value: 'ca', label: 'Canada' },
        ]}
        placeholder="Select a country"
      />
    </FormField>
  ),
  parameters: {
    docs: {
      description: {
        story: 'FormField wrapping a Select component.',
      },
    },
  },
};

export const WithTextArea: Story = {
  render: () => (
    <FormField label="Message" helperText="Enter your message here">
      <TextArea placeholder="Type your message..." />
    </FormField>
  ),
  parameters: {
    docs: {
      description: {
        story: 'FormField wrapping a TextArea component.',
      },
    },
  },
};

export const CompleteExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <FormField label="Email" required helperText="We'll never share your email">
        <Input type="email" placeholder="Enter your email" />
      </FormField>
      
      <FormField label="Password" required error="Password is required">
        <Input type="password" placeholder="Enter password" />
      </FormField>
      
      <FormField label="Country">
        <Select
          options={[
            { value: 'us', label: 'United States' },
            { value: 'uk', label: 'United Kingdom' },
            { value: 'ca', label: 'Canada' },
          ]}
          placeholder="Select a country"
        />
      </FormField>
      
      <FormField label="Message" helperText="Optional message">
        <TextArea placeholder="Type your message..." />
      </FormField>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete form example showing various FormField configurations.',
      },
    },
  },
};


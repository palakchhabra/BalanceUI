import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import { useState } from 'react';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A dropdown select component for choosing from a list of options. Supports placeholder, disabled state, and custom styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Array of option objects with value and label',
    },
    value: {
      control: 'text',
      description: 'Selected value',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when selection changes',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const basicOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

export const Default: Story = {
  args: {
    options: basicOptions,
  },
};

export const WithPlaceholder: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Select an option',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select with a placeholder option that appears first and is disabled.',
      },
    },
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState('option2');
    return (
      <Select
        options={basicOptions}
        value={value}
        onChange={setValue}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled Select component with a selected value.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    options: basicOptions,
    disabled: true,
    placeholder: 'Disabled select',
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled Select that cannot be interacted with.',
      },
    },
  },
};

export const CountrySelect: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Select
        options={[
          { value: 'us', label: 'United States' },
          { value: 'uk', label: 'United Kingdom' },
          { value: 'ca', label: 'Canada' },
          { value: 'au', label: 'Australia' },
          { value: 'de', label: 'Germany' },
          { value: 'fr', label: 'France' },
        ]}
        value={value}
        onChange={setValue}
        placeholder="Select a country"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Select component used for country selection.',
      },
    },
  },
};

export const LongOptions: Story = {
  render: () => {
    const longOptions = Array.from({ length: 20 }, (_, i) => ({
      value: `option${i + 1}`,
      label: `Option ${i + 1} - This is a longer option label to test wrapping`,
    }));
    
    return (
      <Select
        options={longOptions}
        placeholder="Select from many options"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Select with many options to test scrolling behavior.',
      },
    },
  },
};

export const NumericValues: Story = {
  render: () => {
    const numericOptions = Array.from({ length: 10 }, (_, i) => ({
      value: String(i + 1),
      label: `Number ${i + 1}`,
    }));
    
    return (
      <Select
        options={numericOptions}
        placeholder="Select a number"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Select with numeric string values.',
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Select
        options={basicOptions}
        placeholder="Default style"
        style={{ width: '100%' }}
      />
      <Select
        options={basicOptions}
        placeholder="Custom padding"
        style={{ width: '100%', padding: '12px' }}
      />
      <Select
        options={basicOptions}
        placeholder="Custom font size"
        style={{ width: '100%', fontSize: '18px' }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Select components with custom styling applied.',
      },
    },
  },
};

export const WithFormField: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '300px' }}>
        <label htmlFor="country-select" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
          Country *
        </label>
        <Select
          id="country-select"
          options={[
            { value: 'us', label: 'United States' },
            { value: 'uk', label: 'United Kingdom' },
            { value: 'ca', label: 'Canada' },
          ]}
          value={value}
          onChange={setValue}
          placeholder="Select a country"
          style={{ width: '100%' }}
        />
        <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
          Please select your country of residence
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Select component used within a form with label and helper text.',
      },
    },
  },
};


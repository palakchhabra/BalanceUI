import type { Meta, StoryObj } from '@storybook/react';
import { TimePicker } from './TimePicker';
import { useState } from 'react';

const meta: Meta<typeof TimePicker> = {
  title: 'Components/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'soft', 'outline'],
    },
    format: {
      control: 'select',
      options: ['12h', '24h'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {
  args: {
    placeholder: 'Select time',
    variant: 'outline',
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(new Date());
    return (
      <TimePicker
        value={value}
        onChange={setValue}
        variant="outline"
        placeholder="Select time"
      />
    );
  },
};

export const Format12h: Story = {
  args: {
    placeholder: 'Select time (12h)',
    variant: 'outline',
    format: '12h',
  },
};

export const Format24h: Story = {
  args: {
    placeholder: 'Select time (24h)',
    variant: 'outline',
    format: '24h',
  },
};

export const CustomStep: Story = {
  args: {
    placeholder: 'Select time (30 min intervals)',
    variant: 'outline',
    step: 30,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <TimePicker variant="outline" placeholder="Outline variant" />
      <TimePicker variant="soft" placeholder="Soft variant" />
      <TimePicker variant="solid" placeholder="Solid variant" />
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    label: 'Appointment Time',
    placeholder: 'Select time',
    variant: 'outline',
  },
};

export const WithError: Story = {
  args: {
    label: 'Time',
    placeholder: 'Select time',
    variant: 'outline',
    error: 'This field is required',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled time picker',
    variant: 'outline',
    disabled: true,
  },
};


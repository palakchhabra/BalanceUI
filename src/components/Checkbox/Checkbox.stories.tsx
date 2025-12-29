import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'soft', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Checkbox',
    variant: 'outline',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked checkbox',
    variant: 'outline',
    defaultChecked: true,
  },
};

export const Unchecked: Story = {
  args: {
    label: 'Unchecked checkbox',
    variant: 'outline',
    defaultChecked: false,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate checkbox',
    variant: 'outline',
    indeterminate: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox label="Outline variant" variant="outline" defaultChecked />
      <Checkbox label="Soft variant" variant="soft" defaultChecked />
      <Checkbox label="Solid variant" variant="solid" defaultChecked />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox label="Small" size="sm" defaultChecked />
      <Checkbox label="Medium" size="md" defaultChecked />
      <Checkbox label="Large" size="lg" defaultChecked />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        label="Click me"
        checked={checked}
        onChange={setChecked}
        variant="outline"
      />
    );
  },
};

export const WithError: Story = {
  args: {
    label: 'Accept terms',
    variant: 'outline',
    error: 'You must accept the terms',
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};


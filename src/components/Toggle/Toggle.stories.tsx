import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';
import { useState } from 'react';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

const ToggleWrapper = (args: any) => {
  const [checked, setChecked] = useState(args.checked || false);
  return (
    <Toggle
      {...args}
      checked={checked}
      onChange={(val) => setChecked(val)}
    />
  );
};

export const Default: Story = {
  render: (args) => <ToggleWrapper {...args} />,
  args: {
    checked: false,
  },
};

export const Checked: Story = {
  render: (args) => <ToggleWrapper {...args} />,
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  render: (args) => <ToggleWrapper {...args} />,
  args: {
    checked: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  render: (args) => <ToggleWrapper {...args} />,
  args: {
    checked: true,
    disabled: true,
  },
};

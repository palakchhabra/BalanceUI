import type { Meta, StoryObj } from '@storybook/react';
import { Tension } from './Tension';
import { useState } from 'react';

const meta: Meta<typeof Tension> = {
  title: 'Components/Tension',
  component: Tension,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    step: {
      control: 'number',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tension>;

const TensionWrapper = (args: any) => {
  const [value, setValue] = useState(args.value || 50);
  return (
    <div style={{ width: '300px' }}>
      <Tension
        {...args}
        value={value}
        onChange={(val) => setValue(val)}
      />
      <div style={{ marginTop: '10px', textAlign: 'center' }}>Value: {value}</div>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <TensionWrapper {...args} />,
  args: {
    value: 50,
    min: 0,
    max: 100,
  },
};

export const WithStep: Story = {
  render: (args) => <TensionWrapper {...args} />,
  args: {
    value: 25,
    min: 0,
    max: 100,
    step: 5,
  },
};

export const CustomRange: Story = {
  render: (args) => <TensionWrapper {...args} />,
  args: {
    value: 75,
    min: 0,
    max: 200,
  },
};

export const Disabled: Story = {
  render: (args) => <TensionWrapper {...args} />,
  args: {
    value: 50,
    disabled: true,
  },
};


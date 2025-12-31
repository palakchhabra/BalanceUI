import type { Meta, StoryObj } from '@storybook/react';
import { TensionRange } from './TensionRange';
import { useState } from 'react';

const meta: Meta<typeof TensionRange> = {
  title: 'Components/TensionRange',
  component: TensionRange,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
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
type Story = StoryObj<typeof TensionRange>;

const TensionRangeWrapper = (args: any) => {
  const [value, setValue] = useState<[number, number]>(args.value || [20, 80]);
  return (
    <div style={{ width: '300px' }}>
      <TensionRange
        {...args}
        value={value}
        onChange={(val) => setValue(val)}
      />
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        Range: {value[0]} - {value[1]}
      </div>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <TensionRangeWrapper {...args} />,
  args: {
    value: [20, 80],
    min: 0,
    max: 100,
  },
};

export const WithStep: Story = {
  render: (args) => <TensionRangeWrapper {...args} />,
  args: {
    value: [25, 75],
    min: 0,
    max: 100,
    step: 5,
  },
};

export const CustomRange: Story = {
  render: (args) => <TensionRangeWrapper {...args} />,
  args: {
    value: [30, 150],
    min: 0,
    max: 200,
  },
};

export const Disabled: Story = {
  render: (args) => <TensionRangeWrapper {...args} />,
  args: {
    value: [20, 80],
    disabled: true,
  },
};


import type { Meta, StoryObj } from '@storybook/react';
import { PageSizeSelector } from './PageSizeSelector';
import { useState } from 'react';

const meta: Meta<typeof PageSizeSelector> = {
  title: 'Components/PageSizeSelector',
  component: PageSizeSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageSizeSelector>;

const PageSizeSelectorWrapper = (args: any) => {
  const [value, setValue] = useState(args.value || 10);
  return (
    <PageSizeSelector
      {...args}
      value={value}
      onChange={(size) => setValue(size)}
    />
  );
};

export const Default: Story = {
  render: (args) => <PageSizeSelectorWrapper {...args} />,
  args: {
    value: 10,
    label: "Items per page:",
    showLabel: true,
  },
};

export const CustomOptions: Story = {
  render: (args) => <PageSizeSelectorWrapper {...args} />,
  args: {
    value: 25,
    options: [5, 10, 25, 100],
    label: "Items per page:",
    showLabel: true,
  },
};

export const WithoutLabel: Story = {
  render: (args) => <PageSizeSelectorWrapper {...args} />,
  args: {
    value: 10,
    showLabel: false,
  },
};

export const CustomLabel: Story = {
  render: (args) => <PageSizeSelectorWrapper {...args} />,
  args: {
    value: 50,
    label: "Rows per page:",
    showLabel: true,
    options: [10, 25, 50, 100],
  },
};


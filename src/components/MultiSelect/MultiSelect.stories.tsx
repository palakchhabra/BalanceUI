import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelect } from './MultiSelect';
import { useState } from 'react';

const meta: Meta<typeof MultiSelect> = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['outlined', 'filled'],
    },
    disabled: {
      control: 'boolean',
    },
    searchable: {
      control: 'boolean',
    },
    clearable: {
      control: 'boolean',
    },
    maxSelected: {
      control: 'number',
    },
    allowDisabledSelection: {
      control: 'boolean',
      description: 'Allow selecting options that are marked as disabled (they will still appear greyed out)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
  { label: 'Option 5', value: '5' },
];

const MultiSelectWrapper = (args: any) => {
  const [value, setValue] = useState<string[]>(args.value || []);
  return (
    <MultiSelect
      {...args}
      value={value}
      onChange={(vals) => setValue(vals)}
    />
  );
};

export const Default: Story = {
  render: (args) => <MultiSelectWrapper {...args} />,
  args: {
    options,
    placeholder: 'Select options...',
  },
};

export const WithValue: Story = {
  render: (args) => <MultiSelectWrapper {...args} />,
  args: {
    options,
    value: ['1', '2'],
    placeholder: 'Select options...',
  },
};

export const Searchable: Story = {
  render: (args) => <MultiSelectWrapper {...args} />,
  args: {
    options,
    searchable: true,
    placeholder: 'Search and select...',
  },
};

export const WithMaxSelected: Story = {
  render: (args) => <MultiSelectWrapper {...args} />,
  args: {
    options,
    maxSelected: 3,
    placeholder: 'Select up to 3 options...',
  },
};

export const WithGroups: Story = {
  render: (args) => <MultiSelectWrapper {...args} />,
  args: {
    options: [
      { label: 'Apple', value: 'apple', group: 'Fruits' },
      { label: 'Banana', value: 'banana', group: 'Fruits' },
      { label: 'Carrot', value: 'carrot', group: 'Vegetables' },
      { label: 'Potato', value: 'potato', group: 'Vegetables' },
    ],
    placeholder: 'Select items...',
  },
};

export const WithError: Story = {
  render: (args) => <MultiSelectWrapper {...args} />,
  args: {
    options,
    error: 'This field is required',
    placeholder: 'Select options...',
  },
};

export const Disabled: Story = {
  render: (args) => <MultiSelectWrapper {...args} />,
  args: {
    options,
    disabled: true,
    value: ['1'],
    placeholder: 'Disabled...',
  },
};

export const WithDisabledOptions: Story = {
  render: (args) => <MultiSelectWrapper {...args} />,
  args: {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2 (Disabled)', value: '2', disabled: true },
      { label: 'Option 3', value: '3' },
      { label: 'Option 4 (Disabled)', value: '4', disabled: true },
      { label: 'Option 5', value: '5' },
    ],
    placeholder: 'Some options are disabled...',
  },
};

export const AllowDisabledSelection: Story = {
  render: (args) => <MultiSelectWrapper {...args} />,
  args: {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2 (Disabled but selectable)', value: '2', disabled: true },
      { label: 'Option 3', value: '3' },
      { label: 'Option 4 (Disabled but selectable)', value: '4', disabled: true },
      { label: 'Option 5', value: '5' },
    ],
    placeholder: 'Disabled options are greyed but selectable...',
    allowDisabledSelection: true,
  },
};


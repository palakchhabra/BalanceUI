import type { Meta, StoryObj } from '@storybook/react';
import { SearchSelect } from './SearchSelect';
import { useState } from 'react';

const meta: Meta<typeof SearchSelect> = {
  title: 'Components/SearchSelect',
  component: SearchSelect,
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
    clearable: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    maxSelected: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchSelect>;

const options = [
  { label: 'Apple', value: 'apple', description: 'A red fruit' },
  { label: 'Banana', value: 'banana', description: 'A yellow fruit' },
  { label: 'Cherry', value: 'cherry', description: 'A red fruit' },
  { label: 'Date', value: 'date', description: 'A sweet fruit' },
  { label: 'Elderberry', value: 'elderberry', description: 'A purple fruit' },
];

const SearchSelectWrapper = (args: any) => {
  const [value, setValue] = useState<string[]>(args.value || []);
  return (
    <SearchSelect
      {...args}
      value={value}
      onChange={(vals) => setValue(vals)}
    />
  );
};

export const Default: Story = {
  render: (args) => <SearchSelectWrapper {...args} />,
  args: {
    options,
    placeholder: 'Search and select...',
  },
};

export const WithValue: Story = {
  render: (args) => <SearchSelectWrapper {...args} />,
  args: {
    options,
    value: ['apple', 'banana'],
    placeholder: 'Search and select...',
  },
};

export const Loading: Story = {
  render: (args) => <SearchSelectWrapper {...args} />,
  args: {
    options,
    loading: true,
    placeholder: 'Loading...',
  },
};

export const WithMaxSelected: Story = {
  render: (args) => <SearchSelectWrapper {...args} />,
  args: {
    options,
    maxSelected: 2,
    placeholder: 'Select up to 2 items...',
  },
};

export const WithError: Story = {
  render: (args) => <SearchSelectWrapper {...args} />,
  args: {
    options,
    error: 'Please select at least one item',
    placeholder: 'Search and select...',
  },
};

export const Disabled: Story = {
  render: (args) => <SearchSelectWrapper {...args} />,
  args: {
    options,
    disabled: true,
    value: ['apple'],
    placeholder: 'Disabled...',
  },
};


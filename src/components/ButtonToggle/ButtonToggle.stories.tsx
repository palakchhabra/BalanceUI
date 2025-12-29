import type { Meta, StoryObj } from '@storybook/react';
import { ButtonToggle } from './ButtonToggle';
import { useState } from 'react';

const meta: Meta<typeof ButtonToggle> = {
  title: 'Components/ButtonToggle',
  component: ButtonToggle,
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
type Story = StoryObj<typeof ButtonToggle>;

const defaultOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
    variant: 'outline',
  },
};

export const SingleSelection: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');
    return (
      <ButtonToggle
        options={defaultOptions}
        value={value}
        onChange={(v) => setValue(v as string)}
        variant="outline"
      />
    );
  },
};

export const MultipleSelection: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <ButtonToggle
        options={defaultOptions}
        value={value}
        onChange={(v) => setValue(v as string[])}
        multiple
        variant="outline"
      />
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <ButtonToggle options={defaultOptions} variant="outline" />
      <ButtonToggle options={defaultOptions} variant="soft" />
      <ButtonToggle options={defaultOptions} variant="solid" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <ButtonToggle options={defaultOptions} size="sm" />
      <ButtonToggle options={defaultOptions} size="md" />
      <ButtonToggle options={defaultOptions} size="lg" />
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    options: defaultOptions,
    variant: 'outline',
    fullWidth: true,
  },
};

export const WithIcons: Story = {
  render: () => {
    const options = [
      { value: 'bold', label: 'Bold', icon: <strong>B</strong> },
      { value: 'italic', label: 'Italic', icon: <em>I</em> },
      { value: 'underline', label: 'Underline', icon: <u>U</u> },
    ];
    return <ButtonToggle options={options} variant="outline" />;
  },
};

export const Disabled: Story = {
  render: () => {
    const options = [
      { value: 'option1', label: 'Enabled' },
      { value: 'option2', label: 'Disabled', disabled: true },
      { value: 'option3', label: 'Enabled' },
    ];
    return <ButtonToggle options={options} variant="outline" />;
  },
};


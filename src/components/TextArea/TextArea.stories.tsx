import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    rows: {
      control: 'number',
    },
    cols: {
      control: 'number',
    },
    disabled: {
      control: 'boolean',
    },
    readOnly: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    rows: 4,
  },
};

export const WithValue: Story = {
  args: {
    value: 'This is some text content',
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    value: 'This textarea is disabled',
    disabled: true,
    rows: 4,
  },
};

export const ReadOnly: Story = {
  args: {
    value: 'This textarea is read-only',
    readOnly: true,
    rows: 4,
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Enter a lot of text...',
    rows: 10,
    cols: 50,
  },
};

export const Small: Story = {
  args: {
    placeholder: 'Short text',
    rows: 2,
    cols: 20,
  },
};


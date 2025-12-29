import type { Meta, StoryObj } from '@storybook/react';
import { Toolbar } from './Toolbar';

const meta: Meta<typeof Toolbar> = {
  title: 'Components/Toolbar',
  component: Toolbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'soft', 'outline'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toolbar>;

const defaultItems = [
  { id: 'bold', label: 'Bold', icon: <strong>B</strong> },
  { id: 'italic', label: 'Italic', icon: <em>I</em> },
  { id: 'underline', label: 'Underline', icon: <u>U</u> },
  { id: 'divider1', divider: true },
  { id: 'align-left', label: 'Left' },
  { id: 'align-center', label: 'Center' },
  { id: 'align-right', label: 'Right' },
];

export const Default: Story = {
  args: {
    items: defaultItems,
    variant: 'outline',
  },
};

export const Horizontal: Story = {
  args: {
    items: defaultItems,
    variant: 'outline',
    orientation: 'horizontal',
  },
};

export const Vertical: Story = {
  args: {
    items: defaultItems,
    variant: 'outline',
    orientation: 'vertical',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Toolbar items={defaultItems} variant="outline" />
      <Toolbar items={defaultItems} variant="soft" />
      <Toolbar items={defaultItems} variant="solid" />
    </div>
  ),
};

export const WithActiveState: Story = {
  render: () => {
    const items = [
      { id: 'bold', label: 'Bold', active: true },
      { id: 'italic', label: 'Italic' },
      { id: 'underline', label: 'Underline' },
    ];
    return <Toolbar items={items} variant="outline" />;
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Toolbar items={defaultItems} size="sm" />
      <Toolbar items={defaultItems} size="md" />
      <Toolbar items={defaultItems} size="lg" />
    </div>
  ),
};


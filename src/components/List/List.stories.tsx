import type { Meta, StoryObj } from '@storybook/react';
import { List } from './List';

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'dense', 'comfortable'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

const defaultItems = [
  {
    id: '1',
    primary: 'List Item 1',
    secondary: 'Secondary text for item 1',
  },
  {
    id: '2',
    primary: 'List Item 2',
    secondary: 'Secondary text for item 2',
  },
  {
    id: '3',
    primary: 'List Item 3',
    secondary: 'Secondary text for item 3',
  },
];

export const Default: Story = {
  args: {
    items: defaultItems,
    variant: 'default',
  },
};

export const Dense: Story = {
  args: {
    items: defaultItems,
    variant: 'dense',
  },
};

export const Comfortable: Story = {
  args: {
    items: defaultItems,
    variant: 'comfortable',
  },
};

export const WithAvatars: Story = {
  render: () => {
    const items = [
      {
        id: '1',
        primary: 'John Doe',
        secondary: 'john@example.com',
        avatar: <div style={{ width: '100%', height: '100%', backgroundColor: '#1976d2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>JD</div>,
      },
      {
        id: '2',
        primary: 'Jane Smith',
        secondary: 'jane@example.com',
        avatar: <div style={{ width: '100%', height: '100%', backgroundColor: '#d32f2f', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>JS</div>,
      },
    ];
    return <List items={items} />;
  },
};

export const WithIcons: Story = {
  render: () => {
    const items = [
      {
        id: '1',
        primary: 'Inbox',
        secondary: '5 unread messages',
        icon: <span>📥</span>,
      },
      {
        id: '2',
        primary: 'Sent',
        secondary: '12 sent messages',
        icon: <span>📤</span>,
      },
    ];
    return <List items={items} />;
  },
};

export const WithActions: Story = {
  render: () => {
    const items = [
      {
        id: '1',
        primary: 'Item with action',
        secondary: 'Click the button',
        action: <button style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>Action</button>,
      },
      {
        id: '2',
        primary: 'Another item',
        secondary: 'With action button',
        action: <button style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>Action</button>,
      },
    ];
    return <List items={items} />;
  },
};

export const Selected: Story = {
  render: () => {
    const items = [
      {
        id: '1',
        primary: 'Selected item',
        secondary: 'This item is selected',
        selected: true,
      },
      {
        id: '2',
        primary: 'Unselected item',
        secondary: 'This item is not selected',
      },
    ];
    return <List items={items} />;
  },
};

export const Disabled: Story = {
  render: () => {
    const items = [
      {
        id: '1',
        primary: 'Enabled item',
        secondary: 'This item is enabled',
      },
      {
        id: '2',
        primary: 'Disabled item',
        secondary: 'This item is disabled',
        disabled: true,
      },
    ];
    return <List items={items} />;
  },
};


import type { Meta, StoryObj } from '@storybook/react';
import { List } from './List';
import { Button } from '../Button/Button';

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
        action: <Button variant="bare" size="sm" onClick={(e) => { e.stopPropagation(); alert('Action clicked'); }}>Action</Button>,
      },
      {
        id: '2',
        primary: 'Another item',
        secondary: 'With action button',
        action: <Button variant="bare" size="sm" onClick={(e) => { e.stopPropagation(); alert('Action clicked'); }}>Action</Button>,
      },
      {
        id: '3',
        primary: 'Item with icon action',
        secondary: 'Icon button action',
        action: (
          <Button 
            variant="bare" 
            size="sm" 
            onClick={(e) => { e.stopPropagation(); alert('More options'); }}
            style={{ minWidth: 'auto', padding: '0.5rem' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </Button>
        ),
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


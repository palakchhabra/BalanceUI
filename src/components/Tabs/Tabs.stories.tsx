import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { useState } from 'react';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A tabbed interface component for organizing content into multiple panels. Users can switch between tabs to view different content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      control: 'object',
      description: 'Array of tab objects with id, label, and content',
    },
    value: {
      control: 'text',
      description: 'ID of the currently active tab',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when tab changes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const basicTabs = [
  { id: 'tab1', label: 'Overview', content: <div>Overview content goes here</div> },
  { id: 'tab2', label: 'Details', content: <div>Details content goes here</div> },
  { id: 'tab3', label: 'Settings', content: <div>Settings content goes here</div> },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('tab1');
    return <Tabs tabs={basicTabs} value={value} onChange={setValue} />;
  },
};

export const WithRichContent: Story = {
  render: () => {
    const [value, setValue] = useState('tab1');
    const richTabs = [
      {
        id: 'tab1',
        label: 'Dashboard',
        content: (
          <div>
            <h2>Dashboard</h2>
            <p>Welcome to your dashboard. Here you can see an overview of your account.</p>
            <ul>
              <li>Recent activity</li>
              <li>Quick stats</li>
              <li>Notifications</li>
            </ul>
          </div>
        ),
      },
      {
        id: 'tab2',
        label: 'Analytics',
        content: (
          <div>
            <h2>Analytics</h2>
            <p>View detailed analytics and reports for your account.</p>
            <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: '4px' }}>
              <p>Chart data would go here</p>
            </div>
          </div>
        ),
      },
      {
        id: 'tab3',
        label: 'Settings',
        content: (
          <div>
            <h2>Settings</h2>
            <form>
              <div style={{ marginBottom: '12px' }}>
                <label>Name:</label>
                <input type="text" style={{ marginLeft: '8px', padding: '4px' }} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label>Email:</label>
                <input type="email" style={{ marginLeft: '8px', padding: '4px' }} />
              </div>
              <button type="submit" style={{ padding: '8px 16px' }}>
                Save
              </button>
            </form>
          </div>
        ),
      },
    ];
    return <Tabs tabs={richTabs} value={value} onChange={setValue} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs with rich content including headings, paragraphs, lists, and forms.',
      },
    },
  },
};

export const ManyTabs: Story = {
  render: () => {
    const [value, setValue] = useState('tab1');
    const manyTabs = Array.from({ length: 8 }, (_, i) => ({
      id: `tab${i + 1}`,
      label: `Tab ${i + 1}`,
      content: <div>Content for Tab {i + 1}</div>,
    }));
    return <Tabs tabs={manyTabs} value={value} onChange={setValue} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs component with many tabs to test scrolling or wrapping behavior.',
      },
    },
  },
};

export const LongLabels: Story = {
  render: () => {
    const [value, setValue] = useState('tab1');
    const longLabelTabs = [
      {
        id: 'tab1',
        label: 'Very Long Tab Label That Might Wrap',
        content: <div>First tab content</div>,
      },
      {
        id: 'tab2',
        label: 'Another Extremely Long Tab Label',
        content: <div>Second tab content</div>,
      },
      {
        id: 'tab3',
        label: 'Short',
        content: <div>Third tab content</div>,
      },
    ];
    return <Tabs tabs={longLabelTabs} value={value} onChange={setValue} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs with long labels to test text wrapping and layout.',
      },
    },
  },
};

export const SingleTab: Story = {
  render: () => {
    const [value, setValue] = useState('tab1');
    const singleTab = [
      { id: 'tab1', label: 'Only Tab', content: <div>This is the only tab</div> },
    ];
    return <Tabs tabs={singleTab} value={value} onChange={setValue} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs component with a single tab.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => {
    const [value, setValue] = useState('tab1');
    const iconTabs = [
      { id: 'tab1', label: '🏠 Home', content: <div>Home content</div> },
      { id: 'tab2', label: '📊 Analytics', content: <div>Analytics content</div> },
      { id: 'tab3', label: '⚙️ Settings', content: <div>Settings content</div> },
    ];
    return <Tabs tabs={iconTabs} value={value} onChange={setValue} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs with emoji icons in labels.',
      },
    },
  },
};


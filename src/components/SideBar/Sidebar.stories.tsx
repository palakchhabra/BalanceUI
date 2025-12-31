import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';
import { SidebarItem } from './SidebarItem';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/SideBar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: 'number',
    },
    collapsed: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: (args) => (
    <div style={{ display: 'flex', height: '400px' }}>
      <Sidebar {...args}>
        <div style={{ padding: '16px' }}>
          <div className="balanceui-sidebar-header">Navigation</div>
        </div>
        <SidebarItem label="Home" icon="home" active />
        <SidebarItem label="Dashboard" icon="dashboard" />
        <SidebarItem label="Settings" icon="settings" />
        <SidebarItem label="Profile" icon="account_circle" />
      </Sidebar>
      <div style={{ flex: 1, padding: '20px', marginLeft: args.collapsed ? '64px' : `${args.width || 240}px` }}>
        <h2>Main Content</h2>
        <p>This is the main content area.</p>
      </div>
    </div>
  ),
  args: {
    width: 240,
    collapsed: false,
  },
};

export const Collapsed: Story = {
  render: (args) => (
    <div style={{ display: 'flex', height: '400px' }}>
      <Sidebar {...args}>
        <SidebarItem label="Home" icon="home" active />
        <SidebarItem label="Dashboard" icon="dashboard" />
        <SidebarItem label="Settings" icon="settings" />
        <SidebarItem label="Profile" icon="account_circle" />
      </Sidebar>
      <div style={{ flex: 1, padding: '20px', marginLeft: args.collapsed ? '64px' : `${args.width || 240}px` }}>
        <h2>Main Content</h2>
        <p>This sidebar is collapsed.</p>
      </div>
    </div>
  ),
  args: {
    width: 240,
    collapsed: true,
  },
};

export const WithSections: Story = {
  render: (args) => (
    <div style={{ display: 'flex', height: '500px' }}>
      <Sidebar {...args}>
        <div style={{ padding: '16px' }}>
          <div className="balanceui-sidebar-header">Main</div>
        </div>
        <SidebarItem label="Home" icon="home" active />
        <SidebarItem label="Dashboard" icon="dashboard" />
        <div className="balanceui-sidebar-divider" />
        <div style={{ padding: '16px' }}>
          <div className="balanceui-sidebar-header">Account</div>
        </div>
        <SidebarItem label="Settings" icon="settings" />
        <SidebarItem label="Profile" icon="account_circle" />
        <SidebarItem label="Logout" icon="logout" />
      </Sidebar>
      <div style={{ flex: 1, padding: '20px', marginLeft: args.collapsed ? '64px' : `${args.width || 240}px` }}>
        <h2>Main Content</h2>
        <p>Sidebar with sections and dividers.</p>
      </div>
    </div>
  ),
  args: {
    width: 240,
    collapsed: false,
  },
};

export const Narrow: Story = {
  render: (args) => (
    <div style={{ display: 'flex', height: '400px' }}>
      <Sidebar {...args}>
        <SidebarItem label="Home" icon="home" active />
        <SidebarItem label="Dashboard" icon="dashboard" />
        <SidebarItem label="Settings" icon="settings" />
      </Sidebar>
      <div style={{ flex: 1, padding: '20px', marginLeft: args.collapsed ? '64px' : `${args.width || 240}px` }}>
        <h2>Main Content</h2>
        <p>This sidebar has a narrow width.</p>
      </div>
    </div>
  ),
  args: {
    width: 200,
    collapsed: false,
  },
};

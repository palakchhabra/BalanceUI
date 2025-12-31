import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';
import { DrawerList } from './DrawerList';
import { Button } from '../Button/Button';
import { useState } from 'react';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
    },
    placement: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
    },
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'filled'],
    },
    scrollMode: {
      control: 'select',
      options: ['content', 'page'],
    },
    showHandle: {
      control: 'boolean',
    },
    lockScroll: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

const DrawerWrapper = (args: any) => {
  const [open, setOpen] = useState(args.open || false);
  return (
    <>
      <div style={{ padding: '20px' }}>
        <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      </div>
      <Drawer
        {...args}
        open={open}
        onClose={() => setOpen(false)}
      >
        {args.children}
      </Drawer>
    </>
  );
};

export const Left: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    open: false,
    placement: 'left',
    title: 'Left Drawer',
    children: (
      <div style={{ padding: '20px' }}>
        <p>This drawer slides in from the left.</p>
      </div>
    ),
  },
};

export const Right: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    open: false,
    placement: 'right',
    title: 'Right Drawer',
    children: (
      <div style={{ padding: '20px' }}>
        <p>This drawer slides in from the right.</p>
      </div>
    ),
  },
};

export const Top: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    open: false,
    placement: 'top',
    title: 'Top Drawer',
    children: (
      <div style={{ padding: '20px' }}>
        <p>This drawer slides in from the top.</p>
      </div>
    ),
  },
};

export const Bottom: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    open: false,
    placement: 'bottom',
    title: 'Bottom Drawer',
    children: (
      <div style={{ padding: '20px' }}>
        <p>This drawer slides in from the bottom.</p>
      </div>
    ),
  },
};

export const WithHandle: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    open: false,
    placement: 'bottom',
    showHandle: true,
    title: 'Drawer with Handle',
    children: (
      <div style={{ padding: '20px' }}>
        <p>This drawer has a visible handle.</p>
      </div>
    ),
  },
};

export const Elevated: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    open: false,
    placement: 'right',
    variant: 'elevated',
    title: 'Elevated Drawer',
    children: (
      <div style={{ padding: '20px' }}>
        <p>This drawer has an elevated variant.</p>
      </div>
    ),
  },
};

export const WithDrawerList: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <div style={{ padding: '20px' }}>
          <Button onClick={() => setOpen(true)}>Open Drawer with List</Button>
        </div>
        <Drawer
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          placement="left"
          title="Navigation Menu"
        >
          <DrawerList
            items={[
              { id: '1', label: 'Home', icon: 'home', divider: true },
              { id: '2', label: 'Inbox', icon: 'email', secondary: '5 unread', divider: true },
              { id: '3', label: 'Starred', icon: 'star', divider: true },
              { id: '4', label: 'Settings', icon: 'settings', divider: true },
              { id: '5', label: 'Help', icon: 'search' },
            ]}
            onItemClick={(item) => {
              console.log('Clicked:', item.label);
              setOpen(false);
            }}
          />
        </Drawer>
      </>
    );
  },
  args: {
    open: false,
  },
};


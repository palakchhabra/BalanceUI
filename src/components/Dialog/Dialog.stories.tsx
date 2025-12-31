import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from './Dialog';
import { useState } from 'react';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

const DialogWrapper = (args: any) => {
  const [open, setOpen] = useState(args.open || false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open Dialog</button>
      <Dialog
        {...args}
        open={open}
        onConfirm={() => {
          alert('Confirmed!');
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};

export const Default: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Confirm Action',
    open: false,
  },
};

export const DeleteConfirmation: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'Are you sure you want to delete this item?',
    open: false,
  },
};

export const SaveChanges: Story = {
  render: (args) => <DialogWrapper {...args} />,
  args: {
    title: 'You have unsaved changes. Do you want to save them?',
    open: false,
  },
};


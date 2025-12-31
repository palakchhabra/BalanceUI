import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from './Toast.context';
import { Button } from '../Button/Button';

const ToastDemo = () => {
  const toast = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Button onClick={() => toast.notify({ message: 'Success!', variant: 'success' })}>
        Show Success
      </Button>
      <Button onClick={() => toast.notify({ message: 'Error occurred', variant: 'error' })}>
        Show Error
      </Button>
      <Button onClick={() => toast.notify({ message: 'Information', variant: 'info' })}>
        Show Info
      </Button>
      <Button onClick={() => toast.notify({ message: 'Warning message', variant: 'warning' })}>
        Show Warning
      </Button>
      <Button onClick={() => toast.notify({ message: 'Default toast' })}>
        Show Default
      </Button>
      <Button onClick={() => toast.notify({ message: 'Long duration', duration: 5000 })}>
        Show Long Duration
      </Button>
    </div>
  );
};

const meta: Meta<typeof ToastDemo> = {
  title: 'Components/Toast',
  component: ToastDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ToastDemo>;

export const Default: Story = {
  render: () => <ToastDemo />,
};


import type { Meta, StoryObj } from '@storybook/react';
import { BottomSheet } from './BottomSheet';
import { useState } from 'react';
import { Button } from '../Button/Button';

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <div style={{ padding: '2rem' }}>
          <Button onClick={() => setOpen(true)}>Open Bottom Sheet</Button>
        </div>
        <BottomSheet open={open} onClose={() => setOpen(false)}>
          <div style={{ padding: '1rem' }}>
            <h2>Bottom Sheet Content</h2>
            <p>This is the default bottom sheet content.</p>
          </div>
        </BottomSheet>
      </>
    );
  },
};

export const WithTitle: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <div style={{ padding: '2rem' }}>
          <Button onClick={() => setOpen(true)}>Open with Title</Button>
        </div>
        <BottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="Bottom Sheet Title"
        >
          <div style={{ padding: '1rem' }}>
            <p>This bottom sheet has a title.</p>
          </div>
        </BottomSheet>
      </>
    );
  },
};

export const WithHandle: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <div style={{ padding: '2rem' }}>
          <Button onClick={() => setOpen(true)}>Open with Handle</Button>
        </div>
        <BottomSheet
          open={open}
          onClose={() => setOpen(false)}
          showHandle={true}
        >
          <div style={{ padding: '1rem' }}>
            <p>This bottom sheet has a drag handle.</p>
          </div>
        </BottomSheet>
      </>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'full'>('md');
    const [open, setOpen] = useState(false);
    return (
      <>
        <div style={{ padding: '2rem', display: 'flex', gap: '1rem' }}>
          <Button onClick={() => { setSize('sm'); setOpen(true); }}>Small</Button>
          <Button onClick={() => { setSize('md'); setOpen(true); }}>Medium</Button>
          <Button onClick={() => { setSize('lg'); setOpen(true); }}>Large</Button>
          <Button onClick={() => { setSize('full'); setOpen(true); }}>Full</Button>
        </div>
        <BottomSheet
          open={open}
          onClose={() => setOpen(false)}
          size={size}
          title={`${size.toUpperCase()} Bottom Sheet`}
        >
          <div style={{ padding: '1rem' }}>
            <p>This is a {size} bottom sheet.</p>
          </div>
        </BottomSheet>
      </>
    );
  },
};

export const LongContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <div style={{ padding: '2rem' }}>
          <Button onClick={() => setOpen(true)}>Open Long Content</Button>
        </div>
        <BottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="Long Content"
        >
          <div style={{ padding: '1rem' }}>
            {Array.from({ length: 50 }).map((_, i) => (
              <p key={i}>This is line {i + 1} of content.</p>
            ))}
          </div>
        </BottomSheet>
      </>
    );
  },
};


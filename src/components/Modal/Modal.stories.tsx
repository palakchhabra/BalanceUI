import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';
import { useState } from 'react';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    closeOnOverlayClick: {
      control: 'boolean',
    },
    closeOnEscape: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalWrapper = (args: any) => {
  const [open, setOpen] = useState(args.open || false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        {...args}
        open={open}
        onClose={() => setOpen(false)}
      >
        {args.children}
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    open: false,
    children: (
      <div style={{ padding: '20px', maxWidth: '400px' }}>
        <h2 style={{ marginTop: 0 }}>Modal Title</h2>
        <p>This is the modal content. You can put anything here.</p>
        <Button onClick={() => {}}>Action</Button>
      </div>
    ),
  },
};

export const WithCloseOnOverlay: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    open: false,
    closeOnOverlayClick: true,
    children: (
      <div style={{ padding: '20px', maxWidth: '400px' }}>
        <h2 style={{ marginTop: 0 }}>Click outside to close</h2>
        <p>This modal closes when you click the overlay.</p>
      </div>
    ),
  },
};

export const WithCloseOnEscape: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    open: false,
    closeOnEscape: true,
    children: (
      <div style={{ padding: '20px', maxWidth: '400px' }}>
        <h2 style={{ marginTop: 0 }}>Press ESC to close</h2>
        <p>This modal closes when you press the Escape key.</p>
      </div>
    ),
  },
};

export const LargeContent: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    open: false,
    children: (
      <div style={{ padding: '20px', maxWidth: '600px' }}>
        <h2 style={{ marginTop: 0 }}>Large Modal</h2>
        <p>This modal has more content to demonstrate scrolling behavior.</p>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>Paragraph {i + 1} of content</p>
        ))}
      </div>
    ),
  },
};

export const AllSizes: Story = {
  render: () => {
    const [openSm, setOpenSm] = useState(false);
    const [openMd, setOpenMd] = useState(false);
    const [openLg, setOpenLg] = useState(false);
    const [openXl, setOpenXl] = useState(false);
    const [openFull, setOpenFull] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button onClick={() => setOpenSm(true)}>Small (400px)</Button>
          <Button onClick={() => setOpenMd(true)}>Medium (600px)</Button>
          <Button onClick={() => setOpenLg(true)}>Large (900px)</Button>
          <Button onClick={() => setOpenXl(true)}>Extra Large (1200px)</Button>
          <Button onClick={() => setOpenFull(true)}>Full (95vw)</Button>
        </div>

        <Modal open={openSm} onClose={() => setOpenSm(false)} size="sm">
          <div style={{ padding: '1.5rem' }}>
            <h2 style={{ marginTop: 0 }}>Small Modal</h2>
            <p>This is a small modal with max-width of 400px.</p>
            <Button onClick={() => setOpenSm(false)}>Close</Button>
          </div>
        </Modal>

        <Modal open={openMd} onClose={() => setOpenMd(false)} size="md">
          <div style={{ padding: '1.5rem' }}>
            <h2 style={{ marginTop: 0 }}>Medium Modal</h2>
            <p>This is a medium modal with max-width of 600px (default).</p>
            <Button onClick={() => setOpenMd(false)}>Close</Button>
          </div>
        </Modal>

        <Modal open={openLg} onClose={() => setOpenLg(false)} size="lg">
          <div style={{ padding: '1.5rem' }}>
            <h2 style={{ marginTop: 0 }}>Large Modal</h2>
            <p>This is a large modal with max-width of 900px.</p>
            <Button onClick={() => setOpenLg(false)}>Close</Button>
          </div>
        </Modal>

        <Modal open={openXl} onClose={() => setOpenXl(false)} size="xl">
          <div style={{ padding: '1.5rem' }}>
            <h2 style={{ marginTop: 0 }}>Extra Large Modal</h2>
            <p>This is an extra large modal with max-width of 1200px.</p>
            <Button onClick={() => setOpenXl(false)}>Close</Button>
          </div>
        </Modal>

        <Modal open={openFull} onClose={() => setOpenFull(false)} size="full">
          <div style={{ padding: '1.5rem' }}>
            <h2 style={{ marginTop: 0 }}>Full Width Modal</h2>
            <p>This is a full-width modal that takes up 95% of the viewport width.</p>
            <Button onClick={() => setOpenFull(false)}>Close</Button>
          </div>
        </Modal>
      </div>
    );
  },
};


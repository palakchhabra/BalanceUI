import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'soft', 'danger', 'success', 'warning'],
    },
    type: {
      control: 'select',
      options: ['linear', 'circular'],
    },
    size: {
      control: 'select',
      options: ['thin', 'md', 'thick'],
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    indeterminate: {
      control: 'boolean',
    },
    showValue: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 50,
    variant: 'solid',
  },
};

export const Linear: Story = {
  args: {
    value: 60,
    variant: 'solid',
    type: 'linear',
  },
};

export const LinearThin: Story = {
  args: {
    value: 40,
    variant: 'solid',
    type: 'linear',
    size: 'thin',
  },
};

export const LinearThick: Story = {
  args: {
    value: 80,
    variant: 'solid',
    type: 'linear',
    size: 'thick',
  },
};

export const Circular: Story = {
  args: {
    value: 75,
    variant: 'solid',
    type: 'circular',
    showValue: true,
  },
};

export const WithValue: Story = {
  args: {
    value: 65,
    variant: 'solid',
    showValue: true,
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    variant: 'solid',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <div>
        <div style={{ marginBottom: '8px' }}>Solid (30%)</div>
        <Progress value={30} variant="solid" />
      </div>
      <div>
        <div style={{ marginBottom: '8px' }}>Success (60%)</div>
        <Progress value={60} variant="success" />
      </div>
      <div>
        <div style={{ marginBottom: '8px' }}>Warning (80%)</div>
        <Progress value={80} variant="warning" />
      </div>
      <div>
        <div style={{ marginBottom: '8px' }}>Danger (90%)</div>
        <Progress value={90} variant="danger" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <div>
        <div style={{ marginBottom: '8px' }}>Thin (50%)</div>
        <Progress value={50} variant="solid" size="thin" />
      </div>
      <div>
        <div style={{ marginBottom: '8px' }}>Medium (50%)</div>
        <Progress value={50} variant="solid" size="md" />
      </div>
      <div>
        <div style={{ marginBottom: '8px' }}>Thick (50%)</div>
        <Progress value={50} variant="solid" size="thick" />
      </div>
    </div>
  ),
};

export const CircularVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Progress value={25} type="circular" variant="solid" showValue />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>Solid</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Progress value={50} type="circular" variant="success" showValue />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>Success</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Progress value={75} type="circular" variant="warning" showValue />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>Warning</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Progress value={90} type="circular" variant="danger" showValue />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>Danger</div>
      </div>
    </div>
  ),
};


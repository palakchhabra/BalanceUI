import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'home',
    size: 'md',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Icon name="home" size="xs" />
      <Icon name="home" size="sm" />
      <Icon name="home" size="md" />
      <Icon name="home" size="lg" />
      <Icon name="home" size="xl" />
    </div>
  ),
};

export const AllIcons: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', padding: '2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <Icon name="home" size="lg" />
        <div style={{ marginTop: '8px', fontSize: '0.75rem' }}>Home</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="menu" size="lg" />
        <div style={{ marginTop: '8px', fontSize: '0.75rem' }}>Menu</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="close" size="lg" />
        <div style={{ marginTop: '8px', fontSize: '0.75rem' }}>Close</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="check" size="lg" />
        <div style={{ marginTop: '8px', fontSize: '0.75rem' }}>Check</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="add" size="lg" />
        <div style={{ marginTop: '8px', fontSize: '0.75rem' }}>Add</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="delete" size="lg" />
        <div style={{ marginTop: '8px', fontSize: '0.75rem' }}>Delete</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="edit" size="lg" />
        <div style={{ marginTop: '8px', fontSize: '0.75rem' }}>Edit</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="arrow_back" size="lg" />
        <div style={{ marginTop: '8px', fontSize: '0.75rem' }}>Arrow Back</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="arrow_forward" size="lg" />
        <div style={{ marginTop: '8px', fontSize: '0.75rem' }}>Arrow Forward</div>
      </div>
    </div>
  ),
};

export const CustomColor: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Icon name="home" size="lg" color="#1976d2" />
      <Icon name="home" size="lg" color="#d32f2f" />
      <Icon name="home" size="lg" color="#2e7d32" />
      <Icon name="home" size="lg" color="#ed6c02" />
    </div>
  ),
};

export const CustomSVG: Story = {
  render: () => (
    <Icon size="lg">
      <circle cx="12" cy="12" r="10" fill="currentColor" />
    </Icon>
  ),
};


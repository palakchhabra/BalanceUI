import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
    },
    elevation: {
      control: { type: 'number', min: 0, max: 8, step: 1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    elevation: 1,
    children: (
      <div style={{ padding: '16px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 500 }}>
          Elevated Card
        </h3>
        <p style={{ margin: 0, color: 'var(--bu-fg-secondary)', fontSize: '14px' }}>
          This is an elevated card with shadow.
        </p>
      </div>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <div style={{ padding: '16px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 500 }}>
          Outlined Card
        </h3>
        <p style={{ margin: 0, color: 'var(--bu-fg-secondary)', fontSize: '14px' }}>
          This is an outlined card with border.
        </p>
      </div>
    ),
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    children: (
      <div style={{ padding: '16px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 500 }}>
          Filled Card
        </h3>
        <p style={{ margin: 0, color: 'var(--bu-fg-secondary)', fontSize: '14px' }}>
          This is a filled card with background.
        </p>
      </div>
    ),
  },
};

export const ElevationLevels: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      {[0, 1, 2, 4, 6, 8].map((elevation) => (
        <Card key={elevation} variant="elevated" elevation={elevation as any}>
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <div style={{ fontWeight: 500, marginBottom: '4px' }}>
              Elevation {elevation}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--bu-fg-secondary)' }}>
              Shadow level
            </div>
          </div>
        </Card>
      ))}
    </div>
  ),
};

export const Clickable: Story = {
  args: {
    variant: 'elevated',
    elevation: 4,
    onClick: () => alert('Card clicked!'),
    children: (
      <div style={{ padding: '16px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 500 }}>
          Clickable Card
        </h3>
        <p style={{ margin: 0, color: 'var(--bu-fg-secondary)', fontSize: '14px' }}>
          Click me! This card has an onClick handler.
        </p>
      </div>
    ),
  },
};

export const WithImage: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', maxWidth: '900px' }}>
      <Card variant="elevated" elevation={2}>
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
          alt="Mountain landscape"
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            display: 'block',
            borderRadius: '12px 12px 0 0',
          }}
        />
        <div style={{ padding: '16px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 500 }}>
            Mountain Landscape
          </h3>
          <p style={{ margin: 0, color: 'var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))', fontSize: '14px', lineHeight: 1.6 }}>
            Beautiful mountain scenery with clear skies and natural beauty.
          </p>
        </div>
      </Card>

      <Card variant="outlined" hoverable>
        <img
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=200&fit=crop"
          alt="Ocean view"
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            display: 'block',
            borderRadius: '12px 12px 0 0',
          }}
        />
        <div style={{ padding: '16px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 500 }}>
            Ocean View
          </h3>
          <p style={{ margin: 0, color: 'var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))', fontSize: '14px', lineHeight: 1.6 }}>
            Stunning ocean view with waves crashing against the shore.
          </p>
        </div>
      </Card>

      <Card variant="elevated" elevation={3} onClick={() => alert('Card clicked!')}>
        <img
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=200&fit=crop"
          alt="Forest path"
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            display: 'block',
            borderRadius: '12px 12px 0 0',
          }}
        />
        <div style={{ padding: '16px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 500 }}>
            Forest Path
          </h3>
          <p style={{ margin: 0, color: 'var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))', fontSize: '14px', lineHeight: 1.6 }}>
            A peaceful path through a lush green forest. Click to interact!
          </p>
        </div>
      </Card>
    </div>
  ),
};

export const OutlinedHover: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <Card variant="outlined">
        <div style={{ padding: '16px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 500 }}>
            Outlined Card (No Border by Default)
          </h3>
          <p style={{ margin: 0, color: 'var(--bu-fg-secondary)', fontSize: '14px' }}>
            Hover over this card to see the outline appear.
          </p>
        </div>
      </Card>
      
      <Card variant="outlined" hoverable>
        <div style={{ padding: '16px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 500 }}>
            Outlined Card (Hoverable)
          </h3>
          <p style={{ margin: 0, color: 'var(--bu-fg-secondary)', fontSize: '14px' }}>
            This card shows outline on hover with hover effects.
          </p>
        </div>
      </Card>
    </div>
  ),
};


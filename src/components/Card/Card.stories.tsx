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
  args: {
    variant: 'elevated',
    elevation: 2,
    children: (
      <>
        <div
          style={{
            width: '100%',
            height: '200px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '8px 8px 0 0',
          }}
        />
        <div style={{ padding: '16px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 500 }}>
            Card with Image
          </h3>
          <p style={{ margin: 0, color: 'var(--bu-fg-secondary)', fontSize: '14px' }}>
            This card includes an image header.
          </p>
        </div>
      </>
    ),
  },
};


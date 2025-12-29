import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Toggle checked={checked} onChange={setChecked} />;
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    onChange: () => {},
  },
};

export const Unchecked: Story = {
  args: {
    checked: false,
    onChange: () => {},
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Toggle checked={false} onChange={() => {}} disabled />
      <Toggle checked={true} onChange={() => {}} disabled />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(true);
    const [checked3, setChecked3] = useState(false);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Toggle checked={checked1} onChange={setChecked1} />
          <span>Toggle 1: {checked1 ? 'ON' : 'OFF'}</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Toggle checked={checked2} onChange={setChecked2} />
          <span>Toggle 2: {checked2 ? 'ON' : 'OFF'}</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Toggle checked={checked3} onChange={setChecked3} />
          <span>Toggle 3: {checked3 ? 'ON' : 'OFF'}</span>
        </div>
      </div>
    );
  },
};


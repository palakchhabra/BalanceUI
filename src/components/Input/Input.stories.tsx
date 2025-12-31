import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    placeholder: 'Outlined variant',
    label: 'Outlined',
    floatingLabel: true,
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    placeholder: 'Filled variant',
    label: 'Filled',
    floatingLabel: true,
  },
};

export const Standard: Story = {
  args: {
    variant: 'standard',
    placeholder: 'Standard variant',
    label: 'Standard',
    floatingLabel: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    value: 'Sample text',
    placeholder: 'Enter text...',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter email address',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter number',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
      <div>
        <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Outlined (Default)</h4>
        <Input variant="outlined" label="Outlined" floatingLabel placeholder="Enter text" />
      </div>
      <div>
        <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Filled</h4>
        <Input variant="filled" label="Filled" floatingLabel placeholder="Enter text" />
      </div>
      <div>
        <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Standard</h4>
        <Input variant="standard" label="Standard" floatingLabel placeholder="Enter text" />
      </div>
    </div>
  ),
};

export const FloatingLabel: Story = {
  args: {
    label: 'Email',
    floatingLabel: true,
    type: 'email',
    placeholder: 'Enter your email',
  },
};

export const FloatingLabelWithValue: Story = {
  args: {
    label: 'Name',
    floatingLabel: true,
    value: 'John Doe',
    placeholder: 'Enter your name',
  },
};

export const FloatingLabelEmpty: Story = {
  args: {
    label: 'Search',
    floatingLabel: true,
    placeholder: 'Search...',
  },
};

export const WithStartAdornment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input
        label="Search"
        floatingLabel
        startAdornment={<Icon name="search" />}
        placeholder="Search..."
      />
      <Input
        label="Price"
        floatingLabel
        type="number"
        startAdornment={<span>$</span>}
        placeholder="0.00"
      />
    </div>
  ),
};

export const WithEndAdornment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input
        label="Website"
        floatingLabel
        type="url"
        startAdornment={<Icon name="link" />}
        endAdornment={<Icon name="check" />}
        placeholder="https://"
      />
    </div>
  ),
};

export const WithAdornments: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input
        label="Search"
        floatingLabel
        startAdornment={<Icon name="search" />}
        placeholder="Search..."
      />
      <Input
        label="Price"
        floatingLabel
        type="number"
        startAdornment={<span>$</span>}
        placeholder="0.00"
      />
      <Input
        label="Website"
        floatingLabel
        type="url"
        startAdornment={<Icon name="link" />}
        endAdornment={<Icon name="check" />}
        placeholder="https://"
      />
    </div>
  ),
};

export const ErrorState: Story = {
  args: {
    label: 'Email',
    floatingLabel: true,
    type: 'email',
    error: 'Email is required',
    placeholder: 'Enter your email',
  },
};

export const ErrorStateWithValue: Story = {
  args: {
    label: 'Email',
    floatingLabel: true,
    type: 'email',
    error: 'Please enter a valid email address',
    value: 'invalid-email',
    placeholder: 'Enter your email',
  },
};

export const InputTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input
        label="Email"
        floatingLabel
        type="email"
        helperText="We'll never share your email"
      />
      <Input
        label="Password"
        floatingLabel
        type="password"
      />
      <Input
        label="Number"
        floatingLabel
        type="number"
        helperText="Enter a number"
      />
      <Input
        label="Phone"
        floatingLabel
        type="tel"
        placeholder="+1 (555) 000-0000"
      />
      <Input
        label="URI"
        floatingLabel
        type="url"
        placeholder="https://example.com"
      />
    </div>
  ),
};


import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies variant styles', () => {
    const { container } = render(<Input variant="soft" />);
    const input = container.querySelector('input');
    expect(input).toHaveClass('balanceui-input');
  });

  it('handles focus and blur events', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    expect(input).toHaveClass('balanceui-input-focused');
    fireEvent.blur(input);
    expect(input).not.toHaveClass('balanceui-input-focused');
  });

  it('disables input when disabled prop is true', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('applies custom className', () => {
    const { container } = render(<Input className="custom-class" />);
    const input = container.querySelector('input');
    expect(input).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Input ref={ref as any} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('handles all input types', () => {
    const { rerender, container } = render(<Input type="email" />);
    let input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');

    rerender(<Input type="password" />);
    input = container.querySelector('input[type="password"]') as HTMLInputElement;
    expect(input).toHaveAttribute('type', 'password');
  });
});


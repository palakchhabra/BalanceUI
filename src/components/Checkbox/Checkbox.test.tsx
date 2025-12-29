import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders correctly', () => {
    render(<Checkbox label="Checkbox" />);
    expect(screen.getByText('Checkbox')).toBeInTheDocument();
  });

  it('handles click', () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Checkbox" onChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('handles checked state', () => {
    render(<Checkbox label="Checkbox" checked />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
  });

  it('handles unchecked state', () => {
    render(<Checkbox label="Checkbox" checked={false} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });

  it('handles indeterminate state', () => {
    render(<Checkbox label="Checkbox" indeterminate />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
  });

  it('handles disabled state', () => {
    render(<Checkbox label="Checkbox" disabled />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not call onChange when disabled', () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Checkbox" disabled onChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('handles keyboard navigation', () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Checkbox" onChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.keyDown(checkbox, { key: ' ' });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies different sizes', () => {
    const { rerender } = render(<Checkbox label="Checkbox" size="sm" />);
    let checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    
    rerender(<Checkbox label="Checkbox" size="lg" />);
    checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<Checkbox label="Checkbox" error="Error message" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });
});


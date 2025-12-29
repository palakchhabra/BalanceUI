import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('renders correctly', () => {
    render(<Toggle checked={false} onChange={() => {}} />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toBeInTheDocument();
  });

  it('handles toggle', () => {
    const handleChange = vi.fn();
    render(<Toggle checked={false} onChange={handleChange} />);
    
    const toggle = screen.getByRole('switch');
    fireEvent.click(toggle);
    
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('handles checked state', () => {
    const handleChange = vi.fn();
        render(<Toggle checked={true} onChange={handleChange} />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-checked', 'true');
  });

  it('handles disabled state', () => {
    const handleChange = vi.fn();
    render(<Toggle checked={false} disabled onChange={handleChange} />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not call onChange when disabled', () => {
    const handleChange = vi.fn();
    render(<Toggle checked={false} onChange={handleChange} disabled={true} />);
    const toggle = screen.getByRole('switch');
    fireEvent.click(toggle);
    
    expect(handleChange).not.toHaveBeenCalled();
  });
});

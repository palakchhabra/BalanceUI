import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ButtonToggle } from './ButtonToggle';

const defaultOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

describe('ButtonToggle', () => {
  it('renders correctly', () => {
    render(<ButtonToggle options={defaultOptions} />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('handles single selection', () => {
    const handleChange = vi.fn();
    render(<ButtonToggle options={defaultOptions} onChange={handleChange} />);
    
    const option1 = screen.getByText('Option 1');
    fireEvent.click(option1);
    
    expect(handleChange).toHaveBeenCalledWith('option1');
  });

  it('handles multiple selection', () => {
    const handleChange = vi.fn();
    render(<ButtonToggle options={defaultOptions} multiple onChange={handleChange} />);
    
    const option1 = screen.getByText('Option 1');
    const option2 = screen.getByText('Option 2');
    
    fireEvent.click(option1);
    expect(handleChange).toHaveBeenCalledWith(['option1']);
    
    fireEvent.click(option2);
    expect(handleChange).toHaveBeenCalledWith(['option1', 'option2']);
  });

  it('handles disabled state', () => {
    const handleChange = vi.fn();
    render(<ButtonToggle options={defaultOptions} disabled onChange={handleChange} />);
    
    const option1 = screen.getByText('Option 1');
    fireEvent.click(option1);
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('handles disabled option', () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2', disabled: true },
    ];
    const handleChange = vi.fn();
    render(<ButtonToggle options={options} onChange={handleChange} />);
    
    const option2 = screen.getByText('Option 2');
    fireEvent.click(option2);
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('shows selected state', () => {
    render(<ButtonToggle options={defaultOptions} value="option1" />);
    const option1 = screen.getByText('Option 1');
    expect(option1).toHaveAttribute('aria-pressed', 'true');
  });
});


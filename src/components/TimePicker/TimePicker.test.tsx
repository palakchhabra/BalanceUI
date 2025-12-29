import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TimePicker } from './TimePicker';

describe('TimePicker', () => {
  it('renders correctly', () => {
    render(<TimePicker placeholder="Select time" />);
    const input = screen.getByText('Select time');
    expect(input).toBeInTheDocument();
  });

  it('opens dropdown on click', async () => {
    render(<TimePicker placeholder="Select time" />);
    const input = screen.getByText('Select time');
    fireEvent.click(input);
    
    await waitFor(() => {
      expect(document.querySelector('.balanceui-timepicker-dropdown')).toBeInTheDocument();
    });
  });

  it('handles time selection', async () => {
    const handleChange = vi.fn();
    render(<TimePicker onChange={handleChange} placeholder="Select time" />);
    
    const input = screen.getByText('Select time');
    fireEvent.click(input);
    
    await waitFor(() => {
      const timeOptions = document.querySelectorAll('.balanceui-timepicker-item');
      if (timeOptions.length > 0) {
        fireEvent.click(timeOptions[0] as Element);
      }
    });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('displays selected time', () => {
    const time = new Date();
    time.setHours(14, 30);
    render(<TimePicker value={time} format="24h" />);
    expect(screen.getByText(/14:30/)).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    render(<TimePicker disabled placeholder="Select time" />);
    const input = screen.getByText('Select time');
    expect(input).toHaveAttribute('aria-disabled', 'true');
  });

  it('displays label when provided', () => {
    render(<TimePicker label="Appointment Time" />);
    expect(screen.getByText('Appointment Time')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<TimePicker error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('respects step prop', async () => {
    render(<TimePicker step={30} placeholder="Select time" />);
    const input = screen.getByText('Select time');
    fireEvent.click(input);
    
    await waitFor(() => {
      const timeOptions = document.querySelectorAll('.balanceui-timepicker-item');
      // Should have fewer options with 30-minute step (48 = 24 * 2)
      expect(timeOptions.length).toBeLessThan(96); // 96 = 24 * 4 (15-min intervals)
      expect(timeOptions.length).toBe(48); // 48 = 24 * 2 (30-min intervals)
    });
  });
});


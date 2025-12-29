import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
  beforeEach(() => {
    cleanup();
  });

  afterEach(() => {
    cleanup();
  });

  describe('Rendering', () => {
    it('renders correctly with placeholder', () => {
      render(<DatePicker placeholder="Select date" />);
      const input = screen.getByText('Select date');
      expect(input).toBeInTheDocument();
    });

    it('renders with default placeholder when none provided', () => {
      render(<DatePicker />);
      const input = screen.getByText('Select date');
      expect(input).toBeInTheDocument();
    });

    it('displays label when provided', () => {
      render(<DatePicker label="Birth Date" />);
      expect(screen.getByText('Birth Date')).toBeInTheDocument();
    });

    it('displays selected date value', () => {
      const date = new Date(2024, 0, 15);
      render(<DatePicker value={date} />);
      // Date format is locale-dependent, so check for parts of the date
      const displayText = screen.getByText(/15/);
      expect(displayText).toBeInTheDocument();
    });

    it('displays defaultValue when provided', () => {
      const date = new Date(2024, 5, 20);
      render(<DatePicker defaultValue={date} />);
      const displayText = screen.getByText(/20/);
      expect(displayText).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('opens calendar on click', async () => {
      render(<DatePicker placeholder="Select date" />);
      const input = screen.getByText('Select date');
      fireEvent.click(input);
      
      await waitFor(() => {
        const calendar = document.querySelector('.balanceui-datepicker-calendar');
        expect(calendar).toBeInTheDocument();
      });
    });

    it('closes calendar when clicking outside', async () => {
      render(
        <div>
          <DatePicker placeholder="Select date" />
          <div data-testid="outside">Outside</div>
        </div>
      );
      
      const input = screen.getByText('Select date');
      fireEvent.click(input);
      
      await waitFor(() => {
        expect(document.querySelector('.balanceui-datepicker-calendar')).toBeInTheDocument();
      });

      const outside = screen.getByTestId('outside');
      fireEvent.mouseDown(outside);
      
      await waitFor(() => {
        expect(document.querySelector('.balanceui-datepicker-calendar')).not.toBeInTheDocument();
      });
    });

    it('handles single date selection', async () => {
      const handleChange = vi.fn();
      render(<DatePicker onChange={handleChange} placeholder="Select date" />);
      
      const input = screen.getByText('Select date');
      fireEvent.click(input);
      
      await waitFor(() => {
        const dayCells = document.querySelectorAll('.balanceui-datepicker-day-cell:not(.balanceui-datepicker-day-disabled)');
        if (dayCells.length > 0) {
          fireEvent.click(dayCells[0] as Element);
        }
      });
      
      await waitFor(() => {
        expect(handleChange).toHaveBeenCalled();
      });
    });

    it('handles date range selection', async () => {
      const handleRangeChange = vi.fn();
      render(<DatePicker mode="range" onRangeChange={handleRangeChange} placeholder="Select date" />);
      
      const input = screen.getByText('Select date');
      fireEvent.click(input);
      
      await waitFor(() => {
        const dayCells = document.querySelectorAll('.balanceui-datepicker-day-cell:not(.balanceui-datepicker-day-disabled)');
        if (dayCells.length >= 2) {
          fireEvent.click(dayCells[0] as Element);
          fireEvent.click(dayCells[1] as Element);
        }
      });
      
      await waitFor(() => {
        expect(handleRangeChange).toHaveBeenCalled();
      });
    });

    it('navigates to previous month', async () => {
      render(<DatePicker placeholder="Select date" />);
      const input = screen.getByText('Select date');
      fireEvent.click(input);
      
      await waitFor(() => {
        const prevButton = document.querySelector('.balanceui-datepicker-prev');
        if (prevButton) {
          fireEvent.click(prevButton);
        }
      });
    });

    it('navigates to next month', async () => {
      render(<DatePicker placeholder="Select date" />);
      const input = screen.getByText('Select date');
      fireEvent.click(input);
      
      await waitFor(() => {
        const nextButton = document.querySelector('.balanceui-datepicker-next');
        if (nextButton) {
          fireEvent.click(nextButton);
        }
      });
    });
  });

  describe('Variants', () => {
    it('applies outline variant by default', () => {
      const { container } = render(<DatePicker placeholder="Select date" />);
      const picker = container.querySelector('.balanceui-datepicker-input');
      expect(picker).toBeInTheDocument();
      // Variants are applied via inline styles, not classes
      expect(picker).toHaveStyle({ borderColor: expect.stringContaining('rgba') });
    });

    it('applies solid variant', () => {
      const { container } = render(<DatePicker variant="solid" placeholder="Select date" />);
      const picker = container.querySelector('.balanceui-datepicker-input');
      expect(picker).toBeInTheDocument();
      // Solid variant has background color
      expect(picker).toHaveStyle({ backgroundColor: expect.stringContaining('rgba') });
    });

    it('applies soft variant', () => {
      const { container } = render(<DatePicker variant="soft" placeholder="Select date" />);
      const picker = container.querySelector('.balanceui-datepicker-input');
      expect(picker).toBeInTheDocument();
      // Soft variant has background color
      expect(picker).toHaveStyle({ backgroundColor: expect.stringContaining('rgba') });
    });
  });

  describe('States', () => {
    it('handles disabled state', () => {
      render(<DatePicker disabled placeholder="Select date" />);
      const input = screen.getByText('Select date');
      expect(input).toHaveAttribute('aria-disabled', 'true');
    });

    it('does not open calendar when disabled', async () => {
      render(<DatePicker disabled placeholder="Select date" />);
      const input = screen.getByText('Select date');
      fireEvent.click(input);
      
      await waitFor(() => {
        const calendar = document.querySelector('.balanceui-datepicker-calendar');
        expect(calendar).not.toBeInTheDocument();
      });
    });

    it('displays error message', () => {
      render(<DatePicker error="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('displays helper text', () => {
      render(<DatePicker helperText="Please select a valid date" />);
      expect(screen.getByText('Please select a valid date')).toBeInTheDocument();
    });
  });

  describe('Date Restrictions', () => {
    it('respects minDate restriction', async () => {
      const minDate = new Date();
      minDate.setDate(minDate.getDate() + 1);
      render(<DatePicker minDate={minDate} placeholder="Select date" />);
      
      const input = screen.getByText('Select date');
      fireEvent.click(input);
      
      await waitFor(() => {
        const disabledCells = document.querySelectorAll('[aria-disabled="true"]');
        expect(disabledCells.length).toBeGreaterThan(0);
      });
    });

    it('respects maxDate restriction', async () => {
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() - 1);
      render(<DatePicker maxDate={maxDate} placeholder="Select date" />);
      
      const input = screen.getByText('Select date');
      fireEvent.click(input);
      
      await waitFor(() => {
        const disabledCells = document.querySelectorAll('[aria-disabled="true"]');
        expect(disabledCells.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Date Formatting', () => {
    it('formats date with custom format', () => {
      const date = new Date(2024, 0, 15);
      render(<DatePicker value={date} format="YYYY-MM-DD" />);
      const displayText = screen.getByText(/2024-01-15/);
      expect(displayText).toBeInTheDocument();
    });

    it('uses default locale format when no format provided', () => {
      const date = new Date(2024, 0, 15);
      render(<DatePicker value={date} />);
      // Should display date in locale format
      expect(screen.getByText(/15/)).toBeInTheDocument();
    });
  });

  describe('Modes', () => {
    it('renders in single mode by default', () => {
      const { container } = render(<DatePicker placeholder="Select date" />);
      const picker = container.querySelector('.balanceui-datepicker-container');
      expect(picker).toBeInTheDocument();
    });

    it('renders in range mode', () => {
      const { container } = render(<DatePicker mode="range" placeholder="Select date" />);
      const picker = container.querySelector('.balanceui-datepicker-container');
      expect(picker).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes when disabled', () => {
      render(<DatePicker disabled placeholder="Select date" />);
      const input = screen.getByText('Select date');
      expect(input).toHaveAttribute('aria-disabled', 'true');
    });

    it('supports custom className', () => {
      const { container } = render(<DatePicker className="custom-class" placeholder="Select date" />);
      const picker = container.querySelector('.custom-class');
      expect(picker).toBeInTheDocument();
    });

    it('supports custom style', () => {
      const { container } = render(<DatePicker style={{ width: '300px' }} placeholder="Select date" />);
      const picker = container.querySelector('.balanceui-datepicker-input') as HTMLElement;
      expect(picker.style.width).toBe('300px');
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as controlled component', () => {
      const date = new Date(2024, 0, 15);
      const { rerender } = render(<DatePicker value={date} />);
      expect(screen.getByText(/15/)).toBeInTheDocument();
      
      const newDate = new Date(2024, 1, 20);
      rerender(<DatePicker value={newDate} />);
      expect(screen.getByText(/20/)).toBeInTheDocument();
    });

    it('works as uncontrolled component', () => {
      const date = new Date(2024, 0, 15);
      render(<DatePicker defaultValue={date} />);
      expect(screen.getByText(/15/)).toBeInTheDocument();
    });
  });
});


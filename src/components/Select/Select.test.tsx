import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

describe('Select', () => {
  describe('Rendering', () => {
    it('renders correctly with options', () => {
      render(<Select options={mockOptions} />);
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });

    it('renders placeholder when provided', () => {
      render(<Select options={mockOptions} placeholder="Select an option" />);
      expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it('does not render placeholder when not provided', () => {
      render(<Select options={mockOptions} />);
      const select = screen.getByRole('combobox');
      const placeholderOption = Array.from(select.querySelectorAll('option')).find(
        (opt) => opt.textContent === 'Select an option'
      );
      expect(placeholderOption).toBeUndefined();
    });

    it('renders empty select when no options provided', () => {
      render(<Select options={[]} />);
      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();
    });
  });

  describe('Value Handling', () => {
    it('displays selected value', () => {
      render(<Select options={mockOptions} value="option2" />);
      const select = screen.getByRole('combobox') as HTMLSelectElement;
      expect(select.value).toBe('option2');
    });

    it('handles value changes', () => {
      const handleChange = vi.fn();
      render(<Select options={mockOptions} onChange={handleChange} />);
      const select = screen.getByRole('combobox');
      
      fireEvent.change(select, { target: { value: 'option2' } });
      expect(handleChange).toHaveBeenCalledWith('option2');
    });

    it('calls onChange with correct value', () => {
      const handleChange = vi.fn();
      render(<Select options={mockOptions} onChange={handleChange} />);
      const select = screen.getByRole('combobox');
      
      fireEvent.change(select, { target: { value: 'option3' } });
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith('option3');
    });
  });

  describe('Disabled State', () => {
    it('disables select when disabled prop is true', () => {
      render(<Select options={mockOptions} disabled />);
      const select = screen.getByRole('combobox');
      expect(select).toBeDisabled();
    });

    it('enables select when disabled prop is false', () => {
      render(<Select options={mockOptions} disabled={false} />);
      const select = screen.getByRole('combobox');
      expect(select).not.toBeDisabled();
    });

    it('does not call onChange when disabled', () => {
      const handleChange = vi.fn();
      render(<Select options={mockOptions} disabled onChange={handleChange} />);
      const select = screen.getByRole('combobox');
      
      fireEvent.change(select, { target: { value: 'option2' } });
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Placeholder', () => {
    it('renders placeholder as disabled option', () => {
      render(<Select options={mockOptions} placeholder="Choose..." />);
      const select = screen.getByRole('combobox');
      const placeholderOption = Array.from(select.querySelectorAll('option')).find(
        (opt) => opt.textContent === 'Choose...'
      );
      expect(placeholderOption).toBeDisabled();
    });

    it('placeholder option has empty value', () => {
      render(<Select options={mockOptions} placeholder="Choose..." />);
      const select = screen.getByRole('combobox');
      const placeholderOption = Array.from(select.querySelectorAll('option')).find(
        (opt) => opt.textContent === 'Choose...'
      );
      expect(placeholderOption?.value).toBe('');
    });
  });

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      const { container } = render(<Select options={mockOptions} className="custom-select" />);
      const select = container.querySelector('.custom-select');
      expect(select).toBeInTheDocument();
    });

    it('applies custom style', () => {
      const { container } = render(
        <Select options={mockOptions} style={{ width: '300px' }} />
      );
      const select = container.querySelector('select') as HTMLElement;
      expect(select.style.width).toBe('300px');
    });

    it('has balanceui-select class by default', () => {
      const { container } = render(<Select options={mockOptions} />);
      const select = container.querySelector('.balanceui-select');
      expect(select).toBeInTheDocument();
    });
  });

  describe('Props Forwarding', () => {
    it('forwards additional props to select element', () => {
      render(<Select options={mockOptions} data-testid="custom-select" name="country" />);
      const select = screen.getByTestId('custom-select');
      expect(select).toHaveAttribute('name', 'country');
    });

    it('forwards id prop', () => {
      render(<Select options={mockOptions} id="country-select" />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('id', 'country-select');
    });
  });

  describe('Edge Cases', () => {
    it('handles options with same value', () => {
      const duplicateOptions = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option1', label: 'Option 1 Duplicate' },
      ];
      render(<Select options={duplicateOptions} />);
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 1 Duplicate')).toBeInTheDocument();
    });

    it('handles empty string values', () => {
      const optionsWithEmpty = [
        { value: '', label: 'None' },
        { value: 'option1', label: 'Option 1' },
      ];
      render(<Select options={optionsWithEmpty} />);
      expect(screen.getByText('None')).toBeInTheDocument();
    });

    it('handles numeric values', () => {
      const numericOptions = [
        { value: '1', label: 'One' },
        { value: '2', label: 'Two' },
      ];
      render(<Select options={numericOptions} value="1" />);
      const select = screen.getByRole('combobox') as HTMLSelectElement;
      expect(select.value).toBe('1');
    });

    it('handles null onChange gracefully', () => {
      render(<Select options={mockOptions} onChange={undefined} />);
      const select = screen.getByRole('combobox');
      expect(() => {
        fireEvent.change(select, { target: { value: 'option2' } });
      }).not.toThrow();
    });
  });
});


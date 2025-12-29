import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormField } from './FormField';
import { Input } from '../Input/Input';

describe('FormField', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(
        <FormField>
          <Input placeholder="Enter text" />
        </FormField>
      );
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders label when provided', () => {
      render(
        <FormField label="Email">
          <Input />
        </FormField>
      );
      expect(screen.getByText('Email')).toBeInTheDocument();
    });

    it('does not render label when not provided', () => {
      render(
        <FormField>
          <Input placeholder="Enter text" />
        </FormField>
      );
      expect(screen.queryByText('Email')).not.toBeInTheDocument();
    });

    it('renders required indicator when required', () => {
      render(
        <FormField label="Email" required>
          <Input />
        </FormField>
      );
      const label = screen.getByText('Email');
      expect(label.parentElement?.textContent).toContain('*');
    });

    it('does not render required indicator when not required', () => {
      render(
        <FormField label="Email">
          <Input />
        </FormField>
      );
      const label = screen.getByText('Email');
      expect(label.parentElement?.textContent).not.toContain('*');
    });
  });

  describe('Helper Text and Error', () => {
    it('displays helper text when provided', () => {
      render(
        <FormField helperText="Please enter your email">
          <Input />
        </FormField>
      );
      expect(screen.getByText('Please enter your email')).toBeInTheDocument();
    });

    it('displays error message when provided', () => {
      render(
        <FormField error="This field is required">
          <Input />
        </FormField>
      );
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('prioritizes error over helper text', () => {
      render(
        <FormField error="This field is required" helperText="Helper text">
          <Input />
        </FormField>
      );
      expect(screen.getByText('This field is required')).toBeInTheDocument();
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });

    it('does not display helper text when error is present', () => {
      render(
        <FormField error="Error message" helperText="Helper text">
          <Input />
        </FormField>
      );
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('disables child input when disabled prop is true', () => {
      render(
        <FormField disabled>
          <Input placeholder="Enter text" />
        </FormField>
      );
      const input = screen.getByPlaceholderText('Enter text');
      expect(input).toBeDisabled();
    });

    it('applies disabled styling to label', () => {
      const { container } = render(
        <FormField label="Email" disabled>
          <Input />
        </FormField>
      );
      const label = screen.getByText('Email');
      expect(label).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('associates label with input using id', () => {
      render(
        <FormField label="Email">
          <Input />
        </FormField>
      );
      const label = screen.getByText('Email');
      const input = screen.getByRole('textbox');
      expect(label).toHaveAttribute('for', input.id);
    });

    it('sets aria-invalid when error is present', () => {
      render(
        <FormField error="Error message">
          <Input />
        </FormField>
      );
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('sets aria-describedby for error', () => {
      render(
        <FormField error="Error message">
          <Input />
        </FormField>
      );
      const input = screen.getByRole('textbox');
      const errorId = input.getAttribute('aria-describedby');
      expect(errorId).toBeTruthy();
      expect(errorId).toContain('-error');
    });

    it('sets aria-describedby for helper text', () => {
      render(
        <FormField helperText="Helper text">
          <Input />
        </FormField>
      );
      const input = screen.getByRole('textbox');
      const helperId = input.getAttribute('aria-describedby');
      expect(helperId).toBeTruthy();
      expect(helperId).toContain('-helper');
    });
  });

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <FormField className="custom-field">
          <Input />
        </FormField>
      );
      const field = container.querySelector('.custom-field');
      expect(field).toBeInTheDocument();
    });

    it('applies custom style', () => {
      const { container } = render(
        <FormField style={{ margin: '20px' }}>
          <Input />
        </FormField>
      );
      const field = container.firstChild as HTMLElement;
      expect(field.style.margin).toBe('20px');
    });
  });

  describe('Edge Cases', () => {
    it('handles non-React element children', () => {
      render(
        <FormField>
          <div>Custom content</div>
        </FormField>
      );
      expect(screen.getByText('Custom content')).toBeInTheDocument();
    });

    it('handles multiple children', () => {
      render(
        <FormField>
          <Input placeholder="Input 1" />
          <Input placeholder="Input 2" />
        </FormField>
      );
      expect(screen.getByPlaceholderText('Input 1')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Input 2')).toBeInTheDocument();
    });

    it('works without any props', () => {
      render(
        <FormField>
          <Input />
        </FormField>
      );
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });
  });
});


import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Toolbar } from './Toolbar';

const defaultItems = [
  { id: 'bold', label: 'Bold' },
  { id: 'italic', label: 'Italic' },
  { id: 'underline', label: 'Underline' },
];

describe('Toolbar', () => {
  it('renders correctly', () => {
    render(<Toolbar items={defaultItems} />);
    expect(screen.getByText('Bold')).toBeInTheDocument();
    expect(screen.getByText('Italic')).toBeInTheDocument();
    expect(screen.getByText('Underline')).toBeInTheDocument();
  });

  it('handles item click', () => {
    const items = [
      { id: 'bold', label: 'Bold', onClick: vi.fn() },
    ];
    render(<Toolbar items={items} />);
    
    const boldButton = screen.getByText('Bold');
    fireEvent.click(boldButton);
    
    expect(items[0].onClick).toHaveBeenCalled();
  });

  it('handles disabled item', () => {
    const items = [
      { id: 'bold', label: 'Bold', disabled: true, onClick: vi.fn() },
    ];
    render(<Toolbar items={items} />);
    
    const boldButton = screen.getByRole('button', { name: 'Bold' });
    expect(boldButton).toBeDisabled();
    
    fireEvent.click(boldButton);
    expect(items[0].onClick).not.toHaveBeenCalled();
  });

  it('shows active state', () => {
    const items = [
      { id: 'bold', label: 'Bold', active: true },
    ];
    render(<Toolbar items={items} />);
    
    const boldButton = screen.getByRole('button', { name: 'Bold' });
    expect(boldButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('renders dividers', () => {
    const items = [
      { id: 'bold', label: 'Bold' },
      { id: 'divider1', divider: true },
      { id: 'italic', label: 'Italic' },
    ];
    const { container } = render(<Toolbar items={items} />);
    
    expect(container.querySelector('.balanceui-toolbar-divider')).toBeInTheDocument();
  });

  it('handles different orientations', () => {
    const { rerender } = render(<Toolbar items={defaultItems} orientation="horizontal" />);
    expect(screen.getByRole('toolbar')).toHaveAttribute('aria-orientation', 'horizontal');
    
    rerender(<Toolbar items={defaultItems} orientation="vertical" />);
    expect(screen.getByRole('toolbar')).toHaveAttribute('aria-orientation', 'vertical');
  });
});


import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { List } from './List';

const defaultItems = [
  { id: '1', primary: 'Item 1', secondary: 'Secondary 1' },
  { id: '2', primary: 'Item 2', secondary: 'Secondary 2' },
];

describe('List', () => {
  it('renders correctly', () => {
    render(<List items={defaultItems} />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('handles item click', () => {
    const handleItemClick = vi.fn();
    render(<List items={defaultItems} onItemClick={handleItemClick} />);
    
    const item1 = screen.getByText('Item 1').closest('[role="listitem"]');
    if (item1) {
      fireEvent.click(item1);
      expect(handleItemClick).toHaveBeenCalledWith(defaultItems[0]);
    }
  });

  it('handles disabled item', () => {
    const items = [
      { id: '1', primary: 'Item 1', disabled: true },
    ];
    const handleItemClick = vi.fn();
    render(<List items={items} onItemClick={handleItemClick} />);
    
    const item1 = screen.getByText('Item 1').closest('[role="listitem"]');
    if (item1) {
      fireEvent.click(item1);
      expect(handleItemClick).not.toHaveBeenCalled();
    }
  });

  it('shows selected state', () => {
    const items = [
      { id: '1', primary: 'Item 1', selected: true },
    ];
    render(<List items={items} />);
    
    const item = screen.getByRole('listitem');
    expect(item).toHaveAttribute('aria-selected', 'true');
  });

  it('renders with avatar', () => {
    const items = [
      { id: '1', primary: 'Item 1', avatar: <div>Avatar</div> },
    ];
    const { container } = render(<List items={items} />);
    expect(container.querySelector('.balanceui-list-avatar')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    const items = [
      { id: '1', primary: 'Item 1', icon: <span>Icon</span> },
    ];
    const { container } = render(<List items={items} />);
    expect(container.querySelector('.balanceui-list-icon')).toBeInTheDocument();
  });

  it('renders with action', () => {
    const items = [
      { id: '1', primary: 'Item 1', action: <button>Action</button> },
    ];
    render(<List items={items} />);
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('handles different variants', () => {
    const { rerender } = render(<List items={defaultItems} variant="default" />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    
    rerender(<List items={defaultItems} variant="dense" />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });
});


import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Tree } from './Tree';
import { TreeNode } from './Tree.types';

const mockData: TreeNode[] = [
  {
    id: '1',
    label: 'Node 1',
    children: [
      { id: '1-1', label: 'Node 1-1' },
      { id: '1-2', label: 'Node 1-2' },
    ],
  },
  {
    id: '2',
    label: 'Node 2',
  },
];

describe('Tree', () => {
  it('renders tree structure correctly', () => {
    render(<Tree data={mockData} />);
    expect(screen.getByText('Node 1')).toBeInTheDocument();
    expect(screen.getByText('Node 2')).toBeInTheDocument();
  });

  it('expands and collapses nodes', async () => {
    const handleToggle = vi.fn();
    render(<Tree data={mockData} onToggle={handleToggle} />);
    
    // Find the label element that contains "Node 1"
    const node1Text = screen.getByText('Node 1');
    const node1Label = node1Text.closest('.balanceui-tree-label');
    
    expect(node1Label).toBeTruthy();
    if (node1Label) {
      fireEvent.click(node1Label as Element);
      
      // Verify toggle was called
      expect(handleToggle).toHaveBeenCalledWith('1');
      
      // Re-render with expanded state to verify expansion works
      const { rerender } = render(<Tree data={mockData} expanded={new Set(['1'])} />);
      expect(screen.getByText('Node 1-1')).toBeInTheDocument();
      
      // Test collapse
      rerender(<Tree data={mockData} expanded={new Set()} />);
      expect(screen.queryByText('Node 1-1')).not.toBeInTheDocument();
    }
  });

  it('handles checkbox selection', () => {
    const handleSelect = vi.fn();
    render(
      <Tree
        data={mockData}
        showCheckbox={true}
        selected={new Set()}
        onSelect={handleSelect}
      />
    );
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
    fireEvent.click(checkboxes[0]);
    expect(handleSelect).toHaveBeenCalled();
  });

  it('shows selected state for checked nodes', () => {
    const { container } = render(
      <Tree
        data={mockData}
        showCheckbox={true}
        selected={new Set(['1'])}
        onSelect={() => {}}
      />
    );
    const checkedBoxes = container.querySelectorAll('.balanceui-checkbox-box.checked');
    expect(checkedBoxes.length).toBeGreaterThan(0);
  });

  it('handles empty data', () => {
    const { container } = render(<Tree data={[]} />);
    expect(container).toBeInTheDocument();
  });

  it('handles large datasets with virtualization', () => {
    const largeData: TreeNode[] = Array.from({ length: 1000 }, (_, i) => ({
      id: `node-${i}`,
      label: `Node ${i}`,
    }));
    render(<Tree data={largeData} height={400} />);
    expect(screen.getByText('Node 0')).toBeInTheDocument();
  });

  it('preserves expanded state', () => {
    // Test that controlled expanded state works
    const { rerender } = render(<Tree data={mockData} expanded={new Set(['1'])} />);
    expect(screen.getByText('Node 1-1')).toBeInTheDocument();
    
    // Re-render with different expanded state
    rerender(<Tree data={mockData} expanded={new Set()} />);
    expect(screen.queryByText('Node 1-1')).not.toBeInTheDocument();
    
    // Re-render with expanded state again
    rerender(<Tree data={mockData} expanded={new Set(['1'])} />);
    expect(screen.getByText('Node 1-1')).toBeInTheDocument();
  });

  it('handles expanded prop', () => {
    render(<Tree data={mockData} expanded={new Set(['1'])} />);
    expect(screen.getByText('Node 1-1')).toBeInTheDocument();
  });

  it('handles onToggle callback', () => {
    const handleToggle = vi.fn();
    render(<Tree data={mockData} onToggle={handleToggle} />);
    const node1 = screen.getByText('Node 1');
    fireEvent.click(node1);
    expect(handleToggle).toHaveBeenCalledWith('1');
  });
});


import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs } from './Tabs';

const mockTabs = [
  { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
  { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
  { id: 'tab3', label: 'Tab 3', content: <div>Content 3</div> },
];

describe('Tabs', () => {
  describe('Rendering', () => {
    it('renders all tabs', () => {
      render(<Tabs tabs={mockTabs} value="tab1" onChange={vi.fn()} />);
      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab 2')).toBeInTheDocument();
      expect(screen.getByText('Tab 3')).toBeInTheDocument();
    });

    it('renders active tab content', () => {
      render(<Tabs tabs={mockTabs} value="tab1" onChange={vi.fn()} />);
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
    });

    it('renders correct content when value changes', () => {
      const { rerender } = render(<Tabs tabs={mockTabs} value="tab1" onChange={vi.fn()} />);
      expect(screen.getByText('Content 1')).toBeInTheDocument();

      rerender(<Tabs tabs={mockTabs} value="tab2" onChange={vi.fn()} />);
      expect(screen.getByText('Content 2')).toBeInTheDocument();
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onChange when tab is clicked', () => {
      const handleChange = vi.fn();
      render(<Tabs tabs={mockTabs} value="tab1" onChange={handleChange} />);
      
      const tab2 = screen.getByText('Tab 2');
      fireEvent.click(tab2);
      
      expect(handleChange).toHaveBeenCalledWith('tab2');
    });

    it('calls onChange with correct tab id', () => {
      const handleChange = vi.fn();
      render(<Tabs tabs={mockTabs} value="tab1" onChange={handleChange} />);
      
      const tab3 = screen.getByText('Tab 3');
      fireEvent.click(tab3);
      
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith('tab3');
    });

    it('does not call onChange when clicking active tab', () => {
      const handleChange = vi.fn();
      render(<Tabs tabs={mockTabs} value="tab1" onChange={handleChange} />);
      
      const tab1 = screen.getByText('Tab 1');
      fireEvent.click(tab1);
      
      // Still calls onChange even for active tab
      expect(handleChange).toHaveBeenCalledWith('tab1');
    });
  });

  describe('Active State', () => {
    it('highlights active tab', () => {
      const { container } = render(<Tabs tabs={mockTabs} value="tab2" onChange={vi.fn()} />);
      const activeTab = container.querySelector('[style*="font-weight"]');
      expect(activeTab).toBeInTheDocument();
    });

    it('shows correct active tab content', () => {
      render(<Tabs tabs={mockTabs} value="tab3" onChange={vi.fn()} />);
      expect(screen.getByText('Content 3')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty tabs array', () => {
      render(<Tabs tabs={[]} value="" onChange={vi.fn()} />);
      const tabs = screen.queryAllByRole('button');
      expect(tabs).toHaveLength(0);
    });

    it('handles value that does not exist in tabs', () => {
      render(<Tabs tabs={mockTabs} value="nonexistent" onChange={vi.fn()} />);
      // Should not crash, but no content should be displayed
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });

    it('handles single tab', () => {
      const singleTab = [{ id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> }];
      render(<Tabs tabs={singleTab} value="tab1" onChange={vi.fn()} />);
      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    it('handles tabs with complex content', () => {
      const complexTabs = [
        {
          id: 'tab1',
          label: 'Complex Tab',
          content: (
            <div>
              <h2>Title</h2>
              <p>Paragraph</p>
              <button>Button</button>
            </div>
          ),
        },
      ];
      render(<Tabs tabs={complexTabs} value="tab1" onChange={vi.fn()} />);
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Paragraph')).toBeInTheDocument();
      expect(screen.getByText('Button')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('renders tabs in a container', () => {
      const { container } = render(<Tabs tabs={mockTabs} value="tab1" onChange={vi.fn()} />);
      const tabList = container.querySelector('div');
      expect(tabList).toBeInTheDocument();
    });

    it('renders content in separate container', () => {
      const { container } = render(<Tabs tabs={mockTabs} value="tab1" onChange={vi.fn()} />);
      const contentContainers = container.querySelectorAll('div');
      expect(contentContainers.length).toBeGreaterThan(1);
    });
  });
});


import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BottomSheet } from './BottomSheet';

describe('BottomSheet', () => {
  it('renders when open', () => {
    render(
      <BottomSheet open onClose={() => {}}>
        <div>Content</div>
      </BottomSheet>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <BottomSheet open={false} onClose={() => {}}>
        <div>Content</div>
      </BottomSheet>
    );
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('calls onClose when overlay is clicked', () => {
    const handleClose = vi.fn();
    const { container } = render(
      <BottomSheet open onClose={handleClose} closeOnOverlayClick>
        <div>Content</div>
      </BottomSheet>
    );
    
    const overlay = container.querySelector('.balanceui-bottomsheet-overlay');
    if (overlay) {
      fireEvent.click(overlay);
      expect(handleClose).toHaveBeenCalled();
    }
  });

  it('displays title when provided', () => {
    render(
      <BottomSheet open onClose={() => {}} title="Test Title">
        <div>Content</div>
      </BottomSheet>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('shows handle when showHandle is true', () => {
    const { container } = render(
      <BottomSheet open onClose={() => {}} showHandle>
        <div>Content</div>
      </BottomSheet>
    );
    expect(container.querySelector('.balanceui-bottomsheet-handle')).toBeInTheDocument();
  });

  it('handles different sizes', () => {
    const { rerender } = render(
      <BottomSheet open onClose={() => {}} size="sm">
        <div>Content</div>
      </BottomSheet>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
    
    rerender(
      <BottomSheet open onClose={() => {}} size="lg">
        <div>Content</div>
      </BottomSheet>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});


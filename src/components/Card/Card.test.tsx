import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <div>Card Content</div>
      </Card>
    );
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('applies elevated variant by default', () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.querySelector('.balanceui-card-elevated');
    expect(card).toBeInTheDocument();
  });

  it('applies outlined variant', () => {
    const { container } = render(<Card variant="outlined">Content</Card>);
    const card = container.querySelector('.balanceui-card-outlined');
    expect(card).toBeInTheDocument();
  });

  it('applies filled variant', () => {
    const { container } = render(<Card variant="filled">Content</Card>);
    const card = container.querySelector('.balanceui-card-filled');
    expect(card).toBeInTheDocument();
  });

  it('applies elevation classes', () => {
    const { container } = render(<Card elevation={4}>Content</Card>);
    const card = container.querySelector('.balanceui-card-elevation-4');
    expect(card).toBeInTheDocument();
  });

  it('calls onClick when provided', () => {
    const handleClick = vi.fn();
    render(<Card onClick={handleClick}>Clickable Card</Card>);
    const card = screen.getByText('Clickable Card').closest('.balanceui-card');
    fireEvent.click(card!);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    const card = container.querySelector('.custom-class');
    expect(card).toBeInTheDocument();
  });

  it('applies custom style', () => {
    const { container } = render(
      <Card style={{ padding: '20px' }}>Content</Card>
    );
    const card = container.querySelector('.balanceui-card') as HTMLElement;
    expect(card.style.padding).toBe('20px');
  });
});


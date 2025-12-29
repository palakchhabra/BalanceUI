import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Icon } from './Icon';

describe('Icon', () => {
  it('renders correctly with name', () => {
    const { container } = render(<Icon name="home" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders correctly with custom children', () => {
    const { container } = render(
      <Icon>
        <circle cx="12" cy="12" r="10" />
      </Icon>
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(container.querySelector('circle')).toBeInTheDocument();
  });

  it('applies different sizes', () => {
    const { container: container1 } = render(<Icon name="home" size="sm" />);
    const { container: container2 } = render(<Icon name="home" size="lg" />);
    
    const svg1 = container1.querySelector('svg');
    const svg2 = container2.querySelector('svg');
    
    expect(svg1).toHaveStyle({ width: '1rem' });
    expect(svg2).toHaveStyle({ width: '1.5rem' });
  });

  it('applies custom color', () => {
    const { container } = render(<Icon name="home" color="#ff0000" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveStyle({ color: '#ff0000' });
  });

  it('returns null for invalid icon name', () => {
    const { container } = render(<Icon name="invalid-icon" />);
    expect(container.firstChild).toBeNull();
  });
});


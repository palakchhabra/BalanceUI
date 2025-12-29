import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DataTable } from './DataTable';

interface TestData {
  id: string;
  name: string;
  age: number;
  email: string;
}

const mockColumns = [
  { id: 'name', header: 'Name', accessor: 'name' as keyof TestData },
  { id: 'age', header: 'Age', accessor: 'age' as keyof TestData },
  { id: 'email', header: 'Email', accessor: 'email' as keyof TestData },
];

const mockData: TestData[] = [
  { id: '1', name: 'John Doe', age: 30, email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', age: 25, email: 'jane@example.com' },
  { id: '3', name: 'Bob Johnson', age: 35, email: 'bob@example.com' },
];

describe('DataTable', () => {
  it('renders table with data', () => {
    render(<DataTable columns={mockColumns} data={mockData} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('displays loading state', () => {
    render(<DataTable columns={mockColumns} data={[]} loading />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('displays empty state', () => {
    render(<DataTable columns={mockColumns} data={[]} />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  it('handles sorting', () => {
    const handleSortChange = vi.fn();
    render(
      <DataTable
        columns={mockColumns}
        data={mockData}
        sorting={{
          mode: 'client',
          onChange: handleSortChange,
        }}
      />
    );
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    expect(handleSortChange).toHaveBeenCalled();
  });

  it('handles large datasets with virtualization', () => {
    const largeData: TestData[] = Array.from({ length: 1000 }, (_, i) => ({
      id: `${i}`,
      name: `User ${i}`,
      age: 20 + i,
      email: `user${i}@example.com`,
    }));
    render(<DataTable columns={mockColumns} data={largeData} height={400} />);
    expect(screen.getByText('User 0')).toBeInTheDocument();
  });

  it('renders custom cell renderers', () => {
    const columnsWithRenderer = [
      {
        id: 'name',
        header: 'Name',
        render: (row: TestData) => <strong>{row.name}</strong>,
      },
    ];
    render(<DataTable columns={columnsWithRenderer} data={mockData} />);
    const strong = screen.getByText('John Doe').closest('strong');
    expect(strong).toBeInTheDocument();
  });

  it('handles sticky columns', () => {
    render(
      <DataTable
        columns={mockColumns}
        data={mockData}
        stickyColumns={[0]}
      />
    );
    const nameHeader = screen.getByText('Name');
    expect(nameHeader.closest('th')).toHaveClass('balanceui-datatable-sticky');
  });

  it('handles no sorting configuration', () => {
    render(<DataTable columns={mockColumns} data={mockData} />);
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    // Should not throw error
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});


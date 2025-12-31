import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DataTable } from './DataTable';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataTable>;

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  role: string;
}

const columns = [
  { id: 'name', header: 'Name', accessor: 'name' as keyof User },
  { id: 'email', header: 'Email', accessor: 'email' as keyof User },
  { id: 'age', header: 'Age', accessor: 'age' as keyof User },
  { id: 'role', header: 'Role', accessor: 'role' as keyof User },
];

const sampleData: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', age: 30, role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', age: 25, role: 'User' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', age: 35, role: 'Moderator' },
  { id: '4', name: 'Alice Williams', email: 'alice@example.com', age: 28, role: 'User' },
  { id: '5', name: 'Charlie Brown', email: 'charlie@example.com', age: 32, role: 'Admin' },
];

export const Default: Story = {
  args: {
    columns,
    data: sampleData,
  },
};

export const WithSorting: Story = {
  args: {
    columns,
    data: sampleData,
    sorting: {
      mode: 'client',
      onChange: (sort) => console.log('Sort changed:', sort),
    },
  },
};

export const WithHeight: Story = {
  args: {
    columns,
    data: sampleData,
    height: 400,
  },
};

export const LargeDataset: Story = {
  args: {
    columns,
    data: Array.from({ length: 1000 }, (_, i) => ({
      id: `${i}`,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      age: 20 + (i % 40),
      role: ['Admin', 'User', 'Moderator'][i % 3],
    })),
    height: 500,
    sorting: {
      mode: 'client',
      onChange: (sort) => console.log('Sort changed:', sort),
    },
  },
};

export const WithStickyColumns: Story = {
  args: {
    columns,
    data: sampleData,
    stickyColumns: [0],
  },
};

export const Loading: Story = {
  args: {
    columns,
    data: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    loading: false,
  },
};

export const CustomRender: Story = {
  args: {
    columns: [
      { id: 'name', header: 'Name', accessor: 'name' as keyof User },
      {
        id: 'role',
        header: 'Role',
        render: (row: User) => (
          <span style={{ fontWeight: 'bold', color: 'var(--bu-primary)' }}>
            {row.role}
          </span>
        ),
      },
    ],
    data: sampleData,
  },
};

// JSON data for auto refresh
const generateMockData = (): User[] => {
  const roles = ['Admin', 'User', 'Moderator', 'Guest'];
  const names = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Diana', 'Eve', 'Frank'];
  return Array.from({ length: 50 }, (_, i) => ({
    id: `${Date.now()}-${i}`,
    name: `${names[i % names.length]} ${i}`,
    email: `user${i}@example.com`,
    age: 20 + (i % 40),
    role: roles[i % roles.length],
  }));
};

export const WithAutoRefresh: Story = {
  render: () => {
    const [data, setData] = React.useState<User[]>(generateMockData());
    const [sort, setSort] = React.useState<{ columnId: string; direction: 'asc' | 'desc' } | undefined>();

    const handleRefresh = React.useCallback(async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // Only update the data, not the whole component
      setData(generateMockData());
    }, []);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ padding: '12px', background: 'var(--bu-surface-variant)', borderRadius: '4px' }}>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--bu-fg-secondary)' }}>
            This table auto-refreshes every 5 seconds. Only the table data is refreshed, not the entire component.
          </p>
        </div>
        <DataTable
          columns={columns}
          data={data}
          sorting={{
            mode: 'client',
            sort,
            onChange: setSort,
          }}
          autoRefresh={{
            enabled: true,
            interval: 5000,
            onRefresh: handleRefresh,
          }}
          showRecordCount
          height={400}
        />
      </div>
    );
  },
};

interface ExtendedUser extends User {
  department: string;
  location: string;
  status: string;
}

export const LargeDatasetWithSticky: Story = {
  render: () => {
    const extendedColumns = [
      { id: 'name', header: 'Name', accessor: 'name' as keyof ExtendedUser, width: 200 },
      { id: 'email', header: 'Email', accessor: 'email' as keyof ExtendedUser, width: 250 },
      { id: 'age', header: 'Age', accessor: 'age' as keyof ExtendedUser, width: 100 },
      { id: 'role', header: 'Role', accessor: 'role' as keyof ExtendedUser, width: 150 },
      { id: 'department', header: 'Department', accessor: 'department' as keyof ExtendedUser, width: 200 },
      { id: 'location', header: 'Location', accessor: 'location' as keyof ExtendedUser, width: 200 },
      { id: 'status', header: 'Status', accessor: 'status' as keyof ExtendedUser, width: 150 },
    ];

    const extendedData: ExtendedUser[] = Array.from({ length: 1000 }, (_, i) => ({
      id: `${i}`,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      age: 20 + (i % 40),
      role: ['Admin', 'User', 'Moderator'][i % 3],
      department: ['Engineering', 'Sales', 'Marketing', 'Support'][i % 4],
      location: ['New York', 'London', 'Tokyo', 'Sydney'][i % 4],
      status: ['Active', 'Inactive', 'Pending'][i % 3],
    }));

    return (
      <DataTable<ExtendedUser>
        columns={extendedColumns}
        data={extendedData}
        height={600}
        stickyColumns={[0, 1]}
        sorting={{
          mode: 'client',
          onChange: (sort) => console.log('Sort changed:', sort),
        }}
      />
    );
  },
};


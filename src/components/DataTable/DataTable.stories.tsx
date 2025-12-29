import type { Meta, StoryObj } from '@storybook/react';
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


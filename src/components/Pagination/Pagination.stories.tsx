import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';
import { useState } from 'react';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    page: {
      control: 'number',
    },
    pageSize: {
      control: 'number',
    },
    total: {
      control: 'number',
    },
    siblingCount: {
      control: 'number',
    },
    boundaryCount: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const PaginationWrapper = (args: any) => {
  const [page, setPage] = useState(args.page || 1);
  return (
    <Pagination
      {...args}
      page={page}
      onChange={(p) => setPage(p)}
    />
  );
};

export const Default: Story = {
  render: (args) => <PaginationWrapper {...args} />,
  args: {
    page: 1,
    pageSize: 10,
    total: 100,
  },
};

export const ManyPages: Story = {
  render: (args) => <PaginationWrapper {...args} />,
  args: {
    page: 50,
    pageSize: 10,
    total: 1000,
  },
};

export const CustomSiblingCount: Story = {
  render: (args) => <PaginationWrapper {...args} />,
  args: {
    page: 10,
    pageSize: 10,
    total: 500,
    siblingCount: 2,
  },
};

export const CustomBoundaryCount: Story = {
  render: (args) => <PaginationWrapper {...args} />,
  args: {
    page: 10,
    pageSize: 10,
    total: 500,
    boundaryCount: 3,
  },
};

export const SmallDataset: Story = {
  render: (args) => <PaginationWrapper {...args} />,
  args: {
    page: 1,
    pageSize: 10,
    total: 25,
  },
};


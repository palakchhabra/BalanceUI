import type { Meta, StoryObj } from '@storybook/react';
import { Shimmer } from './Shimmer';

const meta: Meta<typeof Shimmer> = {
  title: 'Components/Shimmer',
  component: Shimmer,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    pattern: {
      control: 'select',
      options: ['avatar', 'form', 'table', 'cards', 'list', 'profile', 'article'],
    },
    count: {
      control: 'number',
      description: 'Number of items (for cards, list, form fields)',
    },
    rows: {
      control: 'number',
      description: 'Number of table rows',
    },
    columns: {
      control: 'number',
      description: 'Number of table columns',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Shimmer>;

export const Avatar: Story = {
  args: {
    pattern: 'avatar',
  },
};

export const Form: Story = {
  args: {
    pattern: 'form',
    count: 4,
  },
};

export const Table: Story = {
  args: {
    pattern: 'table',
    rows: 5,
    columns: 4,
  },
};

export const Cards: Story = {
  args: {
    pattern: 'cards',
    count: 3,
  },
};

export const CardsCustom: Story = {
  args: {
    pattern: 'cards',
    count: 6,
  },
};

export const List: Story = {
  args: {
    pattern: 'list',
    count: 5,
  },
};

export const Profile: Story = {
  args: {
    pattern: 'profile',
  },
};

export const Article: Story = {
  args: {
    pattern: 'article',
  },
};

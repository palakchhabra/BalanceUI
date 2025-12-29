import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Tree } from './Tree';
import { TreeNode } from './Tree.types';

const meta: Meta<typeof Tree> = {
  title: 'Components/Tree',
  component: Tree,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tree>;

const sampleData: TreeNode[] = [
  {
    id: '1',
    label: 'Documents',
    children: [
      { id: '1-1', label: 'Resume.pdf' },
      { id: '1-2', label: 'Cover Letter.docx' },
    ],
  },
  {
    id: '2',
    label: 'Projects',
    children: [
      {
        id: '2-1',
        label: 'Web App',
        children: [
          { id: '2-1-1', label: 'index.html' },
          { id: '2-1-2', label: 'styles.css' },
        ],
      },
      { id: '2-2', label: 'Mobile App' },
    ],
  },
  {
    id: '3',
    label: 'Settings',
  },
];

export const Default: Story = {
  args: {
    data: sampleData,
  },
};

export const WithHeight: Story = {
  args: {
    data: sampleData,
    height: 400,
  },
};

export const WithExpanded: Story = {
  args: {
    data: sampleData,
    expanded: new Set(['1', '2']),
  },
};

export const LargeDataset: Story = {
  args: {
    data: Array.from({ length: 100 }, (_, i) => ({
      id: `node-${i}`,
      label: `Node ${i}`,
      children: Array.from({ length: 10 }, (_, j) => ({
        id: `node-${i}-${j}`,
        label: `Child ${i}-${j}`,
      })),
    })),
    height: 500,
  },
};

export const SingleNode: Story = {
  args: {
    data: [{ id: '1', label: 'Single Node' }],
  },
};

export const WithCheckboxes: Story = {
  render: () => {
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const handleSelect = (id: string, checked: boolean) => {
      setSelected((prev) => {
        const next = new Set(prev);
        if (checked) {
          next.add(id);
        } else {
          next.delete(id);
        }
        return next;
      });
    };
    return (
      <div>
        <div style={{ marginBottom: '16px' }}>
          Selected: {selected.size} node(s)
        </div>
        <Tree
          data={sampleData}
          showCheckbox={true}
          selected={selected}
          onSelect={handleSelect}
        />
      </div>
    );
  },
};

export const WithCheckboxesAndExpanded: Story = {
  render: () => {
    const [selected, setSelected] = useState<Set<string>>(new Set(['1-1']));
    const [expanded, setExpanded] = useState<Set<string>>(new Set(['1']));
    
    const handleSelect = (id: string, checked: boolean) => {
      setSelected((prev) => {
        const next = new Set(prev);
        if (checked) {
          next.add(id);
        } else {
          next.delete(id);
        }
        return next;
      });
    };

    const handleToggle = (id: string) => {
      setExpanded((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    };

    return (
      <div>
        <div style={{ marginBottom: '16px' }}>
          Selected: {selected.size} node(s) | Expanded: {expanded.size} node(s)
        </div>
        <Tree
          data={sampleData}
          showCheckbox={true}
          selected={selected}
          onSelect={handleSelect}
          expanded={expanded}
          onToggle={handleToggle}
        />
      </div>
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useMemo } from 'react';
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
          Selected: {selected.size} node(s) (including all descendants when parent is selected)
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
          Selected: {selected.size} node(s) (including all descendants) | Expanded: {expanded.size} node(s)
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

// Helper function to generate large tree data
const generateLargeTreeData = (rootCount: number, childrenPerRoot: number, depth: number = 1): TreeNode[] => {
  const data: TreeNode[] = [];
  for (let i = 0; i < rootCount; i++) {
    const rootId = `root-${i}`;
    const children: TreeNode[] = [];
    
    for (let j = 0; j < childrenPerRoot; j++) {
      const childId = `${rootId}-${j}`;
      if (depth > 1) {
        children.push({
          id: childId,
          label: `Node ${i}-${j}`,
          children: generateLargeTreeData(1, childrenPerRoot, depth - 1).map(child => ({
            ...child,
            id: `${childId}-${child.id}`,
            label: `${child.label} (${i}-${j})`
          }))
        });
      } else {
        children.push({
          id: childId,
          label: `Leaf ${i}-${j}`
        });
      }
    }
    
    data.push({
      id: rootId,
      label: `Root Node ${i}`,
      children
    });
  }
  return data;
};

export const LargeDatasetWithCheckboxes: Story = {
  render: () => {
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [expanded, setExpanded] = useState<Set<string>>(new Set());
    
    // Generate 5000+ records: 100 root nodes, each with 50 children = 5000 leaf nodes + 100 parents = 5100 total
    const largeData = useMemo(() => {
      const startTime = performance.now();
      const data = generateLargeTreeData(100, 50, 1);
      const endTime = performance.now();
      console.log(`Generated ${data.length} root nodes with ~${data.reduce((sum, root) => sum + (root.children?.length || 0), 0)} total children in ${(endTime - startTime).toFixed(2)}ms`);
      return data;
    }, []);
    
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
          <div>Total nodes: ~5,100 (100 roots × 50 children each)</div>
          <div>Selected: {selected.size} node(s) (including all descendants when parent is selected)</div>
          <div>Expanded: {expanded.size} node(s)</div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            Select a root node to see cascading selection of all 50 children. Virtual scrolling enabled for performance.
          </div>
        </div>
        <Tree
          data={largeData}
          showCheckbox={true}
          selected={selected}
          onSelect={handleSelect}
          expanded={expanded}
          onToggle={handleToggle}
          height={600}
        />
      </div>
    );
  },
};

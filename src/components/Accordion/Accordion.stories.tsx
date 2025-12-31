import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import { Button } from '../Button/Button';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    openId: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    items: [
      { id: '1', title: 'Section 1', content: 'Content for section 1' },
      { id: '2', title: 'Section 2', content: 'Content for section 2' },
      { id: '3', title: 'Section 3', content: 'Content for section 3' },
    ],
  },
};

export const WithOpenId: Story = {
  args: {
    items: [
      { id: '1', title: 'Section 1', content: 'Content for section 1' },
      { id: '2', title: 'Section 2', content: 'Content for section 2' },
      { id: '3', title: 'Section 3', content: 'Content for section 3' },
    ],
    openId: '2',
  },
};

export const WithRichContent: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Getting Started',
        content: (
          <div>
            <p>This is a detailed explanation with multiple paragraphs.</p>
            <p>You can include any React content here.</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </div>
        ),
      },
      {
        id: '2',
        title: 'Advanced Usage',
        content: <div>Advanced content goes here</div>,
      },
    ],
  },
};

export const WithActions: Story = {
  render: () => (
    <Accordion
      items={[
        {
          id: '1',
          title: 'Accordion 1',
          content: 'Content for accordion 1',
        },
        {
          id: '2',
          title: 'Accordion 2',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
        },
        {
          id: '3',
          title: 'Accordion Actions',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
          actions: (
            <>
              <Button variant="bare" size="sm">CANCEL</Button>
              <Button variant="bare" size="sm">AGREE</Button>
            </>
          ),
        },
      ]}
      openId="2"
    />
  ),
};


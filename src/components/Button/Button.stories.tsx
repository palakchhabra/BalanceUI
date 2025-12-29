import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
    variant: 'solid',
    size: 'md',
    rounded: 'md',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'bare',
        'stroke',
        'solid',
        'soft',
        'float',
        'glyph',
        'pulse',
        'pulse-mini',
        'pulse-extend',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    rounded: {
      control: 'select',
      options: ['md', 'full'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

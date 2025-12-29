import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';
import { useState } from 'react';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible date picker component with support for single date selection and date range selection. Perfect for forms, filters, and date-based interactions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'soft', 'outline'],
      description: 'Visual style variant',
    },
    mode: {
      control: 'select',
      options: ['single', 'range'],
      description: 'Selection mode: single date or date range',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the date picker',
    },
    minDate: {
      control: 'date',
      description: 'Minimum selectable date',
    },
    maxDate: {
      control: 'date',
      description: 'Maximum selectable date',
    },
    format: {
      control: 'text',
      description: 'Custom date format (e.g., "YYYY-MM-DD")',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    helperText: {
      control: 'text',
      description: 'Helper text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    placeholder: 'Select date',
    variant: 'outline',
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(new Date());
    return (
      <DatePicker
        value={value}
        onChange={setValue}
        variant="outline"
        placeholder="Select date"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DatePicker with a controlled value. The date is managed by React state.',
      },
    },
  },
};

export const Uncontrolled: Story = {
  render: () => {
    return (
      <DatePicker
        defaultValue={new Date()}
        variant="outline"
        placeholder="Select date"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Uncontrolled DatePicker with a default value.',
      },
    },
  },
};

export const DateRange: Story = {
  render: () => {
    const [start, setStart] = useState<Date | null>(null);
    const [end, setEnd] = useState<Date | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <DatePicker
          mode="range"
          onRangeChange={(s, e) => {
            setStart(s);
            setEnd(e);
          }}
          variant="outline"
          placeholder="Select date range"
        />
        {start && end && (
          <p style={{ fontSize: '12px', color: '#666' }}>
            Selected: {start.toLocaleDateString()} - {end.toLocaleDateString()}
          </p>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DatePicker in range mode allows selecting a start and end date.',
      },
    },
  },
};

export const WithMinMax: Story = {
  render: () => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 7);
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    
    return (
      <DatePicker
        variant="outline"
        placeholder="Select date (within 7 days)"
        minDate={minDate}
        maxDate={maxDate}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DatePicker with minimum and maximum date restrictions. Dates outside the range are disabled.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <DatePicker variant="outline" placeholder="Outline variant" />
      <DatePicker variant="soft" placeholder="Soft variant" />
      <DatePicker variant="solid" placeholder="Solid variant" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available visual variants of the DatePicker component.',
      },
    },
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Birth Date',
    placeholder: 'Select your birth date',
    variant: 'outline',
  },
  parameters: {
    docs: {
      description: {
        story: 'DatePicker with a label above the input field.',
      },
    },
  },
};

export const WithError: Story = {
  args: {
    label: 'Date',
    placeholder: 'Select date',
    variant: 'outline',
    error: 'This field is required',
  },
  parameters: {
    docs: {
      description: {
        story: 'DatePicker displaying an error message. Useful for form validation.',
      },
    },
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Event Date',
    placeholder: 'Select date',
    variant: 'outline',
    helperText: 'Please select a valid date for your event',
  },
  parameters: {
    docs: {
      description: {
        story: 'DatePicker with helper text to provide additional guidance to users.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled date picker',
    variant: 'outline',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled DatePicker that cannot be interacted with.',
      },
    },
  },
};

export const CustomFormat: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(new Date());
    return (
      <DatePicker
        value={value}
        onChange={setValue}
        format="YYYY-MM-DD"
        variant="outline"
        placeholder="Select date (YYYY-MM-DD)"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DatePicker with custom date format. The format uses YYYY for year, MM for month, and DD for day.',
      },
    },
  },
};

export const PastDatesOnly: Story = {
  render: () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() - 1);
    return (
      <DatePicker
        variant="outline"
        placeholder="Select past date"
        maxDate={maxDate}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DatePicker restricted to only allow past dates.',
      },
    },
  },
};

export const FutureDatesOnly: Story = {
  render: () => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 1);
    return (
      <DatePicker
        variant="outline"
        placeholder="Select future date"
        minDate={minDate}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DatePicker restricted to only allow future dates.',
      },
    },
  },
};

export const RangeWithRestrictions: Story = {
  render: () => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 30);
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    
    return (
      <DatePicker
        mode="range"
        variant="outline"
        placeholder="Select date range (within 30 days)"
        minDate={minDate}
        maxDate={maxDate}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Date range picker with date restrictions applied to both start and end dates.',
      },
    },
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: new Date(2024, 0, 15),
    variant: 'outline',
    placeholder: 'Select date',
  },
  parameters: {
    docs: {
      description: {
        story: 'Uncontrolled DatePicker with a default value set.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <DatePicker
        variant="outline"
        placeholder="Default size"
        style={{ width: '100%' }}
      />
      <DatePicker
        variant="outline"
        placeholder="Small size"
        style={{ width: '100%', padding: '8px', fontSize: '14px' }}
      />
      <DatePicker
        variant="outline"
        placeholder="Large size"
        style={{ width: '100%', padding: '16px', fontSize: '18px' }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'DatePicker with different sizes using custom styles.',
      },
    },
  },
};


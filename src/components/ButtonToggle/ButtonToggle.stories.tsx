import type { Meta, StoryObj } from '@storybook/react';
import { ButtonToggle } from './ButtonToggle';
import { useState } from 'react';

const meta: Meta<typeof ButtonToggle> = {
  title: 'Components/ButtonToggle',
  component: ButtonToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'soft', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonToggle>;

const defaultOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
    variant: 'outline',
  },
};

export const SingleSelection: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');
    return (
      <ButtonToggle
        options={defaultOptions}
        value={value}
        onChange={(v) => setValue(v as string)}
        variant="outline"
      />
    );
  },
};

export const MultipleSelection: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <ButtonToggle
        options={defaultOptions}
        value={value}
        onChange={(v) => setValue(v as string[])}
        multiple
        variant="outline"
      />
    );
  },
};

export const AllVariants: Story = {
  render: () => {
    const [outlineValue, setOutlineValue] = useState<string>('option2');
    const [softValue, setSoftValue] = useState<string>('option2');
    const [solidValue, setSolidValue] = useState<string>('option2');
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
        <div>
          <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500, color: 'var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))' }}>
            Outline Variant (Default)
          </h3>
          <p style={{ marginBottom: '12px', fontSize: '12px', color: 'var(--bu-muted, rgba(0, 0, 0, 0.54))' }}>
            Selected: Transparent background with primary border and text
          </p>
          <ButtonToggle 
            options={defaultOptions} 
            variant="outline"
            value={outlineValue}
            onChange={(v) => setOutlineValue(v as string)}
          />
        </div>
        
        <div>
          <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500, color: 'var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))' }}>
            Soft Variant
          </h3>
          <p style={{ marginBottom: '12px', fontSize: '12px', color: 'var(--bu-muted, rgba(0, 0, 0, 0.54))' }}>
            Selected: Light primary background with primary text
          </p>
          <ButtonToggle 
            options={defaultOptions} 
            variant="soft"
            value={softValue}
            onChange={(v) => setSoftValue(v as string)}
          />
        </div>
        
        <div>
          <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500, color: 'var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))' }}>
            Solid Variant
          </h3>
          <p style={{ marginBottom: '12px', fontSize: '12px', color: 'var(--bu-muted, rgba(0, 0, 0, 0.54))' }}>
            Selected: Solid primary background with white text
          </p>
          <ButtonToggle 
            options={defaultOptions} 
            variant="solid"
            value={solidValue}
            onChange={(v) => setSolidValue(v as string)}
          />
        </div>
      </div>
    );
  },
};

export const VariantComparison: Story = {
  render: () => {
    const [outlineValue, setOutlineValue] = useState<string>('option2');
    const [softValue, setSoftValue] = useState<string>('option2');
    const [solidValue, setSolidValue] = useState<string>('option2');
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '500px' }}>
        <div>
          <h2 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Variant Comparison</h2>
          <p style={{ marginBottom: '24px', fontSize: '14px', color: 'var(--bu-muted, rgba(0, 0, 0, 0.54))' }}>
            All three variants with the same selection. Notice the visual differences:
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{ marginBottom: '8px', fontSize: '13px', fontWeight: 500 }}>
                Outline (Border style) - Selected has 2px primary border
              </div>
              <ButtonToggle 
                options={defaultOptions} 
                variant="outline"
                value={outlineValue}
                onChange={(v) => setOutlineValue(v as string)}
              />
            </div>
            
            <div>
              <div style={{ marginBottom: '8px', fontSize: '13px', fontWeight: 500 }}>
                Soft (Light background) - Selected has light blue background
              </div>
              <ButtonToggle 
                options={defaultOptions} 
                variant="soft"
                value={softValue}
                onChange={(v) => setSoftValue(v as string)}
              />
            </div>
            
            <div>
              <div style={{ marginBottom: '8px', fontSize: '13px', fontWeight: 500 }}>
                Solid (Filled background) - Selected has solid blue background with white text
              </div>
              <ButtonToggle 
                options={defaultOptions} 
                variant="solid"
                value={solidValue}
                onChange={(v) => setSolidValue(v as string)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    const [smValue, setSmValue] = useState<string>('option2');
    const [mdValue, setMdValue] = useState<string>('option2');
    const [lgValue, setLgValue] = useState<string>('option2');
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <div style={{ marginBottom: '8px', fontSize: '13px', fontWeight: 500 }}>Small</div>
          <ButtonToggle 
            options={defaultOptions} 
            size="sm"
            value={smValue}
            onChange={(v) => setSmValue(v as string)}
          />
        </div>
        <div>
          <div style={{ marginBottom: '8px', fontSize: '13px', fontWeight: 500 }}>Medium</div>
          <ButtonToggle 
            options={defaultOptions} 
            size="md"
            value={mdValue}
            onChange={(v) => setMdValue(v as string)}
          />
        </div>
        <div>
          <div style={{ marginBottom: '8px', fontSize: '13px', fontWeight: 500 }}>Large</div>
          <ButtonToggle 
            options={defaultOptions} 
            size="lg"
            value={lgValue}
            onChange={(v) => setLgValue(v as string)}
          />
        </div>
      </div>
    );
  },
};

export const FullWidth: Story = {
  render: () => {
    const [value, setValue] = useState<string>('option2');
    return (
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <ButtonToggle 
          options={defaultOptions}
          variant="outline"
          fullWidth={true}
          value={value}
          onChange={(v) => setValue(v as string)}
        />
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [value, setValue] = useState<string>('bold');
    const options = [
      { value: 'bold', label: 'Bold', icon: <strong>B</strong> },
      { value: 'italic', label: 'Italic', icon: <em>I</em> },
      { value: 'underline', label: 'Underline', icon: <u>U</u> },
    ];
    return (
      <ButtonToggle 
        options={options} 
        variant="outline"
        value={value}
        onChange={(v) => setValue(v as string)}
      />
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState<string>('option1');
    const options = [
      { value: 'option1', label: 'Enabled' },
      { value: 'option2', label: 'Disabled', disabled: true },
      { value: 'option3', label: 'Enabled' },
    ];
    return (
      <ButtonToggle 
        options={options} 
        variant="outline"
        value={value}
        onChange={(v) => setValue(v as string)}
      />
    );
  },
};


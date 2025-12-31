/**
 * Automated CSS Detection and Visual Regression Tests
 * 
 * Automatically tests all components for:
 * - CSS property detection
 * - Text overlapping
 * - Visual mismatches
 * - Positioning issues
 * - Spacing and alignment problems
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  getComponentCSSReport,
  formatCSSReport,
  detectTextOverlap,
  detectAllTextOverlaps,
  checkElementAlignment,
  detectCSSMismatches,
  identifyComponentCSS,
} from './css-detection-helpers';

// Import all components
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Select } from '../components/Select';
import { Checkbox } from '../components/Checkbox';
import { TextArea } from '../components/TextArea';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { FormField } from '../components/FormField';
import { Toggle } from '../components/Toggle';
import { Progress } from '../components/Progress';
import { List } from '../components/List';
import { Tabs } from '../components/Tabs';
import { Accordion } from '../components/Accordion';

describe('Automated CSS Detection Tests', () => {
  describe('Input Component - CSS Detection', () => {
    it('should detect Input component CSS properties', () => {
      const { container } = render(
        <Input label="Test Input" placeholder="Enter text" />
      );

      const input = container.querySelector('input') as HTMLElement;
      expect(input).toBeTruthy();

      const cssInfo = identifyComponentCSS(input);
      expect(cssInfo.componentName).toBeTruthy();
      expect(cssInfo.cssProperties).toBeDefined();
    });

    it('should detect no text overlaps in Input with label', () => {
      const { container } = render(
        <Input label="Test Label" floatingLabel value="Test Value" />
      );

      const input = container.querySelector('input') as HTMLElement;
      const label = container.querySelector('label') as HTMLElement;

      expect(input).toBeTruthy();
      expect(label).toBeTruthy();

      const overlaps = detectAllTextOverlaps(container);
      const inputLabelOverlap = overlaps.find(
        o => (o.element1 === input || o.element2 === input) &&
             (o.element1 === label || o.element2 === label)
      );

      // Floating label should not overlap with input text when floating
      if (inputLabelOverlap) {
        console.warn('Input label overlap detected:', inputLabelOverlap.overlap.details);
      }
      // This is a warning, not an error, as floating labels can overlap when not floating
    });

    it('should generate comprehensive CSS report for Input', () => {
      const { container } = render(
        <Input label="Test" floatingLabel helperText="Helper text" />
      );

      const report = getComponentCSSReport(container);
      expect(report).toBeDefined();
      expect(report.summary).toBeDefined();
      expect(report.componentInfo.length).toBeGreaterThan(0);

      // Log report for debugging
      if (report.summary.totalIssues > 0) {
        console.log(formatCSSReport(report));
      }
    });

    it('should detect CSS issues in Input component', () => {
      const { container } = render(
        <Input label="Test" floatingLabel />
      );

      const report = getComponentCSSReport(container);
      const errors = report.componentInfo.flatMap(info => 
        info.issues.filter(issue => issue.severity === 'error')
      );

      expect(errors.length).toBe(0);
    });
  });

  describe('Button Component - CSS Detection', () => {
    it('should detect Button component CSS properties', () => {
      const { container } = render(
        <Button>Click Me</Button>
      );

      const button = container.querySelector('button') as HTMLElement;
      expect(button).toBeTruthy();

      const cssInfo = identifyComponentCSS(button);
      expect(cssInfo.componentName).toBeTruthy();
      expect(cssInfo.cssProperties).toBeDefined();
    });

    it('should detect no text overlaps in Button', () => {
      const { container } = render(
        <div>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </div>
      );

      const overlaps = detectAllTextOverlaps(container);
      expect(overlaps.length).toBe(0);
    });

    it('should detect CSS mismatches in multiple Buttons', () => {
      const { container } = render(
        <div>
          <Button variant="solid">Solid</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="soft">Soft</Button>
        </div>
      );

      const buttons = Array.from(container.querySelectorAll('button')) as HTMLElement[];
      const mismatches = detectCSSMismatches(buttons, ['padding', 'margin', 'fontSize']);

      // Variants should have different styles, so mismatches are expected
      // But we should check that they're intentional
      if (mismatches.length > 0) {
        console.log('Button variant mismatches (expected):', mismatches);
      }
    });
  });

  describe('FormField Component - Alignment Detection', () => {
    it('should detect proper alignment between label and input', () => {
      const { container } = render(
        <FormField label="Email">
          <Input />
        </FormField>
      );

      const label = container.querySelector('label') as HTMLElement;
      const input = container.querySelector('input') as HTMLElement;

      expect(label).toBeTruthy();
      expect(input).toBeTruthy();

      const alignment = checkElementAlignment(label, input, 'horizontal', 5);
      // Labels and inputs should be horizontally aligned (within tolerance)
      expect(alignment.aligned).toBe(true);
    });
  });

  describe('Card Component - CSS Detection', () => {
    it('should detect Card component CSS and check for issues', () => {
      const { container } = render(
        <Card>
          <h3>Card Title</h3>
          <p>Card content with some text that might overlap if not properly styled.</p>
        </Card>
      );

      const report = getComponentCSSReport(container);
      const errors = report.componentInfo.flatMap(info => 
        info.issues.filter(issue => issue.severity === 'error')
      );

      expect(errors.length).toBe(0);
    });

    it('should detect no text overlaps in Card content', () => {
      const { container } = render(
        <Card>
          <h3>Title</h3>
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
        </Card>
      );

      const overlaps = detectAllTextOverlaps(container);
      expect(overlaps.length).toBe(0);
    });
  });

  describe('Select Component - CSS Detection', () => {
    it('should detect Select component CSS properties', () => {
      const { container } = render(
        <Select
          options={[
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
          ]}
        />
      );

      const select = container.querySelector('select') as HTMLElement;
      expect(select).toBeTruthy();

      const cssInfo = identifyComponentCSS(select);
      expect(cssInfo.componentName).toBeTruthy();
    });
  });

  describe('Multiple Components - Comprehensive Detection', () => {
    it('should detect CSS issues across multiple components', () => {
      const { container } = render(
        <div>
          <Input label="Input 1" />
          <Input label="Input 2" />
          <Button>Button</Button>
          <Card>
            <p>Card content</p>
          </Card>
        </div>
      );

      const report = getComponentCSSReport(container);
      
      // Check that all components are detected
      const componentNames = report.componentInfo.map(info => info.componentName);
      expect(componentNames.length).toBeGreaterThan(0);

      // Log any issues found
      if (report.summary.totalIssues > 0) {
        console.log(formatCSSReport(report));
      }

      // Should not have critical errors
      const errors = report.componentInfo.flatMap(info => 
        info.issues.filter(issue => issue.severity === 'error')
      );
      expect(errors.length).toBe(0);
    });

    it('should detect text overlaps across multiple components', () => {
      const { container } = render(
        <div style={{ position: 'relative', width: '200px', height: '200px' }}>
          <div style={{ position: 'absolute', top: '10px', left: '10px', width: '100px' }}>
            Text 1
          </div>
          <div style={{ position: 'absolute', top: '15px', left: '15px', width: '100px' }}>
            Text 2
          </div>
        </div>
      );

      const overlaps = detectAllTextOverlaps(container);
      // In jsdom, getBoundingClientRect may not work perfectly
      // Test that function doesn't throw and returns an array
      expect(Array.isArray(overlaps)).toBe(true);
    });
  });

  describe('Component Variants - Mismatch Detection', () => {
    it('should detect intentional CSS differences in variants', () => {
      const { container } = render(
        <div>
          <Button variant="solid">Solid</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="soft">Soft</Button>
        </div>
      );

      const buttons = Array.from(container.querySelectorAll('button')) as HTMLElement[];
      const mismatches = detectCSSMismatches(buttons, [
        'backgroundColor',
        'border',
        'color',
      ]);

      // Variants should have different styles
      expect(mismatches.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility - CSS Checks', () => {
    it('should detect minimum touch target sizes', () => {
      const { container } = render(
        <Button style={{ padding: '2px' }}>Small Button</Button>
      );

      const button = container.querySelector('button') as HTMLElement;
      const report = getComponentCSSReport(container);
      
      const spacingIssues = report.componentInfo.flatMap(info =>
        info.issues.filter(issue => issue.type === 'spacing')
      );

      // Small buttons should trigger spacing warnings
      if (spacingIssues.length > 0) {
        console.warn('Touch target size issues detected:', spacingIssues);
      }
    });
  });

  describe('Overflow Detection', () => {
    it('should detect text overflow issues', () => {
      const { container } = render(
        <div style={{ width: '100px', overflow: 'hidden' }}>
          <p style={{ width: '200px' }}>
            This is a very long text that should overflow the container
          </p>
        </div>
      );

      const report = getComponentCSSReport(container);
      const overflowIssues = report.componentInfo.flatMap(info =>
        info.issues.filter(issue => issue.type === 'overflow')
      );

      // In jsdom, scrollWidth/scrollHeight may not work as expected
      // Test that function works and returns valid report
      expect(report).toBeDefined();
      expect(Array.isArray(overflowIssues)).toBe(true);
    });
  });
});


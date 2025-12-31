/**
 * Visual Regression Tests
 * 
 * Automated tests for CSS alignment, floating labels, and visual consistency
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { checkFloatingLabel, checkAlignment, checkVisibility, getStyleSummary } from './css-helpers';
import { 
  getComponentCSSReport, 
  formatCSSReport, 
  detectAllTextOverlaps 
} from './css-detection-helpers';
import { Input } from '../components/Input';
import { TextArea } from '../components/TextArea';

describe('CSS Visual Regression Tests', () => {
  describe('Input Component - Floating Labels', () => {
    it('should position floating label correctly when not floating', () => {
      const { container } = render(
        <Input label="Test Label" floatingLabel />
      );
      
      const input = container.querySelector('input') as HTMLElement;
      const label = container.querySelector('label') as HTMLElement;
      
      expect(input).toBeTruthy();
      expect(label).toBeTruthy();
      
      const result = checkFloatingLabel(label, input, false);
      if (!result.isValid) {
        console.log('Label style:', getStyleSummary(label));
        console.log('Input style:', getStyleSummary(input));
        console.log('Issues:', result.issues);
      }
      expect(result.isValid).toBe(true);
    });
    
    it('should position floating label correctly when floating', () => {
      const { container } = render(
        <Input label="Test Label" floatingLabel value="Test Value" />
      );
      
      const input = container.querySelector('input') as HTMLElement;
      const label = container.querySelector('label') as HTMLElement;
      
      expect(input).toBeTruthy();
      expect(label).toBeTruthy();
      
      const result = checkFloatingLabel(label, input, true);
      if (!result.isValid) {
        console.log('Label style:', getStyleSummary(label));
        console.log('Input style:', getStyleSummary(input));
        console.log('Issues:', result.issues);
      }
      expect(result.isValid).toBe(true);
    });
    
    it('should align label with input text', () => {
      const { container } = render(
        <Input label="Test Label" floatingLabel />
      );
      
      const input = container.querySelector('input') as HTMLElement;
      const label = container.querySelector('label') as HTMLElement;
      
      const inputRect = input.getBoundingClientRect();
      const labelRect = label.getBoundingClientRect();
      
      // Label should align with input padding
      const leftDiff = Math.abs(labelRect.left - inputRect.left);
      expect(leftDiff).toBeLessThan(15);
    });
  });
  
  describe('Input Component - Variants', () => {
    it('should have consistent alignment across variants', () => {
      const variants = ['outlined', 'filled', 'standard'] as const;
      
      variants.forEach(variant => {
        const { container } = render(
          <Input label="Test" floatingLabel variant={variant} />
        );
        
        const input = container.querySelector('input') as HTMLElement;
        const label = container.querySelector('label') as HTMLElement;
        
        expect(input).toBeTruthy();
        expect(label).toBeTruthy();
        
        const result = checkFloatingLabel(label, input, false);
        expect(result.isValid).toBe(true);
      });
    });
  });
  
  describe('Component Visibility', () => {
    it('should ensure all interactive elements are visible', () => {
      const { container } = render(
        <Input label="Test" floatingLabel />
      );
      
      const input = container.querySelector('input') as HTMLElement;
      const label = container.querySelector('label') as HTMLElement;
      
      const inputVisibility = checkVisibility(input);
      const labelVisibility = checkVisibility(label);
      
      expect(inputVisibility.isValid).toBe(true);
      expect(labelVisibility.isValid).toBe(true);
    });
  });
  
  describe('Alignment Consistency', () => {
    it('should have consistent text alignment', () => {
      const { container } = render(
        <Input label="Test" floatingLabel />
      );
      
      const input = container.querySelector('input') as HTMLElement;
      const label = container.querySelector('label') as HTMLElement;
      
      const inputAligned = checkAlignment(input, 'left');
      const labelAligned = checkAlignment(label, 'left');
      
      expect(inputAligned).toBe(true);
      expect(labelAligned).toBe(true);
    });
  });

  describe('Automated CSS Detection', () => {
    it('should automatically detect and report CSS issues', () => {
      const { container } = render(
        <Input label="Test" floatingLabel helperText="Helper" />
      );

      const report = getComponentCSSReport(container);
      
      expect(report).toBeDefined();
      expect(report.summary).toBeDefined();
      
      // Should not have critical errors
      const errors = report.componentInfo.flatMap(info => 
        info.issues.filter(issue => issue.severity === 'error')
      );
      
      expect(errors.length).toBe(0);
      
      // Log report if warnings found
      if (report.summary.warnings > 0) {
        console.log(formatCSSReport(report));
      }
    });

    it('should automatically detect text overlaps', () => {
      const { container } = render(
        <div>
          <Input label="Input 1" />
          <Input label="Input 2" />
        </div>
      );

      const overlaps = detectAllTextOverlaps(container);
      
      // Inputs should not overlap
      expect(overlaps.length).toBe(0);
    });
  });
});


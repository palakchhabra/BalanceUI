import { test, expect } from '@playwright/test';
import type { TestRunnerConfig } from '@storybook/test-runner';

const config: TestRunnerConfig = {
  setup() {
    // Setup before all tests
  },
  
  async preVisit(page) {
    // Wait for components to be fully rendered
    await page.waitForLoadState('networkidle');
  },
  
  async postVisit(page, context) {
    // Visual regression tests
    const element = await page.locator('[data-testid="component"]').first();
    
    if (await element.count() > 0) {
      // Check for common CSS issues
      const issues = await page.evaluate(() => {
        const issues: string[] = [];
        const elements = document.querySelectorAll('[data-testid="component"]');
        
        elements.forEach((el) => {
          const style = window.getComputedStyle(el as HTMLElement);
          
          // Check for missing positioning
          if (style.position === 'absolute' && !style.top && !style.bottom && !style.left && !style.right) {
            issues.push(`Element ${el.className} is absolutely positioned without positioning properties`);
          }
          
          // Check for visibility
          if (style.visibility === 'hidden' || style.display === 'none') {
            issues.push(`Element ${el.className} is not visible`);
          }
          
          // Check for floating labels
          const labels = el.querySelectorAll('label');
          labels.forEach((label) => {
            const labelStyle = window.getComputedStyle(label);
            if (labelStyle.position === 'absolute') {
              const zIndex = parseInt(labelStyle.zIndex);
              if (isNaN(zIndex) || zIndex < 1) {
                issues.push(`Floating label ${label.className} should have z-index`);
              }
            }
          });
        });
        
        return issues;
      });
      
      if (issues.length > 0) {
        console.warn('CSS Issues found:', issues);
      }
    }
  },
  
  tags: {
    include: ['visual'],
    exclude: ['skip-visual'],
  },
};

export default config;


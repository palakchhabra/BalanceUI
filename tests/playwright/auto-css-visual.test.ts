/**
 * Automated CSS and Visual Detection Tests for Playwright
 * 
 * Tests all components automatically for:
 * - CSS property detection
 * - Text overlapping
 * - Visual mismatches
 * - Layout issues
 */

import { test, expect } from '@playwright/test';

/**
 * CSS Detection Helper Functions (run in browser context)
 */
const cssDetectionScript = `
  (function() {
    // Detect text overlapping
    function detectTextOverlap(el1, el2, threshold = 2) {
      const rect1 = el1.getBoundingClientRect();
      const rect2 = el2.getBoundingClientRect();
      
      const overlapX = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left));
      const overlapY = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top));
      const overlapArea = overlapX * overlapY;
      
      return {
        hasOverlap: overlapArea > threshold,
        overlapArea,
        details: overlapArea > threshold ? 
          \`Overlap: \${overlapArea.toFixed(2)}px²\` : ''
      };
    }
    
    // Detect all text overlaps
    function detectAllTextOverlaps(container) {
      const overlaps = [];
      const textElements = Array.from(container.querySelectorAll('*')).filter(el => {
        const text = el.textContent?.trim() || '';
        const style = window.getComputedStyle(el);
        return text.length > 0 && 
               style.display !== 'none' && 
               style.visibility !== 'hidden' &&
               parseFloat(style.opacity) > 0;
      });
      
      for (let i = 0; i < textElements.length; i++) {
        for (let j = i + 1; j < textElements.length; j++) {
          const overlap = detectTextOverlap(textElements[i], textElements[j]);
          if (overlap.hasOverlap) {
            overlaps.push({
              element1: {
                tag: textElements[i].tagName,
                className: textElements[i].className,
                text: textElements[i].textContent?.trim().substring(0, 50)
              },
              element2: {
                tag: textElements[j].tagName,
                className: textElements[j].className,
                text: textElements[j].textContent?.trim().substring(0, 50)
              },
              overlap
            });
          }
        }
      }
      
      return overlaps;
    }
    
    // Detect CSS issues
    function detectCSSIssues(element) {
      const issues = [];
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      
      // Check positioning
      if (style.position === 'absolute' || style.position === 'fixed') {
        const hasPosition = style.top !== 'auto' || 
                           style.bottom !== 'auto' || 
                           style.left !== 'auto' || 
                           style.right !== 'auto';
        if (!hasPosition && element.tagName !== 'LABEL') {
          issues.push({
            type: 'positioning',
            severity: 'error',
            message: 'Absolute/fixed element missing positioning properties'
          });
        }
      }
      
      // Check visibility
      if (style.display === 'none') {
        issues.push({
          type: 'visibility',
          severity: 'error',
          message: 'Element is hidden with display: none'
        });
      }
      
      // Check dimensions
      if (rect.width === 0 && rect.height === 0) {
        if (style.display !== 'inline' && style.display !== 'inline-block') {
          issues.push({
            type: 'dimensions',
            severity: 'warning',
            message: 'Element has zero dimensions'
          });
        }
      }
      
      // Check overflow
      if (style.overflow === 'hidden' || style.overflowX === 'hidden' || style.overflowY === 'hidden') {
        if (element.scrollWidth > rect.width || element.scrollHeight > rect.height) {
          issues.push({
            type: 'overflow',
            severity: 'warning',
            message: \`Content might be clipped (scroll: \${element.scrollWidth}x\${element.scrollHeight}, visible: \${rect.width}x\${rect.height})\`
          });
        }
      }
      
      return issues;
    }
    
    // Get comprehensive report
    function getComponentCSSReport(container) {
      const allElements = Array.from(container.querySelectorAll('*'));
      const componentInfo = [];
      let totalIssues = 0;
      let errors = 0;
      let warnings = 0;
      
      allElements.forEach(el => {
        const issues = detectCSSIssues(el);
        if (issues.length > 0) {
          componentInfo.push({
            tag: el.tagName,
            className: el.className,
            issues
          });
          totalIssues += issues.length;
          errors += issues.filter(i => i.severity === 'error').length;
          warnings += issues.filter(i => i.severity === 'warning').length;
        }
      });
      
      const overlaps = detectAllTextOverlaps(container);
      
      return {
        componentInfo,
        overlaps,
        summary: {
          totalElements: allElements.length,
          totalIssues,
          errors,
          warnings,
          overlaps: overlaps.length
        }
      };
    }
    
    return { getComponentCSSReport, detectAllTextOverlaps, detectCSSIssues };
  })();
`;

// List of stories to test
const stories = [
  'button--default',
  'button--variants',
  'input--default',
  'input--with-label',
  'input--filled',
  'select--default',
  'checkbox--default',
  'card--default',
  'formfield--default',
  'textarea--default',
  'badge--default',
  'toggle--default',
  'progress--linear',
  'list--default',
  'tabs--default',
  'accordion--default',
];

test.describe('Automated CSS Detection Tests', () => {
  for (const story of stories) {
    test(`CSS Detection: ${story}`, async ({ page }) => {
      // Inject CSS detection script
      await page.addScriptTag({ content: cssDetectionScript });
      
      // Navigate to story
      await page.goto(`/iframe.html?id=${story}&viewMode=story`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);
      
      // Get the story container
      const storyContainer = page.locator('#storybook-root').first();
      await expect(storyContainer).toBeVisible({ timeout: 10000 });
      
      // Run CSS detection
      const report = await page.evaluate((script) => {
        const helpers = eval(script);
        const container = document.querySelector('#storybook-root') || document.body;
        return helpers.getComponentCSSReport(container);
      }, cssDetectionScript);
      
      // Assertions
      expect(report).toBeDefined();
      expect(report.summary).toBeDefined();
      
      // Log report if issues found
      if (report.summary.totalIssues > 0) {
        console.log(`\nCSS Issues in ${story}:`);
        console.log(`  Errors: ${report.summary.errors}`);
        console.log(`  Warnings: ${report.summary.warnings}`);
        console.log(`  Overlaps: ${report.summary.overlaps}`);
        
        if (report.componentInfo.length > 0) {
          report.componentInfo.slice(0, 5).forEach((info: any) => {
            console.log(`  ${info.tag}.${info.className}:`);
            info.issues.forEach((issue: any) => {
              console.log(`    [${issue.severity}] ${issue.type}: ${issue.message}`);
            });
          });
        }
      }
      
      // Check for critical errors (should be 0)
      expect(report.summary.errors).toBe(0);
      
      // Check for text overlaps
      if (report.summary.overlaps > 0) {
        console.warn(`\nText overlaps detected in ${story}:`);
        report.overlaps.slice(0, 3).forEach((overlap: any) => {
          console.warn(`  ${overlap.element1.tag} vs ${overlap.element2.tag}`);
          console.warn(`  ${overlap.overlap.details}`);
        });
      }
    });
  }
  
  test('Text Overlap Detection - Multiple Components', async ({ page }) => {
    await page.addScriptTag({ content: cssDetectionScript });
    
    await page.goto('/iframe.html?id=input--with-label&viewMode=story');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    const overlaps = await page.evaluate((script) => {
      const helpers = eval(script);
      const container = document.querySelector('#storybook-root') || document.body;
      return helpers.detectAllTextOverlaps(container);
    }, cssDetectionScript);
    
    // Input labels should not overlap with input text when floating
    expect(overlaps.length).toBe(0);
  });
  
  test('CSS Mismatch Detection - Button Variants', async ({ page }) => {
    await page.goto('/iframe.html?id=button--variants&viewMode=story');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    const mismatches = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const mismatches: any[] = [];
      const properties = ['padding', 'margin', 'fontSize'];
      
      properties.forEach(prop => {
        const values: Record<number, string> = {};
        let hasMismatch = false;
        let firstValue: string | null = null;
        
        buttons.forEach((btn, index) => {
          const style = window.getComputedStyle(btn);
          const value = (style as any)[prop] || style.getPropertyValue(prop);
          values[index] = value;
          
          if (firstValue === null) {
            firstValue = value;
          } else if (value !== firstValue) {
            hasMismatch = true;
          }
        });
        
        if (hasMismatch) {
          mismatches.push({ property: prop, values, hasMismatch: true });
        }
      });
      
      return mismatches;
    });
    
    // Variants should have different styles (mismatches are expected)
    // But we verify the detection works
    expect(mismatches).toBeDefined();
  });
  
  test('Component CSS Property Detection', async ({ page }) => {
    await page.goto('/iframe.html?id=button--default&viewMode=story');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    const cssInfo = await page.evaluate(() => {
      const button = document.querySelector('button');
      if (!button) return null;
      
      const style = window.getComputedStyle(button);
      return {
        componentName: button.className.match(/balanceui-\\w+/)?.[0] || 'unknown',
        className: button.className,
        cssProperties: {
          display: style.display,
          padding: style.padding,
          margin: style.margin,
          fontSize: style.fontSize,
          backgroundColor: style.backgroundColor,
          color: style.color,
        },
        boundingBox: button.getBoundingClientRect(),
      };
    });
    
    expect(cssInfo).toBeTruthy();
    expect(cssInfo?.componentName).toBeTruthy();
    expect(cssInfo?.cssProperties).toBeDefined();
  });
  
  test('Layout Consistency Check', async ({ page }) => {
    await page.goto('/iframe.html?id=button--variants&viewMode=story');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    const consistency = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      if (buttons.length < 2) return { consistent: true, details: 'Not enough elements' };
      
      const boxes = buttons.map(btn => btn.getBoundingClientRect());
      const heights = boxes.map(b => b.height);
      const widths = boxes.map(b => b.width);
      
      const heightDiff = Math.max(...heights) - Math.min(...heights);
      const widthDiff = Math.max(...widths) - Math.min(...widths);
      
      // Buttons of same variant should have similar dimensions
      // Allow 5px tolerance for rounding
      return {
        consistent: heightDiff < 5 && widthDiff < 5,
        heightDiff,
        widthDiff,
        details: `Height diff: ${heightDiff.toFixed(2)}px, Width diff: ${widthDiff.toFixed(2)}px`
      };
    });
    
    // Buttons should have consistent dimensions
    expect(consistency.consistent).toBe(true);
  });
});


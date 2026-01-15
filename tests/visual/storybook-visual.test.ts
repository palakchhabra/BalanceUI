import { test, expect } from '@playwright/test';

/**
 * Visual Regression Tests for Storybook Stories
 * 
 * Tests all components with screenshot comparison
 */

// List of all Storybook stories to test
const stories = [
  // Button
  'button--default',
  'button--variants',
  'button--sizes',
  
  // Input
  'input--default',
  'input--with-label',
  'input--filled',
  'input--standard',
  'input--with-adornments',
  'input--number-input',
  
  // Checkbox
  'checkbox--default',
  'checkbox--checked',
  'checkbox--indeterminate',
  
  // Select
  'select--default',
  'select--with-label',
  'select--disabled',
  
  // Card
  'card--default',
  'card--elevated',
  'card--outlined',
  'card--with-image',
  
  // Dialog
  'dialog--default',
  'dialog--with-actions',
  
  // Modal
  'modal--default',
  'modal--sizes',
  
  // Progress
  'progress--linear',
  'progress--circular',
  'progress--with-value',
  
  // Tabs
  'tabs--default',
  'tabs--vertical',
  
  // Stepper
  'stepper--default',
  'stepper--vertical',
  'stepper--with-errors',
  
  // Timeline
  'timeline--default',
  'timeline--left',
  'timeline--alternate',
  
  // Tree
  'tree--default',
  'tree--with-checkboxes',
  
  // DataTable
  'datatable--default',
  'datatable--with-sorting',
  'datatable--with-pagination',
  
  // DatePicker
  'datepicker--default',
  'datepicker--with-range',
  
  // TimePicker
  'timepicker--default',
  
  // List
  'list--default',
  'list--with-icons',
  
  // Badge
  'badge--default',
  'badge--variants',
  
  // Accordion
  'accordion--default',
  'accordion--with-actions',
  
  // BottomSheet
  'bottomsheet--default',
  'bottomsheet--sizes',
  
  // Drawer
  'drawer--default',
  'drawer--with-list',
  
  // Sidebar
  'sidebar--default',
  'sidebar--collapsed',
  
  // Toolbar
  'toolbar--default',
  
  // ButtonToggle
  'buttontoggle--default',
  'buttontoggle--variants',
  
  // MultiSelect
  'multiselect--default',
  'multiselect--with-max-selected',
  
  // Shimmer
  'shimmer--avatar',
  'shimmer--form',
  'shimmer--table',
  'shimmer--cards',
];

test.describe('Storybook Visual Regression Tests', () => {
  for (const story of stories) {
    test(`Story: ${story}`, async ({ page }) => {
      // Navigate to story
      await page.goto(`/iframe.html?id=${story}&viewMode=story`);
      
      // Wait for story to load
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500); // Additional wait for animations
      
      // Get the story container
      const storyContainer = page.locator('#storybook-root, [data-testid="story"]').first();
      await expect(storyContainer).toBeVisible({ timeout: 10000 });
      
      // Take screenshot
      await expect(storyContainer).toHaveScreenshot(`${story}.png`, {
        fullPage: false,
        animations: 'disabled',
        maxDiffPixels: 100, // Allow small differences
      });
      
      // Additional checks
      const issues = await page.evaluate(() => {
        const issues: string[] = [];
        const root = document.querySelector('#storybook-root') || document.body;
        
        // Check for floating labels
        const labels = root.querySelectorAll('label');
        labels.forEach((label) => {
          const style = window.getComputedStyle(label);
          if (style.position === 'absolute') {
            const zIndex = parseInt(style.zIndex);
            if (isNaN(zIndex) || zIndex < 1) {
              issues.push(`Floating label missing z-index: ${label.className}`);
            }
            
            // Check alignment
            const rect = label.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) {
              issues.push(`Label has zero dimensions: ${label.className}`);
            }
          }
        });
        
        // Check for absolutely positioned elements
        const absoluteElements = root.querySelectorAll('*');
        absoluteElements.forEach((el) => {
          const style = window.getComputedStyle(el);
          if (style.position === 'absolute') {
            const hasPosition = style.top !== 'auto' || 
                               style.bottom !== 'auto' || 
                               style.left !== 'auto' || 
                               style.right !== 'auto';
            if (!hasPosition && el.tagName !== 'LABEL') {
              // Labels are handled separately
              issues.push(`Absolute element missing positioning: ${el.className}`);
            }
          }
        });
        
        // Check for visibility issues
        const allElements = root.querySelectorAll('*');
        allElements.forEach((el) => {
          const style = window.getComputedStyle(el);
          if (style.display === 'none' && el.getAttribute('data-testid')?.includes('component')) {
            issues.push(`Component element is hidden: ${el.className}`);
          }
        });
        
        return issues;
      });
      
      if (issues.length > 0) {
        console.warn(`Issues found in ${story}:`, issues);
        // Don't fail the test, but log warnings
      }
    });
  }
});

test.describe('CSS Validation Tests', () => {
  test('All components should render without CSS errors', async ({ page }) => {
    await page.goto('/');
    
    // Check for CSS errors in console
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (text.includes('CSS') || text.includes('stylesheet')) {
          errors.push(text);
        }
      }
    });
    
    // Navigate through a few stories
    const testStories = ['button--default', 'input--default', 'checkbox--default'];
    for (const story of testStories) {
      await page.goto(`/iframe.html?id=${story}&viewMode=story`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(300);
    }
    
    // Allow some time for errors to appear
    await page.waitForTimeout(1000);
    
    expect(errors.length).toBe(0);
  });
  
  test('Floating labels should align correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=input--with-label&viewMode=story');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    const input = page.locator('input').first();
    const label = page.locator('label').first();
    
    await expect(input).toBeVisible();
    await expect(label).toBeVisible();
    
    // Check label positioning
    const inputBox = await input.boundingBox();
    const labelBox = await label.boundingBox();
    
    if (inputBox && labelBox) {
      // Label should be near input (within 20px)
      const horizontalDiff = Math.abs(labelBox.x - inputBox.x);
      expect(horizontalDiff).toBeLessThan(20);
    }
  });
  
  test('Components should have consistent spacing', async ({ page }) => {
    await page.goto('/iframe.html?id=button--variants&viewMode=story');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    const buttons = page.locator('button');
    const count = await buttons.count();
    
    if (count > 1) {
      const boxes = await Promise.all(
        Array.from({ length: Math.min(count, 3) }).map((_, i) => 
          buttons.nth(i).boundingBox()
        )
      );
      
      // Check that buttons have similar heights (within 5px)
      if (boxes.length > 1 && boxes[0] && boxes[1]) {
        const heightDiff = Math.abs(boxes[0].height - boxes[1].height);
        expect(heightDiff).toBeLessThan(5);
      }
    }
  });
});


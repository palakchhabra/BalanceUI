/**
 * Visual Test Helpers
 */

import { Page, expect } from '@playwright/test';

/**
 * Wait for story to be fully loaded
 */
export async function waitForStory(page: Page, timeout = 10000) {
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('#storybook-root, [data-testid="story"]', { timeout });
  await page.waitForTimeout(500); // Wait for animations
}

/**
 * Check for CSS issues in a story
 */
export async function checkCSSIssues(page: Page): Promise<string[]> {
  return await page.evaluate(() => {
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
        
        const rect = label.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          issues.push(`Label has zero dimensions: ${label.className}`);
        }
      }
    });
    
    // Check for absolutely positioned elements
    const allElements = root.querySelectorAll('*');
    allElements.forEach((el) => {
      const style = window.getComputedStyle(el);
      if (style.position === 'absolute') {
        const hasPosition = style.top !== 'auto' || 
                           style.bottom !== 'auto' || 
                           style.left !== 'auto' || 
                           style.right !== 'auto';
        if (!hasPosition && el.tagName !== 'LABEL' && !el.className.includes('ripple')) {
          issues.push(`Absolute element missing positioning: ${el.className}`);
        }
      }
      
      // Check for visibility
      if (style.display === 'none' && el.getAttribute('data-testid')?.includes('component')) {
        issues.push(`Component element is hidden: ${el.className}`);
      }
    });
    
    return issues;
  });
}

/**
 * Get all story IDs from Storybook
 */
export async function getAllStoryIds(page: Page): Promise<string[]> {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  
  // Try to get stories from Storybook API
  const stories = await page.evaluate(() => {
    // @ts-ignore
    if (window.__STORYBOOK_STORY_STORE__) {
      // @ts-ignore
      const store = window.__STORYBOOK_STORY_STORE__;
      return Object.keys(store._stories || {});
    }
    return [];
  });
  
  return stories;
}

/**
 * Take screenshot with consistent settings
 */
export async function takeScreenshot(
  page: Page,
  selector: string,
  name: string,
  options: { fullPage?: boolean; maxDiffPixels?: number } = {}
) {
  const element = page.locator(selector).first();
  await expect(element).toBeVisible({ timeout: 10000 });
  
  await expect(element).toHaveScreenshot(`${name}.png`, {
    fullPage: options.fullPage || false,
    animations: 'disabled',
    maxDiffPixels: options.maxDiffPixels || 100,
  });
}


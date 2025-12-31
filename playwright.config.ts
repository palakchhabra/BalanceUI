import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for Visual Regression Testing
 * 
 * Tests all Storybook stories with screenshot comparison
 */
export default defineConfig({
  testDir: './tests/playwright',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // Use multiple workers for parallel execution
  // In CI: use 4 workers (or 50% of CPU cores if available)
  // Locally: use 50% of CPU cores
  workers: process.env.CI ? 4 : '50%',
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list'],
  ],
  
  use: {
    baseURL: 'http://localhost:6006',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  
  outputDir: 'test-results/',

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'npm run storybook',
    url: 'http://localhost:6006',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});


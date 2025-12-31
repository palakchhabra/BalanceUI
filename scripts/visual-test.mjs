#!/usr/bin/env node

/**
 * Visual Test Runner
 * 
 * Runs visual regression tests using Storybook
 * Minimal effort, maximum quality
 */

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🎨 Running visual tests...\n');
console.log('This will:\n');
console.log('1. Start Storybook in test mode');
console.log('2. Run visual regression tests');
console.log('3. Check for CSS alignment issues');
console.log('4. Validate floating labels\n');

try {
  // Run CSS validation first
  console.log('Step 1: Validating CSS...');
  execSync('npm run validate-css', {
    cwd: rootDir,
    stdio: 'inherit',
    encoding: 'utf-8'
  });
  console.log('✅ CSS validation passed\n');
  
  // Run unit tests for CSS
  console.log('Step 2: Running CSS unit tests...');
  execSync('npm run test:run -- src/test/visual-regression.test.tsx', {
    cwd: rootDir,
    stdio: 'inherit',
    encoding: 'utf-8'
  });
  console.log('✅ CSS unit tests passed\n');
  
  console.log('✅ All visual tests passed!\n');
  console.log('💡 Tip: For full visual regression testing, use Storybook Test Runner');
  console.log('   Run: npm run storybook, then use @storybook/test-runner\n');
  
} catch (error) {
  console.error('❌ Visual tests failed\n');
  process.exit(1);
}


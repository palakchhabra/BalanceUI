#!/usr/bin/env node

/**
 * Comprehensive Test Runner
 * 
 * Runs all CSS and visual tests
 */

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🚀 Running Comprehensive CSS and Visual Tests...\n');

const tests = [
  {
    name: '1. Basic CSS Validation',
    command: 'npm run validate-css',
    required: false,
  },
  {
    name: '2. Stylelint (CSS Linting)',
    command: 'npm run lint:css:check',
    required: true,
  },
  {
    name: '3. Enhanced CSS Validation (Corruption Check)',
    command: 'npm run validate-css-enhanced',
    required: true,
  },
  {
    name: '4. Unit Visual Regression Tests',
    command: 'npm run test:run -- src/test/visual-regression.test.tsx',
    required: true,
  },
  {
    name: '5. Playwright Visual Tests (Screenshots)',
    command: 'npm run test:visual',
    required: false, // Optional - requires Storybook running
  },
];

let failed = false;
const results = [];

for (const test of tests) {
  try {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Running: ${test.name}`);
    console.log('='.repeat(60) + '\n');
    
    execSync(test.command, {
      cwd: rootDir,
      stdio: 'inherit',
      encoding: 'utf-8'
    });
    
    console.log(`\n✅ ${test.name} passed\n`);
    results.push({ name: test.name, status: 'passed' });
  } catch (error) {
    if (test.required) {
      console.error(`\n❌ ${test.name} failed\n`);
      results.push({ name: test.name, status: 'failed' });
      failed = true;
    } else {
      console.warn(`\n⚠️  ${test.name} skipped (not required)\n`);
      results.push({ name: test.name, status: 'skipped' });
    }
  }
}

// Print summary
console.log('\n' + '='.repeat(60));
console.log('TEST SUMMARY');
console.log('='.repeat(60) + '\n');

results.forEach(result => {
  const icon = result.status === 'passed' ? '✅' : result.status === 'failed' ? '❌' : '⚠️';
  console.log(`${icon} ${result.name}: ${result.status}`);
});

console.log('');

if (failed) {
  console.error('❌ Some required tests failed. Please fix the errors.\n');
  process.exit(1);
} else {
  console.log('✅ All required tests passed!\n');
  console.log('💡 Tip: Run "npm run test:visual" for full screenshot testing');
  console.log('   (Requires Storybook to be running)\n');
  process.exit(0);
}


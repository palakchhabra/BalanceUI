#!/usr/bin/env node

/**
 * CSS Test Runner
 * 
 * Runs CSS validation and visual regression tests
 */

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🎨 Running CSS tests...\n');

const tests = [
  {
    name: 'CSS Validation',
    command: 'node scripts/validate-css.mjs',
    required: false,
  },
  {
    name: 'Stylelint (CSS Linting)',
    command: 'npm run lint:css:check',
    required: true,
  },
  {
    name: 'Enhanced CSS Validation',
    command: 'node scripts/validate-css-enhanced.mjs',
    required: true,
  },
  {
    name: 'Visual Regression Tests',
    command: 'npm run test:run -- src/test/visual-regression.test.tsx',
    required: true,
  },
];

let failed = false;

for (const test of tests) {
  try {
    console.log(`Running: ${test.name}...`);
    execSync(test.command, {
      cwd: rootDir,
      stdio: 'inherit',
      encoding: 'utf-8'
    });
    console.log(`✅ ${test.name} passed\n`);
  } catch (error) {
    if (test.required) {
      console.error(`❌ ${test.name} failed\n`);
      failed = true;
    } else {
      console.warn(`⚠️  ${test.name} skipped (not required)\n`);
    }
  }
}

if (failed) {
  console.error('❌ CSS tests failed. Please fix the errors.\n');
  process.exit(1);
}

console.log('✅ All CSS tests passed!\n');
process.exit(0);


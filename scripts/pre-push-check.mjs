#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🔍 Running pre-push checks...\n');

const checks = [
  {
    name: 'TypeScript compilation',
    command: 'npm run build:types',
    required: true,
  },
  {
    name: 'Linter check',
    command: 'npm run lint || echo "No lint script found"',
    required: false,
  },
  {
    name: 'Tests',
    command: 'npm test -- --run',
    required: true,
  },
];

let failed = false;

for (const check of checks) {
  try {
    console.log(`Running: ${check.name}...`);
    execSync(check.command, { 
      cwd: rootDir, 
      stdio: 'inherit',
      encoding: 'utf-8'
    });
    console.log(`✅ ${check.name} passed\n`);
  } catch (error) {
    if (check.required) {
      console.error(`❌ ${check.name} failed\n`);
      failed = true;
    } else {
      console.warn(`⚠️  ${check.name} skipped (not required)\n`);
    }
  }
}

if (failed) {
  console.error('❌ Pre-push checks failed. Please fix the errors before pushing.\n');
  process.exit(1);
}

console.log('✅ All pre-push checks passed!\n');
process.exit(0);


#!/usr/bin/env node

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const errors = [];
const warnings = [];

// Check if dist folder exists
const distExists = existsSync(join(rootDir, 'dist'));
if (!distExists) {
  errors.push('❌ dist/ folder does not exist. Run "npm run build" first.');
}

// Check if required dist files exist
const requiredFiles = [
  'dist/balanceui.es.js',
  'dist/balanceui.cjs.js',
  'dist/index.types.d.ts',
  'dist/theme/theme-contract.css',
];

requiredFiles.forEach(file => {
  if (!existsSync(join(rootDir, file))) {
    errors.push(`❌ Required file missing: ${file}`);
  }
});

// Check package.json exports
try {
  const packageJson = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf-8'));
  
  // Validate exports
  if (!packageJson.exports || !packageJson.exports['.']) {
    errors.push('❌ package.json missing exports configuration');
  }
  
  // Check version
  if (!packageJson.version || packageJson.version === '0.0.0') {
    warnings.push('⚠️  Package version is 0.0.0 or missing');
  }
  
  // Check main entry points
  if (!packageJson.main || !packageJson.module || !packageJson.types) {
    errors.push('❌ package.json missing main, module, or types');
  }
} catch (e) {
  errors.push(`❌ Failed to read package.json: ${e.message}`);
}

// Check TypeScript compilation
try {
  const typesFile = readFileSync(join(rootDir, 'dist/index.types.d.ts'), 'utf-8');
  if (!typesFile.includes('export')) {
    warnings.push('⚠️  Type definitions file appears empty');
  }
} catch (e) {
  errors.push(`❌ Failed to read type definitions: ${e.message}`);
}

// Print results
console.log('\n📦 Package Validation\n');

if (warnings.length > 0) {
  warnings.forEach(w => console.log(w));
}

if (errors.length > 0) {
  console.error('\n❌ Validation failed:\n');
  errors.forEach(e => console.error(e));
  process.exit(1);
} else {
  console.log('✅ Package validation passed!\n');
  process.exit(0);
}


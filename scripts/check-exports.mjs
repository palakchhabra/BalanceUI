#!/usr/bin/env node

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Read component index
const componentIndex = readFileSync(join(rootDir, 'src/components/index.ts'), 'utf-8');

// Extract exported components
const exports = componentIndex.match(/export \* from ['"].*['"]/g) || [];
const exportedComponents = exports.map(e => {
  const match = e.match(/from ['"](.*)['"]/);
  return match ? match[1].replace('./', '') : null;
}).filter(Boolean);

console.log('📋 Checking component exports...\n');

// Check if all components are exported
const componentDirs = readdirSync(join(rootDir, 'src/components'))
  .filter(item => {
    const itemPath = join(rootDir, 'src/components', item);
    return statSync(itemPath).isDirectory() && item !== 'index.ts';
  });

const missingExports = componentDirs.filter(dir => {
  // Check if component is exported (case-insensitive)
  return !exportedComponents.some(exp => 
    exp.toLowerCase() === dir.toLowerCase() || 
    exp.toLowerCase().replace('./', '') === dir.toLowerCase()
  );
});

if (missingExports.length > 0) {
  console.error('❌ Missing exports:\n');
  missingExports.forEach(comp => console.error(`  - ${comp}`));
  console.error('\nPlease add exports to src/components/index.ts\n');
  process.exit(1);
}

console.log(`✅ All ${componentDirs.length} components are exported!\n`);
process.exit(0);


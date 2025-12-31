#!/usr/bin/env node

/**
 * CSS Validation Script
 * 
 * Checks for common CSS issues:
 * - Floating label alignment
 * - Missing position properties
 * - Inconsistent spacing
 * - Missing transitions
 * - Z-index issues
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const errors = [];
const warnings = [];

console.log('🎨 Validating CSS files...\n');

// Common CSS issues to check
const checks = {
  floatingLabel: {
    pattern: /\.balanceui.*label.*floating|floating.*label/i,
    required: ['position: absolute', 'top', 'transform', 'z-index'],
    message: 'Floating labels must have position, top, transform, and z-index'
  },
  absolutePosition: {
    pattern: /position:\s*absolute/i,
    required: ['top', 'left', 'right', 'bottom'],
    message: 'Absolute positioned elements should have positioning properties'
  },
  flexbox: {
    pattern: /display:\s*flex/i,
    recommended: ['align-items', 'justify-content', 'gap'],
    message: 'Flexbox containers should have alignment properties'
  },
  transition: {
    pattern: /transition/i,
    recommended: ['transition'],
    message: 'Interactive elements should have transitions'
  }
};

// Get all CSS files
const getCSSFiles = (dir) => {
  const files = [];
  const items = readdirSync(dir);
  
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      files.push(...getCSSFiles(fullPath));
    } else if (item.endsWith('.css')) {
      files.push(fullPath);
    }
  }
  
  return files;
};

const cssFiles = getCSSFiles(join(rootDir, 'src'));

// Validate each CSS file
for (const file of cssFiles) {
  const content = readFileSync(file, 'utf-8');
  const relativePath = file.replace(rootDir + '\\', '').replace(rootDir + '/', '');
  
  // Check for floating labels
  if (content.match(checks.floatingLabel.pattern)) {
    const hasRequired = checks.floatingLabel.required.every(prop => 
      content.includes(prop) || content.includes(prop.replace(':', ''))
    );
    
    if (!hasRequired) {
      warnings.push(`⚠️  ${relativePath}: ${checks.floatingLabel.message}`);
    }
  }
  
  // Check for absolute positioning without positioning properties
  const absoluteMatches = content.matchAll(/\.([\w-]+)\s*\{[^}]*position:\s*absolute[^}]*\}/gi);
  for (const match of absoluteMatches) {
    const selector = match[1];
    const block = match[0];
    const hasPositioning = checks.absolutePosition.required.some(prop => 
      block.includes(prop)
    );
    
    if (!hasPositioning) {
      warnings.push(`⚠️  ${relativePath}: Absolute positioned element "${selector}" may be missing positioning properties`);
    }
  }
  
  // Check for flexbox without alignment
  const flexMatches = content.matchAll(/\.([\w-]+)\s*\{[^}]*display:\s*flex[^}]*\}/gi);
  for (const match of flexMatches) {
    const selector = match[1];
    const block = match[0];
    const hasAlignment = checks.flexbox.recommended.some(prop => 
      block.includes(prop)
    );
    
    if (!hasAlignment && !selector.includes('stepper') && !selector.includes('timeline')) {
      // Some flex containers don't need alignment (like stepper/timeline)
      warnings.push(`💡 ${relativePath}: Flexbox container "${selector}" may benefit from alignment properties`);
    }
  }
  
  // Check for missing design tokens
  const hardcodedValues = content.match(/\b(\d+)px\b/g);
  if (hardcodedValues && hardcodedValues.length > 10) {
    warnings.push(`💡 ${relativePath}: Consider using design tokens instead of hardcoded pixel values`);
  }
  
  // Check for missing transitions on interactive elements
  const interactiveSelectors = content.match(/\.([\w-]+):hover|\.[\w-]+:focus|\.[\w-]+:active/gi);
  if (interactiveSelectors) {
    const hasTransition = content.includes('transition');
    if (!hasTransition) {
      warnings.push(`💡 ${relativePath}: Interactive elements should have transitions`);
    }
  }
}

// Print results
if (warnings.length > 0) {
  console.log('Warnings:\n');
  warnings.forEach(w => console.log(w));
  console.log('');
}

if (errors.length > 0) {
  console.error('Errors:\n');
  errors.forEach(e => console.error(e));
  console.error('');
  process.exit(1);
}

console.log(`✅ CSS validation completed. Found ${warnings.length} warnings, ${errors.length} errors.\n`);
process.exit(0);


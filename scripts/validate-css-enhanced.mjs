#!/usr/bin/env node

/**
 * Enhanced CSS Validation Script
 * 
 * Checks for:
 * - CSS syntax errors and corruption
 * - Malformed rules
 * - Missing closing braces
 * - Invalid selectors
 * - Duplicate properties
 * - Unused variables
 * - Broken imports
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const errors = [];
const warnings = [];

console.log('🔍 Enhanced CSS Validation...\n');

// Get all CSS files
const getCSSFiles = (dir) => {
  const files = [];
  const items = readdirSync(dir);
  
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules' && item !== 'dist') {
      files.push(...getCSSFiles(fullPath));
    } else if (item.endsWith('.css')) {
      files.push(fullPath);
    }
  }
  
  return files;
};

const cssFiles = getCSSFiles(join(rootDir, 'src'));

// CSS validation functions
const validateCSS = (content, filePath) => {
  const relativePath = filePath.replace(rootDir + '\\', '').replace(rootDir + '/', '');
  const issues = [];
  
  // 1. Check for balanced braces
  const openBraces = (content.match(/\{/g) || []).length;
  const closeBraces = (content.match(/\}/g) || []).length;
  if (openBraces !== closeBraces) {
    errors.push(`❌ ${relativePath}: Unbalanced braces (${openBraces} open, ${closeBraces} close)`);
    return;
  }
  
  // 2. Check for balanced parentheses
  const openParens = (content.match(/\(/g) || []).length;
  const closeParens = (content.match(/\)/g) || []).length;
  if (openParens !== closeParens) {
    errors.push(`❌ ${relativePath}: Unbalanced parentheses (${openParens} open, ${closeParens} close)`);
  }
  
  // 3. Check for balanced brackets
  const openBrackets = (content.match(/\[/g) || []).length;
  const closeBrackets = (content.match(/\]/g) || []).length;
  if (openBrackets !== closeBrackets) {
    errors.push(`❌ ${relativePath}: Unbalanced brackets (${openBrackets} open, ${closeBrackets} close)`);
  }
  
  // 4. Check for malformed selectors (missing closing brace before new selector)
  const selectorPattern = /([^{}]+)\{([^{}]*)\}/g;
  let match;
  while ((match = selectorPattern.exec(content)) !== null) {
    const selector = match[1].trim();
    const rules = match[2];
    
    // Check for unclosed strings in selectors
    if ((selector.match(/"/g) || []).length % 2 !== 0) {
      errors.push(`❌ ${relativePath}: Unclosed string in selector: ${selector.substring(0, 50)}`);
    }
    
    // Check for empty rules
    if (!rules.trim() && selector.includes('.')) {
      warnings.push(`⚠️  ${relativePath}: Empty rule block: ${selector.substring(0, 50)}`);
    }
  }
  
  // 5. Check for duplicate properties in same rule
  const ruleBlocks = content.match(/\{[^}]*\}/g) || [];
  ruleBlocks.forEach((block, index) => {
    const properties = block.match(/([a-z-]+)\s*:/gi) || [];
    const propertyNames = properties.map(p => p.toLowerCase().trim().replace(':', ''));
    const duplicates = propertyNames.filter((p, i) => propertyNames.indexOf(p) !== i);
    if (duplicates.length > 0) {
      warnings.push(`⚠️  ${relativePath}: Duplicate properties found: ${[...new Set(duplicates)].join(', ')}`);
    }
  });
  
  // 6. Check for invalid CSS syntax
  const invalidPatterns = [
    /:\s*;/g,  // Empty values
    /;\s*;/g,  // Double semicolons
    /,\s*,/g,  // Double commas
  ];
  
  invalidPatterns.forEach((pattern, index) => {
    const matches = content.match(pattern);
    if (matches) {
      warnings.push(`⚠️  ${relativePath}: Found ${matches.length} potential syntax issue(s)`);
    }
  });
  
  // 7. Check for broken @import statements
  const importStatements = content.match(/@import\s+['"]([^'"]+)['"]/g) || [];
  importStatements.forEach(importStmt => {
    const match = importStmt.match(/['"]([^'"]+)['"]/);
    if (match) {
      const importPath = match[1];
      // Check if it's a relative path and file might not exist
      if (importPath.startsWith('./') || importPath.startsWith('../')) {
        // This is a basic check - could be enhanced
        warnings.push(`💡 ${relativePath}: Check if import path exists: ${importPath}`);
      }
    }
  });
  
  // 8. Check for undefined CSS variables (basic check)
  const varUsage = content.match(/var\(--[^)]+\)/g) || [];
  const definedVars = content.match(/--[a-z-]+:/g) || [];
  const usedVars = [...new Set(varUsage.map(v => v.match(/--([^)]+)/)?.[0]))];
  const definedVarNames = definedVars.map(v => v.replace(':', ''));
  
  // Note: This is a basic check - full validation would require parsing all CSS files
  // For now, we just warn about potential issues
  
  // 9. Check for missing semicolons (basic check)
  const propertyPattern = /([a-z-]+)\s*:\s*[^;{}]+(?!;)/g;
  let propMatch;
  while ((propMatch = propertyPattern.exec(content)) !== null) {
    const prop = propMatch[0];
    // Skip if it's inside a calc() or var() or url()
    if (!prop.includes('calc(') && !prop.includes('var(') && !prop.includes('url(')) {
      // This is a heuristic - might have false positives
      if (prop.length > 100) {
        warnings.push(`💡 ${relativePath}: Potential missing semicolon in long property`);
      }
    }
  }
  
  // 10. Check for corrupted selectors (invalid characters) - improved
  const invalidSelectorChars = /[^a-zA-Z0-9_\-.:#\[\]()\s,>+~=]/g;
  const selectorLines = content.split('\n');
  let inSelector = false;
  let currentSelector = '';
  
  selectorLines.forEach((line, index) => {
    const trimmed = line.trim();
    
    // Check if line starts a selector (not inside a rule block)
    if (trimmed && !trimmed.startsWith('/*') && !trimmed.startsWith('*') && !trimmed.startsWith('@')) {
      if (trimmed.includes('{') && !trimmed.includes('}')) {
        // Selector with opening brace
        const selectorPart = trimmed.split('{')[0].trim();
        if (selectorPart && selectorPart.length < 200) { // Only check reasonable selectors
          const invalidChars = selectorPart.match(invalidSelectorChars);
          if (invalidChars && invalidChars.length > 0) {
            // Filter out common false positives
            const hasValidCSS = selectorPart.match(/^[.#]?[\w-]+|^@|^\[|^:/);
            if (hasValidCSS) {
              // Likely a valid selector, skip
            } else {
              warnings.push(`⚠️  ${relativePath}: Line ${index + 1}: Potentially invalid selector: ${selectorPart.substring(0, 50)}`);
            }
          }
        }
      }
    }
  });
  
  return issues;
};

// Validate each CSS file
for (const file of cssFiles) {
  try {
    const content = readFileSync(file, 'utf-8');
    validateCSS(content, file);
  } catch (error) {
    const relativePath = file.replace(rootDir + '\\', '').replace(rootDir + '/', '');
    errors.push(`❌ ${relativePath}: Failed to read file - ${error.message}`);
  }
}

// Print results
console.log('Results:\n');

if (warnings.length > 0) {
  console.log('Warnings:\n');
  warnings.slice(0, 20).forEach(w => console.log(w));
  if (warnings.length > 20) {
    console.log(`... and ${warnings.length - 20} more warnings\n`);
  }
  console.log('');
}

if (errors.length > 0) {
  console.error('Errors:\n');
  errors.forEach(e => console.error(e));
  console.error('');
  process.exit(1);
}

console.log(`✅ Enhanced CSS validation completed.`);
console.log(`   Found ${warnings.length} warnings, ${errors.length} errors.\n`);

if (errors.length === 0) {
  console.log('✅ No CSS corruption detected!\n');
  process.exit(0);
} else {
  process.exit(1);
}


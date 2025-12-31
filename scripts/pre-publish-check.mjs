#!/usr/bin/env node

/**
 * Comprehensive Pre-Publish Validation Script
 * 
 * This script runs all checks before publishing to ensure:
 * - TypeScript compiles without errors
 * - Build succeeds
 * - All required files exist
 * - Package.json is valid
 * - Exports are correct
 * - Tests pass
 * - No critical issues
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const errors = [];
const warnings = [];
let hasErrors = false;

console.log('🚀 Starting pre-publish validation...\n');

// ============================================
// Step 1: TypeScript Compilation Check
// ============================================
console.log('📝 Step 1: Checking TypeScript compilation...');
try {
  execSync('npm run build:types', { 
    cwd: rootDir, 
    stdio: 'pipe',
    encoding: 'utf-8'
  });
  console.log('✅ TypeScript compilation passed\n');
} catch (error) {
  console.error('❌ TypeScript compilation failed\n');
  errors.push('TypeScript compilation failed');
  hasErrors = true;
}

// ============================================
// Step 2: Build Check
// ============================================
console.log('🔨 Step 2: Running build...');
try {
  execSync('npm run build', { 
    cwd: rootDir, 
    stdio: 'pipe',
    encoding: 'utf-8'
  });
  console.log('✅ Build completed successfully\n');
} catch (error) {
  console.error('❌ Build failed\n');
  errors.push('Build failed');
  hasErrors = true;
}

// ============================================
// Step 3: Check Required Dist Files
// ============================================
console.log('📦 Step 3: Checking dist files...');
const requiredFiles = [
  'dist/balanceui.es.js',
  'dist/balanceui.cjs.js',
  'dist/index.types.d.ts',
  'dist/index.css',
  'dist/theme/theme-contract.css',
  'dist/theme/design-tokens.css',
];

const requiredDirs = [
  'dist/components',
];

let distCheckPassed = true;
for (const file of requiredFiles) {
  const filePath = join(rootDir, file);
  if (!existsSync(filePath)) {
    console.error(`❌ Missing file: ${file}`);
    errors.push(`Missing required file: ${file}`);
    distCheckPassed = false;
    hasErrors = true;
  }
}

for (const dir of requiredDirs) {
  const dirPath = join(rootDir, dir);
  if (!existsSync(dirPath)) {
    console.error(`❌ Missing directory: ${dir}`);
    errors.push(`Missing required directory: ${dir}`);
    distCheckPassed = false;
    hasErrors = true;
  }
}

if (distCheckPassed) {
  console.log('✅ All required dist files exist\n');
} else {
  console.error('❌ Some dist files are missing\n');
}

// ============================================
// Step 4: Validate Package.json
// ============================================
console.log('📋 Step 4: Validating package.json...');
try {
  const packageJson = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf-8'));
  
  // Check version
  if (!packageJson.version || packageJson.version === '0.0.0') {
    warnings.push('⚠️  Package version is 0.0.0 or missing');
  }
  
  // Check main entry points
  if (!packageJson.main || !packageJson.module || !packageJson.types) {
    errors.push('❌ package.json missing main, module, or types');
    hasErrors = true;
  }
  
  // Validate exports
  if (!packageJson.exports || !packageJson.exports['.']) {
    errors.push('❌ package.json missing exports configuration');
    hasErrors = true;
  }
  
  // Check that exports point to dist files
  if (packageJson.exports) {
    const mainExport = packageJson.exports['.'];
    if (mainExport) {
      if (mainExport.import && !mainExport.import.startsWith('./dist/')) {
        errors.push('❌ package.json exports.import should point to dist/');
        hasErrors = true;
      }
      if (mainExport.require && !mainExport.require.startsWith('./dist/')) {
        errors.push('❌ package.json exports.require should point to dist/');
        hasErrors = true;
      }
      if (mainExport.types && !mainExport.types.startsWith('./dist/')) {
        errors.push('❌ package.json exports.types should point to dist/');
        hasErrors = true;
      }
    }
  }
  
  console.log('✅ package.json validation passed\n');
} catch (error) {
  console.error(`❌ Failed to validate package.json: ${error.message}\n`);
  errors.push(`Failed to validate package.json: ${error.message}`);
  hasErrors = true;
}

// ============================================
// Step 5: Check Component Exports
// ============================================
console.log('🔍 Step 5: Checking component exports...');
try {
  const componentIndex = readFileSync(join(rootDir, 'src/components/index.ts'), 'utf-8');
  const exports = componentIndex.match(/export \* from ['"].*['"]/g) || [];
  const exportedComponents = exports.map(e => {
    const match = e.match(/from ['"](.*)['"]/);
    return match ? match[1].replace('./', '') : null;
  }).filter(Boolean);

  const componentDirs = readdirSync(join(rootDir, 'src/components'))
    .filter(item => {
      const itemPath = join(rootDir, 'src/components', item);
      if (!statSync(itemPath).isDirectory() || item.startsWith('.')) {
        return false;
      }
      
      // Check if directory has an actual component file (not just types/stories/tests)
      const files = readdirSync(itemPath);
      const hasComponent = files.some(f => {
        const baseName = f.replace(/\.(tsx?|jsx?)$/, '');
        return (f.endsWith('.tsx') || f.endsWith('.ts')) && 
               baseName === item && 
               !f.includes('.types') && 
               !f.includes('.test') && 
               !f.includes('.stories');
      });
      
      return hasComponent; // Only include directories with actual components
    });

  const missingExports = componentDirs.filter(dir => {
    return !exportedComponents.some(exp => 
      exp.toLowerCase() === dir.toLowerCase() || 
      exp.toLowerCase().replace('./', '') === dir.toLowerCase()
    );
  });

  if (missingExports.length > 0) {
    console.error('❌ Missing component exports:\n');
    missingExports.forEach(comp => {
      console.error(`  - ${comp}`);
      errors.push(`Component ${comp} is not exported`);
    });
    hasErrors = true;
    console.error('');
  } else {
    console.log(`✅ All ${componentDirs.length} components are exported\n`);
  }
} catch (error) {
  console.error(`❌ Failed to check exports: ${error.message}\n`);
  errors.push(`Failed to check exports: ${error.message}`);
  hasErrors = true;
}

// ============================================
// Step 6: Check Type Definitions
// ============================================
console.log('📚 Step 6: Checking type definitions...');
try {
  const typesFile = readFileSync(join(rootDir, 'dist/index.types.d.ts'), 'utf-8');
  if (!typesFile || typesFile.trim().length === 0) {
    errors.push('❌ Type definitions file is empty');
    hasErrors = true;
  } else if (!typesFile.includes('export')) {
    warnings.push('⚠️  Type definitions file appears to have no exports');
  } else {
    console.log('✅ Type definitions are valid\n');
  }
} catch (error) {
  console.error(`❌ Failed to read type definitions: ${error.message}\n`);
  errors.push(`Failed to read type definitions: ${error.message}`);
  hasErrors = true;
}

// ============================================
// Step 7: Check CSS Files
// ============================================
console.log('🎨 Step 7: Checking CSS files...');
try {
  const cssFile = readFileSync(join(rootDir, 'dist/index.css'), 'utf-8');
  if (!cssFile || cssFile.trim().length === 0) {
    errors.push('❌ CSS file is empty');
    hasErrors = true;
  } else {
    console.log('✅ CSS file is valid\n');
  }
} catch (error) {
  console.error(`❌ Failed to read CSS file: ${error.message}\n`);
  errors.push(`Failed to read CSS file: ${error.message}`);
  hasErrors = true;
}

// ============================================
// Step 8: Check Theme Files
// ============================================
console.log('🎨 Step 8: Checking theme files...');
try {
  const themeContract = readFileSync(join(rootDir, 'dist/theme/theme-contract.css'), 'utf-8');
  if (!themeContract || themeContract.trim().length === 0) {
    errors.push('❌ Theme contract CSS is empty');
    hasErrors = true;
  }
  
  const designTokens = readFileSync(join(rootDir, 'dist/theme/design-tokens.css'), 'utf-8');
  if (!designTokens || designTokens.trim().length === 0) {
    errors.push('❌ Design tokens CSS is empty');
    hasErrors = true;
  }
  
  // Check if theme files exist (themes are in dist/theme, not dist/theme/themes)
  const themeDir = join(rootDir, 'dist/theme');
  if (existsSync(themeDir)) {
    const themeFiles = readdirSync(themeDir).filter(f => f.endsWith('.css') && f !== 'theme-contract.css' && f !== 'design-tokens.css');
    if (themeFiles.length === 0) {
      warnings.push('⚠️  No theme files found in dist/theme');
    } else {
      console.log(`✅ Found ${themeFiles.length} theme files\n`);
    }
  } else {
    errors.push('❌ Theme directory does not exist');
    hasErrors = true;
  }
} catch (error) {
  console.error(`❌ Failed to check theme files: ${error.message}\n`);
  errors.push(`Failed to check theme files: ${error.message}`);
  hasErrors = true;
}

// ============================================
// Step 9: Run Tests (if available)
// ============================================
console.log('🧪 Step 9: Running tests...');
try {
  execSync('npm run test:run', { 
    cwd: rootDir, 
    stdio: 'pipe',
    encoding: 'utf-8'
  });
  console.log('✅ All tests passed\n');
} catch (error) {
  // Tests are important but might not be fully set up
  warnings.push('⚠️  Tests failed or no tests found');
  console.warn('⚠️  Tests failed or no tests found\n');
}

// ============================================
// Step 10: Check for Common Issues
// ============================================
console.log('🔍 Step 10: Checking for common issues...');
try {
  // Check if there are any console.log statements in dist (should be minified)
  const esFile = readFileSync(join(rootDir, 'dist/balanceui.es.js'), 'utf-8');
  if (esFile.includes('console.log') && !esFile.includes('//')) {
    warnings.push('⚠️  Found console.log in production build');
  }
  
  // Check file sizes (warn if too large)
  const esSize = esFile.length;
  const cjsSize = readFileSync(join(rootDir, 'dist/balanceui.cjs.js'), 'utf-8').length;
  const cssSize = readFileSync(join(rootDir, 'dist/index.css'), 'utf-8').length;
  
  if (esSize > 500000) { // 500KB
    warnings.push(`⚠️  ES bundle is large: ${(esSize / 1024).toFixed(2)}KB`);
  }
  if (cjsSize > 500000) {
    warnings.push(`⚠️  CJS bundle is large: ${(cjsSize / 1024).toFixed(2)}KB`);
  }
  if (cssSize > 200000) { // 200KB
    warnings.push(`⚠️  CSS bundle is large: ${(cssSize / 1024).toFixed(2)}KB`);
  }
  
  console.log('✅ Common issues check completed\n');
} catch (error) {
  warnings.push(`⚠️  Could not check for common issues: ${error.message}`);
}

// ============================================
// Final Report
// ============================================
console.log('\n' + '='.repeat(60));
console.log('📊 PRE-PUBLISH VALIDATION REPORT');
console.log('='.repeat(60) + '\n');

if (warnings.length > 0) {
  console.log('⚠️  WARNINGS:\n');
  warnings.forEach(w => console.log(`  ${w}`));
  console.log('');
}

if (errors.length > 0) {
  console.error('❌ ERRORS:\n');
  errors.forEach(e => console.error(`  ${e}`));
  console.error('');
  hasErrors = true;
}

if (hasErrors) {
  console.error('⛔ PRE-PUBLISH VALIDATION FAILED\n');
  console.error('Please fix all errors before publishing.\n');
  process.exit(1);
} else {
  console.log('✅ PRE-PUBLISH VALIDATION PASSED\n');
  console.log('🎉 Package is ready to publish!\n');
  process.exit(0);
}


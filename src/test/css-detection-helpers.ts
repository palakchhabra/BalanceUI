/**
 * Enhanced CSS Detection and Testing Helpers
 * 
 * Automatically detects component CSS, text overlapping, and visual mismatches
 */

export interface CSSIssue {
  type: 'overlap' | 'positioning' | 'visibility' | 'spacing' | 'alignment' | 'z-index' | 'overflow' | 'dimensions';
  severity: 'error' | 'warning';
  element: string;
  message: string;
  details?: Record<string, any>;
}

export interface ComponentCSSInfo {
  componentName: string;
  className: string;
  cssProperties: Record<string, string>;
  computedStyles: Record<string, string>;
  boundingBox: DOMRect | null;
  issues: CSSIssue[];
}

/**
 * Detect text overlapping between elements
 */
export function detectTextOverlap(
  element1: HTMLElement,
  element2: HTMLElement,
  threshold: number = 2
): { hasOverlap: boolean; overlapArea: number; details: string } {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  // Calculate overlap area
  const overlapX = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left));
  const overlapY = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top));
  const overlapArea = overlapX * overlapY;

  // Check if elements overlap
  const hasOverlap = overlapArea > threshold;

  let details = '';
  if (hasOverlap) {
    const area1 = rect1.width * rect1.height;
    const area2 = rect2.width * rect2.height;
    const overlapPercent1 = (overlapArea / area1) * 100;
    const overlapPercent2 = (overlapArea / area2) * 100;
    
    details = `Overlap: ${overlapArea.toFixed(2)}px² (${overlapPercent1.toFixed(1)}% of element1, ${overlapPercent2.toFixed(1)}% of element2)`;
  }

  return { hasOverlap, overlapArea, details };
}

/**
 * Detect all text overlaps in a container
 */
export function detectAllTextOverlaps(container: HTMLElement): Array<{
  element1: HTMLElement;
  element2: HTMLElement;
  overlap: ReturnType<typeof detectTextOverlap>;
}> {
  const overlaps: Array<{
    element1: HTMLElement;
    element2: HTMLElement;
    overlap: ReturnType<typeof detectTextOverlap>;
  }> = [];

  // Get all text-containing elements
  const textElements = Array.from(container.querySelectorAll('*')).filter((el) => {
    const text = el.textContent?.trim() || '';
    const style = window.getComputedStyle(el);
    return (
      text.length > 0 &&
      style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      parseFloat(style.opacity) > 0
    );
  }) as HTMLElement[];

  // Check each pair
  for (let i = 0; i < textElements.length; i++) {
    for (let j = i + 1; j < textElements.length; j++) {
      const overlap = detectTextOverlap(textElements[i], textElements[j]);
      if (overlap.hasOverlap) {
        overlaps.push({
          element1: textElements[i],
          element2: textElements[j],
          overlap,
        });
      }
    }
  }

  return overlaps;
}

/**
 * Automatically identify component CSS classes and properties
 */
export function identifyComponentCSS(element: HTMLElement): ComponentCSSInfo {
  const className = element.className || '';
  const componentName = extractComponentName(className);
  const computedStyles = window.getComputedStyle(element);
  
  // Extract relevant CSS properties
  const cssProperties: Record<string, string> = {};
  const relevantProperties = [
    'position', 'display', 'flexDirection', 'alignItems', 'justifyContent',
    'width', 'height', 'padding', 'margin', 'border', 'borderRadius',
    'backgroundColor', 'color', 'fontSize', 'fontWeight', 'lineHeight',
    'zIndex', 'opacity', 'visibility', 'overflow', 'transform',
    'top', 'left', 'right', 'bottom', 'boxShadow'
  ];

  relevantProperties.forEach(prop => {
    const value = computedStyles.getPropertyValue(prop) || 
                  (computedStyles as any)[prop] || 
                  '';
    if (value) {
      cssProperties[prop] = value;
    }
  });

  const boundingBox = element.getBoundingClientRect();
  const issues = detectCSSIssues(element, computedStyles, boundingBox);

  return {
    componentName,
    className,
    cssProperties,
    computedStyles: Object.fromEntries(
      Array.from(computedStyles).map(key => [key, computedStyles.getPropertyValue(key)])
    ),
    boundingBox,
    issues,
  };
}

/**
 * Extract component name from className
 */
function extractComponentName(className: string): string {
  // Match balanceui-* patterns
  const match = className.match(/balanceui-(\w+)/);
  if (match) {
    return match[1];
  }
  
  // Try to extract from class list
  const parts = className.split(/\s+/);
  const componentClass = parts.find(c => c.includes('-') && !c.startsWith('balanceui-'));
  if (componentClass) {
    return componentClass.split('-')[0];
  }
  
  return 'unknown';
}

/**
 * Detect CSS issues in an element
 */
function detectCSSIssues(
  element: HTMLElement,
  computedStyles: CSSStyleDeclaration,
  boundingBox: DOMRect | null
): CSSIssue[] {
  const issues: CSSIssue[] = [];

  // Check positioning
  const position = computedStyles.position;
  if (position === 'absolute' || position === 'fixed') {
    const hasPosition = 
      computedStyles.top !== 'auto' ||
      computedStyles.bottom !== 'auto' ||
      computedStyles.left !== 'auto' ||
      computedStyles.right !== 'auto';
    
    if (!hasPosition && element.tagName !== 'LABEL') {
      issues.push({
        type: 'positioning',
        severity: 'error',
        element: element.tagName.toLowerCase(),
        message: `Absolute/fixed element missing positioning properties`,
        details: { position, className: element.className },
      });
    }
  }

  // Check z-index for positioned elements
  if (position === 'absolute' || position === 'fixed' || position === 'relative') {
    const zIndex = parseInt(computedStyles.zIndex);
    if (isNaN(zIndex) && element.tagName !== 'LABEL') {
      // z-index auto is OK, but warn if it might cause issues
      const parentZIndex = getParentZIndex(element);
      if (parentZIndex > 0) {
        issues.push({
          type: 'z-index',
          severity: 'warning',
          element: element.tagName.toLowerCase(),
          message: `Positioned element might need explicit z-index`,
          details: { position, parentZIndex },
        });
      }
    }
  }

  // Check visibility
  if (computedStyles.display === 'none') {
    issues.push({
      type: 'visibility',
      severity: 'error',
      element: element.tagName.toLowerCase(),
      message: `Element is hidden with display: none`,
      details: { className: element.className },
    });
  }

  if (computedStyles.visibility === 'hidden') {
    issues.push({
      type: 'visibility',
      severity: 'error',
      element: element.tagName.toLowerCase(),
      message: `Element is hidden with visibility: hidden`,
      details: { className: element.className },
    });
  }

  // Check dimensions
  if (boundingBox) {
    if (boundingBox.width === 0 && boundingBox.height === 0) {
      const display = computedStyles.display;
      if (display !== 'inline' && display !== 'inline-block' && display !== 'contents') {
        issues.push({
          type: 'dimensions',
          severity: 'warning',
          element: element.tagName.toLowerCase(),
          message: `Element has zero dimensions`,
          details: { display, className: element.className },
        });
      }
    }
  }

  // Check overflow
  const overflow = computedStyles.overflow;
  const overflowX = computedStyles.overflowX;
  const overflowY = computedStyles.overflowY;
  
  if (overflow === 'hidden' || overflowX === 'hidden' || overflowY === 'hidden') {
    // Check if content might be clipped
    if (boundingBox && element.scrollWidth > boundingBox.width) {
      issues.push({
        type: 'overflow',
        severity: 'warning',
        element: element.tagName.toLowerCase(),
        message: `Content might be clipped horizontally (scrollWidth: ${element.scrollWidth}, width: ${boundingBox.width})`,
        details: { overflow, scrollWidth: element.scrollWidth, width: boundingBox.width },
      });
    }
    if (boundingBox && element.scrollHeight > boundingBox.height) {
      issues.push({
        type: 'overflow',
        severity: 'warning',
        element: element.tagName.toLowerCase(),
        message: `Content might be clipped vertically (scrollHeight: ${element.scrollHeight}, height: ${boundingBox.height})`,
        details: { overflow, scrollHeight: element.scrollHeight, height: boundingBox.height },
      });
    }
  }

  // Check spacing
  const padding = {
    top: parseFloat(computedStyles.paddingTop) || 0,
    right: parseFloat(computedStyles.paddingRight) || 0,
    bottom: parseFloat(computedStyles.paddingBottom) || 0,
    left: parseFloat(computedStyles.paddingLeft) || 0,
  };

  const minPadding = 4; // Minimum recommended padding
  if (padding.top < minPadding && padding.bottom < minPadding && 
      padding.left < minPadding && padding.right < minPadding) {
    // Only warn for interactive elements
    if (element.tagName === 'BUTTON' || element.tagName === 'INPUT' || 
        element.tagName === 'SELECT' || element.tagName === 'TEXTAREA' ||
        element.getAttribute('role') === 'button') {
      issues.push({
        type: 'spacing',
        severity: 'warning',
        element: element.tagName.toLowerCase(),
        message: `Interactive element has minimal padding (touch target should be ≥44px)`,
        details: { padding, boundingBox: boundingBox ? { width: boundingBox.width, height: boundingBox.height } : null },
      });
    }
  }

  return issues;
}

/**
 * Get parent z-index
 */
function getParentZIndex(element: HTMLElement): number {
  let parent = element.parentElement;
  while (parent) {
    const zIndex = parseInt(window.getComputedStyle(parent).zIndex);
    if (!isNaN(zIndex) && zIndex > 0) {
      return zIndex;
    }
    parent = parent.parentElement;
  }
  return 0;
}

/**
 * Check alignment between elements
 */
export function checkElementAlignment(
  element1: HTMLElement,
  element2: HTMLElement,
  axis: 'horizontal' | 'vertical' | 'both' = 'both',
  tolerance: number = 2
): { aligned: boolean; details: string; differences: { x?: number; y?: number } } {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  const differences: { x?: number; y?: number } = {};
  let aligned = true;
  const details: string[] = [];

  if (axis === 'horizontal' || axis === 'both') {
    differences.x = Math.abs(rect1.left - rect2.left);
    if (differences.x > tolerance) {
      aligned = false;
      details.push(`Horizontal misalignment: ${differences.x.toFixed(2)}px`);
    }
  }

  if (axis === 'vertical' || axis === 'both') {
    differences.y = Math.abs(rect1.top - rect2.top);
    if (differences.y > tolerance) {
      aligned = false;
      details.push(`Vertical misalignment: ${differences.y.toFixed(2)}px`);
    }
  }

  return {
    aligned,
    details: details.join(', ') || 'Elements are aligned',
    differences,
  };
}

/**
 * Detect CSS mismatches between similar components
 */
export function detectCSSMismatches(
  elements: HTMLElement[],
  properties: string[] = ['padding', 'margin', 'fontSize', 'lineHeight', 'color']
): Array<{
  property: string;
  values: Record<number, string>;
  hasMismatch: boolean;
}> {
  const mismatches: Array<{
    property: string;
    values: Record<number, string>;
    hasMismatch: boolean;
  }> = [];

  properties.forEach(prop => {
    const values: Record<number, string> = {};
    let hasMismatch = false;
    let firstValue: string | null = null;

    elements.forEach((el, index) => {
      const computed = window.getComputedStyle(el);
      const value = (computed as any)[prop] || computed.getPropertyValue(prop);
      values[index] = value;

      if (firstValue === null) {
        firstValue = value;
      } else if (value !== firstValue) {
        hasMismatch = true;
      }
    });

    if (hasMismatch) {
      mismatches.push({
        property: prop,
        values,
        hasMismatch: true,
      });
    }
  });

  return mismatches;
}

/**
 * Get comprehensive CSS report for a component
 */
export function getComponentCSSReport(container: HTMLElement): {
  componentInfo: ComponentCSSInfo[];
  overlaps: ReturnType<typeof detectAllTextOverlaps>;
  mismatches: ReturnType<typeof detectCSSMismatches>;
  summary: {
    totalElements: number;
    totalIssues: number;
    errors: number;
    warnings: number;
    overlaps: number;
  };
} {
  const componentInfo: ComponentCSSInfo[] = [];
  const allElements = Array.from(container.querySelectorAll('*')) as HTMLElement[];

  // Analyze each element
  allElements.forEach(el => {
    const info = identifyComponentCSS(el);
    if (info.issues.length > 0 || info.componentName !== 'unknown') {
      componentInfo.push(info);
    }
  });

  // Detect overlaps
  const overlaps = detectAllTextOverlaps(container);

  // Detect mismatches in similar elements
  const similarElements = groupSimilarElements(allElements);
  const mismatches: ReturnType<typeof detectCSSMismatches> = [];
  similarElements.forEach(group => {
    if (group.length > 1) {
      const groupMismatches = detectCSSMismatches(group);
      mismatches.push(...groupMismatches);
    }
  });

  // Summary
  const totalIssues = componentInfo.reduce((sum, info) => sum + info.issues.length, 0);
  const errors = componentInfo.reduce(
    (sum, info) => sum + info.issues.filter(i => i.severity === 'error').length,
    0
  );
  const warnings = componentInfo.reduce(
    (sum, info) => sum + info.issues.filter(i => i.severity === 'warning').length,
    0
  );

  return {
    componentInfo,
    overlaps,
    mismatches,
    summary: {
      totalElements: allElements.length,
      totalIssues,
      errors,
      warnings,
      overlaps: overlaps.length,
    },
  };
}

/**
 * Group similar elements together
 */
function groupSimilarElements(elements: HTMLElement[]): HTMLElement[][] {
  const groups: HTMLElement[][] = [];
  const processed = new Set<HTMLElement>();

  elements.forEach(el => {
    if (processed.has(el)) return;

    const tagName = el.tagName;
    const className = el.className;
    const similar = elements.filter(other => {
      if (processed.has(other) || other === el) return false;
      return other.tagName === tagName && 
             other.className === className &&
             window.getComputedStyle(other).display === window.getComputedStyle(el).display;
    });

    if (similar.length > 0) {
      groups.push([el, ...similar]);
      [el, ...similar].forEach(e => processed.add(e));
    }
  });

  return groups;
}

/**
 * Format CSS report for console output
 */
export function formatCSSReport(report: ReturnType<typeof getComponentCSSReport>): string {
  const lines: string[] = [];
  
  lines.push('='.repeat(60));
  lines.push('CSS DETECTION REPORT');
  lines.push('='.repeat(60));
  lines.push('');
  
  lines.push(`Summary:`);
  lines.push(`  Total Elements: ${report.summary.totalElements}`);
  lines.push(`  Total Issues: ${report.summary.totalIssues}`);
  lines.push(`  Errors: ${report.summary.errors}`);
  lines.push(`  Warnings: ${report.summary.warnings}`);
  lines.push(`  Text Overlaps: ${report.summary.overlaps}`);
  lines.push('');
  
  if (report.overlaps.length > 0) {
    lines.push('Text Overlaps:');
    report.overlaps.forEach((overlap, index) => {
      lines.push(`  ${index + 1}. ${overlap.element1.tagName}.${overlap.element1.className}`);
      lines.push(`     vs ${overlap.element2.tagName}.${overlap.element2.className}`);
      lines.push(`     ${overlap.overlap.details}`);
      lines.push('');
    });
  }
  
  if (report.mismatches.length > 0) {
    lines.push('CSS Mismatches:');
    report.mismatches.forEach((mismatch, index) => {
      lines.push(`  ${index + 1}. Property: ${mismatch.property}`);
      Object.entries(mismatch.values).forEach(([idx, value]) => {
        lines.push(`     Element ${idx}: ${value}`);
      });
      lines.push('');
    });
  }
  
  if (report.componentInfo.length > 0) {
    lines.push('Component Issues:');
    report.componentInfo.forEach((info, index) => {
      if (info.issues.length > 0) {
        lines.push(`  ${index + 1}. ${info.componentName} (${info.className})`);
        info.issues.forEach(issue => {
          lines.push(`     [${issue.severity.toUpperCase()}] ${issue.type}: ${issue.message}`);
        });
        lines.push('');
      }
    });
  }
  
  return lines.join('\n');
}


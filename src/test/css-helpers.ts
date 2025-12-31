/**
 * CSS Testing Helpers
 * 
 * Utilities for testing CSS alignment, positioning, and floating labels
 */

/**
 * Check if element is properly aligned
 */
export const checkAlignment = (element: HTMLElement, expectedAlignment: 'left' | 'center' | 'right' = 'left'): boolean => {
  const computed = window.getComputedStyle(element);
  const textAlign = computed.textAlign;
  
  // In jsdom, empty string is valid for left alignment (default)
  if (expectedAlignment === 'left') {
    return textAlign === 'left' || textAlign === 'start' || textAlign === '' || textAlign === 'initial';
  }
  if (expectedAlignment === 'center') {
    return textAlign === 'center';
  }
  if (expectedAlignment === 'right') {
    return textAlign === 'right' || textAlign === 'end';
  }
  return true;
};

/**
 * Check if floating label is positioned correctly
 */
export const checkFloatingLabel = (label: HTMLElement, input: HTMLElement, isFloating: boolean): {
  isValid: boolean;
  issues: string[];
} => {
  const issues: string[] = [];
  const labelStyle = window.getComputedStyle(label);
  const inputStyle = window.getComputedStyle(input);
  const inputRect = input.getBoundingClientRect();
  const labelRect = label.getBoundingClientRect();
  
  // Check position
  if (labelStyle.position !== 'absolute') {
    issues.push('Label should be absolutely positioned');
  }
  
  // Check z-index
  const zIndex = parseInt(labelStyle.zIndex);
  if (isNaN(zIndex) || zIndex < 1) {
    issues.push('Label should have a z-index');
  }
  
  // Check alignment with input
  if (isFloating) {
    // When floating, label should be at top
    if (labelRect.top > inputRect.top + 5) {
      issues.push('Floating label should be at the top of input');
    }
  } else {
    // When not floating, label should be vertically centered
    const inputCenter = inputRect.top + inputRect.height / 2;
    const labelCenter = labelRect.top + labelRect.height / 2;
    if (Math.abs(inputCenter - labelCenter) > 3) {
      issues.push('Label should be vertically centered when not floating');
    }
  }
  
  // Check left alignment
  const leftDiff = Math.abs(labelRect.left - inputRect.left);
  if (leftDiff > 15) {
    issues.push(`Label left position should align with input (diff: ${leftDiff}px)`);
  }
  
  return {
    isValid: issues.length === 0,
    issues
  };
};

/**
 * Check if element has proper spacing
 */
export const checkSpacing = (element: HTMLElement, minPadding: number = 8): boolean => {
  const style = window.getComputedStyle(element);
  const padding = {
    top: parseFloat(style.paddingTop) || 0,
    right: parseFloat(style.paddingRight) || 0,
    bottom: parseFloat(style.paddingBottom) || 0,
    left: parseFloat(style.paddingLeft) || 0,
  };
  
  return padding.top >= minPadding && 
         padding.right >= minPadding && 
         padding.bottom >= minPadding && 
         padding.left >= minPadding;
};

/**
 * Check if element is visible and not clipped
 */
export const checkVisibility = (element: HTMLElement): {
  isValid: boolean;
  issues: string[];
} => {
  const issues: string[] = [];
  const style = window.getComputedStyle(element);
  
  // In jsdom, getBoundingClientRect might not work properly
  // So we check computed styles instead
  if (style.visibility === 'hidden') {
    issues.push('Element should be visible (visibility: hidden)');
  }
  
  if (style.display === 'none') {
    issues.push('Element should be visible (display: none)');
  }
  
  if (style.opacity === '0') {
    issues.push('Element should have opacity > 0');
  }
  
  // Check dimensions from computed style (more reliable in jsdom)
  const width = parseFloat(style.width) || 0;
  const height = parseFloat(style.height) || 0;
  
  // For input elements, check if they have min-width or are inline
  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
    // Inputs can have 0 width in jsdom but still be valid
    // Check if they're not explicitly hidden
    if (style.display === 'none' || style.visibility === 'hidden') {
      issues.push('Input element should be visible');
    }
  } else if (width === 0 && height === 0 && style.display !== 'inline' && style.display !== 'inline-block') {
    // Only warn for non-inline elements with 0 dimensions
    issues.push('Element should have dimensions');
  }
  
  return {
    isValid: issues.length === 0,
    issues
  };
};

/**
 * Check if flexbox container has proper alignment
 */
export const checkFlexAlignment = (element: HTMLElement): {
  isValid: boolean;
  issues: string[];
} => {
  const issues: string[] = [];
  const style = window.getComputedStyle(element);
  
  if (style.display === 'flex') {
    if (!style.alignItems && !style.alignContent) {
      issues.push('Flex container should have align-items or align-content');
    }
    if (!style.justifyContent && !style.justifyItems) {
      issues.push('Flex container should have justify-content or justify-items');
    }
  }
  
  return {
    isValid: issues.length === 0,
    issues
  };
};

/**
 * Get computed style summary for debugging
 */
export const getStyleSummary = (element: HTMLElement): Record<string, string> => {
  const style = window.getComputedStyle(element);
  return {
    position: style.position,
    top: style.top,
    left: style.left,
    transform: style.transform,
    zIndex: style.zIndex,
    display: style.display,
    alignItems: style.alignItems,
    justifyContent: style.justifyContent,
    padding: style.padding,
    margin: style.margin,
    width: style.width,
    height: style.height,
  };
};


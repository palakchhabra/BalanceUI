/**
 * DOM utility functions
 */

/**
 * Check if an element is scrollable
 * 
 * Determines if an element has scrollable content by comparing
 * scroll dimensions with client dimensions.
 * 
 * @param {HTMLElement} element - The element to check
 * @returns {boolean} True if the element is scrollable (horizontally or vertically)
 * 
 * @example
 * ```typescript
 * const div = document.querySelector('.scrollable');
 * if (isScrollable(div)) {
 *   console.log('Element has scrollable content');
 * }
 * ```
 */
export const isScrollable = (element: HTMLElement): boolean => {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
};

/**
 * Check if an element is scrolled to the top
 * 
 * Determines if an element's vertical scroll position is at the top (0).
 * 
 * @param {HTMLElement} element - The element to check
 * @returns {boolean} True if the element is scrolled to the top
 * 
 * @example
 * ```typescript
 * const container = document.querySelector('.container');
 * if (isAtTop(container)) {
 *   console.log('At the top of the scroll');
 * }
 * ```
 */
export const isAtTop = (element: HTMLElement): boolean => {
  return element.scrollTop === 0;
};

/**
 * Get the current scroll position of an element
 * 
 * Returns both horizontal (x) and vertical (y) scroll positions.
 * 
 * @param {HTMLElement} element - The element to get scroll position from
 * @returns {{ x: number, y: number }} Object with x (horizontal) and y (vertical) scroll positions
 * 
 * @example
 * ```typescript
 * const container = document.querySelector('.container');
 * const { x, y } = getScrollPosition(container);
 * console.log(`Scrolled ${x}px horizontally, ${y}px vertically`);
 * ```
 */
export const getScrollPosition = (element: HTMLElement): { x: number; y: number } => ({
  x: element.scrollLeft,
  y: element.scrollTop,
});

/**
 * Smoothly scroll an element into view
 * 
 * Scrolls the element into the visible area of the viewport using
 * the specified scroll behavior.
 * 
 * @param {HTMLElement} element - The element to scroll into view
 * @param {ScrollBehavior} behavior - Scroll behavior: 'smooth' or 'auto' (default: 'smooth')
 * @returns {void}
 * 
 * @example
 * ```typescript
 * const button = document.querySelector('#myButton');
 * scrollToElement(button); // Smooth scroll
 * scrollToElement(button, 'auto'); // Instant scroll
 * ```
 */
export const scrollToElement = (
  element: HTMLElement,
  behavior: ScrollBehavior = 'smooth'
): void => {
  element.scrollIntoView({ behavior, block: 'nearest' });
};

/**
 * Get the dimensions (width and height) of an element
 * 
 * Returns the element's offset width and height, which includes
 * padding and borders but excludes margins.
 * 
 * @param {HTMLElement} element - The element to get dimensions from
 * @returns {{ width: number, height: number }} Object with width and height in pixels
 * 
 * @example
 * ```typescript
 * const div = document.querySelector('.box');
 * const { width, height } = getElementDimensions(div);
 * console.log(`Element is ${width}x${height} pixels`);
 * ```
 */
export const getElementDimensions = (element: HTMLElement): { width: number; height: number } => ({
  width: element.offsetWidth,
  height: element.offsetHeight,
});

/**
 * Check if an element is fully visible in the viewport
 * 
 * Determines if an element is completely within the visible area
 * of the viewport (not partially visible).
 * 
 * @param {HTMLElement} element - The element to check
 * @returns {boolean} True if the element is fully visible in the viewport
 * 
 * @example
 * ```typescript
 * const button = document.querySelector('#myButton');
 * if (isInViewport(button)) {
 *   console.log('Button is fully visible');
 * }
 * ```
 */
export const isInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};


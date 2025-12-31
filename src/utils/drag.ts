/**
 * Drag and drop utilities
 */

/**
 * Drag state interface
 * 
 * Represents the current state of a drag operation.
 */
export interface DragState {
  /** Whether a drag operation is currently active */
  isDragging: boolean;
  /** X coordinate where the drag started */
  startX: number;
  /** Y coordinate where the drag started */
  startY: number;
  /** Current X coordinate during drag */
  currentX: number;
  /** Current Y coordinate during drag */
  currentY: number;
  /** Horizontal offset from start position */
  offsetX: number;
  /** Vertical offset from start position */
  offsetY: number;
}

/**
 * Calculate the drag offset from start to current position
 * 
 * Computes the difference between the current position and the start position,
 * returning the offset in both x and y directions.
 * 
 * @param {{ x: number, y: number }} start - Starting coordinates
 * @param {{ x: number, y: number }} current - Current coordinates
 * @returns {{ x: number, y: number }} Offset object with x and y differences
 * 
 * @example
 * ```typescript
 * const offset = calculateDragOffset(
 *   { x: 100, y: 100 },
 *   { x: 150, y: 120 }
 * );
 * // { x: 50, y: 20 }
 * ```
 */
export const calculateDragOffset = (
  start: { x: number; y: number },
  current: { x: number; y: number }
): { x: number; y: number } => ({
  x: current.x - start.x,
  y: current.y - start.y,
});

/**
 * Extract coordinates from a touch event
 * 
 * Gets the client coordinates (relative to viewport) from a touch event.
 * Handles both active touches and changed touches (for touchend events).
 * 
 * @param {TouchEvent} event - The touch event
 * @returns {{ x: number, y: number }} Object with x and y coordinates
 * 
 * @example
 * ```typescript
 * element.addEventListener('touchmove', (e) => {
 *   const { x, y } = getTouchCoordinates(e);
 *   console.log(`Touch at ${x}, ${y}`);
 * });
 * ```
 */
export const getTouchCoordinates = (event: TouchEvent): { x: number; y: number } => {
  const touch = event.touches[0] || event.changedTouches[0];
  return { x: touch.clientX, y: touch.clientY };
};

/**
 * Extract coordinates from a mouse event
 * 
 * Gets the client coordinates (relative to viewport) from a mouse event.
 * 
 * @param {MouseEvent} event - The mouse event
 * @returns {{ x: number, y: number }} Object with x and y coordinates
 * 
 * @example
 * ```typescript
 * element.addEventListener('mousemove', (e) => {
 *   const { x, y } = getMouseCoordinates(e);
 *   console.log(`Mouse at ${x}, ${y}`);
 * });
 * ```
 */
export const getMouseCoordinates = (event: MouseEvent): { x: number; y: number } => ({
  x: event.clientX,
  y: event.clientY,
});


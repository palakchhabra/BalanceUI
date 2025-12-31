/**
 * Common React utilities and hooks
 */

import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Toggle state hook
 * 
 * A convenient hook for managing boolean state with toggle, setTrue, and setFalse actions.
 * 
 * @param {boolean} initialValue - Initial boolean value (default: false)
 * @returns {[boolean, { toggle: () => void, setTrue: () => void, setFalse: () => void, setValue: (value: boolean) => void }]} 
 *   Tuple containing the current value and an object with control functions
 * 
 * @example
 * ```typescript
 * const [isOpen, { toggle, setTrue, setFalse }] = useToggle(false);
 * 
 * // Toggle the value
 * toggle();
 * 
 * // Set to true
 * setTrue();
 * 
 * // Set to false
 * setFalse();
 * ```
 */
export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return [value, { toggle, setTrue, setFalse, setValue }] as const;
};

/**
 * Controlled/uncontrolled state hook
 * 
 * Manages state that can be either controlled (via props) or uncontrolled (internal state).
 * Useful for components that support both controlled and uncontrolled modes.
 * 
 * @template T - The type of the state value
 * @param {T | undefined} controlledValue - The controlled value (undefined for uncontrolled mode)
 * @param {T} defaultValue - Default value for uncontrolled mode
 * @returns {[T, (value: T) => void]} Tuple containing the current value and setter function
 * 
 * @example
 * ```typescript
 * // Uncontrolled mode
 * const [value, setValue] = useControlledState(undefined, 'default');
 * 
 * // Controlled mode
 * const [value, setValue] = useControlledState(props.value, 'default');
 * ```
 */
export const useControlledState = <T,>(
  controlledValue: T | undefined,
  defaultValue: T
): [T, (value: T) => void] => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const setValue = useCallback((newValue: T) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
  }, [isControlled]);
  return [value, setValue];
};

/**
 * Debounce hook
 * 
 * Returns a debounced value that only updates after the specified delay has passed
 * since the last time the source value changed. Useful for search inputs, API calls, etc.
 * 
 * @template T - The type of the value to debounce
 * @param {T} value - The value to debounce
 * @param {number} delay - Delay in milliseconds before updating the debounced value
 * @returns {T} The debounced value
 * 
 * @example
 * ```typescript
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 300);
 * 
 * useEffect(() => {
 *   // This will only run 300ms after the user stops typing
 *   performSearch(debouncedSearchTerm);
 * }, [debouncedSearchTerm]);
 * ```
 */
export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Previous value hook
 * 
 * Returns the previous value of the given value. Useful for comparing current
 * and previous values, detecting changes, or implementing undo functionality.
 * 
 * @template T - The type of the value
 * @param {T} value - The current value
 * @returns {T | undefined} The previous value (undefined on first render)
 * 
 * @example
 * ```typescript
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 * 
 * useEffect(() => {
 *   if (prevCount !== undefined && count > prevCount) {
 *     console.log('Count increased');
 *   }
 * }, [count, prevCount]);
 * ```
 */
export const usePrevious = <T,>(value: T): T | undefined => {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

/**
 * Click outside hook
 * 
 * Detects clicks outside of a specified element and calls a handler function.
 * Useful for closing modals, dropdowns, or other overlay components when clicking outside.
 * 
 * @param {React.RefObject<HTMLElement>} ref - React ref to the element to detect clicks outside of
 * @param {(event: MouseEvent | TouchEvent) => void} handler - Function to call when a click outside is detected
 * 
 * @example
 * ```typescript
 * const ref = useRef<HTMLDivElement>(null);
 * 
 * useClickOutside(ref, () => {
 *   setIsOpen(false);
 * });
 * 
 * return <div ref={ref}>Content</div>;
 * ```
 */
export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

/**
 * Merge refs utility
 * 
 * Combines multiple React refs into a single ref callback. Useful when you need
 * to forward a ref while also using a local ref, or when combining multiple refs.
 * 
 * @template T - The type of the element
 * @param {...(React.Ref<T> | null | undefined)} refs - Variable number of refs to merge
 * @returns {React.RefCallback<T>} A ref callback that applies all refs to the element
 * 
 * @example
 * ```typescript
 * const localRef = useRef<HTMLInputElement>(null);
 * const forwardedRef = useRef<HTMLInputElement>(null);
 * 
 * return <input ref={mergeRefs(localRef, forwardedRef)} />;
 * ```
 */
export const mergeRefs = <T,>(
  ...refs: (React.Ref<T> | null | undefined)[]
): React.RefCallback<T> => {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
};

/**
 * Focus trap hook
 * 
 * Traps focus within a container element. Useful for modals, dialogs, and drawers
 * to prevent focus from escaping to elements outside the component.
 * 
 * @param {React.RefObject<HTMLElement>} containerRef - Ref to the container element
 * @param {boolean} enabled - Whether the focus trap is enabled (default: true)
 * 
 * @example
 * ```typescript
 * const modalRef = useRef<HTMLDivElement>(null);
 * useFocusTrap(modalRef, isOpen);
 * 
 * return <div ref={modalRef}>...</div>;
 * ```
 */
export const useFocusTrap = (
  containerRef: React.RefObject<HTMLElement>,
  enabled: boolean = true
) => {
  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    
    // Get all focusable elements
    const getFocusableElements = (): HTMLElement[] => {
      const selector = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(', ');
      
      return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
        (el) => {
          const style = window.getComputedStyle(el);
          return style.display !== 'none' && style.visibility !== 'hidden';
        }
      );
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement || !container.contains(document.activeElement)) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement || !container.contains(document.activeElement)) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    // Focus first element when trap is enabled
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0 && !container.contains(document.activeElement)) {
      focusableElements[0].focus();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, containerRef]);
};


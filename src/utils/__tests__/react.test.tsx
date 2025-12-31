import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import {
  useToggle,
  useControlledState,
  useDebounce,
  usePrevious,
  useClickOutside,
  mergeRefs,
} from '../react';
import { useRef } from 'react';

describe('react utilities', () => {
  describe('useToggle', () => {
    it('should initialize with default value', () => {
      const { result } = renderHook(() => useToggle());
      expect(result.current[0]).toBe(false);
    });

    it('should initialize with provided value', () => {
      const { result } = renderHook(() => useToggle(true));
      expect(result.current[0]).toBe(true);
    });

    it('should toggle value', () => {
      const { result } = renderHook(() => useToggle(false));
      const [, { toggle }] = result.current;

      act(() => {
        toggle();
      });

      expect(result.current[0]).toBe(true);

      act(() => {
        toggle();
      });

      expect(result.current[0]).toBe(false);
    });

    it('should set to true', () => {
      const { result } = renderHook(() => useToggle(false));
      const [, { setTrue }] = result.current;

      act(() => {
        setTrue();
      });

      expect(result.current[0]).toBe(true);
    });

    it('should set to false', () => {
      const { result } = renderHook(() => useToggle(true));
      const [, { setFalse }] = result.current;

      act(() => {
        setFalse();
      });

      expect(result.current[0]).toBe(false);
    });

    it('should set value directly', () => {
      const { result } = renderHook(() => useToggle(false));
      const [, { setValue }] = result.current;

      act(() => {
        setValue(true);
      });

      expect(result.current[0]).toBe(true);
    });
  });

  describe('useControlledState', () => {
    it('should use internal state when uncontrolled', () => {
      const { result } = renderHook(() => useControlledState(undefined, 'default'));
      expect(result.current[0]).toBe('default');
    });

    it('should use controlled value when provided', () => {
      const { result, rerender } = renderHook(
        ({ value }) => useControlledState(value, 'default'),
        { initialProps: { value: 'controlled' as string | undefined } }
      );

      expect(result.current[0]).toBe('controlled');

      rerender({ value: 'updated' });
      expect(result.current[0]).toBe('updated');
    });

    it('should not update internal state when controlled', () => {
      const { result } = renderHook(() => useControlledState('controlled', 'default'));
      const [, setValue] = result.current;

      act(() => {
        setValue('new value');
      });

      // Should still be controlled value
      expect(result.current[0]).toBe('controlled');
    });
  });

  describe('useDebounce', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should return initial value immediately', () => {
      const { result } = renderHook(() => useDebounce('initial', 300));
      expect(result.current).toBe('initial');
    });

    it('should debounce value updates', async () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        { initialProps: { value: 'initial', delay: 300 } }
      );

      rerender({ value: 'updated', delay: 300 });
      expect(result.current).toBe('initial');

      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(result.current).toBe('updated');
    });

    it('should cancel previous timeout on rapid updates', () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: 'initial' } }
      );

      rerender({ value: 'update1' });
      rerender({ value: 'update2' });
      rerender({ value: 'update3' });

      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(result.current).toBe('update3');
    });
  });

  describe('usePrevious', () => {
    it('should return undefined on first render', () => {
      const { result } = renderHook(() => usePrevious('initial'));
      expect(result.current).toBeUndefined();
    });

    it('should return previous value', () => {
      const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
        initialProps: { value: 'initial' },
      });

      rerender({ value: 'updated' });
      expect(result.current).toBe('initial');

      rerender({ value: 'updated2' });
      expect(result.current).toBe('updated');
    });
  });

  describe('useClickOutside', () => {
    it('should call handler when clicking outside', () => {
      const handler = vi.fn();
      const ref = { current: document.createElement('div') };
      document.body.appendChild(ref.current);

      renderHook(() => useClickOutside(ref, handler));

      act(() => {
        // Create a click event outside the element
        const event = new MouseEvent('mousedown', {
          bubbles: true,
          cancelable: true,
        });
        // Set target to body (outside ref.current)
        Object.defineProperty(event, 'target', {
          value: document.body,
          enumerable: true,
        });
        document.dispatchEvent(event);
      });

      // Handler should be called when clicking outside
      expect(handler).toHaveBeenCalled();

      document.body.removeChild(ref.current);
    });

    it('should not call handler when clicking inside', () => {
      const handler = vi.fn();
      const ref = { current: document.createElement('div') };
      const child = document.createElement('button');
      ref.current.appendChild(child);
      document.body.appendChild(ref.current);

      renderHook(() => useClickOutside(ref, handler));

      act(() => {
        child.click();
      });

      expect(handler).not.toHaveBeenCalled();

      document.body.removeChild(ref.current);
    });
  });

  describe('mergeRefs', () => {
    it('should merge function refs', () => {
      const ref1 = vi.fn();
      const ref2 = vi.fn();
      const merged = mergeRefs(ref1, ref2);
      const element = document.createElement('div');

      merged(element);

      expect(ref1).toHaveBeenCalledWith(element);
      expect(ref2).toHaveBeenCalledWith(element);
    });

    it('should merge object refs', () => {
      const ref1 = { current: null };
      const ref2 = { current: null };
      const merged = mergeRefs(ref1, ref2);
      const element = document.createElement('div');

      merged(element);

      expect(ref1.current).toBe(element);
      expect(ref2.current).toBe(element);
    });

    it('should handle null refs', () => {
      const ref1 = { current: null };
      const merged = mergeRefs(ref1, null, undefined);
      const element = document.createElement('div');

      expect(() => merged(element)).not.toThrow();
      expect(ref1.current).toBe(element);
    });

    it('should handle mixed ref types', () => {
      const objectRef = { current: null };
      const functionRef = vi.fn();
      const merged = mergeRefs(objectRef, functionRef);
      const element = document.createElement('div');

      merged(element);

      expect(objectRef.current).toBe(element);
      expect(functionRef).toHaveBeenCalledWith(element);
    });
  });
});


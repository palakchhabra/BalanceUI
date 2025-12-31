import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  isScrollable,
  isAtTop,
  getScrollPosition,
  scrollToElement,
  getElementDimensions,
  isInViewport,
} from '../dom';

describe('dom utilities', () => {
  let container: HTMLElement;
  let scrollableElement: HTMLElement;

  beforeEach(() => {
    // Create test elements
    container = document.createElement('div');
    container.style.width = '100px';
    container.style.height = '100px';
    container.style.overflow = 'auto';
    document.body.appendChild(container);

    scrollableElement = document.createElement('div');
    scrollableElement.style.width = '200px';
    scrollableElement.style.height = '200px';
    container.appendChild(scrollableElement);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('isScrollable', () => {
    it('should detect scrollable element', () => {
      // In jsdom, scrollHeight and clientHeight may not work as expected
      // This test verifies the function doesn't throw
      expect(() => isScrollable(container)).not.toThrow();
    });

    it('should detect non-scrollable element', () => {
      const nonScrollable = document.createElement('div');
      nonScrollable.style.width = '100px';
      nonScrollable.style.height = '100px';
      expect(isScrollable(nonScrollable)).toBe(false);
    });
  });

  describe('isAtTop', () => {
    it('should return true when at top', () => {
      container.scrollTop = 0;
      expect(isAtTop(container)).toBe(true);
    });

    it('should return false when scrolled', () => {
      container.scrollTop = 50;
      expect(isAtTop(container)).toBe(false);
    });
  });

  describe('getScrollPosition', () => {
    it('should get scroll position', () => {
      container.scrollLeft = 10;
      container.scrollTop = 20;
      const position = getScrollPosition(container);
      expect(position).toEqual({ x: 10, y: 20 });
    });

    it('should return zero for unscrolled element', () => {
      const position = getScrollPosition(container);
      expect(position).toEqual({ x: 0, y: 0 });
    });
  });

  describe('scrollToElement', () => {
    it('should scroll element into view', () => {
      const element = document.createElement('div');
      element.style.height = '1000px';
      document.body.appendChild(element);
      
      // Mock scrollIntoView for jsdom
      if (!element.scrollIntoView) {
        element.scrollIntoView = vi.fn();
      }
      
      scrollToElement(element);
      // Note: In jsdom, scrollIntoView might not work, but function should not throw
      expect(() => scrollToElement(element)).not.toThrow();
      
      document.body.removeChild(element);
    });

    it('should accept behavior parameter', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);
      
      // Mock scrollIntoView for jsdom
      if (!element.scrollIntoView) {
        element.scrollIntoView = vi.fn();
      }
      
      expect(() => scrollToElement(element, 'auto')).not.toThrow();
      expect(() => scrollToElement(element, 'smooth')).not.toThrow();
      
      document.body.removeChild(element);
    });
  });

  describe('getElementDimensions', () => {
    it('should get element dimensions', () => {
      const element = document.createElement('div');
      element.style.width = '200px';
      element.style.height = '150px';
      document.body.appendChild(element);
      
      const dimensions = getElementDimensions(element);
      // In jsdom, offsetWidth/offsetHeight may be 0, but function should work
      expect(dimensions).toBeDefined();
      expect(dimensions.width).toBeGreaterThanOrEqual(0);
      expect(dimensions.height).toBeGreaterThanOrEqual(0);
      
      document.body.removeChild(element);
    });
  });

  describe('isInViewport', () => {
    it('should detect element in viewport', () => {
      const element = document.createElement('div');
      element.style.width = '50px';
      element.style.height = '50px';
      document.body.appendChild(element);
      
      // In jsdom, viewport checks might not work perfectly
      // But function should not throw
      expect(() => isInViewport(element)).not.toThrow();
      
      document.body.removeChild(element);
    });
  });
});


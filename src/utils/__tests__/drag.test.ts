import { describe, it, expect } from 'vitest';
import {
  calculateDragOffset,
  getTouchCoordinates,
  getMouseCoordinates,
  DragState,
} from '../drag';

describe('drag utilities', () => {
  describe('calculateDragOffset', () => {
    it('should calculate drag offset', () => {
      const offset = calculateDragOffset(
        { x: 100, y: 100 },
        { x: 150, y: 120 }
      );
      expect(offset).toEqual({ x: 50, y: 20 });
    });

    it('should handle negative offset', () => {
      const offset = calculateDragOffset(
        { x: 150, y: 120 },
        { x: 100, y: 100 }
      );
      expect(offset).toEqual({ x: -50, y: -20 });
    });

    it('should handle zero offset', () => {
      const offset = calculateDragOffset(
        { x: 100, y: 100 },
        { x: 100, y: 100 }
      );
      expect(offset).toEqual({ x: 0, y: 0 });
    });

    it('should handle negative coordinates', () => {
      const offset = calculateDragOffset(
        { x: -10, y: -20 },
        { x: 10, y: 20 }
      );
      expect(offset).toEqual({ x: 20, y: 40 });
    });
  });

  describe('getTouchCoordinates', () => {
    it('should extract coordinates from touch event', () => {
      const touch = {
        clientX: 100,
        clientY: 200,
      } as Touch;
      
      const event = {
        touches: [touch],
        changedTouches: [],
      } as unknown as TouchEvent;

      const coords = getTouchCoordinates(event);
      expect(coords).toEqual({ x: 100, y: 200 });
    });

    it('should use changedTouches if touches is empty', () => {
      const touch = {
        clientX: 150,
        clientY: 250,
      } as Touch;
      
      const event = {
        touches: [],
        changedTouches: [touch],
      } as unknown as TouchEvent;

      const coords = getTouchCoordinates(event);
      expect(coords).toEqual({ x: 150, y: 250 });
    });
  });

  describe('getMouseCoordinates', () => {
    it('should extract coordinates from mouse event', () => {
      const event = {
        clientX: 100,
        clientY: 200,
      } as MouseEvent;

      const coords = getMouseCoordinates(event);
      expect(coords).toEqual({ x: 100, y: 200 });
    });

    it('should handle zero coordinates', () => {
      const event = {
        clientX: 0,
        clientY: 0,
      } as MouseEvent;

      const coords = getMouseCoordinates(event);
      expect(coords).toEqual({ x: 0, y: 0 });
    });
  });
});


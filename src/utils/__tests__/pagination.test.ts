import { describe, it, expect } from 'vitest';
import { getPaginationRange } from '../pagination';

describe('pagination utilities', () => {
  describe('getPaginationRange', () => {
    it('should generate pagination range with ellipsis', () => {
      const result = getPaginationRange({
        totalPages: 10,
        page: 5,
        siblingCount: 1,
        boundaryCount: 1,
      });
      expect(result).toContain(1);
      expect(result).toContain(10);
      expect(result).toContain('dots');
      expect(result).toContain(5);
    });

    it('should handle small page count', () => {
      const result = getPaginationRange({
        totalPages: 5,
        page: 2,
        siblingCount: 1,
        boundaryCount: 1,
      });
      expect(result.length).toBeGreaterThan(0);
      expect(result).toContain(1);
      expect(result).toContain(5);
    });

    it('should handle first page', () => {
      const result = getPaginationRange({
        totalPages: 10,
        page: 1,
        siblingCount: 1,
        boundaryCount: 1,
      });
      expect(result[0]).toBe(1);
    });

    it('should handle last page', () => {
      const result = getPaginationRange({
        totalPages: 10,
        page: 10,
        siblingCount: 1,
        boundaryCount: 1,
      });
      expect(result[result.length - 1]).toBe(10);
    });

    it('should include current page', () => {
      const result = getPaginationRange({
        totalPages: 10,
        page: 5,
        siblingCount: 1,
        boundaryCount: 1,
      });
      expect(result).toContain(5);
    });

    it('should handle single page', () => {
      const result = getPaginationRange({
        totalPages: 1,
        page: 1,
        siblingCount: 1,
        boundaryCount: 1,
      });
      expect(result).toContain(1);
    });

    it('should handle large sibling count', () => {
      const result = getPaginationRange({
        totalPages: 20,
        page: 10,
        siblingCount: 3,
        boundaryCount: 2,
      });
      expect(result.length).toBeGreaterThan(0);
    });
  });
});


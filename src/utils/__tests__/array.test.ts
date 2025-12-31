import { describe, it, expect } from 'vitest';
import { range, chunk, unique, flatten, groupBy } from '../array';

describe('array utilities', () => {
  describe('range', () => {
    it('should generate range from start to end', () => {
      expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle single number range', () => {
      expect(range(5, 5)).toEqual([5]);
    });

    it('should handle zero start', () => {
      expect(range(0, 3)).toEqual([0, 1, 2, 3]);
    });

    it('should handle negative numbers', () => {
      expect(range(-2, 2)).toEqual([-2, -1, 0, 1, 2]);
    });

    it('should return empty array if start > end', () => {
      expect(range(5, 1)).toEqual([]);
    });
  });

  describe('chunk', () => {
    it('should chunk array into smaller arrays', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });

    it('should handle exact division', () => {
      expect(chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
    });

    it('should handle chunk size of 1', () => {
      expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
    });

    it('should handle chunk size larger than array', () => {
      expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
    });

    it('should handle empty array', () => {
      expect(chunk([], 2)).toEqual([]);
    });

    it('should handle string arrays', () => {
      expect(chunk(['a', 'b', 'c', 'd'], 2)).toEqual([['a', 'b'], ['c', 'd']]);
    });
  });

  describe('unique', () => {
    it('should remove duplicate numbers', () => {
      expect(unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
    });

    it('should remove duplicate strings', () => {
      expect(unique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
    });

    it('should preserve order of first occurrence', () => {
      expect(unique([3, 1, 2, 3, 1])).toEqual([3, 1, 2]);
    });

    it('should handle empty array', () => {
      expect(unique([])).toEqual([]);
    });

    it('should handle array with no duplicates', () => {
      expect(unique([1, 2, 3])).toEqual([1, 2, 3]);
    });

    it('should handle different types as unique', () => {
      expect(unique([1, '1', 1])).toEqual([1, '1']);
    });
  });

  describe('flatten', () => {
    it('should flatten nested arrays', () => {
      expect(flatten([1, [2, 3], [4, [5, 6]]])).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should handle already flat array', () => {
      expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
    });

    it('should handle empty array', () => {
      expect(flatten([])).toEqual([]);
    });

    it('should handle deeply nested arrays', () => {
      expect(flatten([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]);
    });

    it('should handle mixed types', () => {
      expect(flatten([1, ['a', 'b'], [2, 3]])).toEqual([1, 'a', 'b', 2, 3]);
    });
  });

  describe('groupBy', () => {
    it('should group array by key function', () => {
      const users = [
        { name: 'Alice', role: 'admin' },
        { name: 'Bob', role: 'user' },
        { name: 'Charlie', role: 'admin' },
      ];
      const result = groupBy(users, (user) => user.role);
      expect(result).toEqual({
        admin: [
          { name: 'Alice', role: 'admin' },
          { name: 'Charlie', role: 'admin' },
        ],
        user: [{ name: 'Bob', role: 'user' }],
      });
    });

    it('should group by number key', () => {
      const numbers = [1, 2, 3, 4, 5];
      const result = groupBy(numbers, (n) => n % 2 === 0 ? 'even' : 'odd');
      expect(result).toEqual({
        odd: [1, 3, 5],
        even: [2, 4],
      });
    });

    it('should handle empty array', () => {
      expect(groupBy([], (item) => item)).toEqual({});
    });

    it('should handle single item', () => {
      expect(groupBy([1], (n) => n)).toEqual({ 1: [1] });
    });

    it('should group by computed key', () => {
      const items = [
        { value: 10 },
        { value: 20 },
        { value: 15 },
      ];
      const result = groupBy(items, (item) => item.value > 15 ? 'high' : 'low');
      expect(result).toEqual({
        low: [{ value: 10 }, { value: 15 }],
        high: [{ value: 20 }],
      });
    });
  });
});


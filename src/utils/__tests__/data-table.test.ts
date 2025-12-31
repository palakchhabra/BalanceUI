import { describe, it, expect } from 'vitest';
import { sortData, filterData } from '../data-table';

describe('data-table utilities', () => {
  describe('sortData', () => {
    const data = [
      { name: 'Bob', age: 30, score: 85 },
      { name: 'Alice', age: 25, score: 95 },
      { name: 'Charlie', age: 35, score: 75 },
    ];

    const columns = [
      { id: 'name', accessor: 'name' },
      { id: 'age', accessor: 'age' },
      { id: 'score', accessor: 'score' },
    ];

    it('should sort ascending', () => {
      const result = sortData(data, { columnId: 'age', direction: 'asc' }, columns);
      expect(result[0].name).toBe('Alice');
      expect(result[1].name).toBe('Bob');
      expect(result[2].name).toBe('Charlie');
    });

    it('should sort descending', () => {
      const result = sortData(data, { columnId: 'age', direction: 'desc' }, columns);
      expect(result[0].name).toBe('Charlie');
      expect(result[1].name).toBe('Bob');
      expect(result[2].name).toBe('Alice');
    });

    it('should return original data if no sort', () => {
      const result = sortData(data, undefined, columns);
      expect(result).toEqual(data);
    });

    it('should return original data if column not found', () => {
      const result = sortData(data, { columnId: 'unknown', direction: 'asc' }, columns);
      expect(result).toEqual(data);
    });

    it('should handle empty data', () => {
      const result = sortData([], { columnId: 'age', direction: 'asc' }, columns);
      expect(result).toEqual([]);
    });

    it('should handle string sorting', () => {
      const result = sortData(data, { columnId: 'name', direction: 'asc' }, columns);
      expect(result[0].name).toBe('Alice');
    });
  });

  describe('filterData', () => {
    const data = [
      { name: 'Alice', role: 'admin', active: true },
      { name: 'Bob', role: 'user', active: false },
      { name: 'Charlie', role: 'admin', active: true },
      { name: 'David', role: 'user', active: true },
    ];

    const columns = [
      { id: 'name', accessor: 'name' },
      { id: 'role', accessor: 'role' },
      { id: 'active', accessor: 'active' },
    ];

    it('should filter by single column', () => {
      const result = filterData(data, { role: 'admin' }, columns);
      expect(result).toHaveLength(2);
      expect(result.every(item => item.role === 'admin')).toBe(true);
    });

    it('should filter by multiple columns', () => {
      const result = filterData(data, { role: 'admin', active: 'true' }, columns);
      expect(result).toHaveLength(2);
      expect(result.every(item => item.role === 'admin')).toBe(true);
    });

    it('should return original data if no filters', () => {
      const result = filterData(data, {}, columns);
      expect(result).toEqual(data);
    });

    it('should ignore null/empty filters', () => {
      const result = filterData(data, { role: null, name: '' }, columns);
      expect(result).toEqual(data);
    });

    it('should handle case-insensitive filtering', () => {
      const result = filterData(data, { name: 'alice' }, columns);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Alice');
    });

    it('should handle empty data', () => {
      const result = filterData([], { role: 'admin' }, columns);
      expect(result).toEqual([]);
    });

    it('should handle column not found', () => {
      const result = filterData(data, { unknown: 'value' }, columns);
      expect(result).toEqual(data);
    });
  });
});


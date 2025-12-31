import { describe, it, expect } from 'vitest';
import { capitalize, kebabCase, camelCase, truncate, generateId } from '../string';

describe('string utilities', () => {
  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('should handle all uppercase', () => {
      expect(capitalize('WORLD')).toBe('World');
    });

    it('should handle mixed case', () => {
      expect(capitalize('hELLo')).toBe('Hello');
    });

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('');
    });

    it('should handle single character', () => {
      expect(capitalize('a')).toBe('A');
    });

    it('should handle already capitalized', () => {
      expect(capitalize('Hello')).toBe('Hello');
    });
  });

  describe('kebabCase', () => {
    it('should convert camelCase to kebab-case', () => {
      expect(kebabCase('camelCase')).toBe('camel-case');
    });

    it('should convert PascalCase to kebab-case', () => {
      expect(kebabCase('PascalCase')).toBe('pascal-case');
    });

    it('should handle already kebab-case', () => {
      expect(kebabCase('already-kebab')).toBe('already-kebab');
    });

    it('should handle multiple words', () => {
      expect(kebabCase('multipleWordsHere')).toBe('multiple-words-here');
    });

    it('should handle single word', () => {
      expect(kebabCase('single')).toBe('single');
    });

    it('should handle all lowercase', () => {
      expect(kebabCase('lowercase')).toBe('lowercase');
    });
  });

  describe('camelCase', () => {
    it('should convert kebab-case to camelCase', () => {
      expect(camelCase('kebab-case')).toBe('kebabCase');
    });

    it('should handle multiple hyphens', () => {
      expect(camelCase('multiple-words-here')).toBe('multipleWordsHere');
    });

    it('should handle already camelCase', () => {
      expect(camelCase('alreadyCamel')).toBe('alreadyCamel');
    });

    it('should handle single word', () => {
      expect(camelCase('single')).toBe('single');
    });

    it('should handle snake_case', () => {
      expect(camelCase('snake_case')).toBe('snakeCase');
    });
  });

  describe('truncate', () => {
    it('should truncate long strings', () => {
      expect(truncate('Hello World', 5)).toBe('Hello...');
    });

    it('should not truncate short strings', () => {
      expect(truncate('Short', 10)).toBe('Short');
    });

    it('should handle exact length', () => {
      expect(truncate('Hello', 5)).toBe('Hello');
    });

    it('should handle empty string', () => {
      expect(truncate('', 5)).toBe('');
    });

    it('should handle zero maxLength', () => {
      expect(truncate('Hello', 0)).toBe('...');
    });

    it('should handle very long strings', () => {
      const long = 'a'.repeat(100);
      expect(truncate(long, 10)).toBe('aaaaaaaaaa...');
    });
  });

  describe('generateId', () => {
    it('should generate id with default prefix', () => {
      const id = generateId();
      expect(id).toMatch(/^id-/);
      expect(id.length).toBeGreaterThan(3);
    });

    it('should generate id with custom prefix', () => {
      const id = generateId('input');
      expect(id).toMatch(/^input-/);
    });

    it('should generate unique ids', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });

    it('should generate ids with correct format', () => {
      const id = generateId('test');
      expect(id).toMatch(/^test-[a-z0-9]+$/);
    });
  });
});


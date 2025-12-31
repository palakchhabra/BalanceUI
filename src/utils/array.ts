/**
 * Array utility functions
 */

/**
 * Generate an array of numbers in a range
 * 
 * Creates an array containing all integers from start to end (inclusive).
 * 
 * @param {number} start - The starting number (inclusive)
 * @param {number} end - The ending number (inclusive)
 * @returns {number[]} Array of numbers from start to end
 * 
 * @example
 * ```typescript
 * range(1, 5); // [1, 2, 3, 4, 5]
 * range(0, 3); // [0, 1, 2, 3]
 * range(5, 5); // [5]
 * ```
 */
export const range = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, i) => i + start);

/**
 * Split an array into chunks of a specified size
 * 
 * Divides an array into smaller arrays (chunks) of the specified size.
 * The last chunk may be smaller than the specified size if the array
 * length is not evenly divisible by the chunk size.
 * 
 * @template T - The type of array elements
 * @param {T[]} array - The array to chunk
 * @param {number} size - The size of each chunk (must be > 0)
 * @returns {T[][]} Array of chunks
 * 
 * @example
 * ```typescript
 * chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
 * chunk([1, 2, 3, 4], 2); // [[1, 2], [3, 4]]
 * chunk(['a', 'b', 'c'], 1); // [['a'], ['b'], ['c']]
 * ```
 */
export const chunk = <T,>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

/**
 * Remove duplicate values from an array
 * 
 * Returns a new array with only unique values, preserving the order
 * of first occurrence. Uses Set internally for efficient deduplication.
 * 
 * @template T - The type of array elements
 * @param {T[]} array - The array to remove duplicates from
 * @returns {T[]} New array with unique values
 * 
 * @example
 * ```typescript
 * unique([1, 2, 2, 3, 1]); // [1, 2, 3]
 * unique(['a', 'b', 'a']); // ['a', 'b']
 * unique([1, '1', 1]); // [1, '1'] (different types)
 * ```
 */
export const unique = <T,>(array: T[]): T[] => Array.from(new Set(array));

/**
 * Flatten a nested array recursively
 * 
 * Recursively flattens a nested array structure into a single-level array.
 * Handles arrays nested to any depth.
 * 
 * @template T - The type of array elements
 * @param {(T | T[])[]} array - The nested array to flatten
 * @returns {T[]} Flattened array
 * 
 * @example
 * ```typescript
 * flatten([1, [2, 3], [4, [5, 6]]]); // [1, 2, 3, 4, 5, 6]
 * flatten([[1, 2], [3, 4]]); // [1, 2, 3, 4]
 * flatten([1, 2, 3]); // [1, 2, 3]
 * ```
 */
export const flatten = <T,>(array: (T | T[])[]): T[] =>
  array.reduce<T[]>((acc, item) => acc.concat(Array.isArray(item) ? flatten(item) : item), []);

/**
 * Group array elements by a key
 * 
 * Groups array elements into an object where keys are determined by the key function
 * and values are arrays of elements that share the same key.
 * 
 * @template T - The type of array elements
 * @template K - The type of the key (string or number)
 * @param {T[]} array - The array to group
 * @param {(item: T) => K} keyFn - Function that returns the key for each element
 * @returns {Record<K, T[]>} Object with keys and arrays of grouped elements
 * 
 * @example
 * ```typescript
 * const users = [
 *   { name: 'Alice', role: 'admin' },
 *   { name: 'Bob', role: 'user' },
 *   { name: 'Charlie', role: 'admin' }
 * ];
 * 
 * groupBy(users, user => user.role);
 * // { admin: [{ name: 'Alice', role: 'admin' }, ...], user: [...] }
 * 
 * groupBy([1, 2, 3, 4], n => n % 2 === 0 ? 'even' : 'odd');
 * // { odd: [1, 3], even: [2, 4] }
 * ```
 */
export const groupBy = <T, K extends string | number>(
  array: T[],
  keyFn: (item: T) => K
): Record<K, T[]> => {
  return array.reduce((groups, item) => {
    const key = keyFn(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<K, T[]>);
};


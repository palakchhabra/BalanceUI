/**
 * String utility functions
 */

/**
 * Capitalize the first letter of a string
 * 
 * Converts the first character to uppercase and the rest to lowercase.
 * Handles empty strings by returning them as-is.
 * 
 * @param {string} str - The string to capitalize
 * @returns {string} String with first letter capitalized and rest lowercase
 * 
 * @example
 * ```typescript
 * capitalize('hello'); // 'Hello'
 * capitalize('WORLD'); // 'World'
 * capitalize('hELLo'); // 'Hello'
 * capitalize(''); // ''
 * ```
 */
export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

/**
 * Convert a string to kebab-case
 * 
 * Converts camelCase or PascalCase strings to kebab-case by inserting
 * hyphens before uppercase letters and converting to lowercase.
 * 
 * @param {string} str - The string to convert
 * @returns {string} String in kebab-case
 * 
 * @example
 * ```typescript
 * kebabCase('camelCase'); // 'camel-case'
 * kebabCase('PascalCase'); // 'pascal-case'
 * kebabCase('already-kebab'); // 'already-kebab'
 * kebabCase('multipleWordsHere'); // 'multiple-words-here'
 * ```
 */
export const kebabCase = (str: string): string =>
  str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

/**
 * Convert a string to camelCase
 * 
 * Converts kebab-case or snake_case strings to camelCase by removing
 * hyphens/underscores and capitalizing the following letter.
 * 
 * @param {string} str - The string to convert (kebab-case or snake_case)
 * @returns {string} String in camelCase
 * 
 * @example
 * ```typescript
 * camelCase('kebab-case'); // 'kebabCase'
 * camelCase('snake_case'); // 'snakeCase'
 * camelCase('alreadyCamel'); // 'alreadyCamel'
 * camelCase('multiple-words-here'); // 'multipleWordsHere'
 * ```
 */
export const camelCase = (str: string): string =>
  str.replace(/[-_]([a-z])/g, (g) => g[1].toUpperCase());

/**
 * Truncate a string with ellipsis
 * 
 * Truncates a string to the specified maximum length and appends '...'
 * if the string is longer than maxLength. Returns the original string
 * if it's shorter than or equal to maxLength.
 * 
 * @param {string} str - The string to truncate
 * @param {number} maxLength - Maximum length before truncation (must be >= 0)
 * @returns {string} Truncated string with ellipsis, or original string if shorter
 * 
 * @example
 * ```typescript
 * truncate('Hello World', 5); // 'Hello...'
 * truncate('Short', 10); // 'Short'
 * truncate('Very long text here', 8); // 'Very lon...'
 * ```
 */
export const truncate = (str: string, maxLength: number): string =>
  str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;

/**
 * Generate a unique ID string
 * 
 * Generates a client-side unique identifier using a random string.
 * Note: This is not cryptographically secure and should only be used
 * for client-side IDs (e.g., React keys, DOM IDs). For production
 * use cases requiring guaranteed uniqueness, consider using UUID.
 * 
 * @param {string} prefix - Prefix for the ID (default: 'id')
 * @returns {string} Unique ID string in format: '{prefix}-{random}'
 * 
 * @example
 * ```typescript
 * generateId(); // 'id-abc123xyz'
 * generateId('input'); // 'input-abc123xyz'
 * generateId('user'); // 'user-xyz789abc'
 * ```
 */
export const generateId = (prefix = 'id'): string =>
  `${prefix}-${Math.random().toString(36).substr(2, 9)}`;


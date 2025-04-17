//! Utility functions for string manipulation
// Capitalize the first letter of a string
export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

// Capitalize every word in a string
export const capitalizeWords = (str: string): string =>
  str.replace(/\b\w/g, (char) => char.toUpperCase());

// Convert to camelCase
export const toCamelCase = (str: string): string =>
  str
    .replace(/[-_]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^\w/, (c) => c.toLowerCase());

// Convert to kebab-case
export const toKebabCase = (str: string): string =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();

// Truncate string with optional ellipsis
export const truncate = (str: string, maxLength: number): string =>
  str.length > maxLength ? str.slice(0, maxLength - 3) + '...' : str;

// Check if string is empty or only whitespace
export const isEmpty = (str: string): boolean =>
  !str || str.trim().length === 0;

// Remove all whitespace from string
export const removeWhitespace = (str: string): string =>
  str.replace(/\s+/g, '');



//! Utility functions for duration and timeouts


export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));


// Timeout wrapper: rejects if promise takes too long
export function timeoutPromise<T>(
  promise: Promise<T>,
  ms: number,
  errorMsg = 'Request timed out'
): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error(errorMsg)), ms)
  );

  return Promise.race([promise, timeout]);
}


//! Utility functions for array manipulation

// Check if an array is empty or undefined
export const isArrayEmpty = (arr: any[]): boolean =>
  !Array.isArray(arr) || arr.length === 0;

// Remove duplicates from an array
export const removeDuplicates = <T>(arr: T[]): T[] =>
  Array.isArray(arr) ? Array.from(new Set(arr)) : arr;

// Shuffle an array
export const shuffleArray = <T>(arr: T[]): T[] => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Adapted from {@link https://github.com/sindresorhus/escape-string-regexp/blob/main/index.js | escape-string-regexp}.
 */
export const escapeRegExpString = (string: string) => {
  return string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
};

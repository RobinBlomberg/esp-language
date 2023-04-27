export const constantKeywords = [
  'false',
  'Infinity',
  'NaN',
  'null',
  'true',
  'undefined',
];

export const controlKeywords = [
  'break',
  'continue',
  'do',
  'else',
  'if',
  'let',
  'match',
  'new',
  'return',
  'throw',
  'while',
];

export const keywords = [...constantKeywords, ...controlKeywords];

export const keywordsSet = new Set(keywords);

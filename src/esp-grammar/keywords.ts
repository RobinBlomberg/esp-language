export type ConstantKeyword = (typeof constantKeywords)[number];

export type ControlKeyword = (typeof controlKeywords)[number];

export type Keyword = (typeof keywords)[number];

export const constantKeywords = [
  'false',
  'Infinity',
  'NaN',
  'null',
  'true',
  'undefined',
] as const;

export const controlKeywords = [
  'break',
  'const',
  'continue',
  'do',
  'else',
  'export',
  'for',
  'if',
  'import',
  'let',
  'match',
  'new',
  'return',
  'throw',
  'while',
] as const;

export const keywords = [...constantKeywords, ...controlKeywords];

export const keywordsSet = new Set<string>(keywords);

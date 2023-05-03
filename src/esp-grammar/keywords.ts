export type Keyword = ConstantKeyword | ControlKeyword;

export enum ConstantKeyword {
  False = 'false',
  Infinity = 'Infinity',
  NaN = 'NaN',
  Null = 'null',
  True = 'true',
  Undefined = 'undefined',
}

export enum ControlKeyword {
  Break = 'break',
  Const = 'const',
  Continue = 'continue',
  Do = 'do',
  Else = 'else',
  For = 'for',
  If = 'if',
  Let = 'let',
  Match = 'match',
  New = 'new',
  Of = 'of',
  Return = 'return',
  Throw = 'throw',
  While = 'while',
}

export const Keyword = { ...ConstantKeyword, ...ControlKeyword };

export const constantKeywords = Object.values(ConstantKeyword);

export const constantKeywordsSet = new Set<string>(constantKeywords);

export const controlKeywords = Object.values(ControlKeyword);

export const keywords = [...constantKeywords, ...controlKeywords];

export const keywordsSet = new Set<string>(keywords);

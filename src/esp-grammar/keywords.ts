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

export const ConstantKeywords = Object.values(ConstantKeyword);

export const ConstantKeywordsSet = new Set<string>(ConstantKeywords);

export const ControlKeywords = Object.values(ControlKeyword);

export const Keyword = { ...ConstantKeyword, ...ControlKeyword };

export const Keywords = [...ConstantKeywords, ...ControlKeywords];

export const KeywordsSet = new Set<string>(Keywords);

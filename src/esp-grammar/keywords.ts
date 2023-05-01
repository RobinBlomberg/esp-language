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
  Return = 'return',
  Throw = 'throw',
  While = 'while',
}

export const Keyword = {
  ...ConstantKeyword,
  ...ControlKeyword,
};

export const constantKeywords = [
  ConstantKeyword.False,
  ConstantKeyword.Infinity,
  ConstantKeyword.NaN,
  ConstantKeyword.Null,
  ConstantKeyword.True,
  ConstantKeyword.Undefined,
] as const;

export const controlKeywords = [
  ControlKeyword.Break,
  ControlKeyword.Const,
  ControlKeyword.Continue,
  ControlKeyword.Do,
  ControlKeyword.Else,
  ControlKeyword.For,
  ControlKeyword.If,
  ControlKeyword.Let,
  ControlKeyword.Match,
  ControlKeyword.New,
  ControlKeyword.Return,
  ControlKeyword.Throw,
  ControlKeyword.While,
] as const;

export const keywords = [...constantKeywords, ...controlKeywords];

export const keywordsSet = new Set<string>(keywords);

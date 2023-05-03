export type BinaryOperator = (typeof BinaryOperators)[number];

export type LogicalOperator = (typeof LogicalOperators)[number];

export type Operator = (typeof Operators)[number];

export type Punctuation = (typeof Punctuations)[number];

export type Punctuator = (typeof Punctuators)[number];

export const BinaryOperators = [
  '**',
  '*',
  '/',
  '%',
  '+',
  '-',
  '<<',
  '>>',
  '>>>',
  '<',
  '>',
  '<=',
  '>=',
  '==',
  '!=',
  '&',
  '^',
  '|',
] as const;

export const BinaryOperatorsSet = new Set<string>(BinaryOperators);

export const LogicalOperators = ['&&', '||', '??'] as const;

export const LogicalOperatorsSet = new Set<string>(LogicalOperators);

export const Operators = [
  ...LogicalOperators,
  '--',
  '-',
  '-=',
  '!',
  '!=',
  '??=',
  '?',
  '*',
  '**',
  '**=',
  '*=',
  '/',
  '/=',
  '&',
  '&&=',
  '&=',
  '%',
  '%=',
  '^',
  '^=',
  '+',
  '++',
  '+=',
  '<',
  '<<',
  '<<=',
  '<=',
  '=',
  '==',
  '>',
  '>=',
  '>>',
  '>>=',
  '>>>',
  '>>>=',
  '|',
  '|=',
  '||=',
  '~',
] as const;

export const OperatorsSet = new Set<string>(Operators);

export const Punctuations = [
  ',',
  ';',
  ':',
  '.',
  '(',
  ')',
  '[',
  ']',
  '{',
  '}',
  '#',
] as const;

export const Punctuators = [...Operators, ...Punctuations];

export const PunctuatorsSet = new Set<string>(Punctuators);

export const isBinaryOperator = (
  operator: string,
): operator is BinaryOperator => {
  return BinaryOperatorsSet.has(operator);
};

export const isLogicalOperator = (
  operator: string,
): operator is LogicalOperator => {
  return LogicalOperatorsSet.has(operator);
};

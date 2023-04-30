export type Operator = (typeof operators)[number];

export type Punctuation = (typeof punctuations)[number];

export type Punctuator = (typeof punctuators)[number];

export const operators = [
  '--',
  '-',
  '-=',
  '!',
  '!=',
  '??',
  '??=',
  '?',
  '*',
  '**',
  '**=',
  '*=',
  '/',
  '/=',
  '&',
  '&&',
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
  '||',
  '||=',
  '~',
] as const;

export const operatorsSet = new Set<string>(operators);

export const punctuations = [
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

export const punctuators = [...operators, ...punctuations];

export const punctuatorsSet = new Set<string>(punctuators);

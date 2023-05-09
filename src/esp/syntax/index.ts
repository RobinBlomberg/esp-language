export namespace syntax {
  export type UnaryOperator = (typeof unaryOperators)[number];

  export type BinaryOperator = (typeof binaryOperators)[number];

  export type Punctuator = (typeof punctuators)[number];

  export const unaryOperators = ['-', '!'] as const;

  export const unaryOperatorsSet = new Set(unaryOperators);

  export const binaryOperators = ['-', '+'] as const;

  export const binaryOperatorsSet = new Set(binaryOperators);

  export const punctuators = [
    ...new Set([...unaryOperators, ...binaryOperators, ';'] as const),
  ];

  export const punctuatorsSet = new Set(punctuators);
}
